<template>
  <div class="px-4 row">

    <section class="col-lg-6 px-5 ">
      <q-card flat>
        <div class="text-2xl font-semibold mx-5">Add Projects</div>
        <q-card-section class="grid md:grid-cols-2 grid-cols-1 gap-5">
          <q-input outlined v-model="formData.title" placeholder="Project Name" :dense="true" />
          <q-input outlined v-model="formData.type" placeholder="Project Type" :dense="true" />
          <q-input outlined v-model="formData.description" placeholder="Project description" :dense="true" />
          <q-input outlined v-model="formData.address" placeholder="Address" :dense="true" />
          <q-input outlined v-model="formData.budget" placeholder="Budget" :dense="true" />
          <SearchAddCompo :data="vendor_data" @selected="e => formData.vendor = e" label="Vendor" api="users"
            userType="VENDOR" />
          <SearchAddCompo :data="client_data" @selected="e => formData.client = e" label="Client" api="users"
            userType="CLIENT" />
          <q-input outlined v-model="formData.start_date" type="date" label="Start Date" :dense="true" />
          <q-input outlined v-model="formData.end_date" type="date" label="End Date" :dense="true" />

          <div class="flex items-end justify-end">

            <q-btn label="Save" v-if="authStore.canAccess('project_write')" color="green" class="px-10 py-2.5"
              @click="registerUser" />
            <q-btn label="Back" color="green" class="px-10 py-2.5" @click="$router.back()" />

          </div>
        </q-card-section>
      </q-card>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import SearchAddCompo from '../../components/SearchAddCompo.vue';
import { ApiService } from 'src/service/api-service';
import { useAuthStore } from 'src/stores/auth.store';
export default defineComponent({
  name: 'AddProject',
  components: {
    SearchAddCompo
  },
  data() {
    return {
      apiService: new ApiService(),
      authStore: useAuthStore(),
      formData: {
        title: '',
        type: '',
        description: '',
        address: '',
        budget: '',
        vendor: '',
        client: '',
        start_date: '',
        end_date: ''
      },
      vendor_data: {
        label: null,
        value: null
      },
      client_data: {
        label: null,
        value: null
      },
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.apiService.get(`project-control/${this.$route.query.id}`).then((res) => {
        Object.assign(this.formData, res.data.data);

        if (!res.data.data.vendor) return;
        this.vendor_data.label = res.data.data.vendor.first_name + ' ' + res.data.data.vendor.last_name;
        this.vendor_data.value = res.data.data.vendor._id;

        if (!res.data.data.client) return;
        this.client_data.label = res.data.data.client.first_name + ' ' + res.data.data.client.last_name;
        this.client_data.value = res.data.data.client._id;
      })
    }
  },
  methods: {
    async registerUser() {
      if (this.$route.query.id) {
        await this.apiService.patch(`project-control/${this.$route.query.id}`, this.formData);
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Project Updated Successfully',
          position: 'top',
          timeout: 2000
        })
        this.$router.push('/projects');
        return;
      } else {
        await this.apiService.post('project-control/create', this.formData);
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Project Added Successfully',
          position: 'top',
          timeout: 2000
        })
        this.$router.push('/projects');
        return;
      }
    },
  }
})
</script>

<style lang="scss" scoped></style>
