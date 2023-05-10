<template>
  <div>
    <q-card flat class="my-card">
      <q-card-section class="grid md:grid-cols-2 grid-cols-1 gap-5">
        <q-input outlined v-model="formData.reason" placeholder="Reason" :dense="true" />
        <q-input outlined v-model="formData.amount" placeholder="Amount" bg-color="white" :dense="true" />
        <q-input outlined v-model="formData.notes" placeholder="Notes" bg-color="white" :dense="true" />
        <div>
          <q-uploader url="http://localhost:4444/upload" label="Individual upload" color="green" multiple
            style="max-width: 300px" />
        </div>


        <div class="flex items-end justify-end">

          <q-btn label="Save" color="green" class="px-10 py-2.5" @click="registerUser" />

        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
// import SearchAddCompo from '../SearchAddCompo.vue';
export default defineComponent({
  components: {
    // SearchAddCompo
  },
  setup() {

    const formData = reactive({
      product: {
        id: null,
        quantity: null,
      },
      vendor: null,
      request_type: 'BP',
      project: null,
      vendor: null,
      location: null,
      amount: null,
      amount_paid: null,
      amount_per: null,
      amount_per_unit: null,
      amount_due: null,
    });
    return {
      type: ref('pcs'),
      units: ["PCS", "FEET", "KG", "METER", "INCH"],
      formData,
    }
  },
  methods: {
    registerUser() {
      this.$emit('addExpense', this.formData);
    }
  }
})
</script>

<style lang="scss" scoped></style>
