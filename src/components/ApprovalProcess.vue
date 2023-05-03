<template>
    <q-card class="my-card">
        <q-card-section class="text-center">
            <div class="float-right"><q-btn icon="close" flat round dense v-close-popup /></div>
            <h1 class="text-2xl mt-10">Approval Process</h1>
        </q-card-section>
        <div class="card">
            <q-card-section>
                <q-input dense outlined v-model="text" type="text" placeholder="Notes" />
            </q-card-section>
            <q-card-section class="grid grid-cols-2">
                <div>
                    <h2 class="font-bold">Request by</h2>
                    <div class="flex items-center gap-2">
                        <q-avatar size="40px" color="teal" text-color="white" icon="directions" />
                        <p>hr</p>
                    </div>
                </div>
                <div>
                    <h2 class="font-bold">Approved by</h2>
                    <div class="flex items-center gap-2">
                        <q-avatar size="40px" color="teal" text-color="white" icon="directions" />
                        <p>hr</p>
                    </div>
                </div>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn label="Approved" color="green" />
                <q-btn label="Decline" color="negative" />
            </q-card-actions>
        </div>
    </q-card>
</template>

<script>
export default {
    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped>
.my-card {
    width: 700px;
    max-width: 90vw;

}

.card {
    padding: 0px 50px 50px 50px;
}
</style>