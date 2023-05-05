<template>
  <div>
    <q-card flat class="my-card">
      <q-card-section class="grid md:grid-cols-2 grid-cols-1 gap-5">
        <q-input outlined v-model="data.reason" placeholder="Reason" :dense="true" />
        <q-input outlined v-model="data.amount" placeholder="Total Amount" bg-color="white" :dense="true" />
        <q-input outlined v-model="data.notes" placeholder="Notes" bg-color="white" :dense="true" />
        <div>
          <q-uploader label="Individual upload" color="green" multiple @added="onAdded" @removed="onRemoved"
            style="max-width: 300px" />
        </div>


        <div class="flex items-end justify-end">

          <q-btn v-if="$props.expenseData?.amount" label="Update" color="green" class="px-10 py-2.5" />
          <q-btn v-if="!$props.expenseData?.amount" label="Save" color="green" class="px-10 py-2.5"
            @click="registerUser" />

        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
// import SearchAddCompo from '../SearchAddCompo.vue';
export default defineComponent({
  components: {
    // SearchAddCompo
  },
  props: {
    expenseData: Object,
  },
  data() {
    return {
      maxFileSize: 3 * 1024 * 1024, // 3MB
      images: [],
      data: {
        request_type: 'OTHERS',
        reason: null,
        amount: null,
        notes: null,
      }
    };
  },
  mounted() {
    if (this.$props.expenseData) {
      this.data.reason = this.$props.expenseData.reason;
      this.data.amount = this.$props.expenseData.amount;
      this.data.notes = this.$props.expenseData.notes;
    }
  },
  methods: {
    registerUser() {
      const formData = new FormData();

      Object.keys(this.data).forEach((key) => {
        formData.append(key, this.data[ key ]);
      });

      this.images.forEach((image) => {
        formData.append('images', image);
      });

      this.$emit('addExpense', formData);
    },
    onAdded(files) {
      files.forEach((file) => {
        if (file.size > this.maxFileSize) {
          this.$q.notify({
            color: 'negative',
            message: 'File size exceeded',
            icon: 'report_problem',
          });
          return;
        }
        this.images.push(file);
      });
    },
    onRemoved(files) {
      this.images = this.images.filter((image) => {
        return !files.includes(image);
      });
      console.log("🚀 ~ file: OtherBill.vue:81 ~ this.images=this.images.filter ~ this.images:", this.images)
    }
  }
})
</script>

<style lang="scss" scoped></style>
