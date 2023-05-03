<template>
    <div>
        <q-card flat class="w-1/2">
            <div class="text-2xl font-semibold mx-5">Add Projects</div>
            <q-card-section class="grid grid-cols-2 gap-5">
                <q-input outlined v-model="formData.vendor" placeholder="Project Name" :dense="true" />
                <SearchAddCompo for="product" :selected="formData.product.id" label="Project type" />
                <q-input outlined v-model="formData.product.quantity" placeholder="Client" :dense="true" />
                <q-input outlined v-model="formData.vendor" placeholder="Amount" :dense="true" />
                <q-input outlined v-model="formData.location" placeholder="Location" bg-color="white" :dense="true" />
                <q-input outlined v-model="formData.amount" placeholder="Work order id" bg-color="white" :dense="true" />
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
  