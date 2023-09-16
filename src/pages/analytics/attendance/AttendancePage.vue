<template>
  <!-- class="bg-[url('../assets/home/bg.png')] bg-no-repeat bg-cover" -->
  <main>
    <!-- Section Name  style="font-family: 'Roboto Slab', 'serif'"-->
    <section class="mx-4 my-6 flex md:flex-row flex-col justify-between">
      <div class="text-2xl font-semibold">Attendance Analytics</div>

      <div class="flex md:gap-x-5 gap-1 justify-center items-center md:mt-0 mt-3">
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
    <!-- Table -->
    <!-- grid md:grid-cols-3 grid-cols-1 -->
    <div class="">
      <section class="">
        <div class="q-px-md gt-sm">
          <!-- bordered  style="background-color: #f1f1f1" -->
          <q-table flat class="h-[85vh]" :rows="rows" :columns="columns" :rows-per-page-options="[20, 40, 50]"
            style="background: rgba(244, 244, 244, 0.8)" row-key="name">
            <template v-slot:body="props">
              <q-tr class="" :props="props">
                <q-td>

                  <div class="tw-py-1 tw-rounded-md">
                    <div class="flex items-center gap-4">
                      <div>
                        <q-avatar font-size="20px" color="green" text-color="white">
                          <img v-if="props.row.user.profile_img" :src="props.row.user.profile_img" alt="">
                          <span v-else>{{ props.row.user.first_name.charAt(0)
                            + props.row.user.last_name.charAt(0) }}</span>
                        </q-avatar>
                      </div>
                      <div class="flex gap-2">
                        <span class="text-xs">{{ props.row.user.first_name }} {{ props.row.user.last_name }}</span>
                        <span class="text-xs bg-gray-400 text-white rounded px-1">{{ props.row.user.designation
                        }}</span>
                      </div>
                    </div>
                  </div>

                </q-td>
                <q-td>
                  <div>
                    <div class="text-xs">{{ props.row.user.email }}</div>
                  </div>
                </q-td>
                <q-td>
                  <div>
                    <div class="text-xs">{{ props.row.user.phone_number }}</div>
                  </div>
                </q-td>
                <q-td>
                  <div>
                    <div class="text-xs">{{ props.row.lateDuration }}</div>
                  </div>
                </q-td>
                <q-td>
                  <div>
                    <div class="text-xs">{{ props.row.totalDuration }}</div>
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

    <q-dialog v-model="confirm" persistent>
      <emp-attendance />
    </q-dialog>
  </main>
</template>

<script>
import EmpAttendance from "src/components/attendance/EmpAttendance.vue";
import { ref, onMounted } from "vue";
import { ApiService } from 'src/service/api-service';
import { useQuasar } from 'quasar';
import { useAuthStore } from "src/stores/auth.store";

const columns = [
  {
    name: "user",
    required: true,
    label: "Name",
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
    name: "lateDuration",
    align: "left",
    label: "Late work duration",
    field: "lateDuration",
    sortable: true,
  },
  {
    name: "totalDuration",
    align: "left",
    label: "Total work duration",
    field: "totalDuration",
    sortable: true,
  }
];

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
  components: { EmpAttendance },
  setup() {
    const selected = ref([]);
    const apiSerivce = new ApiService();
    const $q = useQuasar();
    const authStore = useAuthStore();
    const rows = ref([]);
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
        const response = await apiSerivce.get("/attendance/analytics", {
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
      fetchAnalytics
    };
  },
};
</script>

<style lang="scss" scoped>
.q-th {
  background-color: #00b4ff;
}
</style>
