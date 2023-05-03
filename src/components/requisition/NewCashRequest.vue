<template>
  <div>
    <section class="q-px-md">
      <q-card flat class="h-[85vh] bg-transparent w-1/2">
        <!-- <div class="flex justify-center py-10">
            <q-avatar
              size="100px"
              font-size="52px"
              color="teal"
              text-color="white"
              icon="account_circle"
            />
          </div> -->
        <q-card-section class="text-center text-4xl font-bold">
          Cash Request
        </q-card-section>
        <q-card-section>
          <q-select class="bg-white" outlined v-model="cashPayload.type" :options="options" :dense="true"
            label="Choose cash request type" />
        </q-card-section>
        <div class="grid md:grid-cols-2 grid-cols-1">
          <q-card-section>
            <q-input outlined v-model="cashPayload.amount" placeholder="Amount" bg-color="white" :dense="true" />
          </q-card-section>
          <q-card-section>
            <!-- <q-input outlined v-model="cashPayload.payeer" placeholder="Paid By" bg-color="white" :dense="true" /> -->
            <SearchAddCompo label="Paid By" api="/users/?user_type=EMPLOYEE" @selected="e => cashPayload.payeer = e" />
          </q-card-section>
        </div>

        <q-card-actions align="center" class="px-3 py-5 absolute bottom-0 w-full">
          <q-btn label="Save" color="green" class="col" @click="saveCashRequest" />
          <q-btn label="Decline" color="negative" class="col" @click="$router.back()" />
        </q-card-actions>
      </q-card>
    </section>
  </div>
</template>

<script>
import { ApiService } from 'src/service/api-service';
import SearchAddCompo from '../SearchAddCompo.vue';
export default {
  components: {
    SearchAddCompo
  },
  data() {
    return {
      apiService: new ApiService(),
      options: ["PAID", "RECEIVED"],
      cashPayload: {
        amount: null,
        payeer: null,
        type: null,
      }
    };
  },
  methods: {
    async saveCashRequest() {
      try {
        await this.apiService.post('/cash-control/create', this.cashPayload);
        this.$router.back();
      } catch (error) {
        this.$q.notify({
          message: error.message,
          color: 'negative',
          position: 'top',
          timeout: 2000,
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
