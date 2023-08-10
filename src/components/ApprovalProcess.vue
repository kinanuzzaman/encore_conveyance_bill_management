<template>
  <q-card class="my-card">
    <q-card-section class="text-center">
      <div class="float-right"><q-btn icon="close" flat round dense v-close-popup /></div>
      <h1 class="text-2xl mt-10">Approval/Reject Process</h1>
    </q-card-section>
    <div class="card">
      <!-- <q-card-section>
            </q-card-section> -->
      <q-card-section class="grid grid-cols-2">
        <div class="flex flex-col justify-end text-lg gap-3">
          <span>Type: {{ props.data.type }}</span>
          <span>Amount: {{ props.data.amount }}</span>
        </div>
        <div class="flex flex-col gap-3">
          <span class="font-bold">Request by</span>
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
      <q-card-section>
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
      <q-card-actions>
        <div class="flex w-full justify-center">
          <q-input class="w-1/2" dense outlined v-model="note" type="text" placeholder="Notes" />
          <div class="flex w-1/2 justify-center gap-3 items-center">
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
const emit = defineEmits([ 'close' ]);

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
  padding: 0px 50px 50px 50px;
}
</style>
