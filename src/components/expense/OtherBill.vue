<template>
  <div>
    <q-card flat class="my-card">
      <q-card-section class="grid grid-cols-2 gap-5">
        <q-input outlined v-model="formData.reason" placeholder="Reason" :dense="true" />
        <q-input outlined v-model="formData.amount" placeholder="Total Amount" bg-color="white" :dense="true" />
        <q-input outlined v-model="formData.notes" placeholder="Notes" bg-color="white" :dense="true" />
        <div>
          <q-uploader url="http://localhost:4444/upload" label="Individual upload" color="green" multiple
            style="max-width: 300px" />
        </div>


        <div class="flex items-end justify-end">

          <q-btn v-if="formData.amount" label="Update" color="green" class="px-10 py-2.5" />
          <q-btn v-if="!formData.amount" label="Save" color="green" class="px-10 py-2.5" @click="registerUser" />

        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted } from 'vue';
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
      request_type: 'OTHERS',
      reason: null,
      amount: null,
      notes: null,
    });

    onMounted(() => {
      console.log(props.expenseData.amount);
      if (props.expenseData) {
        formData.reason = props.expenseData.reason;
        formData.amount = props.expenseData.amount;
        formData.notes = props.expenseData.notes;
      }
    });
    return {
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
