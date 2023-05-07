<template>
    <!-- class="bg-[url('../assets/home/bg.png')] bg-no-repeat bg-cover" -->
    <main>
        <!-- Section Name  style="font-family: 'Roboto Slab', 'serif'"-->
        <section class="mx-4 py-6 flex justify-between">
            <div class="text-2xl font-semibold">User Role</div>

            <div>
                <q-btn color="orange" @click="confirm = true" class="rounded-lg" unelevated icon="add"
                    label="Create Role" />
            </div>
        </section>
        <!-- Table -->
        <!-- grid md:grid-cols-3 grid-cols-1 -->
        <div class="">
            <section class="">
                <div class="q-px-md gt-sm">
                    <!-- bordered  style="background-color: #f1f1f1" -->
                    <q-table flat class="h-[85vh]" :rows="rows" ref="tableRef" v-model:pagination="pagination"
                        :loading="loading" @request="onRequest" :columns="columns"
                        style="background: rgba(244, 244, 244, 0.8)">
                        <template v-slot:body="props">
                            <q-tr class="" :props="props">
                                <q-td>
                                    <div class="bg-blue-200 inline p-2 text-blue-800">
                                        {{ props.row.role }}
                                    </div>
                                </q-td>
                                <q-td>
                                    <div>
                                        <div class="text-xs">{{ props.row.createdAt }}</div>
                                    </div>
                                </q-td>
                                <q-td>
                                    {{ props.row.status }}
                                </q-td>
                                <q-td>
                                    {{ props.row.permissions }}
                                </q-td>
                                <q-td>
                                    <div class="column items-end">
                                        <q-fab square flat padding="none" text-color="black" icon="add" direction="left"
                                            class="border border-black">
                                            <q-fab-action flat @click="openUserUpdateDialog(props.row)" icon="edit"
                                                class="bg-transparent shadow-none text-blue-500">
                                                <q-tooltip class="bg-blue-6 text-xs" anchor="top middle"
                                                    self="center middle" :offset="[10, 10]">
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
                                            <q-fab-action flat icon="delete"
                                                class="bg-transparent shadow-none text-gray-700">
                                                <q-tooltip class="bg-blue-6 text-xs" anchor="top middle"
                                                    self="center middle" :offset="[10, 10]">
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
                                <q-card bordered flat
                                    :class="props.selected ? ($q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2') : ''">
                                    <q-card-section class="flex justify-between bg-green text-white">
                                        <q-checkbox dense v-model="props.selected" :label="props.row.name" color="white"
                                            keep-color />
                                        <div class="column items-end">
                                            <q-btn flat icon="more_vert">
                                                <q-menu anchor="top middle" self="top right">
                                                    <q-item clickable>
                                                        <q-item-section>Edit</q-item-section>
                                                    </q-item>
                                                    <q-item clickable>
                                                        <q-item-section>Delete</q-item-section>
                                                    </q-item>
                                                </q-menu>
                                            </q-btn>
                                        </div>
                                    </q-card-section>
                                    <q-separator />
                                    <q-list dense>
                                        <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')"
                                            :key="col.name">
                                            <q-item-section>
                                                <q-item-label v-if="col.label != 'Action'">{{ col.label }}</q-item-label>
                                            </q-item-section>
                                            <q-item-section side>
                                                <q-item-label caption v-if="col.label == 'Role'">{{ col.value.role_name
                                                }}</q-item-label>
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

        <q-dialog v-model="confirm" class="" persistent>
            <q-card class="my-card p-10" style="width: 1020px; max-width: 80vw">
                <div class="flex justify-center md:py-10">
                    <q-avatar size="100px" font-size="52px" color="teal" text-color="white" icon="account_circle" />
                </div>
                <q-card-section class="grid md:grid-cols-2 grid-cols-1 gap-5">
                    <q-input outlined v-model="createRole.role_name" placeholder="Role Name" bg-color="white"
                        :dense="true" />
                    <q-input outlined v-model="createRole.description" placeholder="Description" bg-color="white"
                        :dense="true" />
                    <q-select class="bg-white" outlined multiple v-model="createRole.permissions"
                        :options="['Create User', 'Delete User', 'Approvals', 'Edit User', 'See Analytics']" :dense="true"
                        label="Permission type" />
                </q-card-section>
                <q-card-actions align="center" class="row mx-2 py-5">
                    <q-btn label="Create" color="green" class="col" @click="registerUser()" />
                    <q-btn label="Cancel" color="negative" class="col" @click="confirm = false" />
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
        name: "permissions",
        align: "left",
        label: "Permissions",
        field: "permissions",
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
        const $q = useQuasar();

        const userUpdateDialog = ref(false);
        const updateCandidate = ref({});

        let confirm = ref(false);
        const createRole = reactive({
            role_name: null,
            description: null,
            permissions: null,
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

        function openUserUpdateDialog(user) {
            Object.assign(updateCandidate.value, user);
            userUpdateDialog.value = true;
        }

        async function updateUserInfo() {
            try {
                await apiSerivce.put(`/users/${updateCandidate.value._id}`, {
                    ...updateCandidate.value,
                    role: updateCandidate.value.role.value,
                });
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

        return {
            rbacStore,
            registerUser,
            createRole,
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
            updateUserInfo
        };
    },
};
</script>
  
<style lang="scss" scoped></style>
  