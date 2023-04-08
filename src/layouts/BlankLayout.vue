<template>
    <!-- view="lHh Lpr lFf" -->
    <q-layout>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { defineComponent } from 'vue'


export default defineComponent({
    name: 'BlankLayout',


    setup() {
        return {
        }
    }
})
</script>
