<template>
  <q-layout view="lHh Lpr lff" class="">
    <!--  elevated -->
    <q-header flat class="bg-white p-2">
      <q-toolbar class="grid grid-cols-2">
        <!-- <q-btn
          flat
          color="green"
          @click="drawer = !drawer"
          round
          dense
          icon="menu"
        /> -->
        <q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" v-if="!drawer">
            <img src="../assets/images/login/encore1.png" class="md:h-[26px] md:w-[169px] w-[120px] h-[20px]" />
          </q-btn>
        </q-toolbar-title>
        <!--:size="$q.screen.lt.md ? 'sm' : 'md'"class="q-gutter-xs"  class="text-white" fingerprint-->
        <div class="flex justify-self-end">
          <q-btn flat color="green" icon="fingerprint" @click="confirm = true" class="" dense />
          <q-btn flat color="green" icon="notifications" class="" dense />
          <q-input v-if="searchField" class="gt-sm" rounded outlined v-model="text" label="Search" dense color="green" />
          <q-btn flat color="green" icon="search" @click="searchField = !searchField" class="" dense />
          <q-btn flat color="green" icon="account_circle" dense />
        </div>
        <div class="col-span-2">
          <q-input v-if="searchField" class="lt-md" rounded outlined v-model="text" label="Search" dense color="green" />
        </div>
      </q-toolbar>
    </q-header>
    <!--  overlay -->
    <q-drawer v-model="drawer" show-if-above :width="230" :breakpoint="500" class="bg-green rounded-r-xl">
      <q-scroll-area class="fit">
        <q-list>
          <q-item>
            <q-item-section class="pt-3">
              <q-btn flat @click="drawer = !drawer">
                <img src="../assets/images/home/encore_white.png" class="h-[26px] w-[169px]" />
              </q-btn>
            </q-item-section>
          </q-item>
          <template v-for="(menu, index) in menuList" :key="index">
            <!-- v-for="menu in menuList" :key="menu" -->
            <!--  :class="expanded ? 'bg-white text-green' : 'bg-green text-white'" -->
            <q-expansion-item class="text-white" :label="menu.label" :icon="menu.icon"
              v-if="authStore.hasAccess(menu.permissions)" :hide-expand-icon="menu.submenus ? false : true"
              group="somegroup" expand-icon-class="text-white">
              <q-item clickable v-ripple v-for="submenu in menu.submenus" :key="submenu" :to="submenu.link"
                class="bg-white text-green">
                <div v-if="authStore.hasAccess(submenu.permissions)" class="flex ">
                  <q-item-section avatar>
                    <q-avatar text-color="green" :icon="submenu.icon" />
                  </q-item-section>
                  <q-item-section class="">{{ submenu.label }}</q-item-section>
                </div>
              </q-item>
            </q-expansion-item>

          </template>
          <q-expansion-item class="text-white" label="Logout" icon="logout" :hide-expand-icon="true" @click="logout" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page class="bg-img">
        <!--    class="bg-[url('../../assets/images/home/bg2.jpg')] bg-no-repeat bg-cover" -->
        <router-view />
        <!-- backdrop-opacity-10 backdrop-invert bg-white/10 -->
        <!-- <div class="-z-10 absolute bottom-0 right-0 w-full h-full">
          <img src="../assets/images/home/bg1.png" alt="" class="fixed bottom-0 right-0" />
        </div> -->
      </q-page>
    </q-page-container>
    <q-dialog v-model="confirm" persistent>
      <EmpAttendance />
    </q-dialog>
  </q-layout>
</template>

<script>
import EmpAttendance from "src/components/attendance/EmpAttendance.vue";
import { ref } from "vue";
import { useAttendanceStore } from "../stores/attendance.store"
import { useAuthStore } from "../stores/auth.store"
import { useRouter } from 'vue-router';

const menuList = [
  {
    icon: "inbox",
    label: "Dashboard",
    separator: true,
  },
  {
    icon: "supervised_user_circle",
    label: "Configuration",
    separator: false,
    permissions: ['role_create', 'role_read', 'role_write', 'permission_create', 'permission_read', 'permission_write', 'user_create', 'user_read', 'user_write'],
    submenus: [
      {
        icon: "account_circle",
        label: "User Management",
        permissions: ['user_create', 'user_read', 'user_write'],
        link: "/user",
      },
      {
        icon: "manage_accounts",
        label: "User Role",
        permissions: ['role_create', 'role_read', 'role_write', 'permission_create', 'permission_read', 'permission_write'],
        link: "/role",
      },
    ],
  },
  {
    icon: "description",
    label: "Requisition",
    permissions: ['cash_read', 'cash_write', 'expense_read', 'expense_write', 'expense_create'],
    separator: false,
    submenus: [
      {
        icon: "request_quote",
        label: "Cash Request",
        permissions: ['cash_read', 'cash_write', 'cash_create'],
        link: "/cash",
      },
      {
        icon: "payments",
        label: "Expense",
        permissions: ['expense_read', 'expense_write', 'expense_create'],
        link: "/expense",
      },
      {
        icon: "payments",
        label: "Vendor Payments",
        link: "/vendor",
      },
    ],
  },
  {
    icon: "work_history",
    label: "Projects",
    permissions: ['project_read', 'project_write', 'project_create'],
    separator: false,
    submenus: [
      {
        icon: "request_quote",
        label: "All Project",
        permissions: ['project_read', 'project_write', 'project_create'],
        link: "/projects",
      },
      // {
      //   icon: "payments",
      //   label: "Project Type",
      //   link: "",
      // },
    ],
  },
  {
    icon: "analytics",
    label: "Analytics",
    permissions: ['analytics_read'],
    separator: false,
    submenus: [
      {
        icon: "request_quote",
        label: "Project Analytics",
        link: "",
      },
      {
        icon: "payments",
        label: "Store Analytics",
        link: "",
      },
      {
        icon: "payments",
        label: "User Analytics",
        link: "/user-analytics",
      },
      {
        icon: "payments",
        label: "Attendance",
        link: "/attendance",
      },
    ],
  },
  // {
  //   icon: "error",
  //   label: "Spam",
  //   separator: true,
  // },
  // {
  //   icon: "settings",
  //   label: "Settings",
  //   separator: false,
  // },
  // {
  //   icon: "feedback",
  //   label: "Send Feedback",
  //   separator: false,
  // },
  // {
  //   icon: "help",
  //   iconColor: "primary",
  //   label: "Help",
  //   separator: false,
  // },
  // {
  //   icon: "logout",
  //   iconColor: "primary",
  //   label: "Logout",
  //   separator: false,
  // },
];

export default {
  components: { EmpAttendance },
  setup() {
    const router = useRouter();
    // const route = useRoute();
    const confirm = ref(false);
    const logout = () => {
      localStorage.clear();
      router.push({ path: "/" });
    };
    return {
      logout,
      confirm,
      response: ref(false),
      searchField: ref(false),
      expanded: ref(false),
      tab: ref("configuration"),
      drawer: ref(false),
      menuList,
    };
  },
  data() {
    return {
      attendenceStore: useAttendanceStore(),
      authStore: useAuthStore(),
    };
  },
  async mounted() {
    this.attendenceStore.getAttendanceStatus();
  },
};
</script>

<style lang="scss" scoped>
.q-header {
  font-family: "Roboto Slab", "serif";
}

.bg-img {
  background-image: url("../assets/images/home/bg3.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  background-attachment: fixed;
}
</style>
