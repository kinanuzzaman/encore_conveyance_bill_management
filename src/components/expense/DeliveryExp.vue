<template>
  <div>
    <q-card flat class="my-card">
      <q-card-section class="grid grid-cols-2 gap-5">
        <SearchAddCompo label="Product" api="/product-control" @selected="e => formData.product.id = e" />
        <q-input outlined v-model="formData.product.quantity" placeholder="product quantity" :dense="true" />
        <SearchAddCompo label="Vendor" api="/users/?user_type=VENDOR" @selected="e => formData.vendor = e" />
        <SearchAddCompo label="Project" api="/project-control" @selected="e => formData.project = e" />
        <q-input outlined v-model="formData.location" placeholder="Location" bg-color="white" :dense="true" />
        <div class="flex">
          <q-input outlined v-model="formData.amount_per" placeholder="Amount per" bg-color="white" :dense="true"
            class="w-3/4" />
          <q-select class="bg-white w-1/4" outlined v-model="formData.amount_per_unit" :options="units" :dense="true" />
        </div>
        <q-input outlined v-model="formData.amount" placeholder="Total Amount" bg-color="white" :dense="true" />
        <q-input outlined v-model="formData.amount_paid" placeholder="Paid Amount" bg-color="white" :dense="true" />
        <q-input outlined v-model="formData.amount_due" placeholder="Due Amount" bg-color="white" :dense="true" />
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
import SearchAddCompo from '../SearchAddCompo.vue';
export default defineComponent({
  components: {
    SearchAddCompo
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
      units: [ "PCS", "FEET", "KG", "METER", "INCH" ],
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
