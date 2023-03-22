<template>
  <div>
    <div class="flex justify-center items-center h-screen bg-green">
      <q-card class="w-[400px] p-5 m-5">
        <q-card-section>
          <img src="../../assets/images/login/encore1.png" class="" />
        </q-card-section>
        <q-card-section>
          <div class="text-[24px] text-golden text-center font-semibold">
            Login
          </div>
        </q-card-section>
        <q-card-section>
          <q-input
            dense
            filled
            bottom-slots
            v-model="text"
            placeholder="Username or Email"
          >
            <template v-slot:prepend>
              <q-icon name="person_outline" />
            </template>
          </q-input>
          <q-input
            dense
            filled
            bottom-slots
            v-model="text"
            placeholder="Password"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                name="visibility_off"
                @click="text = ''"
                class="cursor-pointer"
              />
            </template>
          </q-input>
          <div class="text-golden text-right">
            <a href="/forgotpass">Forget Password?</a>
          </div>
        </q-card-section>
        <q-card-section>
          <q-btn
            color="green full-width"
            label="login"
            @click="onClick"
            size="md"
            no-caps
          />
        </q-card-section>
      </q-card>
      <div class="absolute bottom-0 right-0 w-[70%]">
        <img src="../../assets/images/login/encore2.png" class="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
div {
  font-family: "Roboto Slab", serif;
}
</style>
