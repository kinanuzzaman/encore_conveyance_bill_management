<template>
  <div>
    <q-card flat class="my-card">
      <q-card-section class="grid md:grid-cols-2 grid-cols-1 gap-5">
        <!-- <SearchAddCompo label="Product" api="/product-control" @selected="e => formData.product.id = e" /> -->
        <q-input outlined v-model="formData.project" placeholder="Project Name" :dense="true" />
        <!-- <SearchAddCompo label="Vendor" api="/users/?user_type=VENDOR" @selected="e => formData.vendor = e" />
        <SearchAddCompo label="Project" api="/project-control" @selected="e => formData.project = e" /> -->
        <q-input outlined v-model="formData.transprt" placeholder="Transport" bg-color="white" :dense="true" />
        <q-input outlined v-model="formData.location_from" placeholder="Location From" bg-color="white" :dense="true" />
        <q-input outlined v-model="formData.location_to" placeholder="Location To" bg-color="white" :dense="true" />
        <!-- <div class="flex">
          <q-input outlined v-model="formData.amount_per" placeholder="Amount per" bg-color="white" :dense="true"
            class="w-3/4" />
          <q-select class="bg-white w-1/4" outlined v-model="formData.amount_per_unit" :options="units" :dense="true" />
        </div> -->
        <q-input outlined v-model="formData.amount" placeholder="Amount" bg-color="white" :dense="true" />
        <q-input outlined v-model="formData.notes" placeholder="Notes" bg-color="white" :dense="true" />
        <div class="col-span-2">
          <q-checkbox left-label v-model="labour" label="Labour" />
        </div>
        <div v-if="labour" class="col-span-2 grid md:grid-cols-2 grid-cols-1 gap-5">
          <q-input outlined v-model="formData.labour_quantity" placeholder="Labour Quantity" bg-color="white"
            :dense="true" />
          <q-input outlined v-model="formData.labour_amount" placeholder="Amount" bg-color="white" :dense="true" />
        </div>
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
      request_type: 'DELIVERY',
      project: null,
      transprt: null,
      location_from: null,
      location_to: null,
      amount: null,
      notes: null,
      labour_amount: null,
      labour_quantity: null,
    });
    return {
      labour: ref(false),
      // type: ref('pcs'),
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
