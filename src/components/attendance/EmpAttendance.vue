<template>
    <q-card style="width: 700px; max-width: 90vw;">
        <q-card-section class="text-center">
            <div class="float-right"><q-btn icon="close" flat round dense v-close-popup /></div>
            <h1 class="text-2xl mt-10">Please give your attendance</h1>

            <div class="m-10">
                <q-icon name="fingerprint" size="120px" color="green" />
            </div>
        </q-card-section>
        <!-- <q-card-actions align="center">
            
        </q-card-actions> -->
        <div class="grid md:grid-cols-2 grid-cols-1 gap-5 mx-10">
            <div class=" grid grid-cols-1 gap-5">
                <q-btn label="Start your Attendance" color="green" v-close-popup no-caps />
                <q-checkbox right-label v-model="add" label="Add custom time" />
                <q-input dense outlined v-model="text" type="time" placeholder="Start time" />
            </div>
            <div class=" grid grid-cols-1 gap-5">
                <q-btn label="End your Attendance" color="negative" v-close-popup no-caps />
                <div>
                    <q-checkbox right-label v-model="resume" label="Do you want to resume time" />
                </div>
                <q-input dense outlined v-model="text" type="time" placeholder="End time" />
            </div>
        </div>
        <div class="flex items-end justify-center m-10">

            <q-btn label="Request" color="orange" class="px-20 py-1.5" no-caps />

        </div>
    </q-card>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'EmpAttendance',
    setup() {

        return {
            add: ref(false),
            resume: ref(false),

        }
    }
})
</script>

<style lang="scss" scoped></style>