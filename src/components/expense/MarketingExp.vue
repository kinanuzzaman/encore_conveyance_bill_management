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
import { defineComponent, reactive, ref, onMounted } from 'vue';
// import SearchAddCompo from '../SearchAddCompo.vue';
export default defineComponent({
  components: {
    // SearchAddCompo
  },
  props: {
    expenseData: Object,
  },
  setup(props) {

    const formData = reactive({
      request_type: 'FACTORY',
      reason: null,
      amount: null,
      notes: null,
    });
    onMounted(() => {
      if (props.expenseData) {
        data.reason = props.expenseData.reason;
        data.amount = props.expenseData.amount;
        data.notes = props.expenseData.notes;
      }
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
