<template>
  <div>
    <div class="flex justify-center items-center h-screen bg-green">
      <q-card class="w-[400px] p-10 m-5" v-if="change">
        <q-card-section>
          <div class="text-[24px] text-green text-center font-semibold">
            Forgot your Password
          </div>
          <div class="text-xs text-center py-3">
            Please enter your registered email below to receive your password
            reset instructions.
          </div>
        </q-card-section>

        <q-input class="mb-2" dense filled type="email" bottom-slots v-model="email" label="Email Address" />

        <q-btn color="green full-width" label="Submit" @click="requestResetPassword" size="md" no-caps />

        <div class="row justify-center items-center my-2">
          <div class="col h-[1px] bg-black m-4"></div>
          <div class="or">Or</div>
          <div class="col h-[1px] bg-black m-4"></div>
        </div>

        <q-btn color="green full-width" label="login" to="/" size="md" no-caps />
      </q-card>
      <q-card v-if="change == false" class="w-[362px] p-10 m-5">
        <q-card-section class="text-center">
          <q-btn round color="green" icon="mail" />
          <div class="text-[24px] text-green font-semibold">
            Check your mail
          </div>
          <div class="text-xs py-3">
            We’ve sent a password recovery <br />instruction to your mail
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn color="green full-width" label="login" to="/" size="md" no-caps />
        </q-card-actions>
      </q-card>
      <div class="absolute bottom-0 right-0 w-[70%]">
        <img src="../../assets/images/login/encore2.png" class="" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { ApiService } from 'src/service/api-service';
import { useQuasar } from 'quasar';

export default {
  setup() {
    const apiSerivce = new ApiService()
    const $q = useQuasar()
    const email = ref('')
    let change = ref(true);

    async function requestResetPassword() {
      try {
        const res = await apiSerivce.post('/users/forgot-password', { email: email.value })
        $q.notify({
          message: res.data.message,
          color: 'green',
          position: 'top'
        })
        change.value = false;
      } catch (error) {
        $q.notify({
          message: err.response ? err.response.data.message : 'Something went wrong',
          color: 'red',
          position: 'top'
        })
      }
    }

    return {
      change,
      email,
      requestResetPassword
    };
  },
};
</script>

<style lang="scss" scoped>
div {
  font-family: "Roboto Slab", serif;
}
</style>
