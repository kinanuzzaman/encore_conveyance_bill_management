<template>
  <q-layout view="lHh Lpr lff" class="">
    <!--  elevated -->
    <q-header flat class="bg-white p-2">
      <q-toolbar>
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
            <img src="../assets/images/login/encore1.png" class="h-[26px] w-[169px]" />
          </q-btn>
        </q-toolbar-title>
        <q-btn round color="green" icon="account_circle" @click="onClick" class="text-white" />
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
          <!-- <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
              <q-item-section avatar class="text-white">
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template> -->
          <template v-for="(menu, index) in menuList" :key="index">
            <!-- v-for="menu in menuList" :key="menu" -->
            <!--  :class="expanded ? 'bg-white text-green' : 'bg-green text-white'" -->
            <q-expansion-item class="text-white" :label="menu.label" :icon="menu.icon"
              :hide-expand-icon="menu.submenus ? false : true" group="somegroup" expand-icon-class="text-white">
              <q-item clickable v-ripple v-for="submenu in menu.submenus" :key="submenu" :to="submenu.link"
                class="bg-white text-green">
                <q-item-section avatar>
                  <q-avatar text-color="green" :icon="submenu.icon" />
                </q-item-section>
                <q-item-section class="">{{ submenu.label }}</q-item-section>
              </q-item>
            </q-expansion-item>

            <!-- <div v-else>
                  <q-expansion-item
                    :label="menu.label"
                    :icon="menu.icon"
                    :hide-expand-icon="true"
                    :href="'#/' + menu.link"
                  />
                </div> -->
          </template>
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
    <!-- <q-footer
      elevated
      class="bg-green"
      style="font-family: 'Roboto Slab', serif"
    >
      <q-tabs
        v-model="tab"
        class="text-white"
        align="justify"
        :inline-label="$q.screen.gt.sm"
      >
        <q-route-tab
          to="/configuration"
          class="gt-sm"
          icon="manage_accounts"
          label="Configuration"
          no-caps
        />
        <q-route-tab
          to="/cashin"
          icon="credit_card"
          label="Cash request"
          no-caps
        />
        <q-route-tab
          name="Expense"
          icon="account_balance_wallet"
          label="Expense"
          no-caps
        />
        <q-route-tab
          name="Analytics"
          icon="donut_small"
          label="Analytics"
          no-caps
        />
      </q-tabs>
    </q-footer> -->
  </q-layout>
</template>

<script>
import { ref } from "vue";

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
    submenus: [
      {
        icon: "account_circle",
        label: "User Management",
        link: "/user",
      },
      {
        icon: "manage_accounts",
        label: "User Role",
        link: "",
      },
    ],
  },
  {
    icon: "description",
    label: "Requisition",
    separator: false,
    submenus: [
      {
        icon: "request_quote",
        label: "Cash Request",
        link: "/cash",
      },
      {
        icon: "payments",
        label: "Expense",
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
    icon: "description",
    label: "Projects",
    separator: false,
    submenus: [
      {
        icon: "request_quote",
        label: "All Project",
        link: "/",
      },
      {
        icon: "payments",
        label: "Project Type",
        link: "/",
      },
    ],
  },
  {
    icon: "description",
    label: "Analytics",
    separator: false,
    submenus: [
      {
        icon: "request_quote",
        label: "Project Analytics",
        link: "/",
      },
      {
        icon: "payments",
        label: "Store Analytics",
        link: "/",
      },
      {
        icon: "payments",
        label: "User Analytics",
        link: "/",
      },
      {
        icon: "payments",
        label: "Attendance",
        link: "/",
      },
    ],
  },
  {
    icon: "error",
    label: "Spam",
    separator: true,
  },
  {
    icon: "settings",
    label: "Settings",
    separator: false,
  },
  {
    icon: "feedback",
    label: "Send Feedback",
    separator: false,
  },
  {
    icon: "help",
    iconColor: "primary",
    label: "Help",
    separator: false,
  },
];

export default {
  setup() {
    return {
      expanded: ref(false),
      tab: ref("configuration"),
      drawer: ref(false),
      menuList,
    };
  },
};
</script>

<style lang="scss" scoped>
.q-header {
  font-family: "Roboto Slab", "serif";
}

.bg-img {
  background-image: url("../assets/images/home/bg1.png");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
