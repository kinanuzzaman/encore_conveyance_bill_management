<template>
  <div class="flex flex-col md:flex-row">
    <section class="my-6 w-full lg:w-[40%]">
      <q-card flat class="my-card md:p-5">
        <div class="flex justify-center">
          <AvatarUploader :image="updateCandidate.profile_img" @imageSelected="onImageUpload" />
        </div>
        <q-card-section class="grid md:grid-cols-2 gap-5">
          <q-input outlined v-model="updateCandidate.first_name" label="First Name" bg-color="white" :dense="true" />
          <q-input outlined v-model="updateCandidate.last_name" label="Last Name" bg-color="white" :dense="true" />
          <q-input outlined v-model="updateCandidate.email" disable label="Email" :dense="true">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
          <q-input outlined v-model="updateCandidate.phone_number" label="Phone Number" :dense="true">
            <template v-slot:prepend>
              <q-icon name="phone" />
            </template>
          </q-input>
          <q-input outlined v-model="updateCandidate.designation" disable label="Designation" bg-color="white"
            :dense="true" />
          <q-input outlined v-model="updateCandidate.salary" disable label="Salary" bg-color="white" :dense="true" />
        </q-card-section>
        <q-card-actions align="center" class="row mx-2 py-5">
          <q-btn label="Change password" color="red" class="col" @click="showChangePassDialog = true" />
          <q-btn label="Update" :loading="btnLoaders.update_btn" color="green" class="col" @click="updateUserInfo()" />
        </q-card-actions>
      </q-card>
    </section>
    <div class="w-full lg:w-[50%] p-5">
      <section v-if="row" class="flex md:flex-row flex-col justify-between my-6">
        <div class="text-2xl font-semibold">Analytics</div>

        <div class="flex md:gap-x-5 gap-1 justify-center items-center md:mt-0 mt-3">
          <!-- <div class="w-full">
        </div>
        <div class="w-full">
        </div> -->
          <div class="md:w-[150px]">
            <q-select class="w-full" outlined dense v-model="year" :options="['2023', '2024', '2025']" label="Year"
              filled />

          </div>
          <div class="md:w-[150px]">
            <q-select class="w-full" outlined dense v-model="month" :options="months" label="Month" filled />
          </div>
          <div>
            <q-btn color="green" unelevated no-caps label="Apply" @click="fetchAnalytics" />
          </div>
        </div>
      </section>
      <section v-if="row">
        <q-card class="my-card">
          <q-card-section>
            <div class="flex justify-between">
              <div class="text-lg">Available Balance</div>
              <div class="text-lg font-bold">{{ row?.user_data?.balance }} &#2547;</div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="flex justify-between">
              <div class="text-lg">Salary</div>
              <div class="text-lg font-bold">{{ row?.user_data?.salary }} &#2547;</div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="flex justify-between">
              <div class="text-lg">Total Cash Amount</div>
              <div class="text-lg font-bold">{{ row?.cash_data?.total_amount }} &#2547;</div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="flex justify-between">
              <div class="text-lg">Total cash request created</div>
              <div class="text-lg font-bold">{{ row?.cash_data?.cashs?.length }} </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="flex justify-between">
              <div class="text-lg">Total Expense Amount</div>
              <div class="text-lg font-bold">{{ row?.expense_data?.total_amount }} &#2547;</div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="flex justify-between">
              <div class="text-lg">Total Expense Request created</div>
              <div class="text-lg font-bold">{{ row.expense_data?.expenses?.length }} </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="flex justify-between">
              <div class="text-lg">Salary request status</div>
              <div class="text-lg font-bold">{{ row?.salary_request ? `Requested - ${row.salary_request.status}` :
                'Notyet' }}
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="flex justify-between">
              <div class="text-lg">Salary received status</div>
              <div class="text-lg font-bold">{{ row?.salary_received ? `Requested - ${row.salary_received.status}` : 'No'
              }}
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="flex justify-between">
              <div class="text-lg">Receive Able amount</div>
              <div class="text-lg font-bold">{{ row?.payable_amount }}</div>
            </div>
          </q-card-section>
        </q-card>

      </section>

    </div>
  </div>


  <q-dialog v-model="showChangePassDialog" persistent>
    <q-card class="w-[400px] p-5 m-5">
      <q-card-section>
        <div class="text-[24px] text-green text-center font-semibold">
          Change password
        </div>
      </q-card-section>
      <q-card-section>
        <q-input dense filled bottom-slots v-model="passChangePayload.oldPassword" placeholder="Old Password"
          :type="showOldPassword ? 'text' : 'password'">
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-btn :icon="showOldPassword ? 'visibility_off' : 'visibility'" @click="showOldPassword = !showOldPassword"
              class="cursor-pointer" flat />
          </template>
        </q-input>
        <q-input dense filled bottom-slots v-model="passChangePayload.newPassword" placeholder="New Password"
          :type="showNewPassword ? 'text' : 'password'">
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-btn :icon="showNewPassword ? 'visibility_off' : 'visibility'" @click="showNewPassword = !showNewPassword"
              class="cursor-pointer" flat />
          </template>
        </q-input>
        <q-input dense filled bottom-slots v-model="passChangePayload.confirmPassword" placeholder="Retype Password"
          :type="showConfirmPassword ? 'text' : 'password'">
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-btn :icon="showConfirmPassword ? 'visibility_off' : 'visibility'"
              @click="showConfirmPassword = !showConfirmPassword" class="cursor-pointer" flat />
          </template>
        </q-input>
        <div class="flex items-center justify-between">
          <q-btn color="red full-width" label="Cancel" @click="showChangePassDialog = false" size="md" no-caps />
          <q-btn color="green full-width" class="mt-3" label="Set Password" @click="changePassword" size="md" no-caps />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="confirm" persistent>
    <emp-attendance />
  </q-dialog>
</template>

<script>
import EmpAttendance from "src/components/attendance/EmpAttendance.vue";
import { ref, onMounted } from "vue";
import { ApiService } from 'src/service/api-service';
import { useQuasar } from 'quasar';
import { useRbacStore } from "../../stores/rbac.store";
import { useAuthStore } from "src/stores/auth.store";
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
  components: { EmpAttendance, AvatarUploader },
  setup() {
    const selected = ref([]);
    const apiSerivce = new ApiService();
    const $q = useQuasar();
    const authStore = useAuthStore();
    const row = ref(null);
    const rbacStore = useRbacStore();
    const loading = ref(false);
    const year = ref('');
    const month = ref({});
    const updateCandidate = ref({});
    let updateCandidateFormData = new FormData();

    const showChangePassDialog = ref(false);

    const passChangePayload = ref({
      oldPassword: null,
      newPassword: null,
      confirmPassword: null,
    });

    const btnLoaders = ref({
      create_btn: false,
      update_btn: false,
      status_btn: false,
    });

    onMounted(() => {
      const currentDate = new Date();
      const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      month.value = months.find(month => month.value === currentMonth);
      year.value = currentDate.getFullYear();
      fetchUserInfo()
      fetchAnalytics()
    });

    async function fetchAnalytics() {
      try {
        loading.value = true;
        const response = await apiSerivce.get("/users/analytics", {
          params: {
            year: year.value,
            month: month.value.value,
            self: true,
          }
        });
        row.value = response.data.data[ 0 ];
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

    async function fetchUserInfo() {
      try {
        const res = await apiSerivce.get(`/users/profile`);
        authStore.updateUserInfo(res.data.data[ 0 ]);
        updateCandidate.value = authStore.getUserInfo;
      } catch (error) {
        $q.notify({
          message: error.response ? error.response.data.message : error.message,
          color: "negative",
          position: "top",
        });
      }
    }

    async function updateUserInfo() {
      try {
        delete updateCandidate.value.email;
        delete updateCandidate.value.role;
        delete updateCandidate.value.salary;

        btnLoaders.value.update_btn = true;
        Object.keys(updateCandidate.value).forEach(key => {
          if (key === 'role') {
            updateCandidateFormData.append(key, updateCandidate.value[ key ].value);
          } else updateCandidateFormData.append(key, updateCandidate.value[ key ]);
        });

        await apiSerivce.put(`/users/${updateCandidate.value._id}`, updateCandidateFormData);
        btnLoaders.value.update_btn = false;
        updateCandidateFormData = new FormData();
        fetchUserInfo()
        $q.notify({
          message: "User updated",
          color: "positive",
          position: "top",
        });
      } catch (error) {
        btnLoaders.value.update_btn = false;
        updateCandidateFormData = new FormData();
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

    async function changePassword() {
      try {

        if (passChangePayload.value.newPassword !== passChangePayload.value.confirmPassword) {
          $q.notify({
            message: 'Password does not match',
            color: 'red',
            position: 'top'
          })
          return
        }
        const res = await apiSerivce.post('/users/change-password', passChangePayload.value)
        $q.notify({
          message: res.data.message,
          color: 'green',
          position: 'top'
        })
        showChangePassDialog.value = false;
        passChangePayload.value = {
          oldPassword: null,
          newPassword: null,
          confirmPassword: null,
        };
      } catch (error) {
        $q.notify({
          message: err.response ? err.response.data.message : 'Something went wrong',
          color: 'red',
          position: 'top'
        })
      }
    }

    return {
      columns,
      row,
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
      closeStatusWindow,
      updateCandidate,
      onImageUpload,
      updateUserInfo,
      rbacStore,
      btnLoaders,
      passChangePayload,
      showChangePassDialog,
      changePassword,
      showNewPassword: ref(false),
      showOldPassword: ref(false),
      showConfirmPassword: ref(false),
    };
  },
};
</script>
