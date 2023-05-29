<template>
  <q-card style="width: 700px; max-width: 90vw;">
    <q-card-section class="text-center">
      <div class="float-right"><q-btn icon="close" flat round dense v-close-popup /></div>
      <h1 class="text-xl mt-10">Please give your attendance</h1>

      <div class="m-10 flex flex-col items-center justify-center gap-5">
        <q-icon name="fingerprint" size="120px" :color="isAttendanceStarted ? 'green' : 'black'" />
        <span class="text-2xl font-bold" v-if="isAttendanceStarted">Present on-going</span>

      </div>
    </q-card-section>

    <div class="px-5 flex flex-col items-center justify-center mb-16">
      <q-btn label="Start your Attendance" color="green" v-if="!isAttendanceStarted" @click="startAttendance" no-caps />
      <!-- <q-btn label="End Attendance" color="red" v-else @click="endAttendance" no-caps /> -->
    </div>

    <div class="flex flex-col px-16 mb-10">
      <q-checkbox right-label v-model="custom_time" label="Add custom time" dense />
      <div class="flex flex-row justify-start gap-5 mt-2" v-if="custom_time">
        <div class="flex flex-col w-full">
          <span>Start Time</span>
          <q-input dense outlined v-model="text" type="time" placeholder="Start time" />
        </div>
        <!-- <div class="flex flex-col w-full">
          <span>End Time</span>
          <q-input dense outlined v-model="text" type="time" placeholder="End time" />
        </div> -->
        <q-btn label="Request" disable color="orange" unelevated class="w-full" no-caps />
      </div>
    </div>
  </q-card>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useAttendanceStore } from "../../stores/attendance.store"
import moment from 'moment-timezone'

export default defineComponent({
  name: 'EmpAttendance',
  data() {
    return {
      moment: moment,
      add: ref(false),
      resume: ref(false),
      custom_time: ref(false),
      isAttendanceStarted: ref(false),
      attendanceStore: useAttendanceStore(),
      intervalId: null,
      timer: null,
      lateTime: null,
    }
  },
  async mounted() {
    try {
      await this.startTimer()
    } catch (error) {
      console.log("🚀 ~ file: EmpAttendance.vue:56 ~ mounted ~ error:", error)
    }
  },
  methods: {
    async startTimer() {
      if (!this.attendanceStore.activeAttendance) {
        await this.attendanceStore.getAttendanceStatus()
      }
      if (!this.attendanceStore.activeAttendance) {
        return;
      }
      this.isAttendanceStarted = true;
      this.lateTime = this.elapsedTime(this.attendanceStore.activeAttendance.startAt)
      // if (this.intervalId) clearInterval(this.intervalId);
      // this.intervalId = setInterval(() => {
      //   this.timer = this.elapsedTime(this.attendanceStore.activeAttendance.startAt)
      //   this.$forceUpdate();
      // }, 1000);
    },
    async startAttendance() {
      if (this.isBefore9AM()) {
        this.$q.notify({
          message: "You can't start attendance before 9AM",
          color: 'negative',
          position: 'top',
          icon: 'report_problem',
          timeout: 2500,
        })
        return;
      }
      if (!navigator.geolocation) {
        $q.notify({
          message: "Allow Geolocation, or you can't continue",
          color: "red",
          position: "top",
        })
        return;
      }
      try {
        const { coords: { latitude, longitude } } = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        await this.attendanceStore.startAttendance({
          start_location: {
            lat: latitude,
            lng: longitude,
          }
        })
        this.isAttendanceStarted = true
        await this.startTimer()
      } catch (error) {
        this.$q.notify({
          message: error.message,
          color: 'negative',
          position: 'top',
          icon: 'report_problem',
          timeout: 2500,
        })
      }
    },
    async endAttendance() {
      if (!navigator.geolocation) {
        $q.notify({
          message: "Allow Geolocation, or you can't continue",
          color: "red",
          position: "top",
        })
        return;
      }
      try {
        const { coords: { latitude, longitude } } = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        await this.attendanceStore.endAttendance({
          end_location: {
            lat: latitude,
            lng: longitude,
          }
        })
        this.isAttendanceStarted = false
        clearInterval(this.intervalId);
        this.timer = null;
        await this.attendanceStore.getAttendanceStatus()
      } catch (error) {
        this.$q.notify({
          message: error.message,
          color: 'negative',
          position: 'top',
          icon: 'report_problem',
          timeout: 2500,
        })
      }
    },
    isBefore9AM() {
      const currentMoment = moment().tz('Asia/Dhaka');
      const startTimeMoment = currentMoment.clone().startOf('day').add(9, 'hours');

      return currentMoment.isBefore(startTimeMoment);
    },
    elapsedTime(startTime) {
      const startTimeMoment = moment(startTime);
      const currentTimeMoment = moment().tz('Asia/Dhaka').startOf('day').add(9, 'hours');
      const diffDuration = moment.duration(currentTimeMoment.diff(startTimeMoment));
      const hours = Math.floor(diffDuration.asHours()).toString().padStart(2, '0');
      const minutes = diffDuration.minutes().toString().padStart(2, '0');
      const seconds = diffDuration.seconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    },
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
})
</script>

<style lang="scss" scoped></style>
