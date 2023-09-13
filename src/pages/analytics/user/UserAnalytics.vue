<template>
  <section class="mx-4 my-6 flex md:flex-row flex-col justify-between">
    <div class="text-2xl font-semibold">Users Analytics</div>

    <div class="flex md:gap-x-5 gap-1 justify-center items-center md:mt-0 mt-3">
      <!-- <div class="w-full">
        </div>
        <div class="w-full">
        </div> -->
      <div class="md:w-[150px]">
        <q-select class="w-full" outlined dense v-model="year" :options="['2023', '2024', '2025']" label="Year" filled />

      </div>
      <div class="md:w-[150px]">
        <q-select class="w-full" outlined dense v-model="month" :options="months" label="Month" filled />
      </div>
      <div>
        <q-btn color="green" unelevated no-caps label="Apply" @click="fetchAnalytics" />
      </div>
    </div>
  </section>
  <section>
    <div class="q-px-md gt-sm">
      <q-table flat class="h-[85vh]" :rows="rows" :columns="columns" style="background: rgba(244, 244, 244, 0.8)"
        row-key="name">
        <!-- <template v-slot:top-right>
            <q-btn color="primary" label="Action" :disable="selectedItems.length === 0" @click="performAction" />
        </template> -->
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td>
              <div>
                <div class="text-xs">{{ props.row.user_data.first_name + ' ' + props.row.user_data.last_name }}</div>
              </div>
            </q-td>
            <q-td>
              <div>
                <div class="text-xs">{{ props.row.user_data.email }}</div>
              </div>
            </q-td>
            <q-td>
              <div>
                <div class="text-xs">{{ props.row.user_data.balance || 0 }} &#2547;</div>
              </div>
            </q-td>
            <q-td>
              <div>
                <div class="text-xs">{{ props.row.user_data?.salary || 0 }} &#2547;</div>
              </div>
            </q-td>
            <q-td>
              <div>
                <div class="text-xs">{{ props.row.cash_data?.total_amount || 0 }} &#2547;</div>
              </div>
            </q-td>
            <q-td>
              <div>
                <div class="text-xs">{{ props.row.cash_data?.cashs?.length }}</div>
              </div>
            </q-td>
            <q-td>
              <div>
                <div class="text-xs">{{ props.row.expense_data?.expenses?.length }} </div>
              </div>
            </q-td>
            <q-td>
              <div>
                <div class="text-xs">{{ props.row.expense_data?.total_amount || 0 }} &#2547;</div>
              </div>
            </q-td>
            <q-td>
              <div v-if="props.row.user_data.user_type === 'EMPLOYEE'">
                <div class="text-xs">{{ props.row.salary_request ? `Requested - ${props.row.salary_request.status}` : 'No'
                }}</div>
              </div>
            </q-td>
            <q-td>
              <div v-if="props.row.user_data.user_type === 'EMPLOYEE'">
                <div class="text-xs">{{ props.row.salary_received ? `Requested - ${props.row.salary_received.status}` :
                  'No' }}</div>
              </div>
            </q-td>
            <q-td>
              <div>
                <div class="text-xs" v-if="props.row.user_data.user_type === 'EMPLOYEE'">{{ props.row.payable_amount || 0
                }} &#2547;</div>
                <div class="text-xs" v-else>{{ props.row.user_data.balance || 0 }} &#2547;</div>
              </div>
            </q-td>
            <q-td>
              <div class="column items-end">
                <q-btn flat icon="more_vert">
                  <q-menu anchor="top middle" self="top right">
                    <q-item clickable @click="$router.push(`/cash?user=${props.row.user_data._id}`)">
                      <q-item-section>View Cash Requests</q-item-section>
                    </q-item>
                    <q-item clickable @click="$router.push(`/expense?user=${props.row.user_data._id}`)">
                      <q-item-section>View Expense Requests</q-item-section>
                    </q-item>

                    <q-item v-if="props.row.salary_request" @click="approveSalaryRequest(props.row)" clickable>
                      <q-item-section v-if="props.row.salary_request.status !== 'APPROVED'">Update Salary Request
                        Status</q-item-section>
                    </q-item>

                    <q-item @click="createSalaryReq(props.row)" v-if="!props.row.salary_request" clickable>
                      <q-item-section> Send Salary</q-item-section>
                    </q-item>

                    <q-item @click="approveExpenseRequest(props.row)"
                      v-if="props.row.salary_received && props.row.salary_received.status !== 'APPROVED'" clickable>
                      <q-item-section>Update Salary Receive Request</q-item-section>
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
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
            <q-card bordered flat class="bg-gray-100">
              <q-card-section class="flex justify-between bg-green">
                <!-- <q-checkbox dense v-model="props.selected" :label="props.row.name" /> -->
                <div></div>
                <div class="column items-end">
                  <q-btn flat icon="more_vert">
                    <q-menu anchor="top middle" self="top right">
                      <q-item clickable>
                        <q-item-section>Update</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Delete</q-item-section>
                      </q-item>
                      <q-item clickable>
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
                    <q-item-label v-if="col.label == 'User'">{{ props.row.user_data.first_name + ' ' +
                      props.row.user_data.last_name }}</q-item-label>
                    <q-item-label v-else-if="col.label == 'Email'">{{ props.row.user_data.email }}</q-item-label>
                    <q-item-label v-else-if="col.label == 'Balance'">{{ props.row.user_data.balance || 0 }}
                      &#2547;</q-item-label>
                    <q-item-label v-else-if="col.label == 'Salary'">{{ props.row.user_data?.salary || 0 }}
                      &#2547;</q-item-label>
                    <q-item-label v-else-if="col.label == 'Cash Amount'">{{ props.row.cash_data?.total_amount || 0 }}
                      &#2547;</q-item-label>
                    <q-item-label v-else-if="col.label == 'Cash Requests'">{{ props.row.cash_data?.cashs?.length
                    }}</q-item-label>
                    <q-item-label v-else-if="col.label == 'Expense Amount'">{{ props.row.expense_data?.total_amount || 0
                    }} &#2547;</q-item-label>
                    <q-item-label v-else-if="col.label == 'Expense Requests'">{{ props.row.expense_data?.expenses?.length
                    }}</q-item-label>
                    <q-item-label v-else-if="col.label == 'Salary Requested'">
                      <div v-if="props.row.user_data.user_type === 'EMPLOYEE'">
                        <div class="text-xs">{{ props.row.salary_request ? `Requested -
                          ${props.row.salary_request.status}` : 'No'
                        }}</div>
                      </div>
                    </q-item-label>
                    <q-item-label v-else-if="col.label == 'Salary Received Requested'">
                      <div v-if="props.row.user_data.user_type === 'EMPLOYEE'">
                        <div class="text-xs">{{ props.row.salary_received ? `Requested -
                          ${props.row.salary_received.status}` :
                          'No' }}</div>
                      </div>
                    </q-item-label>
                    <q-item-label v-else-if="col.label == 'Payable Amount'">
                      <div class="text-xs" v-if="props.row.user_data.user_type === 'EMPLOYEE'">{{ props.row.payable_amount
                        || 0
                      }} &#2547;</div>
                      <div class="text-xs" v-else>{{ props.row.user_data.balance || 0 }} &#2547;</div>
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



  <q-dialog v-model="confirm" persistent>
    <emp-attendance />
  </q-dialog>
  <q-dialog v-model="approvalExp" persistent>
    <approval-process :data="approvalCandidate" req_type="expense" user_type="payer" @close="closeStatusWindow" />
  </q-dialog>
  <q-dialog v-model="approvalCash" persistent>
    <approval-process :data="approvalCandidate" user_type="payee" @close="closeStatusWindow" />
  </q-dialog>
</template>

<script>
import EmpAttendance from "src/components/attendance/EmpAttendance.vue";
import ApprovalProcess from "src/components/ApprovalProcess.vue";
import { ref, onMounted } from "vue";
import { ApiService } from 'src/service/api-service';
import { useQuasar } from 'quasar';
import { useAuthStore } from "src/stores/auth.store";
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
    name: "balance",
    align: "left",
    label: "Balance",
    field: "balance",
    sortable: true,
  },
  {
    name: "salary",
    align: "left",
    label: "Salary",
    field: "salary",
    sortable: true,
  },
  {
    name: "total_cash",
    align: "left",
    label: "Cash Amount",
    field: "total_cash",
    sortable: true,
  },
  {
    name: "total_cash_count",
    align: "left",
    label: "Cash Requests",
    field: "total_cash_count",
    sortable: true,
  },
  {
    name: "total_expense",
    align: "left",
    label: "Expense Amount",
    field: "total_expense",
    sortable: true,
  },
  {
    name: "total_expense_count",
    align: "left",
    label: "Expense Requests",
    field: "total_expense_count",
    sortable: true,
  },
  {
    name: "salary_request",
    align: "left",
    label: "Salary Requested",
    field: "salary_request",
    sortable: true,
  },
  {
    name: "salary_received",
    align: "left",
    label: "Salary Received Requested",
    field: "salary_received",
    sortable: true,
  },
  {
    name: "payable_amount",
    align: "left",
    label: "Payable Amount",
    field: "payable_amount",
    sortable: true,
  },
  {
    name: "action",
    label: "Action",
    field: "action",
  },
]

const months = [
  {
    label: "January",
    value: "01",
  },
  {
    label: "February",
    value: "02",
  },
  {
    label: "March",
    value: "03",
  },
  {
    label: "April",
    value: "04",
  },
  {
    label: "May",
    value: "05",
  },
  {
    label: "June",
    value: "06",
  },
  {
    label: "July",
    value: "07",
  },
  {
    label: "August",
    value: "08",
  },
  {
    label: "September",
    value: "09",
  },
  {
    label: "October",
    value: "10",
  },
  {
    label: "November",
    value: "11",
  },
  {
    label: "December",
    value: "12",
  }
]


export default {
  components: { EmpAttendance, ApprovalProcess },
  setup() {
    const selected = ref([]);
    const apiSerivce = new ApiService();
    const $q = useQuasar();
    const authStore = useAuthStore();
    const rows = ref([]);
    const approvalExp = ref(false)
    const approvalCash = ref(false)
    const approvalCandidate = ref(null);
    const loading = ref(false);
    const year = ref('');
    const month = ref({});

    onMounted(() => {

      const currentDate = new Date();
      const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      month.value = months.find(month => month.value === currentMonth);
      year.value = currentDate.getFullYear();

      fetchAnalytics()
    });

    async function fetchAnalytics() {
      try {
        loading.value = true;
        const response = await apiSerivce.get("/users/analytics", {
          params: {
            year: year.value,
            month: month.value.value,
          }
        });
        rows.value = response.data.data;
        loading.value = false;
      } catch (error) {
        console.log("🚀 ~ file: AttendancePage.vue:260 ~ fetchAnalytics ~ error:", error)

      }
    }

    function closeStatusWindow() {
      approvalExp.value = false;
      approvalCash.value = false;
      fetchAnalytics()
    }

    async function createSalaryReq(data) {
      try {
        const response = await apiSerivce.post("/cash-control/send-cash", {
          amount: data.payable_amount,
          payee: data.user_data._id,
        });
        console.log("🚀 ~ file: UserAnalytics.vue:350 ~ createSalaryReq ~ response:", response)
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Salary Request Created Successfully",
        });
        fetchAnalytics();
      } catch (error) {
        console.log("🚀 ~ file: UserAnalytics.vue:350 ~ createSalaryReq ~ error:", error)
        $q.notify({
          color: "red-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Salary Request Creation Failed",
        });

      }
    }

    function approveSalaryRequest(data) {
      approvalCandidate.value = data.salary_request;
      approvalCash.value = true;
    }

    function approveExpenseRequest(data) {
      approvalCandidate.value = data.salary_received;
      approvalExp.value = true;
    }

    return {
      columns,
      rows,
      selected,
      $q,
      authStore,
      loading,
      months,
      month,
      year,
      fetchAnalytics,
      moment,
      createSalaryReq,
      approvalExp,
      approvalCash,
      closeStatusWindow,
      approveSalaryRequest,
      approveExpenseRequest,
      approvalCandidate
    };
  },
};
</script>
