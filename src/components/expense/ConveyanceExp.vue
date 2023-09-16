<template>
  <div>
    <q-card flat class="my-card">
      <q-card-section class="grid md:grid-cols-2 grid-cols-1 gap-5">
        <q-input outlined v-model="formData.reason" label="Reason" :dense="true" />
        <q-input outlined v-model="formData.transport" label="Transport" bg-color="white" :dense="true" />
        <q-input outlined v-model="formData.transportation_location.from" label="Location From" bg-color="white"
          :dense="true" />
        <q-input outlined v-model="formData.transportation_location.to" label="Location To" bg-color="white"
          :dense="true" />

        <q-input outlined v-model="formData.amount" label="Total Amount" type="number" bg-color="white" :dense="true" />
        <q-input outlined v-model="formData.notes" label="Notes" bg-color="white" :dense="true" />
        <div>
          <q-uploader v-if="authStore.canAccess('expense_write') && formData.status !== 'APPROVED'"
            label="Individual upload" color="green" multiple @added="onAdded" @removed="onRemoved" class="w-full" />
        </div>

        <q-btn color="primary" v-if="formData.uploads.length && authStore.canAccess('expense_write')" no-caps icon="image"
          label="View images" @click="confirm = true" />
        <div></div>
        <div class="flex items-center gap-5 justify-end">

          <q-btn v-if="authStore.canAccess('expense_create') && !$route.query.id" label="Create" color="green"
            class="px-10 py-2.5" @click="registerUser" />
          <q-btn v-if="authStore.canAccess('expense_write') && $route.query.id && formData.status !== 'APPROVED'"
            label="Update" color="green" class="px-10 py-2.5" @click="registerUser" />
          <q-btn label="Back" color="red" class="px-10 py-2.5" @click="$router.back()" />

        </div>
      </q-card-section>
    </q-card>

    <q-dialog v-model="confirm">

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
import { defineComponent, ref } from 'vue';
import { ApiService } from 'src/service/api-service';
import { useAuthStore } from 'src/stores/auth.store';
export default defineComponent({
  props: {
    expenseData: Object,
  },
  data() {
    return {
      apiService: new ApiService(),
      authStore: useAuthStore(),
      imagesState: ref(0),
      units: [ "PCS", "FEET", "KG", "METER", "INCH" ],
      images: [],
      imageViewDialog: ref(false),
      formData: {
        reason: null,
        request_type: 'CONVINCE',
        transportation_location: {
          from: null,
          to: null,
        },
        uploads: [],
        transport: null,
        amount: null,
        notes: null,
      },
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
      // check if all fields are filled
      if (Object.values(this.formData).some((val) => !val) && !this.$route.query.id) {
        this.$q.notify({
          color: 'negative',
          message: 'Please fill all the fields',
          icon: 'report_problem',
        });
        return;
      }
      const formData = new FormData();
      Object.keys(this.formData).forEach((key) => {
        if (key == 'transportation_location') {
          formData.append('transportation_location[from]', this.formData[ key ].from);
          formData.append('transportation_location[to]', this.formData[ key ].to);
        } else formData.append(key, this.formData[ key ]);
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
