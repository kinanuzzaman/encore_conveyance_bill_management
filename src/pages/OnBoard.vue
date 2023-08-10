<template>
  <div class="flex justify-center items-center h-screen bg-green">
    <q-card class="my-card p-10" style="width: 500px; max-width: 80vw">
      <div class="flex flex-col justify-center items-center gap-3">
        <p class="text-2xl ">Welcome</p>
        <p class="text-sm text-gray-500">{{ invitedUsersData?.invited_by?.first_name + '' +
          invitedUsersData?.invited_by?.last_name }} invited you as {{
    invitedUsersData?.designation }} in join Encore Ltd. </p>
      </div>
      <div class="flex justify-center">
        <AvatarUploader @imageSelected="onImageUpload" />
      </div>
      <q-card-section class="flex flex-col gap-2">
        <q-input v-model="userInfo.dob" type="date" label="Date of Birth" outlined dense />
        <q-input outlined v-model="userInfo.password" type="password" placeholder="New password" bg-color="white"
          :dense="true" />
        <q-input outlined v-model="confirmPassword" type="password" placeholder="Confirm password" bg-color="white"
          :dense="true" />

        <q-btn label="continue" color="green" class="col mt-3" @click="onBoardUser()" />
      </q-card-section>

    </q-card>
    <div class="absolute bottom-0 right-0 w-[60%]">
      <img src="~assets/images/login/encore2.png" class="" />
    </div>
  </div>
</template>

<script>
import { ApiService } from 'src/service/api-service'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import AvatarUploader from 'src/components/AvatarUploader.vue'
export default {
  components: {
    AvatarUploader
  },
  setup() {
    const apiSerivce = new ApiService()
    const route = useRoute()
    const router = useRouter()
    const formData = new FormData()
    const $q = useQuasar()

    const confirmPassword = ref(null)

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
        console.log("🚀 ~ file: OnBoard.vue:62 ~ apiSerivce.get ~ invitedUsersData.value:", invitedUsersData.value)
      }).catch((err) => {
        $q.notify({
          message: err.response ? err.response.data.message : 'Something went wrong',
          color: 'red',
          position: 'top'
        })
        router.back()
      })
    })

    function onBoardUser() {
      if (userInfo.password !== confirmPassword.value) {
        $q.notify({
          message: 'Password does not match',
          color: 'red',
          position: 'top'
        })
      }
      Object.keys(userInfo).forEach((key) => {
        formData.append(key, userInfo[ key ]);
      });
      apiSerivce.post(`/users/accept-invitation/${route.params.id}`, formData).then(() => {
        router.push('/')
      }).catch((err) => {
        $q.notify({
          message: err.response ? err.response.data.message : 'Something went wrong',
          color: 'red',
          position: 'top'
        })
      })
    }

    function onImageUpload(file) {
      formData.append('avatar', file);
    }

    return {
      userInfo,
      invitedUsersData,
      onBoardUser,
      onImageUpload
    }
  }
}
</script>

<style lang="scss" scoped></style>
