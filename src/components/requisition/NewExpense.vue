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
                    Expense
                </q-card-section>
                <q-card-section>
                    <q-select class="bg-white" outlined v-model="model" :options="options" :dense="true"
                        label="Choose expense type" />
                </q-card-section>
                <div class="row">
                    <q-card-section class="col">
                        <q-input outlined v-model="name" placeholder="Project Name" bg-color="white" :dense="true" />
                    </q-card-section>
                    <q-card-section class="col">
                        <q-input outlined v-model="designation" placeholder="Reason" bg-color="white" :dense="true" />
                    </q-card-section>
                </div>
                <div class="row">
                    <q-card-section class="col">
                        <q-input outlined v-model="name" placeholder="Paid to Name" bg-color="white" :dense="true" />
                    </q-card-section>
                    <q-card-section class="col">
                        <q-input outlined v-model="designation" placeholder="Pay Amount" bg-color="white" :dense="true" />
                    </q-card-section>
                </div>
                <div class="row">
                    <q-card-section class="col">
                        <q-input outlined v-model="name" placeholder="Mobile Number" bg-color="white" :dense="true" />
                    </q-card-section>
                    <q-card-section class="col">
                        <q-input outlined v-model="designation" placeholder="Work order id" bg-color="white"
                            :dense="true" />
                    </q-card-section>
                </div>
                <div class="row">
                    <q-card-section class="col">
                        <q-input outlined v-model="name" placeholder="Address" bg-color="white" :dense="true" />
                    </q-card-section>
                    <q-card-section class="col">
                        <q-uploader url="http://localhost:4444/upload" label="Individual upload" color="green" multiple
                            style="max-width: 300px" />
                    </q-card-section>
                </div>
                <q-card-actions align="center" class="px-3 py-5 absolute bottom-0 w-full">
                    <q-btn label="Save" color="green" class="col" />
                    <q-btn label="Decline" color="negative" class="col" />
                </q-card-actions>
            </q-card>
        </section>
    </div>
</template>
  
<script>
export default {
    setup() {
        return {
            options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
        };
    },
};
</script>
  
<style lang="scss" scoped></style>
  