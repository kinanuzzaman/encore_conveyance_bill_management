<template>
    <div class="px-4 row">

        <section class="col-lg-6 px-5 ">
            <q-card flat>
                <div class="text-2xl font-semibold mx-5">Add Projects</div>
                <q-card-section class="grid md:grid-cols-2 grid-cols-1 gap-5">
                    <q-input outlined v-model="formData.vendor" placeholder="Project Name" :dense="true" />
                    <SearchAddCompo for="product" :selected="formData.product.id" label="Project type" />
                    <q-input outlined v-model="formData.product.quantity" placeholder="Client" :dense="true" />
                    <q-input outlined v-model="formData.vendor" placeholder="Amount" :dense="true" />
                    <q-input outlined v-model="formData.location" placeholder="Location" bg-color="white" :dense="true" />
                    <q-input outlined v-model="formData.amount" placeholder="Work order id" bg-color="white"
                        :dense="true" />
                    <q-input outlined v-model="formData.amount_paid" placeholder="Start Date" bg-color="white" :dense="true"
                        type="date" />
                    <q-input outlined v-model="formData.amount_due" placeholder="End Date" bg-color="white" :dense="true"
                        type="date" />
                    <q-input outlined v-model="formData.vendor" placeholder="Vendor" :dense="true" />
                    <div>
                        <q-uploader url="http://localhost:4444/upload" label="Individual upload" color="green" multiple
                            style="max-width: 300px" />
                    </div>


                    <div class="flex items-end justify-end">

                        <q-btn label="Save" color="green" class="px-10 py-2.5" @click="registerUser" />

                    </div>
                </q-card-section>
            </q-card>
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
import SearchAddCompo from '../../components/SearchAddCompo.vue';
export default defineComponent({
    name: 'AddProject',
    components: {
        SearchAddCompo
    },
    setup() {

        const formData = reactive({
            product: {
                id: null,
                quantity: null,
            },
            project: null,
            vendor: null,
            location: null,
            amount: null,
            amount_paid: null,
            amount_per: null,
            amount_per_unit: null,
            amount_due: null,
        });
        return {
            type: ref('pcs'),
            units: ["pcs", "feet", "kg", "meter", "inch"],
            formData,
        }
    },
    methods: {
        registerUser() {
            this.$emit('addExpense', this.formData);
        }
    }
})
</script>
  
<style lang="scss" scoped></style>
  