<template>
  <!-- class="bg-[url('../assets/home/bg.png')] bg-no-repeat bg-cover" -->
  <main>
    <!-- Section Name  style="font-family: 'Roboto Slab', 'serif'"-->
    <section class="mx-4 py-6 flex justify-between">
      <div class="text-2xl font-semibold">User Management</div>

      <div class="flex gap-5">
        <q-btn color="orange" v-if="authStore.canAccess('user_create')" @click="confirm = true" class="rounded-lg"
          unelevated icon="add" label="Add User" />
      </div>
    </section>
    <!-- Table -->
    <!-- grid md:grid-cols-3 grid-cols-1 -->
    <div class="">
      <section class="">
        <div class="q-px-md gt-sm">
          <!-- bordered  style="background-color: #f1f1f1" -->
          <q-table flat class="h-[85vh]" :rows="rows" ref="tableRef" v-model:pagination="pagination" :loading="loading"
            @request="onRequest" :columns="columns" style="background: rgba(244, 244, 244, 0.8)">
            <template v-slot:body="props">
              <q-tr class="" :props="props">
                <q-td key="role" :props="props" @click="openDialog = true" class="">
                  <div class="tw-py-1 tw-rounded-md">
                    <div class="flex items-center gap-4">
                      <div>
                        <q-avatar font-size="20px" color="green" text-color="white">
                          <img v-if="props.row.profile_img" :src="props.row.profile_img" alt="">
                          <span v-else>{{ props.row.first_name.charAt(0)
                            + props.row.last_name.charAt(0) }}</span>
                        </q-avatar>
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
                    <div class="text-xs">{{ moment(props.row.createdAt).format("LL | h:mma") }}</div>
                  </div>
                </q-td>
                <q-td key="role" :props="props" @click="openDialog = true" class="">
                  <q-chip
                    :color="props.row.status === 'ACTIVE' ? 'green' : props.row.status === 'INVITED' ? 'gray-500' : 'red'"
                    text-color="white" :label="props.row.status" />
                </q-td>
                <q-td key="role" :props="props" @click="openDialog = true" class="">
                  <div class="bg-blue-200 inline p-2 text-blue-800">
                    {{ props.row.role?.role_name }}
                  </div>
                </q-td>
                <q-td>
                  <div class="column items-end">
                    <q-fab persistent square flat padding="none" text-color="black" icon="add" direction="left"
                      class="border border-black">
                      <q-fab-action v-if="authStore.canAccess('user_write')" flat @click="openUserUpdateDialog(props.row)"
                        icon="edit" class="bg-transparent shadow-none text-blue-500">
                        <q-tooltip class="bg-blue-6 text-xs" anchor="top middle" self="center middle" :offset="[10, 10]">
                          Edit
                        </q-tooltip>
                      </q-fab-action>

                      <q-fab-action v-if="authStore.canAccess('user_write')" flat @click="deleteUser(props.row._id)"
                        icon="delete" class="bg-transparent shadow-none text-red-700">
                        <q-tooltip class="bg-blue-6 text-xs" anchor="top middle" self="center middle" :offset="[10, 10]">
                          Delete
                        </q-tooltip>
                      </q-fab-action>
                      <q-fab-action v-if="authStore.canAccess('user_write')" flat
                        :icon="props.row.status === 'ACTIVE' ? 'lock_open' : 'lock'"
                        :color="props.row.status === 'ACTIVE' ? 'green' : 'red'" @click="toggleUserStatus(props.row)"
                        class="bg-transparent shadow-none text-gray-700">
                        <q-tooltip class="bg-blue-6 text-xs" anchor="top middle" self="center middle" :offset="[10, 10]">
                          {{ props.row.status === 'ACTIVE' ? 'Unblocked' : 'Blocked' }}
                        </q-tooltip>
                      </q-fab-action>
                    </q-fab>
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
        <!-- mobile table -->
        <div class="q-pa-md lt-md">
          <q-table :rows="rows" :columns="columns" row-key="name" :filter="filter" grid hide-header>
            <template v-slot:item="props">
              <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                :style="props.selected ? 'transform: scale(0.95);' : ''">
                <q-card bordered flat :class="props.selected ? ($q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2') : ''">
                  <q-card-section class="flex justify-between bg-green text-white">
                    <!-- <q-checkbox dense v-model="props.selected" :label="props.row.name" color="white" keep-color /> -->
                    <div class="column items-end">
                      <q-btn flat icon="more_vert">
                        <q-menu anchor="top middle" self="top right">
                          <q-item clickable v-if="authStore.canAccess('user_write')"
                            @click="openUserUpdateDialog(props.row)">
                            <q-item-section>Edit</q-item-section>
                          </q-item>
                          <q-item clickable v-if="authStore.canAccess('user_write')" @click="deleteUser(props.row._id)">
                            <q-item-section>Delete</q-item-section>
                          </q-item>
                          <q-item clickable v-if="authStore.canAccess('user_write')" @click="toggleUserStatus(props.row)">
                            <q-item-section>{{ props.row.status === 'ACTIVE' ? 'Block' : 'Unblock' }}</q-item-section>
                          </q-item>
                        </q-menu>
                      </q-btn>
                    </div>
                  </q-card-section>
                  <q-separator />
                  <q-list dense>
                    <q-item class="font-bold" v-for="col in props.cols.filter(col => col.name !== 'desc')"
                      :key="col.name">
                      <q-item-section>
                        <q-item-label caption v-if="col.label != 'Action'">{{ col.label }}</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label v-if="col.label == 'User'">{{ props.row.first_name }} {{ props.row.last_name
                        }}</q-item-label>
                        <q-item-label v-else-if="col.label == 'Role'">{{ col.value?.role_name }}</q-item-label>
                        <q-item-label v-else-if="col.label == 'Created'">
                          {{ moment(props.row.createdAt).format("LL | h:mma") }}
                        </q-item-label>
                        <q-item-label v-else>{{ col.value }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card>
              </div>
            </template>

          </q-table>
        </div>
      </section>
    </div>

    <q-dialog v-model="confirm" class="" persistent>
      <q-card class="my-card p-10" style="width: 1020px; max-width: 80vw">
        <!-- <div class="flex justify-center md:py-10">
          <q-avatar size="100px" font-size="52px" color="teal" text-color="white" icon="account_circle" />
        </div> -->
        <span class="text-xl py-5 text-center">Invite new user</span>
        <q-card-section class="grid md:grid-cols-2 grid-cols-1 gap-5">
          <q-input outlined v-model="userRegister.first_name" label="First Name" bg-color="white" :dense="true" />
          <q-input outlined v-model="userRegister.last_name" label="Last Name" bg-color="white" :dense="true" />
          <q-input outlined v-model="userRegister.email" label="Email" :dense="true">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
          <q-input outlined v-model="userRegister.phone_number" label="Phone Number" :dense="true">
            <template v-slot:prepend>
              <q-icon name="phone" />
            </template>
          </q-input>
          <q-input outlined v-model="userRegister.designation" label="Designation" bg-color="white" :dense="true" />
          <q-select class="bg-white" outlined v-model="userRegister.role" :options="rbacStore.getAllRoles" :dense="true"
            label="Select role" />
          <!-- <q-select class="bg-white" outlined v-model="userRegister.user_type" :options="['EMPLOYEE', 'CLIENT', 'VENDOR']"
            :dense="true" label="User type" /> -->
          <q-input outlined v-model="userRegister.salary" label="Salary" bg-color="white" :dense="true" />
          <!-- <q-btn label="Save" color="green" class="col" /> -->
        </q-card-section>
        <q-card-actions align="center" class="row mx-2 py-5">
          <q-btn label="Create" color="green" :loading="btnLoaders.create_btn" class="col" @click="registerUser()" />
          <q-btn label="Cancel" color="negative" class="col" @click="confirm = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="userUpdateDialog" class="" persistent>
      <q-card class="my-card p-10" style="width: 1020px; max-width: 80vw">
        <div class="flex justify-center py-10">
          <AvatarUploader :image="updateCandidate.profile_img" @imageSelected="onImageUpload" />
        </div>
        <q-card-section class="grid grid-cols-2 gap-5">
          <q-input outlined v-model="updateCandidate.first_name" label="First Name" bg-color="white" :dense="true" />
          <q-input outlined v-model="updateCandidate.last_name" label="Last Name" bg-color="white" :dense="true" />
          <q-input outlined v-model="updateCandidate.email" label="Email" :dense="true">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
          <q-input outlined v-model="updateCandidate.phone_number" label="Phone Number" :dense="true">
            <template v-slot:prepend>
              <q-icon name="phone" />
            </template>
          </q-input>
          <q-input outlined v-model="updateCandidate.designation" label="Designation" bg-color="white" :dense="true" />
          <q-input outlined v-model="updateCandidate.salary" label="Salary" bg-color="white" :dense="true" />
          <q-select class="bg-white" outlined v-model="updateCandidate.role" :options="rbacStore.getAllRoles"
            :dense="true" label="Select role" />
        </q-card-section>
        <q-card-actions align="center" class="row mx-2 py-5">
          <q-btn label="Update" :loading="btnLoaders.update_btn" color="green" class="col" @click="updateUserInfo()" />
          <q-btn label="Cancel" color="negative" class="col" @click="userUpdateDialog = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </main>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useUserStore } from "../../stores/user.store";
import { useRbacStore } from "../../stores/rbac.store";
import { useQuasar } from "quasar";
import { ApiService } from 'src/service/api-service';
import { useAuthStore } from 'src/stores/auth.store';
import AvatarUploader from "src/components/AvatarUploader.vue";
import moment from 'moment';
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
    name: "phone_number",
    align: "left",
    label: "Phone",
    field: "phone_number",
    sortable: true,
  },
  {
    name: "createdAt",
    align: "left",
    label: "Created",
    field: "createdAt",
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
  components: {
    AvatarUploader
  },
  setup() {
    const apiSerivce = new ApiService();
    const userStore = useUserStore();
    const rbacStore = useRbacStore();
    const authStore = useAuthStore();
    const $q = useQuasar();

    const btnLoaders = ref({
      create_btn: false,
      update_btn: false,
      status_btn: false,
    });

    const userUpdateDialog = ref(false);
    const updateCandidate = ref({});
    const updateCandidateFormData = new FormData();

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

      const response = await apiSerivce.get('/users', {
        params: {
          page: page,
          limit: rowsPerPage,
          user_type: 'EMPLOYEE'
        }
      });
      // clear out existing data and add new
      rows.value.splice(0, rows.value.length, ...response.data.data)
      pagination.value.rowsNumber = response.data.total
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
        btnLoaders.value.create_btn = true;
        await userStore.userInvite({
          ...userRegister,
          role: userRegister.role.value,
          user_type: "EMPLOYEE",
          type: "new"
        });
        btnLoaders.value.create_btn = false;
        tableRef.value.requestServerInteraction();
        Object.keys(userRegister).forEach((key) => {
          userRegister[ key ] = null;
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

    function openUserUpdateDialog(user) {
      Object.assign(updateCandidate.value, user);
      updateCandidate.value.role = rbacStore.getAllRoles.find(role => role.value === user.role._id);
      userUpdateDialog.value = true;
    }

    async function toggleUserStatus(user) {
      try {
        const status = user.status === 'BLOCKED' ? 'ACTIVE' : "BLOCKED";
        await apiSerivce.put(`/users/status/${user._id}`, {
          status
        });
        tableRef.value.requestServerInteraction();
        $q.notify({
          message: "User status updated",
          color: "positive",
          position: "top",
        });

      } catch (error) {
        $q.notify({
          message: error.response ? error.response.data.message : error.message,
          color: "negative",
          position: "top",
        });
      }
    }

    function deleteUser(id) {
      $q.dialog({
        title: 'Delete User Record',
        message: 'Are you sure you want to delete this user record?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        apiSerivce.delete(`/users/${id}`).then(() => {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            position: "top",
            icon: 'cloud_done',
            message: 'user record deleted successfully'
          })
          tableRef.value.requestServerInteraction();
        }).catch(err => {
          $q.notify({
            color: 'red-4',
            textColor: 'white',
            position: "top",
            icon: 'error',
            message: err.response ? err.response.data.message : 'An error occured'
          })
        })
      })
    }

    async function updateUserInfo() {
      try {
        btnLoaders.value.update_btn = true;

        Object.keys(updateCandidate.value).forEach(key => {
          if (key === 'role') {
            updateCandidateFormData.append(key, updateCandidate.value[ key ].value);
          } else updateCandidateFormData.append(key, updateCandidate.value[ key ]);
        });

        await apiSerivce.put(`/users/${updateCandidate.value._id}`, updateCandidateFormData);
        btnLoaders.value.update_btn = false;
        userUpdateDialog.value = false;
        tableRef.value.requestServerInteraction();
        $q.notify({
          message: "User updated",
          color: "positive",
          position: "top",
        });
      } catch (error) {
        $q.notify({
          message: error.response ? error.response.data.message : error.message,
          color: "negative",
          position: "top",
        });
      }
    }

    function onImageUpload(file) {
      updateCandidateFormData.append('avatar', file);
    }


    return {
      moment,
      rbacStore,
      registerUser,
      userRegister,
      rows,
      columns,
      confirm,
      model: ref(null),
      name: ref(null),
      designation: ref(null),
      val: ref(true),
      tableRef,
      pagination,
      loading,
      onClick: () => false,
      onRequest,
      userUpdateDialog,
      updateCandidate,
      openUserUpdateDialog,
      updateUserInfo,
      btnLoaders,
      toggleUserStatus,
      deleteUser,
      authStore,
      onImageUpload
    };
  },
};
</script>

<style lang="scss" scoped></style>
