<template>
  <div class="flex justify-center items-center h-screen bg-green">
    <q-card class="my-card p-5 z-10" style="width: 500px; max-width: 90vw">
      <div class="flex flex-col justify-center items-center gap-3">
        <p class="text-2xl ">Welcome</p>
        <p class="text-sm text-gray-500 text-center">{{ invitedUsersData?.invited_by?.first_name + '' +
          invitedUsersData?.invited_by?.last_name }} invited you as {{
    invitedUsersData?.designation }} in join Encore Ltd. </p>
      </div>
      <div class="flex justify-center">
        <AvatarUploader @imageSelected="onImageUpload" />
      </div>
      <q-card-section class="flex flex-col gap-2">
        <q-input v-model="userInfo.dob" type="date" label="Date of Birth" outlined dense />
        <q-input outlined v-model="userInfo.password" :type="showPassword ? 'text' : 'password'"
          placeholder="New password" bg-color="white" :dense="true">
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-btn flat :icon="showPassword ? 'visibility_off' : 'visibility'" @click="showPassword = !showPassword"
              class="cursor-pointer" />
          </template>
        </q-input>
        <q-input outlined v-model="confirmPassword" placeholder="Confirm password" bg-color="white" :dense="true"
          :type="showConfirmPassword ? 'text' : 'password'">
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-btn flat :icon="showConfirmPassword ? 'visibility_off' : 'visibility'"
              @click="showConfirmPassword = !showConfirmPassword" class="cursor-pointer" />
          </template>
        </q-input>

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

    const showPassword = ref(false)
    const showConfirmPassword = ref(false)
    const invitedUsersData = ref([])

    onMounted(() => {
      if (!route.params.id) {
        router.back()
      }
      apiSerivce.get(`/users/validate-invitation/${route.params.id.toString()}`).then((res) => {
        invitedUsersData.value = res.data.data
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
        console.log(userInfo.password, confirmPassword.value)
        $q.notify({
          message: 'Password does not match',
          color: 'red',
          position: 'top'
        })
        return
      }
      Object.keys(userInfo).forEach((key) => {
        formData.append(key, userInfo[key]);
        console.log("🚀 ~ file: OnBoard.vue:83 ~ Object.keys ~ formData:", userInfo[key])
      });
      apiSerivce.post(`/users/accept-invitation/${route.params.id}`, formData).then(() => {
        router.push('/')
      }).catch((err) => {
        formData = new FormData()
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
      onImageUpload,
      confirmPassword,
      showPassword,
      showConfirmPassword
    }
  }
}
</script>

<style lang="scss" scoped></style>
