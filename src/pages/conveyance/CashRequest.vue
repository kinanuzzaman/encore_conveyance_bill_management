<template>
  <div>
    <section class="q-px-md">
      <q-card flat class="h-[85vh] bg-transparent w-1/2">
        <!-- <div class="flex justify-center py-10">
          <q-avatar
            size="100px"
            font-size="52px"
            color="teal"
            text-color="white"
            icon="account_circle"
          />
        </div> -->
        <q-card-section class="text-center text-4xl font-bold">
          Cash Request
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            v-model="name"
            placeholder="Amount"
            bg-color="white"
            :dense="true"
          />
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            v-model="designation"
            placeholder="Paid By"
            bg-color="white"
            :dense="true"
          />
        </q-card-section>
        <q-card-section>
          <q-select
            class="bg-white"
            outlined
            v-model="model"
            :options="options"
            :dense="true"
            label="Choose cash request type"
          />
        </q-card-section>
        <q-card-actions
          align="center"
          class="px-3 py-5 absolute bottom-0 w-full"
        >
          <q-btn label="Save" color="green" class="col" />
          <q-btn label="Decline" color="negative" class="col" />
        </q-card-actions>
      </q-card>
    </section>
  </div>
</template>

<script>
export default {
  setup() {
    return {
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
    };
  },
};
</script>

<style lang="scss" scoped></style>
