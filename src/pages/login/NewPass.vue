<template>
  <div>
    <div class="flex justify-center items-center h-screen bg-green">
      <q-card class="w-[400px] p-5 m-5">
        <q-card-section>
          <div class="text-[24px] text-green text-center font-semibold">
            Set your new password
          </div>
        </q-card-section>
        <q-card-section>
          <q-input dense filled bottom-slots v-model="payload.password" placeholder="New Password"
            :type="showPassword ? 'text' : 'password'">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-btn :icon="showPassword ? 'visibility_off' : 'visibility'" @click="showPassword = !showPassword"
                class="cursor-pointer" flat />
            </template>
          </q-input>
          <q-input dense filled bottom-slots v-model="payload.confirmPassword" placeholder="Retype Password"
            :type="showConfirmPassword ? 'text' : 'password'">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-btn :icon="showConfirmPassword ? 'visibility_off' : 'visibility'"
                @click="showConfirmPassword = !showConfirmPassword" class="cursor-pointer" flat />
            </template>
          </q-input>
          <q-btn color="green full-width" label="Set Password" @click="resetPassword" size="md" no-caps />
        </q-card-section>
      </q-card>
      <div class="absolute bottom-0 right-0 w-[70%]">
        <img src="../../assets/images/login/encore2.png" class="" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { ApiService } from 'src/service/api-service';
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar';
export default {
  setup() {
    const apiSerivce = new ApiService()
    const $q = useQuasar()
    const route = useRoute()
    const router = useRouter()
    const payload = ref({
      password: null,
      confirmPassword: null,
      code: null
    })

    const showPassword = ref(false)
    const showConfirmPassword = ref(false)

    onMounted(() => {
      if (!route.params.id) router.back()
      payload.value.code = route.params.id;
    })

    async function resetPassword() {
      try {
        if (payload.value.password !== payload.value.confirmPassword) {
          $q.notify({
            message: 'Password does not match',
            color: 'red',
            position: 'top'
          })
          return
        }
        // payload.value.code = route.params.id;
        const res = await apiSerivce.post('/users/reset-password', payload.value)
        $q.notify({
          message: res.data.message,
          color: 'green',
          position: 'top'
        })
        router.push('/')
      } catch (error) {
        $q.notify({
          message: err.response ? err.response.data.message : 'Something went wrong',
          color: 'red',
          position: 'top'
        })
      }
    }

    return {
      payload,
      resetPassword,
      showPassword,
      showConfirmPassword
    };

  },
};
</script>

<style lang="scss" scoped>
div {
  font-family: "Roboto Slab", serif;
}
</style>
