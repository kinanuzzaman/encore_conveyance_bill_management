<template>
  <!-- class="bg-[url('../assets/home/bg.png')] bg-no-repeat bg-cover" -->
  <main>
    <!-- Section Name  style="font-family: 'Roboto Slab', 'serif'"-->
    <section class="mx-4 py-6 flex justify-between">
      <div class="text-2xl font-semibold">User Management</div>

      <div>
        <q-btn color="orange" @click="confirm = true" class="rounded-lg" unelevated icon="add" label="Add User" />
      </div>
    </section>
    <!-- Table -->
    <!-- grid md:grid-cols-3 grid-cols-1 -->
    <div class="">
      <section class="">
        <div class="q-px-md">
          <!-- bordered  style="background-color: #f1f1f1" -->
          <q-table flat class="h-[85vh]" :rows="rows" ref="tableRef" v-model:pagination="pagination" :loading="loading"
            @request="onRequest" :columns="columns" style="background: rgba(244, 244, 244, 0.8)">
            <template v-slot:body="props">
              <q-tr class="" :props="props">
                <q-td key="role" :props="props" @click="openDialog = true" class="">
                  <div class="tw-py-1 tw-rounded-md">
                    <div class="flex items-center gap-4">
                      <div>
                        <q-avatar font-size="40px" icon="account_circle" />
                      </div>
                      <div class="flex gap-2">
                        <span class="text-xs">{{ props.row.first_name }} {{ props.row.last_name }}</span>
                        <span class="text-xs bg-gray-400 text-white rounded px-1">{{ props.row.designation
                        }}</span>
                      </div>
                    </div>
                  </div>
                </q-td>
                <q-td key="role" :props="props" class="">
                  <div>
                    <div class="text-xs">{{ props.row.email }}</div>
                  </div>
                </q-td>
                <q-td key="role" :props="props" class="">
                  <div>
                    <div class="text-xs">{{ props.row.phone_number }}</div>
                  </div>
                </q-td>
                <q-td key="role" :props="props" class="">
                  <div>
                    <div class="text-xs">{{ props.row.createdAt }}</div>
                  </div>
                </q-td>
                <q-td key="role" :props="props" @click="openDialog = true" class="">
                  {{ props.row.status }}
                </q-td>
                <q-td key="role" :props="props" @click="openDialog = true" class="">
                  <div class="bg-blue-200 inline p-2 text-blue-800">
                    {{ props.row.role.role_name }}
                  </div>
                </q-td>
                <q-td>
                  <div class="column items-end">
                    <q-fab square flat padding="none" text-color="black" icon="add" direction="left"
                      class="border border-black">
                      <q-fab-action flat @click="confirm = true" icon="edit"
                        class="bg-transparent shadow-none text-blue-500">
                        <q-tooltip class="bg-blue-6 text-xs" anchor="top middle" self="center middle" :offset="[10, 10]">
                          Edit
                        </q-tooltip>
                      </q-fab-action>
                      <!-- <q-fab-action
                        flat
                        @click="onClick"
                        icon="block"
                        class="bg-transparent shadow-none text-red-500"
                      >
                        <q-tooltip
                          class="bg-blue-6 text-xs"
                          anchor="top middle"
                          self="center middle"
                          :offset="[10, 10]"
                        >
                          Suspend User
                        </q-tooltip>
                      </q-fab-action>
                      <q-fab-action
                        flat
                        @click="onClick"
                        icon="delete"
                        class="bg-transparent shadow-none text-red-700"
                      >
                        <q-tooltip
                          class="bg-blue-6 text-xs"
                          anchor="top middle"
                          self="center middle"
                          :offset="[10, 10]"
                        >
                          Delete
                        </q-tooltip>
                      </q-fab-action> -->
                      <q-fab-action flat icon="lock" class="bg-transparent shadow-none text-gray-700">
                        <q-tooltip class="bg-blue-6 text-xs" anchor="top middle" self="center middle" :offset="[10, 10]">
                          Lock
                        </q-tooltip>
                      </q-fab-action>
                    </q-fab>
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </section>
    </div>

    <q-dialog v-model="confirm" class="">
      <q-card class="my-card p-10" style="width: 1020px; max-width: 80vw">
        <div class="flex justify-center py-10">
          <q-avatar size="100px" font-size="52px" color="teal" text-color="white" icon="account_circle" />
        </div>
        <q-card-section class="grid grid-cols-2 gap-5">
          <q-input outlined v-model="userRegister.first_name" placeholder="First Name" bg-color="white" :dense="true" />
          <q-input outlined v-model="userRegister.last_name" placeholder="Last Name" bg-color="white" :dense="true" />
          <q-input outlined v-model="userRegister.email" placeholder="Email" :dense="true">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
          <q-input outlined v-model="userRegister.phone_number" placeholder="Phone Number" :dense="true">
            <template v-slot:prepend>
              <q-icon name="phone" />
            </template>
          </q-input>
          <q-input outlined v-model="userRegister.designation" placeholder="Designation" bg-color="white" :dense="true" />
          <q-select class="bg-white" outlined v-model="userRegister.role" :options="rbacStore.getAllRoles" :dense="true"
            label="Select role" />
          <q-input outlined v-model="userRegister.salary" placeholder="Salary" bg-color="white" :dense="true" />
          <q-btn label="Save" color="green" class="col" @click="registerUser()" />
        </q-card-section>
        <!-- <q-card-actions align="center" class="row mx-2 py-5">
          <q-btn label="Create" color="green" class="col" />
          <q-btn label="Decline" color="negative" class="col" />
        </q-card-actions> -->
      </q-card>
    </q-dialog>
  </main>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useUserStore } from "../../stores/user.store";
import { useRbacStore } from "../../stores/rbac.store";
import { useQuasar } from "quasar";
const columns = [
  {
    name: "user",
    required: true,
    label: "User",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "email",
    align: "left",
    label: "Email",
    field: "email",
    sortable: true,
  },
  {
    name: "phone",
    align: "left",
    label: "Phone",
    field: "phone",
    sortable: true,
  },
  {
    name: "created",
    align: "left",
    label: "Created On",
    field: "created",
    sortable: true,
  },
  {
    name: "status",
    align: "left",
    label: "Status",
    field: "status",
    sortable: true,
  },
  {
    name: "role",
    align: "left",
    label: "Role",
    field: "role",
  },
  {
    name: "action",
    label: "Action",
    field: "action",
  },
];


export default {
  setup() {
    const userStore = useUserStore();
    const rbacStore = useRbacStore();
    const $q = useQuasar();

    let confirm = ref(false);
    const userRegister = reactive({
      first_name: null,
      last_name: null,
      email: null,
      phone_number: null,
      designation: null,
      salary: null,
      role: null
    });

    const tableRef = ref()
    const rows = ref([])
    const loading = ref(false)
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
    })

    async function onRequest(props) {
      const { page, rowsPerPage } = props.pagination

      loading.value = true

      await userStore.fetchAllUsers({
        page: page,
        limit: rowsPerPage,
      })
      console.log("🚀 ~ file: UserManagement.vue:274 ~ onRequest ~ page:", page)
      // clear out existing data and add new
      rows.value.splice(0, rows.value.length, ...userStore.getAllUsers)
      pagination.value.rowsNumber = userStore.getTotalUsersCount
      pagination.value.page = page
      pagination.value.rowsPerPage = rowsPerPage

      loading.value = false
    }

    onMounted(() => {
      tableRef.value.requestServerInteraction();
      rbacStore.fetchAllRoles();
    });

    const registerUser = async () => {

      try {
        await userStore.userInvite({
          ...userRegister,
          role: userRegister.role.value,
        });
        $q.notify({
          message: "User created",
          color: "positive",
          position: "top",
        });
        confirm.value = false;
      } catch (error) {
        $q.notify({
          message: error.response ? error.response.data.message : error.message,
          color: "negative",
          position: "top",
        });
      }
    };
    return {
      rbacStore,
      registerUser,
      userRegister,
      rows,
      columns,
      confirm,
      model: ref(null),
      name: ref(null),
      designation: ref(null),
      // options: rbacStore.getAllRoles,
      val: ref(true),
      tableRef,
      pagination,
      loading,
      onClick: () => false,
      onRequest,
    };
  },
};
</script>

<style lang="scss" scoped></style>
