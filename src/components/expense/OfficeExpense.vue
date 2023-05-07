<template>
  <div>
    <q-card flat class="my-card">
      <q-card-section class="grid md:grid-cols-2 grid-cols-1 gap-5">
        <q-input outlined v-model="formData.reason" placeholder="Reason" :dense="true" />
        <q-input outlined v-model="formData.amount" placeholder="Amount" :dense="true" />

        <!-- <q-input outlined v-model="formData.payeer" placeholder="Paid to" bg-color="white" :dense="true" /> -->
        <SearchAddCompo label="Paid to" api="/users" @selected="e => formData.payeer = e" />


        <q-input outlined v-model="formData.details" placeholder="Details" bg-color="white" :dense="true" />
        <div>
          <q-uploader url="http://localhost:4444/upload" label="Individual upload" color="green" multiple
            style="max-width: 300px" />
        </div>
        <div class="flex items-end justify-end">

          <q-btn label="Save" color="green" class="px-10 py-2.5" @click="registerUser" />

        </div>
      </q-card-section>
      <!-- <q-card-actions align="center" class="row mx-2 py-5">
          <q-btn label="Create" color="green" class="col" />
          <q-btn label="Decline" color="negative" class="col" />
        </q-card-actions> -->
    </q-card>
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue';
import SearchAddCompo from '../SearchAddCompo.vue';
export default defineComponent({
  components: {
    SearchAddCompo
  },
  props: {
    expenseData: Object,
  },
  setup() {

    const formData = reactive({
      payeer: null,
      reason: null,
      details: null,
      request_type: 'OFFICE',
      amount: null,
    });
    return {
      formData,
    }
  },
  methods: {
    registerUser() {
      this.$emit('addExpense', this.formData);
    }
  },
  mounted() {
    if (this.$props.expenseData) {
      this.data.payeer = this.$props.expenseData.payeer;
      this.data.reason = this.$props.expenseData.reason;
      this.data.amount = this.$props.expenseData.amount;
      this.data.details = this.$props.expenseData.details;
    }
  },
})
</script>

<style lang="scss" scoped></style>
