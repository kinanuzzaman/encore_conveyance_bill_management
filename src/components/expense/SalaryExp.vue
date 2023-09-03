<template>
  <div>
    <q-card flat class="my-card">
      <q-card-section class="grid md:grid-cols-2 grid-cols-1 gap-5">

        <div></div>
        <div class="flex items-center gap-5 justify-end">

          <q-btn label="Create" v-if="authStore.canAccess('expense_create') && !$route.query.id" color="green"
            class="px-10 py-2.5" @click="registerUser" />
          <q-btn label="Back" color="red" class="px-10 py-2.5" @click="$router.back()" />

        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ApiService } from 'src/service/api-service';
import { useAuthStore } from 'src/stores/auth.store';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {

  },
  data() {
    return {
      authStore: useAuthStore(),
      apiService: new ApiService(),
      formData: {
        request_type: 'SALARY',
        amount: null,
      }
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

      this.$emit('addExpense', formData);
    },
  }
})
</script>

<style lang="scss" scoped></style>
