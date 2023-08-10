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
        <div class="grid md:grid-cols-2 grid-cols-1" v-if="cashPayload.type?.type !== 'SALARY'">
          <q-card-section>
            <q-input outlined v-model="cashPayload.amount" placeholder="Amount" bg-color="white" :dense="true" />
          </q-card-section>
          <q-card-section>
            <SearchAddCompo :data="payerData" label="Paid By" api="/users/?user_type=EMPLOYEE"
              @selected="e => cashPayload.payer = e" :v-model="cashPayload.payer" />
          </q-card-section>
        </div>

        <q-card-actions align="center" class="px-3 py-5 absolute bottom-0 w-full">
          <q-btn v-if="authStore.canAccess('cash_write')" label="Save" color="green" class="col"
            @click="saveCashRequest" />
          <q-btn label="Back" color="negative" class="col" @click="$router.back()" />
        </q-card-actions>
      </q-card>
    </section>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { ApiService } from 'src/service/api-service';
import SearchAddCompo from '../SearchAddCompo.vue';
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth.store';
export default {
  components: {
    SearchAddCompo
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const apiService = new ApiService();
    const authStore = useAuthStore();
    const $q = useQuasar();
    const payerData = reactive({
      label: null,
      value: null,
    });
    const cashPayload = reactive({
      amount: null,
      payer: null,
      type: null,
    });
    const options = [ {
      label: "Product Purchase",
      value: "ProductPurchase",
      type: "PRODUCT_PURCHASE",
    },
    {
      label: "Office",
      value: "OfficeExpense",
      type: "OFFICE",
    },
    {
      label: "Delivery",
      value: "DeliveryExp",
      type: "DELIVERY",
    },
    {
      label: "Conveyance",
      value: "ConveyanceExp",
      type: "CONVINCE",
    },
    {
      label: "Factory",
      value: "FactoryExp",
      type: "FACTORY",
    },
    {
      label: "BP",
      value: "BpExp",
      type: "BP",
    },
    {
      label: "Labour",
      value: "LabourExp",
      type: "LABOUR",
    },
    {
      label: "Marketing",
      value: "MarketingExp",
      type: "MARKETING",
    },
    {
      label: "Mobile Allowance",
      value: "MobileAllowance",
      type: "MOBILE_ALLOWANCE",
    },
    {
      label: "Salary Request",
      value: "SalaryExp",
      type: "SALARY",
    },
    {
      label: "Other",
      value: "OtherBill",
      type: "OTHERS",
    }, ]

    const saveCashRequest = async () => {
      if (!navigator.geolocation) {
        $q.notify({
          message: "Allow Geolocation, or you can't continue",
          color: "red",
          position: "top",
        })
        return;
      }
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          if (route.query.id) {
            await apiService.patch(`/cash-control/${route.query.id}`, {
              ...cashPayload,
              type: cashPayload.type.type,
            });
            router.back();
          }
          else {
            cashPayload.creator_location = {
              latitude,
              longitude,
            };
            await apiService.post('/cash-control/create', {
              ...cashPayload,
              type: cashPayload.type.type,
            });
            router.back();
          }
        } catch (error) {
          $q.notify({
            message: error.message,
            color: 'negative',
            position: 'top',
            timeout: 2000,
          });
        }
      })
    }
    onMounted(async () => {
      if (route.query.id) {
        const details = await apiService.get(`/cash-control/${route.query.id}`);
        console.log("🚀 ~ file: NewCashRequest.vue:140 ~ onRequest ~ data:", details.data.data);
        if (details.data.data) {
          const type = options.find((item) => {
            return item.type == details.data.data[ 0 ].type;
          });

          if (type) {
            cashPayload.type = type;
            cashPayload.amount = details.data.data[ 0 ].amount;
            cashPayload.payer = details.data.data[ 0 ].payer._id;
            payerData.label = details.data.data[ 0 ].payer.first_name + " " + details.data.data[ 0 ].payer.last_name;
            payerData.value = details.data.data[ 0 ].payer._id;
            // concat(" ", details.data.data[0].payer.last_name)
            console.log(details);
          }
        }
      }
    });
    return {
      cashPayload,
      saveCashRequest,
      options,
      payerData,
      authStore
    }
  }
};
</script>

<style lang="scss" scoped></style>
