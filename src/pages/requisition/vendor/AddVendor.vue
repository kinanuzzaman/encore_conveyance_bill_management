<template>
    <div class="row">
        <section class="col-lg-6 px-4 ">
            <div>
                <q-card flat class="my-card">
                    <q-card-section>
                        <div class="text-2xl font-bold">Vendor Payments</div>
                    </q-card-section>
                    <q-card-section class="grid md:grid-cols-2 grid-cols-1 gap-5">
                        <q-input outlined v-model="userRegister.email" placeholder="Vendor name" :dense="true" />
                        <q-input outlined v-model="userRegister.phone_number" placeholder="Amount" :dense="true" />

                        <q-input outlined v-model="userRegister.designation" placeholder="Project name" bg-color="white"
                            :dense="true" />


                        <q-input outlined v-model="userRegister.salry" placeholder="Details" bg-color="white"
                            :dense="true" />
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
        </section>
        <section class="col-lg-6 px-5 ">
            <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcE5ok1cPwHeGuCEe03a_X5fxT0tIJSeKdolnp-0sqSyjVO6mD5p1ryrGuqCQyejAQnIM&usqp=CAU"
                    spinner-color="primary" spinner-size="82px" class="rounded-xl md:h-[871px]" fit="fill" />
            </div>
        </section>
    </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
    name: 'AddVendor',
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

<style lang="scss" scoped>
.my-card {
    width: 1020px;
    max-width: 80vw;

    @media (max-width: 768px) {
        max-width: 100vw;
    }
}
</style>