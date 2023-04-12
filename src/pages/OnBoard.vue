<template>
  <div>
    <q-card class="my-card p-10" style="width: 1020px; max-width: 80vw">
      <div>
        <p>Invited by: {{ invitedUsersData?.invited_by?.first_name + '' + invitedUsersData?.invited_by?.last_name }}</p>
        <p> as {{ invitedUsersData?.designation }}</p>
      </div>
      <div class="flex justify-center py-10">
        <q-avatar size="100px" font-size="52px" color="teal" text-color="white" icon="account_circle" />
      </div>
      <q-card-section class="grid grid-cols-2 gap-5">
        <q-input v-model="userInfo.dob" filled type="date" hint="Native date" />
        <q-input outlined v-model="userInfo.password" placeholder="password" bg-color="white" :dense="true" />

        <q-btn label="Save" color="green" class="col" @click="onBoardUser()" />
      </q-card-section>

    </q-card>
  </div>
</template>

<script>
import { ApiService } from 'src/service/api-service'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const apiSerivce = new ApiService()
    const route = useRoute()
    const router = useRouter()

    const userInfo = reactive({
      dob: null,
      password: null
    })

    const invitedUsersData = ref([])

    onMounted(() => {
      if (!route.params.id) {
        router.back()
      }
      apiSerivce.get(`/users/validate-invitation/${route.params.id.toString()}`).then((res) => {
        invitedUsersData.value = res.data.data
        console.log("🚀 ~ file: OnBoard.vue:37 ~ apiSerivce.get ~ invitedUsersData.value:", invitedUsersData.value)
      })
    })

    function onBoardUser() {
      apiSerivce.post(`/users/accept-invitation/${route.params.id}`, userInfo).then((res) => {
        router.push('/')
      })
    }

    return {
      userInfo,
      invitedUsersData,
      onBoardUser
    }
  }
}
</script>

<style lang="scss" scoped></style>
