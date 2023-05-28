<template>
  <div>
    <q-card flat class="my-card">
      <q-card-section class="grid md:grid-cols-2 grid-cols-1 gap-5">

        <SearchAddCompo for="product" :selected="formData.product.id" label="Choose product" api="product-control" />
        <SearchAddCompo for="product" :selected="formData.product.id" label="Choose product Category"
          createApi="product-control/category" />

        <q-input outlined v-model="formData.product.quantity" placeholder="product quantity" :dense="true" />
        <SearchAddCompo :selected="formData.vendor" label="Vendor" api="users" userType="VENDOR" />
        <SearchAddCompo for="project" :selected="formData.project" label="Project" api="project-control" />
        <q-input outlined v-model="formData.location" placeholder="Location" bg-color="white" :dense="true" />
        <div class="flex">
          <q-input outlined v-model="formData.amount_per" placeholder="Amount per" bg-color="white" :dense="true"
            class="w-3/4" />
          <q-select class="bg-white w-1/4" outlined v-model="formData.amount_per_unit" :options="units" :dense="true"
            label="Units" />
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
import { defineComponent, reactive, ref, onMounted } from 'vue';
import SearchAddCompo from '../SearchAddCompo.vue';
export default defineComponent({
  name: 'ProductPurchase',
  components: {
    SearchAddCompo
  },
  props: {
    expenseData: Object,
  },
  setup(props) {

    const formData = reactive({
      product: {
        id: null,
        quantity: null,
      },
      project: null,
      vendor: null,
      location: null,
      amount: null,
      amount_paid: null,
      amount_per: null,
      amount_per_unit: null,
      amount_due: null,
      request_type: 'PRODUCT_PURCHASE',
    });
    onMounted(() => {
      if (props.expenseData) {
        formData.reason = props.expenseData.reason;
        formData.amount = props.expenseData.amount;
        formData.notes = props.expenseData.notes;
      }
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
