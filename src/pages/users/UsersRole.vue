<template>
  <main>
    <section class="mx-4 py-6 flex justify-between">
      <div class="text-2xl font-semibold">User Role</div>

      <div>
        <q-btn v-if="authStore.canAccess('role_create')" color="orange" @click="createModal = true" class="rounded-lg"
          unelevated icon="add" label="Create Role" />
      </div>
    </section>
    <div class="">
      <section class="">
        <div class="q-px-md gt-sm">
          <q-table flat class="h-[85vh]" :rows="rbacStore.roles" :loading="loading" :columns="columns"
            style="background: rgba(244, 244, 244, 0.8)">
            <template v-slot:body="props">
              <q-tr class="" :props="props">
                <q-td>
                  <div class="bg-blue-200 inline p-2 text-blue-800">
                    {{ props.row.role_name }}
                  </div>
                </q-td>
                <q-td>
                  <div>
                    <div class="text-xs">{{ props.row.role_description }}</div>
                  </div>
                </q-td>
                <q-td>
                  {{ props.row.permissions.length }}
                </q-td>
                <q-td>
                  <div class="column items-end">
                    <q-fab square flat padding="none" text-color="black" icon="add" direction="left"
                      class="border border-black">
                      <q-fab-action flat v-if="authStore.canAccess('role_write') && authStore.canAccess('access_control')"
                        @click="$router.push(`role/permission-table/${props.row._id}`)" icon="settings"
                        class="bg-transparent shadow-none text-blue-500">
                        <q-tooltip class="bg-blue-6 text-xs" anchor="top middle" self="center middle" :offset="[10, 10]">
                          Manage Permissions
                        </q-tooltip>
                      </q-fab-action>
                      <q-fab-action flat v-if="authStore.canAccess('role_write')" @click="deleteRole(props.row._id)"
                        icon="delete" class="bg-transparent shadow-none text-gray-700">
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
          <q-table :rows="rbacStore.roles" :columns="columns" row-key="name" selection="multiple"
            v-model:selected="selected" :filter="filter" grid hide-header>
            <template v-slot:item="props">
              <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
                <q-card bordered flat>
                  <q-card-section class="flex justify-between items-center bg-green text-white">
                    <span class="text-lg font-bold">{{ props.row.role_name }}</span>
                    <div class="column items-end">

                      <q-fab square flat padding="none" text-color="white" icon="add" direction="left"
                        class="border border-white">
                        <q-fab-action flat @click="$router.push(`role/permission-table/${props.row._id}`)" icon="settings"
                          class="bg-transparent shadow-none text-white">
                          <q-tooltip class="bg-blue-6 text-xs" anchor="top middle" self="center middle"
                            :offset="[10, 10]">
                            Manage Permissions
                          </q-tooltip>
                        </q-fab-action>
                        <q-fab-action flat icon="delete" @click="deleteRole(props.row._id)"
                          class="bg-transparent shadow-none text-red-600">
                          <q-tooltip class="bg-blue-6 text-xs" anchor="top middle" self="center middle"
                            :offset="[10, 10]">
                            Delete
                          </q-tooltip>
                        </q-fab-action>
                      </q-fab>
                    </div>
                  </q-card-section>
                  <q-separator />
                  <q-card class="w-full h-full">
                    <q-card-section>
                      <div class="flex flex-col gap-3">
                        <div class="block gap-2 items-center">
                          <span class="text-gray-600 pr-2">Description: </span>
                          <span class="font-bold">{{ props.row.role_description }}</span>
                        </div>
                        <q-separator />
                        <div class="block gap-2 items-center">
                          <span class="text-gray-600 pr-2">Permissions Assigned: </span>
                          <span class="font-bold">{{ props.row.permissions.length }}</span>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-card>
              </div>
            </template>

          </q-table>
        </div>
      </section>
    </div>

    <q-dialog v-model="createModal" class="" persistent>
      <q-card class="my-card p-10" style="width: 800px; max-width: 80vw">
        <q-card-section class="text-h6">Create New Role</q-card-section>
        <q-card-section class="flex flex-col gap-5">
          <q-input outlined v-model="role_modal.role_name" placeholder="Role Name" bg-color="white" :dense="true" />
          <q-input outlined v-model="role_modal.role_description" placeholder="Description" bg-color="white"
            :dense="true" />

        </q-card-section>
        <q-card-actions align="center" class="row mx-2 py-5">
          <q-btn label="Create" color="green" :loading="btnLoading" class="col" @click="createRole()" />
          <q-btn label="Cancel" color="negative" class="col" @click="createModal = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>


  </main>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
// import { useUserStore } from "../../stores/user.store";
import { useRbacStore } from "../../stores/rbac.store";
import { useQuasar } from "quasar";
import { ApiService } from 'src/service/api-service';
import { useAuthStore } from "src/stores/auth.store";
const columns = [
  {
    name: "role",
    required: true,
    label: "Role",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "createdAt",
    align: "left",
    label: "Description",
    field: "createdAt",
    sortable: true,
  },
  {
    name: "permissions",
    align: "left",
    label: "Permissions Assigned",
    field: "permissions",
    sortable: true,
  },
  {
    name: "action",
    label: "Action",
    field: "action",
  },
];

const apiSerivce = new ApiService();
const rbacStore = useRbacStore();
const $q = useQuasar();
const authStore = useAuthStore();

const btnLoading = ref(false);

let createModal = ref(false);
const role_modal = reactive({
  role_name: null,
  role_description: null,
  permissions: []
});

const loading = ref(false)

onMounted(() => {
  rbacStore.fetchAllRoles()
});

const createRole = async () => {
  try {
    btnLoading.value = true;
    await apiSerivce.post("/rbac/roles", role_modal);
    $q.notify({
      message: "Role created",
      color: "positive",
      position: "top",
    });
    rbacStore.fetchAllRoles()
    btnLoading.value = false;
    createModal.value = false;
  } catch (error) {
    $q.notify({
      message: error.response ? error.response.data.message : error.message,
      color: "negative",
      position: "top",
    });
  }
};


function deleteRole(id) {
  $q.dialog({
    title: 'Delete Project Record',
    message: 'Are you sure you want to delete this project record?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    apiSerivce.delete(`/rbac/roles/${id}`).then(() => {
      $q.notify({
        color: 'green-4',
        position: "top",
        icon: 'cloud_done',
        message: 'role record deleted successfully'
      })
      rbacStore.fetchAllRoles()
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

</script>

<style lang="scss" scoped></style>
