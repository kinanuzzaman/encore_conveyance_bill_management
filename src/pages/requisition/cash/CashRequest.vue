<template>
  <!-- class="bg-[url('../assets/home/bg.png')] bg-no-repeat bg-cover" -->
  <main>
    <!-- Section Name  style="font-family: 'Roboto Slab', 'serif'"-->
    <section class="mx-4 my-6 flex justify-between">
      <div class="text-2xl font-semibold">Cash Request</div>

      <div class="flex md:gap-x-5 gap-1 justify-items-end">
        <!-- <div> <q-btn-dropdown outline rounded label="Action" icon="edit">
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Photos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Videos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Articles</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown></div>
        <div class="md:w-[200px]">
          <q-select rounded outlined dense v-model="model" :options="options" label="Select">
            <template v-slot:prepend>
              <q-icon name="filter_alt_off" />
            </template>
          </q-select>
        </div> -->
        <div>
          <q-btn outline label="Filter" rounded>
            <q-menu max-width="500px">
              <div class="flex flex-col gap-3 w-auto q-pa-md">
                <q-toggle v-model="data_filter.own_data" label="My Request" />
                <q-select dense outlined v-model="data_filter.type" :options="cash_types" label="Type" filled />
                <SearchAddCompo :disable="data_filter.own_data" @selected="e => data_filter.employee = e" label="Employee"
                  api="users" userType="EMPLOYEE" />
                <q-separator class="mt-3" />
                <q-btn color="green" label="Apply" no-caps @click="doFilter" />
                <q-btn color="red" label="Clear" no-caps @click="clearFilter" />
              </div>
            </q-menu>
          </q-btn>
        </div>
        <div> <q-btn v-if="authStore.canAccess('cash_create')" outline rounded to="/cash/add-cash" label="Add request"
            no-caps />

        </div>
      </div>
    </section>
    <!-- Table -->
    <!-- grid md:grid-cols-3 grid-cols-1 -->
    <div class="">
      <section class="">
        <div class="q-px-md gt-sm">
          <!-- bordered  style="background-color: #f1f1f1" -->
          <q-table flat class="h-[85vh]" :rows="rows" @request="onRequest" v-model:pagination="pagination"
            :loading="loading" ref="tableRef" :columns="columns" style="background: rgba(244, 244, 244, 0.8)"
            :selected-rows-label="getSelectedString" selection="multiple" v-model:selected="selected" row-key="name">
            <template v-slot:body="props">
              <q-tr class="" :props="props">
                <q-td>

                  <q-checkbox v-model="props.selected" />
                </q-td>
                <q-td>

                  <div>
                    <div class="text-xs">{{ props.row.type }}</div>
                  </div>

                </q-td>
                <q-td>
                  <div>
                    <div class="text-xs">{{ props.row.amount }}</div>
                  </div>
                </q-td>
                <q-td>
                  <div>
                    <div class="text-xs">{{ props.row.payer?.first_name + ' ' + props.row.payer?.last_name }}</div>
                  </div>
                </q-td>
                <q-td>
                  <div>
                    <div class="text-xs">{{ props.row.payee?.first_name + ' ' + props.row.payee?.last_name }}</div>
                  </div>
                </q-td>

                <q-td v-if="authStore.getUserRoleName == 'super_admin' && props.row.creator_location">
                  <a target="_blank" class="text-blue-500"
                    :href="`https://www.google.com/maps/place/${props.row.creator_location.latitude + ',' + props.row.creator_location.longitude}`">Open
                    Map</a>
                </q-td>

                <q-td>
                  {{ moment(props.row.createdAt).format("LL | h:mma") }}
                </q-td>
                <q-td>
                  {{ props.row.status }}
                </q-td>
                <q-td>
                  <div class="bg-blue-200 inline p-2 text-blue-800">
                    {{ props.row.approvedBy.filter(e => !e.changed).length }}
                  </div>
                </q-td>
                <q-td>
                  <div class="bg-red-200 inline p-2 text-red-800">
                    {{ props.row.rejectedBy.filter(e => !e.changed).length }}
                  </div>
                </q-td>
                <q-td>
                  <div class="column items-end">
                    <q-btn flat icon="more_vert">
                      <q-menu anchor="top middle" self="top right">
                        <q-item clickable @click="$router.push(`/cash/add-cash?id=${props.row._id}`)">
                          <q-item-section>Details</q-item-section>
                        </q-item>
                        <q-item clickable v-if="authStore.canAccess('cash_write')" @click="deleteCC(props.row._id)">
                          <q-item-section>Delete</q-item-section>
                        </q-item>
                        <q-item clickable v-if="authStore.canAccess('cash_write') || authStore.canAccess('cash_read')"
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
                          <q-item clickable @click="$router.push(`/cash/add-cash?id=${props.row._id}`)">
                            <q-item-section>Details</q-item-section>
                          </q-item>
                          <q-item clickable v-if="authStore.canAccess('cash_write')" @click="deleteCC(props.row._id)">
                            <q-item-section>Delete</q-item-section>
                          </q-item>
                          <q-item clickable v-if="authStore.canAccess('cash_write') || authStore.canAccess('cash_read')"
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
                        <q-item-label v-if="col.label != 'Action'">{{ col.label }}</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label v-if="col.label == 'Request Type'">{{ props.row.type }}</q-item-label>
                        <q-item-label v-else-if="col.label == 'Amount'">{{ props.row.amount }}</q-item-label>
                        <q-item-label v-else-if="col.label == 'Paid By'">{{ props.row.payer?.first_name + ' ' +
                          props.row.payer?.last_name
                        }}</q-item-label>
                        <q-item-label v-else-if="col.label == 'User'">{{ props.row.payee?.first_name + ' ' +
                          props.row.payee?.last_name
                        }}</q-item-label>
                        <q-item-label
                          v-else-if="col.label == 'Location' && authStore.getUserRoleName == 'super_admin' && props.row.creator_location">
                          <a target="_blank" class="text-blue-500"
                            :href="`https://www.google.com/maps/place/${props.row.creator_location.latitude + ',' + props.row.creator_location.longitude}`">Open
                            Map</a></q-item-label>
                        <q-item-label v-else-if="col.label == 'Status'">{{ props.row.status }}</q-item-label>
                        <q-item-label v-else-if="col.label == 'Created On'">
                          {{ moment(props.row.createdAt).format("LL | h:mma") }}
                        </q-item-label>

                        <q-item-label v-else-if="col.label == 'Approvals'">
                          <div class="bg-blue-200 inline p-1 text-blue-800">
                            {{ props.row.approvedBy.filter(e => !e.changed).length }}
                          </div>
                        </q-item-label>
                        <q-item-label v-else-if="col.label == 'Rejection'">
                          <div class="bg-red-200 inline p-1 text-red-800">
                            {{ props.row.rejectedBy.filter(e => !e.changed).length }}
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
      </section>
    </div>

    <q-dialog v-model="approval" persistent>
      <approval-process :data="approvalCandidate" user_type="payee" @close="closeStatusWindow" />
    </q-dialog>
  </main>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import { ApiService } from 'src/service/api-service';
import ApprovalProcess from "src/components/ApprovalProcess.vue";
import { useQuasar } from "quasar";
import { useAuthStore } from "src/stores/auth.store"
import moment from "moment";
import SearchAddCompo from 'src/components/SearchAddCompo.vue';
const columns = ref([
  {
    name: "user",
    required: true,
    label: "Request Type",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "email",
    align: "left",
    label: "Amount",
    field: "email",
    sortable: true,
  },
  {
    name: "phone",
    align: "left",
    label: "Paid By",
    field: "phone",
    sortable: true,
  },
  {
    name: "created",
    align: "left",
    label: "User",
    field: "created",
    sortable: true,
  },
  {
    name: "location",
    align: "left",
    label: "Location",
    field: "location",
  },
  {
    name: "createdAt",
    align: "left",
    label: "Created On",
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
    label: "Approvals",
    field: "role",
  },
  {
    name: "role",
    align: "left",
    label: "Rejection",
    field: "role",
  },
  {
    name: "action",
    label: "Action",
    field: "action",
  },
])
const cash_types = [ {
  label: "Product Purchase",
  value: "ProductPurchase",
  type: "PRODUCT_PURCHASE",
},
{
  label: "Office",
  value: "OfficeExpense",
  type: "OFFICE",
},
{
  label: "Delivery",
  value: "DeliveryExp",
  type: "DELIVERY",
},
{
  label: "Conveyance",
  value: "ConveyanceExp",
  type: "CONVINCE",
},
{
  label: "Factory",
  value: "FactoryExp",
  type: "FACTORY",
},
{
  label: "BP",
  value: "BpExp",
  type: "BP",
},
{
  label: "Labour",
  value: "LabourExp",
  type: "LABOUR",
},
{
  label: "Marketing",
  value: "MarketingExp",
  type: "MARKETING",
},
{
  label: "Mobile Allowance",
  value: "MobileAllowance",
  type: "MOBILE_ALLOWANCE",
},
{
  label: "Salary Request",
  value: "SalaryExp",
  type: "SALARY",
},
{
  label: "Other",
  value: "OtherBill",
  type: "OTHERS",
}, ]

export default {
  components: { SearchAddCompo, ApprovalProcess },
  setup() {
    const selected = ref([]);
    const apiSerivce = new ApiService();
    const $q = useQuasar();
    // const exponces = ref([])
    const authStore = useAuthStore();
    const tableRef = ref();
    const rows = ref([]);
    const loading = ref(false);
    const approvalCandidate = ref(null);
    const approval = ref(false)
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
    });

    const data_filter = reactive({
      own_data: false,
      employee: null,
      type: null
    })

    function doFilter() {
      if (data_filter.own_data) {
        filter_values[ 'payee' ] = authStore.getUserInfo._id;
      }
      if (data_filter.employee) {
        filter_values[ 'payee' ] = data_filter.employee;
      }
      if (data_filter.type) {
        filter_values[ 'request_type' ] = data_filter.type.type;
      }
      tableRef.value.requestServerInteraction();
    }

    function clearFilter() {
      data_filter.own_data = false;
      data_filter.employee = null;
      data_filter.type = null;
      filter_values = {};
      tableRef.value.requestServerInteraction();
    }

    let filter_values = {}

    async function onRequest(props) {
      const { page, rowsPerPage } = props.pagination;
      loading.value = true;
      const response = await apiSerivce.get("/cash-control", {
        params: {
          page: page,
          limit: rowsPerPage,
          filter: filter_values
        }
      });
      const result = response.data;
      // clear out existing data and add new
      rows.value.splice(0, rows.value.length, ...result.data);
      pagination.value.rowsNumber = result.total;
      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
      loading.value = false;
    }
    onMounted(() => {
      if (authStore.getUserRoleName !== 'super_admin') {
        removeLocationColumn();
      }
      tableRef.value.requestServerInteraction();
    });

    function closeStatusWindow() {
      approval.value = false;
      tableRef.value.requestServerInteraction();
    }

    function openStatusUpdateWindow(data) {
      approvalCandidate.value = data;
      approval.value = true;
    }

    function deleteCC(id) {
      $q.dialog({
        title: 'Delete Cash Record',
        message: 'Are you sure you want to delete this cash record?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        apiSerivce.delete(`/cash-control/${id}`).then(() => {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            position: "top",
            icon: 'cloud_done',
            message: 'Cash record deleted successfully'
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

    function removeLocationColumn() {
      const locationColumnIndex = columns.value.findIndex(column => column.name === 'location');

      if (locationColumnIndex !== -1) {
        columns.value.splice(locationColumnIndex, 1);
      }
    }

    return {
      tableRef,
      moment,
      approval,
      pagination,
      loading,
      onRequest,
      selected,
      columns,
      rows,
      model: ref(null),
      name: ref(null),
      designation: ref(null),
      options: [ "Google", "Facebook", "Twitter", "Apple", "Oracle" ],
      val: ref(true),
      getSelectedString() {
        return selected.value.length === 0 ? "" : `${selected.value.length} record${selected.value.length > 1 ? "s" : ""} selected of ${rows.value.length}`;
      },
      openStatusUpdateWindow,
      approvalCandidate,
      closeStatusWindow,
      deleteCC,
      authStore,
      cash_types,
      data_filter,
      doFilter,
      clearFilter
    };
  },

};
</script>

<style lang="scss" scoped>
.q-th {
  background-color: #00b4ff;
}
</style>
