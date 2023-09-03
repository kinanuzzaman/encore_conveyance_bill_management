<template>
  <div>
    <q-card flat class="my-card">
      <q-card-section class="grid md:grid-cols-2 grid-cols-1 gap-5">
        <SearchAddCompo :data="client_data" @selected="e => formData.client = e" label="Client" api="users"
          userType="CLIENT" />
        <SearchAddCompo :data="project_data" for="project" @selected="e => formData.project = e" label="Project"
          api="project-control" />
        <q-input outlined v-model="formData.transport" label="Transport" bg-color="white" :dense="true" />
        <q-input outlined v-model="formData.transportation_location.from" label="Location From" bg-color="white"
          :dense="true" />
        <q-input outlined v-model="formData.transportation_location.to" label="Location To" bg-color="white"
          :dense="true" />
        <!-- <div class="flex">
          <q-input outlined v-model="formData.amount_per" label="Amount per" bg-color="white" :dense="true"
            class="w-3/4" />
          <q-select class="bg-white w-1/4" outlined v-model="formData.amount_per_unit" :options="units" :dense="true" />
        </div> -->
        <q-input outlined v-model="formData.amount" label="Amount" bg-color="white" :dense="true" />
        <q-input outlined v-model="formData.notes" label="Notes" bg-color="white" :dense="true" />
        <div class="col-span-2">
          <q-checkbox left-label v-model="labour" label="Labour" />
        </div>
        <div v-if="labour" class="col-span-2 grid md:grid-cols-2 grid-cols-1 gap-5">
          <q-input outlined v-model="formData.labour_quantity" label="Labour Quantity" bg-color="white" :dense="true" />
          <q-input outlined v-model="formData.labour_amount" label="Amount" bg-color="white" :dense="true" />
        </div>
        <div>
          <q-uploader v-if="authStore.canAccess('expense_write') && formData.status !== 'APPROVED'"
            label="Individual upload" color="green" multiple @added="onAdded" @removed="onRemoved" class="w-full" />
        </div>

        <q-btn v-if="formData.uploads.length && authStore.canAccess('expense_write')" no-caps color="primary" icon="image"
          label="View images" @click="imageViewDialog = true" />

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
import { ApiService } from 'src/service/api-service';
import { useAuthStore } from 'src/stores/auth.store';
import { defineComponent, ref } from 'vue';
import SearchAddCompo from '../SearchAddCompo.vue';
export default defineComponent({
  components: {
    SearchAddCompo
  },
  data() {
    return {
      authStore: useAuthStore(),
      apiService: new ApiService(),
      imageViewDialog: false,
      imagesState: 0,
      images: [],
      formData: {
        request_type: 'DELIVERY',
        transport: null,
        transportation_location: {
          from: null,
          to: null
        },
        amount: null,
        notes: null,
        project: null,
        client: null,
        uploads: [],
        labour_amount: null,
        labour_quantity: null,
      },
      project_data: {
        label: null,
        value: null
      },
      client_data: {
        label: null,
        value: null
      },
      units: [ "PCS", "FEET", "KG", "METER", "INCH" ],
      labour: ref(false),

    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.apiService.get(`expense-control/${this.$route.query.id}`).then((res) => {
        Object.assign(this.formData, res.data.data);

        if (!res.data.data.project) return;
        this.project_data.label = res.data.data.project.title;
        this.project_data.value = res.data.data.project._id;

        if (!res.data.data.client) return;
        this.client_data.label = res.data.data.client.first_name + ' ' + res.data.data.client.last_name;
        this.client_data.value = res.data.data.client._id;
      })
    }
  },
  methods: {
    registerUser() {
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
