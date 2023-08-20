<template>
  <div>
    <q-card flat class="my-card">
      <q-card-section class="grid md:grid-cols-2 grid-cols-1 gap-5">
        <q-input outlined v-model="data.reason" label="Reason" :dense="true" />
        <q-input outlined v-model="data.amount" label="Total Amount" bg-color="white" :dense="true" />
        <q-input outlined v-model="data.notes" label="Notes" bg-color="white" :dense="true" />
        <div>
          <q-uploader v-if="authStore.canAccess('expense_write') && data.status !== 'APPROVED'" label="Individual upload"
            color="green" multiple @added="onAdded" @removed="onRemoved" class="w-full" />
        </div>
        <q-btn v-if="data.uploads.length && authStore.canAccess('expense_write')" no-caps color="primary" icon="image"
          label="View images" @click="imageViewDialog = true" />

        <div></div>
        <div class="flex items-center gap-5 justify-end">

          <q-btn v-if="authStore.canAccess('expense_write') && data.status !== 'APPROVED'" label="Save" color="green"
            class="px-10 py-2.5" @click="registerUser" />
          <q-btn label="Back" color="red" class="px-10 py-2.5" @click="$router.back()" />

        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="imageViewDialog">

      <div class="w-full">
        <div class="q-pa-md">
          <q-carousel animated v-model="imagesState" arrows navigation infinite>
            <q-carousel-slide v-for="(img, i) in data.uploads" :key="i" :name="i" :img-src="img" />
          </q-carousel>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { ApiService } from 'src/service/api-service';
import { useAuthStore } from 'src/stores/auth.store';
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
      authStore: useAuthStore(),
      apiService: new ApiService(),
      imagesState: 0,
      maxFileSize: 3 * 1024 * 1024, // 3MB
      images: [],
      imageViewDialog: false,
      data: {
        request_type: 'OTHERS',
        reason: null,
        amount: null,
        notes: null,
        uploads: [],
      }
    };
  },
  mounted() {
    if (this.$route.query.id) {
      this.apiService.get(`expense-control/${this.$route.query.id}`).then((res) => {
        Object.assign(this.data, res.data.data);
      })
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
    }
  }
})
</script>

<style lang="scss" scoped></style>
