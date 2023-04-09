<template>
    <div>
        <q-card flat class="my-card">
            <q-card-section class="grid grid-cols-2 gap-5">
                <q-input outlined v-model="userRegister.first_name" placeholder="Product Name" bg-color="white"
                    :dense="true" />
                <q-select class="bg-white" outlined v-model="type" :options="options" :dense="true"
                    label="Choose product category" />
                <q-input outlined v-model="userRegister.email" placeholder="Quantity" :dense="true" />
                <q-input outlined v-model="userRegister.phone_number" placeholder="Vendor" :dense="true" />
                <q-select class="bg-white" outlined v-model="type" :options="options" :dense="true" label="Project" />
                <q-input outlined v-model="userRegister.designation" placeholder="Location" bg-color="white"
                    :dense="true" />
                <div class="flex">
                    <q-input outlined v-model="userRegister.salry" placeholder="Amount per" bg-color="white" :dense="true"
                        class="w-3/4" />
                    <q-select class="bg-white w-1/4" outlined v-model="type" :options="units" :dense="true" />
                </div>
                <q-input outlined v-model="userRegister.salry" placeholder="Total Amount" bg-color="white" :dense="true" />
                <q-input outlined v-model="userRegister.salry" placeholder="Paid Amount" bg-color="white" :dense="true" />
                <q-input outlined v-model="userRegister.salry" placeholder="Due Amount" bg-color="white" :dense="true" />
                <div>
                    <q-uploader url="http://localhost:4444/upload" label="Individual upload" color="green" multiple
                        style="max-width: 300px" />
                </div>
                <div class="flex items-end justify-end">

                    <q-btn label="Save" color="green" class="px-10 py-2.5" @click="registerUser" />

                </div>
            </q-card-section>
            <!-- <q-card-actions align="center" class="row mx-2 py-5">
          <q-btn label="Create" color="green" class="col" />
          <q-btn label="Decline" color="negative" class="col" />
        </q-card-actions> -->
        </q-card>
    </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
    name: 'FactoryExp',
    setup() {

        const userRegister = reactive({
            first_name: "",
            last_name: "",
            email: "",
            dob: "",
            profile_img: "",
            designetion: "",
            password: "",
        });
        return {
            type: ref('pcs'),
            units: ["pcs", "feet", "kg", "meter", "inch"],
            userRegister,
        }
    }
})
</script>

<style lang="scss" scoped></style>