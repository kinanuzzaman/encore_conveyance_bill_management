<template>
  <section class="mx-4 my-6 flex justify-between">
    <div class="text-2xl font-semibold">Projects</div>
    <div class="flex md:gap-x-5 gap-1 justify-items-end">

      <div> <q-btn v-if="authStore.canAccess('project_create')" outline rounded to="/projects/add-project"
          label="Add project" no-caps />

      </div>
    </div>
  </section>
  <section>
    <div class="q-px-md gt-sm">
      <q-table flat class="h-[85vh]" ref="tableRef" @request="onRequest" :rows="rows" :columns="columns"
        style="background: rgba(244, 244, 244, 0.8)" :selected-rows-label="getSelectedString" selection="multiple"
        v-model:selected="selected" row-key="name">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td>
              <q-checkbox v-model="props.selected" />
            </q-td>
            <q-td class="">
              <div>
                <div class="text-xs">{{ props.row.title }}</div>
              </div>
            </q-td>
            <q-td class="">
              <div class="text-xs">{{ props.row.type || '-' }}</div>
            </q-td>
            <q-td class="">
              <div class="text-xs">{{ props.row.description || '-' }}</div>
            </q-td>
            <q-td class="">
              <div>
                <div class="text-xs">{{ props.row.address || '-' }}</div>
              </div>
            </q-td>
            <q-td class="">
              <div>
                <div class="text-xs">{{ props.row.budget || '-' }}</div>
              </div>
            </q-td>
            <q-td class="">
              <div>
                <div class="text-xs">{{ props.row.total_expenses || '-' }}</div>
              </div>
            </q-td>
            <q-td class="">
              {{ props.row.status }}
            </q-td>
            <q-td class="">
              {{ props.row.createdBy ? props.row.createdBy.first_name + ' ' + props.row.createdBy.last_name : '-' }}
            </q-td>
            <q-td class="">
              {{ props.row.vendor ? props.row.vendor.first_name + ' ' + props.row.vendor.last_name : '-' }}
            </q-td>
            <q-td class="">
              {{ props.row.client ? props.row.client.first_name + ' ' + props.row.client.last_name : '-' }}
            </q-td>
            <q-td>
              <div class="bg-blue-200 inline p-2 text-blue-800">
                {{ props.row.approvedBy?.filter(e => Object.hasOwn(e, 'changed') && !e.changed).length }}
              </div>
            </q-td>
            <q-td>
              <div class="bg-red-200 inline p-2 text-red-800">
                {{ props.row.rejectedBy?.filter(e => Object.hasOwn(e, 'changed') && !e.changed).length }}
              </div>
            </q-td>
            <q-td>
              <div class="column items-end">
                <q-btn flat icon="more_vert">
                  <q-menu anchor="top middle" self="top right">
                    <q-item clickable @click="$router.push(`/projects/add-project/?id=${props.row._id}`)">
                      <q-item-section>Details</q-item-section>
                    </q-item>
                    <q-item clickable v-if="authStore.canAccess('project_write')" @click="deleteProject(props.row._id)">
                      <q-item-section>Delete</q-item-section>
                    </q-item>
                    <q-item clickable v-if="authStore.canAccess('project_write') || authStore.canAccess('project_read')"
                      @click="openStatusUpdateWindow(props.row)">
                      <q-item-section>Update Status</q-item-section>
                    </q-item>
                  </q-menu>
                </q-btn>
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
        <!-- <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template> -->

        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
            :style="props.selected ? 'transform: scale(0.95);' : ''">
            <q-card bordered flat :class="props.selected ? ($q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2') : ''">
              <q-card-section class="flex justify-between">
                <q-checkbox dense v-model="props.selected" :label="props.row.name" />
                <div class="column items-end">
                  <q-btn flat icon="more_vert">
                    <q-menu anchor="top middle" self="top right">
                      <q-item clickable @click="$router.push(`/projects/add-project/?id=${props.row._id}`)">
                        <q-item-section>Details</q-item-section>
                      </q-item>
                      <q-item clickable v-if="authStore.canAccess('project_write')" @click="deleteProject(props.row._id)">
                        <q-item-section>Delete</q-item-section>
                      </q-item>
                      <q-item clickable v-if="authStore.canAccess('project_write') || authStore.canAccess('project_read')"
                        @click="openStatusUpdateWindow(props.row)">
                        <q-item-section>Update Status</q-item-section>
                      </q-item>
                    </q-menu>
                  </q-btn>
                </div>
              </q-card-section>
              <q-separator />
              <q-list dense>
                <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                  <q-item-section>
                    <q-item-label caption v-if="col.label != 'Action'">{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side class="text-black">
                    <q-item-label v-if="col.label == 'Project Title'">{{ props.row.title }}</q-item-label>
                    <q-item-label v-else-if="col.label == 'Type'">{{ props.row.type }}</q-item-label>
                    <q-item-label v-else-if="col.label == 'Description'">{{ props.row.description }}</q-item-label>
                    <q-item-label v-else-if="col.label == 'Address'">{{ props.row.address }}</q-item-label>
                    <q-item-label v-else-if="col.label == 'Budget'">{{ props.row.budget }}</q-item-label>
                    <q-item-label v-else-if="col.label == 'Total Expenses'">{{ props.row.total_expenses }}</q-item-label>
                    <q-item-label v-else-if="col.label == 'Status'">{{ props.row.status }}</q-item-label>
                    <q-item-label v-else-if="col.label == 'Creator'">{{ props.row.createdBy?.first_name + ' ' +
                      props.row.createdBy?.last_name
                    }}</q-item-label>
                    <q-item-label v-else-if="col.label == 'Vendor Name'">{{ props.row.vendor ? props.row.vendor.first_name
                      + ' ' + props.row.vendor.last_name : '-' }}</q-item-label>
                    <q-item-label v-else-if="col.label == 'Client Name'"> {{ props.row.client ?
                      props.row.client.first_name + ' ' + props.row.client.last_name : '-' }}</q-item-label>
                    <q-item-label v-else-if="col.label == 'Approvals'">
                      <div class="bg-blue-200 inline p-1 text-blue-800">
                        {{ props.row.approvedBy?.filter(e => Object.hasOwn(e, 'changed') && !e.changed).length }}
                      </div>
                    </q-item-label>
                    <q-item-label v-else-if="col.label == 'Rejection'">
                      <div class="bg-red-200 inline p-1 text-red-800">
                        {{ props.row.rejectedBy?.filter(e => Object.hasOwn(e, 'changed') && !e.changed).length }}
                      </div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </template>

      </q-table>
    </div>
    <q-dialog v-model="approval" persistent>
      <approval-process :data="approvalCandidate" req_type="project" user_type="createdBy" @close="closeStatusWindow" />
    </q-dialog>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import { ApiService } from 'src/service/api-service';
import ApprovalProcess from "src/components/ApprovalProcess.vue";
// import moment from "moment";
import { useQuasar } from 'quasar';
import { useAuthStore } from "src/stores/auth.store"
const columns = [
  {
    name: "title",
    required: true,
    label: "Project Title",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "type",
    align: "left",
    label: "Type",
    field: "type",
    sortable: true,
  },
  {
    name: "description",
    align: "left",
    label: "Description",
    field: "description",
    sortable: true,
  },
  {
    name: "address",
    align: "left",
    label: "Address",
    field: "address",
    sortable: true,
  },
  {
    name: "budget",
    align: "left",
    label: "Budget",
    field: "budget",
    sortable: true,
  },
  {
    name: "expenses",
    align: "left",
    label: "Total Expenses",
    field: "expenses",
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
    name: "createdBy",
    align: "left",
    label: "Creator",
    field: "createdBy",
    sortable: true,
  },
  {
    name: "vendor",
    align: "left",
    label: "Vendor Name",
    field: "vendor",
    sortable: true,
  },
  {
    name: "client",
    align: "left",
    label: "Client Name",
    field: "client",
    sortable: true,
  },
  {
    name: "approvals",
    align: "left",
    label: "Approvals",
    field: "approvals",
  },
  {
    name: "rejection",
    align: "left",
    label: "Rejection",
    field: "rejection",
  },
  {
    name: "action",
    label: "Action",
    field: "action",
  },
]

export default {
  components: {
    ApprovalProcess
  },
  setup() {
    const selected = ref([]);
    const apiSerivce = new ApiService();
    const $q = useQuasar();
    const authStore = useAuthStore();
    const tableRef = ref();
    const rows = ref([]);
    const approvalCandidate = ref(null);
    const approval = ref(false)
    const loading = ref(false);
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
    });
    async function onRequest(props) {
      const { page, rowsPerPage } = props.pagination;
      loading.value = true;
      const response = await apiSerivce.get("/project-control", {
        params: {
          page: page,
          limit: rowsPerPage,
        }
      });
      const result = response.data;
      console.log("🚀 ~ file: ExpensePage.vue:270 ~ onRequest ~ data:", result.data);
      // clear out existing data and add new
      rows.value.splice(0, rows.value.length, ...result.data);
      console.log("🚀 ~ file: AllProjects.vue:292 ~ onRequest ~ rows.value.:", rows.value)
      pagination.value.rowsNumber = result.total;
      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
      loading.value = false;
    }
    onMounted(() => {
      tableRef.value.requestServerInteraction();
    });

    function openStatusUpdateWindow(data) {
      approvalCandidate.value = data;
      approval.value = true;
    }
    function closeStatusWindow() {
      approval.value = false;
      tableRef.value.requestServerInteraction();
    }
    function deleteProject(id) {
      $q.dialog({
        title: 'Delete Project Record',
        message: 'Are you sure you want to delete this project record?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        apiSerivce.delete(`/project-control/${id}`).then(() => {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            position: "top",
            icon: 'cloud_done',
            message: 'project record deleted successfully'
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
      columns,
      rows,
      selected,
      pagination,
      loading,
      tableRef,
      onRequest,
      approvalCandidate,
      approval,
      openStatusUpdateWindow,
      closeStatusWindow,
      deleteProject,
      authStore
    };
  },



};
</script>
