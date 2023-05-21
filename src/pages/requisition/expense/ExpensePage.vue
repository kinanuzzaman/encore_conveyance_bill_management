<template>
  <!-- class="bg-[url('../assets/home/bg.png')] bg-no-repeat bg-cover" -->
  <main>
    <!-- Section Name  style="font-family: 'Roboto Slab', 'serif'"-->
    <section class="mx-4 my-6 flex justify-between">
      <div class="text-2xl font-semibold">Expense</div>

      <div class="flex md:gap-x-5 gap-1 justify-items-end">
        <div> <q-btn-dropdown outline rounded label="Action" icon="edit">
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
        </div>
        <div> <q-btn outline rounded to="/expense/add-expense" label="Add Expense" no-caps />

        </div>
      </div>
    </section>
    <!-- Table -->
    <!-- grid md:grid-cols-3 grid-cols-1 -->
    <div class="">
      <section class="">
        <div class="q-px-md gt-sm">
          <!-- bordered  style="background-color: #f1f1f1" -->
          <q-table flat class="h-[85vh]" :rows="rows" @request="onRequest" :columns="columns" ref="tableRef"
            v-model:pagination="pagination" :loading="loading" style="background: rgba(244, 244, 244, 0.8)"
            :selected-rows-label="getSelectedString" selection="multiple" v-model:selected="selected" row-key="name">
            <template v-slot:body="props">
              <q-tr class="" :props="props">
                <q-td>
                  <q-checkbox left-label v-model="props.selected" />
                </q-td>
                <q-td>

                  <div>
                    <div class="text-xs">{{ props.row.request_type }}</div>
                  </div>

                </q-td>
                <q-td>
                  <div>
                    <div class="text-xs">{{ props.row.amount }}</div>
                  </div>
                </q-td>
                <q-td>
                  <div>
                    <div class="text-xs">{{ props.row.payee?.first_name + ' ' + props.row.payee?.last_name }}</div>
                  </div>
                </q-td>
                <q-td>
                  <div>
                    <div class="text-xs">{{ props.row.created }}</div>
                  </div>
                </q-td>
                <q-td>
                  {{ props.row.location }}
                </q-td>
                <q-td>
                  {{ props.row.status }}
                </q-td>
                <q-td>
                  <div class="bg-blue-200 inline p-2 text-blue-800">
                    {{ props.row.approvedBy ? props.row.approvedBy.first_name + ' ' + props.row.approvedBy.last_name :
                      'N/A' }}
                  </div>
                </q-td>
                <q-td>
                  <div class="column items-end">
                    <q-btn flat icon="more_vert">
                      <q-menu anchor="top middle" self="top right">
                        <q-item clickable @click="$router.push(`/expense/add-expense/?id=${props.row._id}`)">
                          <q-item-section>Details</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>Delete</q-item-section>
                        </q-item>
                        <q-item clickable @click="approval = true">
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
                          <q-item clickable @click="$router.push(`/expense/add-expense/?id=${props.row._id}`)">
                            <q-item-section>Details</q-item-section>
                          </q-item>
                          <q-item clickable>
                            <q-item-section>Delete</q-item-section>
                          </q-item>
                          <q-item clickable @click="approval = true">
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
                        <q-item-label caption>{{ col.value }}</q-item-label>
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
      <approval-process />
    </q-dialog>
  </main>
</template>

<script>
import { ref, onMounted } from "vue";
import { ApiService } from 'src/service/api-service';
import ApprovalProcess from "src/components/ApprovalProcess.vue";
// import { useQuasar } from 'quasar';

const columns = [
  {
    name: "request_type",
    required: true,
    label: "Expense Type",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "amount",
    align: "left",
    label: "Amount",
    field: "amount",
    sortable: true,
  },
  {
    name: "paid",
    align: "left",
    label: "Paid By",
    field: "paid",
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
    name: "location",
    align: "left",
    label: "Location",
    field: "location",
  },
  {
    name: "status",
    align: "left",
    label: "Status",
    field: "status",
    sortable: true,
  },
  {
    name: "approvals",
    align: "left",
    label: "Approvals",
    field: "approvals",
  },
  {
    name: "action",
    label: "Action",
    field: "action",
  },
];

// const rows = [
//   {
//     name: "Frozen Yogurt",
//     designation: "Manager",
//     email: "demo@email.com",
//     phone: "1234567890",
//     created: "12 March 2023",
//     role: "Manager Author Connect",
//     status: "Active",
//   },
//   {
//     name: "Frozen",
//     designation: "Manager",
//     email: "demo@email.com",
//     phone: "1234567890",
//     created: "12 March 2023",
//     role: "Manager Author Connect",
//     status: "Active",
//   },
//   {
//     name: "Yogurt",
//     designation: "Manager",
//     email: "demo@email.com",
//     phone: "1234567890",
//     created: "12 March 2023",
//     role: "Manager Author Connect",
//     status: "Active",
//   },
// ];
export default {
  setup() {
    const selected = ref([]);
    const apiSerice = new ApiService();
    // const $q = useQuasar();
    // const exponces = ref([])
    const tableRef = ref();
    const rows = ref([]);
    const loading = ref(false);
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
    });
    async function onRequest(props) {
      const { page, rowsPerPage } = props.pagination;
      loading.value = true;
      const response = await apiSerice.get("/expense-control");
      const result = response.data;
      console.log("🚀 ~ file: ExpensePage.vue:270 ~ onRequest ~ data:", result.data);
      // clear out existing data and add new
      rows.value.splice(0, rows.value.length, ...result.data);
      pagination.value.rowsNumber = result.total;
      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
      loading.value = false;
    }
    onMounted(() => {
      tableRef.value.requestServerInteraction();
    });
    return {
      approval: ref(false),
      tableRef,
      pagination,
      loading,
      onRequest,
      selected,
      columns,
      rows,
      model: ref(null),
      name: ref(null),
      designation: ref(null),
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      val: ref(true),
      getSelectedString() {
        return selected.value.length === 0 ? "" : `${selected.value.length} record${selected.value.length > 1 ? "s" : ""} selected of ${rows.value.length}`;
      },
    };
  },
  components: { ApprovalProcess }
};
</script>

<style lang="scss" scoped>
.q-th {
  background-color: #00b4ff;
}
</style>
