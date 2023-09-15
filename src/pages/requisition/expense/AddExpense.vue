<template>
  <main class="px-5">
    <div class="flex md:justify-start justify-center">
      <section class="lg:w-1/2">
        <div class="px-4">
          <q-select :disable="!!$route.query.id" class="bg-white" outlined v-model="activeCompo" :options="options"
            :dense="true" label="Choose expense type" />
        </div>
        <component :is="activeCompo.value" @addExpense="createExpance"></component>
      </section>
    </div>

  </main>
</template>

<script>
import BpExp from 'src/components/expense/BpExp.vue';
import ConveyanceExp from 'src/components/expense/ConveyanceExp.vue';
import DeliveryExp from 'src/components/expense/DeliveryExp.vue';
import FactoryExp from 'src/components/expense/FactoryExp.vue';
import LabourExp from 'src/components/expense/LabourExp.vue';
import MarketingExp from 'src/components/expense/MarketingExp.vue';
import MobileAllowance from 'src/components/expense/MobileAllowance.vue';
import OfficeExpense from 'src/components/expense/OfficeExpense.vue';
import OtherBill from 'src/components/expense/OtherBill.vue';
import ProductPurchase from 'src/components/expense/ProductPurchase.vue';
import SalaryExp from 'src/components/expense/SalaryExp.vue';
import { ref, onMounted } from 'vue';
import { ApiService } from 'src/service/api-service';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
export default {
  components: { ProductPurchase, OfficeExpense, DeliveryExp, ConveyanceExp, FactoryExp, BpExp, LabourExp, OtherBill, SalaryExp, MobileAllowance, MarketingExp },
  setup() {
    const activeCompo = ref({
      label: "Product Purchase",
      value: "ProductPurchase",
    })
    const apiService = new ApiService();
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
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
      label: "Salary Received Receipt",
      value: "SalaryExp",
      type: "SALARY",
    },
    {
      label: "Other Bill",
      value: "OtherBill",
      type: "OTHERS",
    }, ]
    const expenseDetails = ref(null);
    async function createExpance(formData) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          if (route.query.id) {
            console.log("🚀 ~ file: AddExpense.vue:113 ~ navigator.geolocation.getCurrentPosition ~ formData:", formData)
            await apiService.patch(`/expense-control/${route.query.id}`,
              formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            );
            $q.notify({
              message: "Expense updated successfully",
              color: "green",
              position: "top",
            })
            router.back();
            return
          }
          const { latitude, longitude } = position.coords;
          formData.creator_location = {
            latitude: latitude,
            longitude: longitude,
          };
          formData.append('creator_location[latitude]', latitude);
          formData.append('creator_location[longitude]', longitude);

          await apiService.post('/expense-control/create', formData);
          $q.notify({
            message: "Expense created successfully",
            color: "green",
            position: "top",
          })
          router.back()
        } catch (error) {
          console.log("🚀 ~ file: AddExpense.vue:138 ~ navigator.geolocation.getCurrentPosition ~ error:", error)
          $q.notify({
            message: "Something went wrong",
            color: "red",
            position: "top",
          })
        }
      },
        function (error) {
          console.log("🚀 ~ file: AddExpense.vue:143 ~ navigator.geolocation.getCurrentPosition ~ error:", error)
          if (error.code === error.PERMISSION_DENIED) {
            // User denied geolocation
            $q.notify({
              message: "Allow Geolocation, or you can't continue",
              color: "red",
              position: "top",
            })
          } else {
            // Other geolocation error occurred
            console.error("Geolocation error:", error);
          }
        }
      );
    }
    onMounted(() => {
      if (route.query.type) {
        activeCompo.value = options.find((e) => e.type === route.query.type);
      }
    });

    return {
      expenseDetails,
      createExpance,
      activeCompo,
      options,
    };
  },
}
</script>

<style lang="scss" scoped></style>
