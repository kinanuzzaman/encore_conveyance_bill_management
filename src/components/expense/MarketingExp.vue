<template>
  <div>
    <q-card flat class="my-card">
      <q-card-section class="grid md:grid-cols-2 grid-cols-1 gap-5">
        <q-input outlined v-model="formData.reason" label="Reason" :dense="true" />
        <q-input outlined v-model="formData.amount" label="Amount" bg-color="white" :dense="true" />
        <q-input outlined v-model="formData.notes" label="Notes" bg-color="white" :dense="true" />
        <div>
          <q-uploader v-if="authStore.canAccess('expense_write') && formData.status !== 'APPROVED'"
            label="Individual upload" color="green" multiple @added="onAdded" @removed="onRemoved" class="w-full" />
        </div>

        <q-btn v-if="formData.uploads.length && authStore.canAccess('expense_write')" no-caps color="primary" icon="image"
          label="View images" @click="imageViewDialog = true" />

        <div></div>
        <div class="flex items-center gap-5 justify-end">

          <q-btn v-if="authStore.canAccess('expense_write') && formData.status !== 'APPROVED'" label="Save" color="green"
            class="px-10 py-2.5" @click="registerUser" />
          <q-btn label="Back" color="red" class="px-10 py-2.5" @click="$router.back()" />

        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="imageViewDialog">

      <div class="w-full">
        <div class="q-pa-md">
          <q-carousel animated v-model="imagesState" arrows navigation infinite>
            <q-carousel-slide v-for="(img, i) in formData.uploads" :key="i" :name="i" :img-src="img" />
          </q-carousel>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { ApiService } from 'src/service/api-service';
import { useAuthStore } from 'src/stores/auth.store';
// import SearchAddCompo from '../SearchAddCompo.vue';
export default defineComponent({
  components: {
    // SearchAddCompo
  },
  data() {
    return {
      authStore: useAuthStore(),
      imagesState: ref(0),
      apiService: new ApiService(),
      imageViewDialog: false,
      formData: reactive({
        reason: '',
        amount: '',
        notes: '',
        uploads: [],
        request_type: 'MARKETING',
      }),
      images: []
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.apiService.get(`expense-control/${this.$route.query.id}`).then((res) => {
        Object.assign(this.formData, res.data.data);
      })
    }
  },
  methods: {
    registerUser() {
      const formData = new FormData();
      Object.keys(this.formData).forEach((key) => {
        formData.append(key, this.formData[ key ]);
      });

      this.images.forEach((image) => {
        formData.append('images', image);
      });

      this.$emit('addExpense', formData);
    },
    onAdded(files) {
      files.forEach((file) => {
        if (file.size > (3 * 1024 * 1024)) {
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
