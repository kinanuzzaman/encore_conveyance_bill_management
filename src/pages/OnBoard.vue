<template>
    <div>
        <q-card class="my-card p-10" style="width: 1020px; max-width: 80vw">
            <div class="flex justify-center py-10">
                <q-avatar size="100px" font-size="52px" color="teal" text-color="white" icon="account_circle" />
            </div>
            <q-card-section class="grid grid-cols-2 gap-5">
                <q-input v-model="date" filled type="date" hint="Native date" />
                <q-input outlined v-model="userRegister.last_name" placeholder="password" bg-color="white" :dense="true" />

                <q-btn label="Save" color="green" class="col" @click="onClick" />
            </q-card-section>

        </q-card>
    </div>
</template>

<script>
export default {
    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped></style>