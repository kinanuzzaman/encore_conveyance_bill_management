<template>
  <div>
    <div class="flex justify-center items-center h-screen bg-green">
      <q-card class="w-[400px] p-5 m-5">
        <q-card-section>
          <img src="~assets/images/login/encore1.png" class="" />
        </q-card-section>
        <q-card-section>
          <div class="text-[24px] text-golden text-center font-semibold">
            Login
          </div>
        </q-card-section>
        <q-card-section>
          <q-input dense filled bottom-slots v-model="loginPayload.email" placeholder="Username or Email">
            <template v-slot:prepend>
              <q-icon name="person_outline" />
            </template>
          </q-input>
          <q-input dense filled bottom-slots v-model="loginPayload.password" placeholder="Password"
            :type="showPassword ? 'text' : 'password'">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-btn flat :icon="showPassword ? 'visibility_off' : 'visibility'" @click="showPassword = !showPassword"
                class="cursor-pointer" dense />
            </template>
          </q-input>

          <div class="text-golden text-right">
            <a href="/forgotpass">Forget Password?</a>
          </div>
        </q-card-section>
        <q-card-section>
          <q-btn color="green full-width" label="login" @click="loginUser" :loading="loginBtnLoading" size="md" no-caps />
        </q-card-section>
      </q-card>
      <div class="absolute bottom-0 right-0 w-[60%]">
        <img src="~assets/images/login/encore2.png" class="" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useAuthStore } from "../../stores/auth.store";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

// let socket = null;
export default {
  mounted() {
    // this.$socket = io("http://localhost:3000");
    // socket = this.$socket;

  },
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const authStore = useAuthStore();
    const loginBtnLoading = ref(false);

    const loginPayload = reactive({
      email: "admin@mail.com",
      password: "123456",
    });
    const loginUser = async () => {
      try {
        loginBtnLoading.value = true;
        await authStore.UserLogin(loginPayload);
        // socket.emit("USER_LOGIN", authStore.getUserInfo._id);
        const userData = authStore.getUserInfo

        if (userData.role.role_name !== 'super_admin') router.push("/user/profile");
        else router.push("/user");
      } catch (error) {
        loginBtnLoading.value = false;
        $q.notify({
          message: error.response ? error.response.data.message : error.message,
          color: "negative",
          position: "top",
        });
      }
    };
    return {
      loginBtnLoading,
      showPassword: ref(false),
      loginUser,
      loginPayload,
    };
  },
};
</script>

<style lang="scss" scoped>
div {
  font-family: "Roboto Slab", serif;
}
</style>
