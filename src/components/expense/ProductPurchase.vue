<template>
  <div>
    <q-card flat class="my-card">
      <q-card-section class="grid md:grid-cols-2 grid-cols-1 gap-5">

        <SearchAddCompo for="product" :data="product_data" @selected="e => formData.product.id = e" label="Choose product"
          api="product-control" />
        <SearchAddCompo for="product" :data="product_category_data" @selected="e => formData.product.category = e"
          label="Choose product Category" createApi="product-control/category" />

        <q-input outlined v-model="formData.product.quantity" placeholder="product quantity" :dense="true" />
        <SearchAddCompo :data="vendor_data" @selected="e => formData.vendor = e" label="Vendor" api="users"
          userType="VENDOR" />
        <SearchAddCompo :data="project_data" for="project" @selected="e => formData.project = e" label="Project"
          api="project-control" />
        <q-input outlined v-model="formData.location" placeholder="Location" bg-color="white" :dense="true" />
        <div class="flex">
          <q-input outlined v-model="formData.amount_per" label="Amount per" bg-color="white" :dense="true"
            class="w-3/4" />
          <q-select class="bg-white w-1/4" outlined v-model="formData.amount_per_unit" :options="units" :dense="true"
            label="Units" />
        </div>
        <q-input outlined v-model="formData.amount" label="Total Amount" bg-color="white" :dense="true" />
        <q-input outlined v-model="formData.amount_paid" label="Paid Amount" bg-color="white" :dense="true" />
        <div>
          <q-uploader label="Individual upload" color="green" multiple @added="onAdded" @removed="onRemoved"
            class="w-full" />
        </div>

        <q-btn v-if="formData.uploads.length && authStore.canAccess('expense_write')" no-caps color="primary" icon="image"
          label="View images" @click="imageViewDialog = true" />

        <div></div>
        <div class="flex items-center gap-5 justify-end">

          <q-btn v-if="authStore.canAccess('expense_write')" label="Save" color="green" class="px-10 py-2.5"
            @click="registerUser" />
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
import { defineComponent, ref } from 'vue';
import SearchAddCompo from '../SearchAddCompo.vue';
import { ApiService } from 'src/service/api-service';
import { useAuthStore } from 'src/stores/auth.store';
export default defineComponent({
  name: 'ProductPurchase',
  components: {
    SearchAddCompo
  },
  data() {
    return {
      authStore: useAuthStore(),
      imagesState: 0,
      imageViewDialog: ref(false),
      maxFileSize: 3 * 1024 * 1024, // 3MB
      images: [],
      type: ref('pcs'),
      units: [ "PCS", "FEET", "KG", "METER", "INCH" ],
      apiService: new ApiService(),
      formData: {
        product: {
          id: null,
          quantity: null,
          category: null
        },
        project: null,
        vendor: null,
        location: null,
        amount: null,
        amount_paid: null,
        amount_per: null,
        amount_per_unit: null,
        uploads: [],
        request_type: 'PRODUCT_PURCHASE',
      },
      product_data: {
        label: null,
        value: null
      },
      project_data: {
        label: null,
        value: null
      },
      vendor_data: {
        label: null,
        value: null
      },
      product_category_data: {
        label: null,
        value: null
      },
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.apiService.get(`expense-control/${this.$route.query.id}`).then((res) => {
        Object.assign(this.formData, res.data.data);

        if (!res.data.data.product) return;
        this.product_data.label = res.data.data.product.id.title;
        this.product_data.value = res.data.data.product.id._id;

        if (!res.data.data.project) return;
        this.project_data.label = res.data.data.project.title;
        this.project_data.value = res.data.data.project._id;

        if (!res.data.data.vendor) return;
        this.vendor_data.label = res.data.data.vendor.first_name + ' ' + res.data.data.vendor.last_name;
        this.vendor_data.value = res.data.data.vendor._id;

        if (!res.data.data.product.category) return;
        this.product_category_data.label = res.data.data.product.category.title;
        this.product_category_data.value = res.data.data.product.category._id;
      })
    }
  },
  methods: {
    registerUser() {
      const formData = new FormData();
      Object.keys(this.formData).forEach((key) => {
        if (key == 'product') {
          formData.append('product[id]', this.formData[ key ].id);
          formData.append('product[quantity]', this.formData[ key ].quantity);
          formData.append('product[category]', this.formData[ key ].category);
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
