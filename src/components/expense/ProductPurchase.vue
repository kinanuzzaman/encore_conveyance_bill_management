<template>
    <div>
        <q-card flat class="my-card p-10">
            <div class="flex justify-center py-10">
                <q-avatar size="100px" font-size="52px" color="teal" text-color="white" icon="account_circle" />
            </div>
            <q-card-section class="grid grid-cols-2 gap-5">
                <q-input outlined v-model="userRegister.first_name" placeholder="First Name" bg-color="white"
                    :dense="true" />
                <q-input outlined v-model="userRegister.last_name" placeholder="Last Name" bg-color="white" :dense="true" />
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
                <q-input outlined v-model="userRegister.salry" placeholder="Salary" bg-color="white" :dense="true" />
                <q-btn label="Save" color="green" class="col" @click="registerUser" />
            </q-card-section>
            <!-- <q-card-actions align="center" class="row mx-2 py-5">
          <q-btn label="Create" color="green" class="col" />
          <q-btn label="Decline" color="negative" class="col" />
        </q-card-actions> -->
        </q-card>
    </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
    name: 'ProductPurchase',
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
            userRegister,
        }
    }
})
</script>

<style lang="scss" scoped></style>