<template>
  <div>
    <q-card flat class="my-card">
      <q-card-section class="grid md:grid-cols-2 grid-cols-1 gap-5">
        <q-input outlined v-model="formData.amount" placeholder="Amount" :dense="true" />

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
export default defineComponent({
  components: {

  },
  props: {
    expenseData: Object,
  },
  setup(props) {

    const formData = reactive({
      amount: null,
      request_type: 'SALARY',
    });
    onMounted(() => {
      if (props.expenseData) {
        formData.amount = props.expenseData.amount;
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
