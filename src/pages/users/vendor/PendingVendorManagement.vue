<template>
  <!-- class="bg-[url('../assets/home/bg.png')] bg-no-repeat bg-cover" -->
  <main>
    <!-- Section Name  style="font-family: 'Roboto Slab', 'serif'"-->
    <section class="mx-4 py-6 flex">
      <q-btn flat color="green" icon="arrow_back" no-caps @click="$router.back()" />
      <div class="md:text-2xl text-xl font-semibold">Pending Vendor Management</div>
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
                <q-td key="user" :props="props" @click="openDialog = true" class="">
                  <div class="tw-py-1 tw-rounded-md">
                    <div class="flex gap-2">
                      <span class="text-xs">{{ props.row.first_name }} {{ props.row.last_name }}</span>
                    </div>
                  </div>
                </q-td>
                <q-td key="creator" :props="props" class="">
                  <div>
                    <div class="text-xs">{{ props.row.created_by.first_name + ' ' + props.row.created_by.last_name }}
                    </div>
                  </div>
                </q-td>
                <q-td key="user_type" :props="props" @click="openDialog = true" class="">
                  {{ props.row.user_type }}
                </q-td>
                <q-td key="createdAt" :props="props" @click="openDialog = true" class="">
                  <div class="bg-blue-200 inline p-2 text-blue-800">
                    {{ moment(props.row.createdAt).format("LL | h:mma") }}
                  </div>
                </q-td>
                <q-td key="action">
                  <div class="column items-end">
                    <q-fab square flat padding="none" text-color="black" icon="add" direction="left"
                      class="border border-black">
                      <q-fab-action flat v-if="authStore.canAccess('user_create')"
                        @click="openUserUpdateDialog(props.row)" icon="person_add"
                        class="bg-transparent shadow-none text-blue-500">
                        <q-tooltip class="bg-blue-6 text-xs" anchor="top middle" self="center middle" :offset="[10, 10]">
                          Invite
                        </q-tooltip>
                      </q-fab-action>

                      <q-fab-action v-if="authStore.canAccess('user_create')" @click="deleteUser(props.row._id)" flat
                        icon="delete" class="bg-transparent shadow-none text-red-700">
                        <q-tooltip class="bg-blue-6 text-xs" anchor="top middle" self="center middle" :offset="[10, 10]">
                          Delete
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
          <q-table :rows="rows" :columns="columns" row-key="name" selection="multiple" v-model:selected="selected"
            :filter="filter" grid hide-header>
            <template v-slot:item="props">
              <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                :style="props.selected ? 'transform: scale(0.95);' : ''">
                <q-card bordered flat :class="props.selected ? ($q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2') : ''">
                  <q-card-section class="flex justify-between bg-green text-white">
                    <q-checkbox dense v-model="props.selected" :label="props.row.name" color="white" keep-color />
                    <div class="column items-end">
                      <q-btn flat icon="more_vert">
                        <q-menu anchor="top middle" self="top right">
                          <q-item clickable v-if="authStore.canAccess('user_create')"
                            @click="openUserUpdateDialog(props.row)">
                            <q-item-section>Invite</q-item-section>
                          </q-item>
                          <q-item clickable v-if="authStore.canAccess('user_create')" @click="deleteUser(props.row._id)">
                            <q-item-section>Delete</q-item-section>
                          </q-item>
                        </q-menu>
                      </q-btn>
                    </div>
                  </q-card-section>
                  <q-separator />
                  <q-list dense>
                    <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                      <q-item-section>
                        <q-item-label v-if="col.label != 'Action'">{{ col.label }}</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label caption v-if="col.label == 'Role'">{{ col.value?.role_name }}</q-item-label>
                        <q-item-label caption v-else>{{ col.value }}</q-item-label>
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

    <q-dialog v-model="userUpdateDialog" class="" persistent>
      <q-card class="my-card p-10" style="width: 1020px; max-width: 80vw">
        <q-card-section class="grid grid-cols-2 gap-5">
          <q-input outlined v-model="updateCandidate.first_name" placeholder="First Name" bg-color="white"
            :dense="true" />
          <q-input outlined v-model="updateCandidate.last_name" placeholder="Last Name" bg-color="white" :dense="true" />
          <q-input outlined v-model="updateCandidate.email" placeholder="Email" :dense="true">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
          <q-input outlined v-model="updateCandidate.phone_number" placeholder="Phone Number" :dense="true">
            <template v-slot:prepend>
              <q-icon name="phone" />
            </template>
          </q-input>
          <!-- <q-input outlined v-model="updateCandidate.designation" placeholder="Designation" bg-color="white"
            :dense="true" /> -->
          <!-- <q-input outlined v-model="updateCandidate.salary" placeholder="Salary" bg-color="white" :dense="true" /> -->
          <!-- <q-btn label="Save" color="green" class="col" /> -->
        </q-card-section>
        <q-card-actions align="center" class="row mx-2 py-5">
          <q-btn label="Invite" color="green" class="col" @click="updateUserInfo()" />
          <q-btn label="Cancel" color="negative" class="col" @click="userUpdateDialog = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </main>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useUserStore } from "src/stores/user.store";
import { useRbacStore } from "src/stores/rbac.store";
import { useQuasar } from "quasar";
import { ApiService } from 'src/service/api-service';
import moment from 'moment';
import { useAuthStore } from 'src/stores/auth.store';
const columns = [
  {
    name: "user",
    required: true,
    label: "User",
    align: "left",
    field: "user",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "creator",
    align: "left",
    label: "Creator",
    field: "creator",
    sortable: true,
  },
  {
    name: "user_type",
    align: "left",
    label: "User Type",
    field: "user_type",
    sortable: true,
  },
  {
    name: "createdAt",
    align: "left",
    label: "Created At",
    field: "createdAt",
    sortable: true,
  },
  {
    name: "action",
    label: "Action",
    field: "action",
  },
];


export default {
  setup() {
    const apiSerivce = new ApiService();
    const userStore = useUserStore();
    const rbacStore = useRbacStore();
    const authStore = useAuthStore();
    const $q = useQuasar();

    const userUpdateDialog = ref(false);
    const updateCandidate = ref({});

    let confirm = ref(false);
    const userRegister = reactive({
      first_name: null,
      last_name: null,
      email: null,
      phone_number: null,
      // designation: null,
      // salary: null,
      // user_type: null,
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
          inCompleted: true,
          page: page,
          limit: rowsPerPage,
          user_type: 'VENDOR'
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
        await userStore.userInvite({
          ...userRegister,
          role: userRegister.role.value,
        });
        $q.notify({
          message: "Vendor User created",
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
      userUpdateDialog.value = true;
    }

    async function updateUserInfo() {
      try {
        await userStore.userInvite({
          ...updateCandidate.value,
          role: updateCandidate.value.role.value,
          type: "recorded",
        });
        $q.notify({
          message: "Vendor User updated",
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

    async function deleteUser(id) {
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
            message: 'Vendor user record deleted successfully'
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

    return {
      rbacStore,
      moment,
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
      deleteUser,
      authStore
    };
  },
};
</script>

<style lang="scss" scoped></style>
