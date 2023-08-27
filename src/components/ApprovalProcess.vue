<template>
  <q-card class="my-card">
    <div class="card">
      <q-card-section class="text-center flex justify-between">
        <h1 class="md:text-2xl text-xl">Approval/Reject Process</h1>
        <div class="float-right"><q-btn icon="close" flat round dense v-close-popup /></div>
      </q-card-section>
      <q-card-section class="grid md:grid-cols-2 grid-cols-1">
        <div class="flex md:flex-col flex-row justify-between  md:text-lg text-md gap-3">
          <div>
            <span class="text-gray-600 text-bold">Type:</span> <span>{{ props.data.type || props.data.request_type
            }}</span>
          </div>
          <div>
            <span class="text-gray-600 text-bold">Amount:</span><span>{{ props.data.amount }}</span>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <span class="font-bold md:pt-0 pt-5">Request by</span>
          <div class="flex items-center gap-2">
            <q-avatar font-size="20px" color="green" text-color="white">
              <img v-if="props.data[user_type].profile_img" :src="props.data[user_type].profile_img" alt="">
              <span v-else>{{ props.data[user_type].first_name.charAt(0)
                + props.data[user_type].last_name.charAt(0) }}</span>
            </q-avatar>
            <div>
              <p>{{ props.data[user_type].first_name + ' ' + props.data[user_type].last_name }} <span
                  class="text-xs p-0.5 rounded text-white bg-gray-500">{{ props.data[user_type].designation }}</span></p>
              <p>{{ props.data[user_type].email }}</p>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="gt-sm">
        <q-table title="History" :rows="usersStatusTableData" :columns="columns" flat>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="user">
                <div class="text-xs">{{ props.row.user }}</div>
              </q-td>
              <q-td key="note">
                <div class="text-xs">{{ props.row.note }}</div>
              </q-td>
              <q-td key="status">
                <div class="text-xs">{{ props.row.status }}</div>
              </q-td>
              <q-td key="changed">
                <div class="text-xs" :class="props.row.changed ? 'text-red-500' : 'text-green'">{{ props.row.changed ?
                  'No' : 'Yes' }}</div>
              </q-td>
              <q-td key="timeStamp">
                <div class="text-xs">{{ props.row.timeStamp }}</div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
      <div class="lt-md">
        <q-table :rows="usersStatusTableData" :columns="columns" row-key="name" selection="multiple"
          v-model:selected="selected" :filter="filter" grid hide-header>
          <!-- <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template> -->
          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
              <q-card bordered flat>
                <q-list dense>
                  <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                    <q-item-section>
                      <q-item-label>{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label v-if="col.label == 'User'">{{ props.row.user }}</q-item-label>
                      <q-item-label v-else-if="col.label == 'Note'">{{ props.row.note }}</q-item-label>
                      <q-item-label v-else-if="col.label == 'Action'">{{ props.row.status }}</q-item-label>
                      <q-item-label v-else-if="col.label == 'Active'">
                        <div class="text-xs" :class="props.row.changed ? 'text-red-500' : 'text-green'">{{
                          props.row.changed ?
                          'No' : 'Yes' }}</div>
                      </q-item-label>
                      <q-item-label v-else-if="col.label == 'Time'" class="text-xs">{{ props.row.timeStamp
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
          </template>

        </q-table>
      </div>
      <q-card-actions>
        <div class="flex md:flex-row flex-col w-full justify-center">
          <q-input class="md:w-1/2 md:pb-0 pb-3" dense outlined v-model="note" type="text" placeholder="Notes" />
          <div class="flex md:w-1/2 justify-center gap-3 items-center">
            <q-btn unelevated no-caps label="Approve" color="green" v-if="showApproveBtn"
              @click="updateStatus('APPROVED')" />
            <q-btn unelevated no-caps label="Reject" color="negative" v-if="showRejectBtn"
              @click="updateStatus('REJECTED')" />
            <q-btn unelevated no-caps label="Close" color="gray-500" v-close-popup />
          </div>
        </div>
      </q-card-actions>
    </div>
  </q-card>
</template>

<script setup>
import { defineProps, ref, onMounted, defineEmits } from "vue";
import { ApiService } from "src/service/api-service"
import { useAuthStore } from "src/stores/auth.store";
import { useQuasar } from "quasar"
import moment from "moment";
const columns = [
  {
    name: "user",
    align: "left",
    label: "User",
    field: "user",
  },
  {
    name: "note",
    align: "left",
    label: "Note",
    field: "note",
  },
  {
    name: "status",
    align: "left",
    label: "Action",
    field: "status",
    sortable: true,
  },
  {
    name: "changed",
    align: "left",
    label: "Active",
    field: "changed",
    sortable: true,
  },
  {
    name: "timeStamp",
    align: "left",
    label: "Time",
    field: "timeStamp",
    sortable: true,
  },
]

const apiService = new ApiService();
const authStore = useAuthStore();
const $q = useQuasar();
const emit = defineEmits(['close']);

const showApproveBtn = ref(false);
const showRejectBtn = ref(false);

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  user_type: {
    type: String,
    default: 'payee',
    required: true,
  },
  req_type: {
    type: String,
    default: 'cash',
    required: true,
  },
});
const note = ref("");
const usersStatusTableData = ref([]);

onMounted(() => {
  props.data.approvedBy.forEach((data) => {
    if (Object.keys(data).length == 0) return
    usersStatusTableData.value.push({
      userId: data.user._id,
      user: data.user.first_name + ' ' + data.user.last_name,
      note: data.note,
      status: "Approved",
      changed: data.changed,
      timeStamp: moment(data.timeStamp).format("LL | h:mma")
    })
  })
  props.data.rejectedBy.forEach((data) => {
    if (Object.keys(data).length == 0) return
    usersStatusTableData.value.push({
      userId: data.user._id,
      user: data.user.first_name + ' ' + data.user.last_name,
      note: data.note,
      status: "Rejected",
      changed: data.changed,
      timeStamp: moment(data.timeStamp).format("LL | h:mma")
    })
  })

  const isUserHaveAnyAction = usersStatusTableData.value.find((data) => data.userId === authStore.getUserInfo._id && !data.changed);

  if (isUserHaveAnyAction) {
    if (isUserHaveAnyAction.status === 'Approved') {
      showRejectBtn.value = true;
    } else {
      showApproveBtn.value = true;
    }
  } else {
    showApproveBtn.value = true;
    showRejectBtn.value = true;
  }

})

async function updateStatus(status) {
  try {
    console.log(status);
    const res = await apiService.put(`/${props.req_type}-control/${props.data._id}`, {
      note: note.value,
      status: status
    })
    console.log(res);
    $q.notify({
      message: "Request Approved",
      color: "green",
      icon: "check",
    });
    // hide the dialog
    emit("close");
  } catch (error) {
    $q.notify({
      message: error.message,
      color: "red",
      icon: "warning",
    });
  }
}


</script>

<style lang="scss" scoped>
.my-card {
  width: 700px;
  max-width: 90vw;

}

.card {
  padding: 32px 50px 50px 50px;

  @media (max-width: 768px) {
    padding: 8px 10px 20px 10px;
  }
}
</style>
