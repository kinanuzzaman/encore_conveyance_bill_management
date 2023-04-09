<template>
    <main class="px-5">
        <div class="row">
            <section class="col-md-6">
                <div class="px-4">
                    <q-select class="bg-white" outlined v-model="type" :options="options" :dense="true"
                        label="Choose expense type" />
                </div>
                <div v-if="type == 'Product Purchase'">
                    <ProductPurchase />
                </div>
                <div v-if="type == 'Office'">
                    <OfficeExpense />
                </div>
                <div v-if="type == 'Delivery'">
                    <DeliveryExp />
                </div>
                <div v-if="type == 'Conveyance'">
                    <ConveyanceExp />
                </div>
                <div v-if="type == 'Factory'">
                    <FactoryExp />
                </div>
                <div v-if="type == 'BP'">
                    <BpExp />
                </div>
                <div v-if="type == 'Labour'">
                    <LabourExp />
                </div>
                <div v-if="type == 'Marketing'">
                    <MarketingExp />
                </div>
                <div v-if="type == 'Mobile Allowance'">
                    <MobileAllowance />
                </div>
                <div v-if="type == 'Salary'">
                    <SalaryExp />
                </div>
                <div v-if="type == 'Other Bill'">
                    <OtherBill />
                </div>

            </section>
            <section class="col-md-6 px-5 ">
                <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcE5ok1cPwHeGuCEe03a_X5fxT0tIJSeKdolnp-0sqSyjVO6mD5p1ryrGuqCQyejAQnIM&usqp=CAU"
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
import { ref, reactive } from 'vue';
export default {
    setup() {

        const userRegister = reactive({
            first_name: "",
            last_name: "",
            email: "",
            dob: "",
            profile_img: "",
            designetion: "",
            password: "",
        })
        return {
            userRegister,
            type: ref(""),
            options: ["Product Purchase", "Office", "Delivery", "Conveyance", "Factory", "BP", "Labour", "Marketing", "Mobile Allowance", "Salary", "Other Bill"],
        };
    },
    components: { ProductPurchase, OfficeExpense, DeliveryExp, ConveyanceExp, FactoryExp, BpExp, LabourExp, OtherBill, SalaryExp, MobileAllowance, MarketingExp }
}
</script>

<style lang="scss" scoped></style>