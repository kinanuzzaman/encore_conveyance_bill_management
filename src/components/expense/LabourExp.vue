<template>
  <div>
    <q-card flat class="my-card">
      <q-card-section class="grid md:grid-cols-2 grid-cols-1 gap-5">
        <SearchAddCompo label="Project Name" api="project-control" :selected="formData.project" />
        <q-input outlined v-model="formData.labour_quantity" placeholder="Labour quantity" :dense="true" />
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
import { defineComponent, reactive, onMounted } from 'vue';
import SearchAddCompo from '../SearchAddCompo.vue';
export default defineComponent({
  components: {
    SearchAddCompo
  },
  props: {
    expenseData: Object,
  },
  setup(props) {

    const formData = reactive({
      request_type: 'LABOUR',
      project: null,
      labour_quantity: null,
      amount: null,
      notes: null,
    });
    onMounted(() => {
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
