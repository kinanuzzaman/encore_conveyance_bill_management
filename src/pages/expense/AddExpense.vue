<template>
    <main class="px-5">
        <div class="flex">
            <section class="w-1/2">
                <div>
                    <q-select class="bg-white" outlined v-model="type" :options="options" :dense="true"
                        label="Choose expense type" />
                </div>
                <div v-if="type == 'Product Purchase'">
                    <ProductPurchase />
                </div>
                <div v-if="type == 'Office'">
                    <q-card flat class="my-card p-10">
                        <div class="flex justify-center py-10">
                            <q-avatar size="100px" font-size="52px" color="teal" text-color="white" icon="account_circle" />
                        </div>
                        <q-card-section class="grid grid-cols-2 gap-5">
                            <q-input outlined v-model="userRegister.first_name" placeholder="First Name" bg-color="white"
                                :dense="true" />
                            <q-input outlined v-model="userRegister.last_name" placeholder="Last Name" bg-color="white"
                                :dense="true" />
                            <q-input outlined v-model="userRegister.email" placeholder="Email" :dense="true">
                                <template v-slot:prepend>
                                    <q-icon name="mail" />
                                </template>
                            </q-input>
                            <q-input outlined v-model="userRegister.phone_number" placeholder="Phone Number" :dense="true">
                                <template v-slot:prepend>
                                    <q-icon name="phone" />
                                </template>
                            </q-input>
                            <q-input outlined v-model="userRegister.designation" placeholder="Designation" bg-color="white"
                                :dense="true" />
                            <q-select class="bg-white" outlined v-model="userRegister.role" :options="options" :dense="true"
                                label="Select role" />
                            <q-input outlined v-model="userRegister.salry" placeholder="Salary" bg-color="white"
                                :dense="true" />
                            <q-btn label="Save" color="green" class="col" @click="registerUser" />
                        </q-card-section>
                        <!-- <q-card-actions align="center" class="row mx-2 py-5">
          <q-btn label="Create" color="green" class="col" />
          <q-btn label="Decline" color="negative" class="col" />
        </q-card-actions> -->
                    </q-card>
                </div>
            </section>
            <section class="w-1/2 px-5 " v-if="options">
                <q-img src="https://placeimg.com/500/300/nature" spinner-color="primary" spinner-size="82px"
                    class="rounded-xl h-[871px]" fit />
            </section>
        </div>

    </main>
</template>

<script>
import ProductPurchase from 'src/components/expense/ProductPurchase.vue';
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
            options: ["Product Purchase", "Office", "Delivery", "conveyance", "Factory", "BP", "Labour", "Marketing", "Mobile Allowance", "Salary", "Other Bill"],
        };
    },
    components: { ProductPurchase }
}
</script>

<style lang="scss" scoped></style>