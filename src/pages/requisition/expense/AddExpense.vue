<template>
  <main class="px-5">
    <div class="row">
      <section class="col-md-6">
        <div class="px-4">
          <q-select class="bg-white" outlined v-model="activeCompo" :options="options" :dense="true"
            label="Choose expense type" />
        </div>
        <component :is="activeCompo.value"></component>
      </section>
      <section class="col-md-6 px-5 ">
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcE5ok1cPwHeGuCEe03a_X5fxT0tIJSeKdolnp-0sqSyjVO6mD5p1ryrGuqCQyejAQnIM&usqp=CAU"
            spinner-color="primary" spinner-size="82px" class="rounded-xl md:h-[871px]" fit="fill" />
        </div>
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
import { ref } from 'vue';
export default {
  components: { ProductPurchase, OfficeExpense, DeliveryExp, ConveyanceExp, FactoryExp, BpExp, LabourExp, OtherBill, SalaryExp, MobileAllowance, MarketingExp },
  setup() {
    const activeCompo = ref({
      label: "BP",
      value: "BpExp",
    })

    return {
      activeCompo,
      options: [ {
        label: "Product Purchase",
        value: "ProductPurchase",
      },
      {
        label: "Office",
        value: "OfficeExpense",
      },
      {
        label: "Delivery",
        value: "DeliveryExp",
      },
      {
        label: "Conveyance",
        value: "ConveyanceExp",
      },
      {
        label: "Factory",
        value: "FactoryExp",
      },
      {
        label: "BP",
        value: "BpExp",
      },
      {
        label: "Labour",
        value: "LabourExp",
      },
      {
        label: "Marketing",
        value: "MarketingExp",
      },
      {
        label: "Mobile Allowance",
        value: "MobileAllowance",
      },
      {
        label: "Salary",
        value: "SalaryExp",
      },
      {
        label: "Other Bill",
        value: "OtherBill",
      }, ]
    };
  },
}
</script>

<style lang="scss" scoped></style>
