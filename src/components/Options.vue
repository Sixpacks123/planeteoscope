<template>
  <div class="options z-10 absolute right-10 top-100">
    <div class="form-group m-5 text-center">
      <label class="text-2xl">Speed</label>
      <div class="input-select bg-blue-500 rounded-full mt-10 max-w-max mx-auto overflow-hidden">
        <div class="select-item flex items-stretch">
          <input
            id="realtime"
            v-model="speed"
            name="speed"
            type="radio"
            value="realtime"
            @change="onSpeedChange"
          >
          <label
            for="realtime"
            class="flex-grow cursor-pointer px-10 py-4"
          >Realtime</label>
        </div>
        <div class="select-item flex items-stretch">
          <input
            id="day_sec"
            v-model="speed"
            checked
            name="speed"
            type="radio"
            value="day_sec"
            @change="onSpeedChange"
          >
          <label
            for="day_sec"
            class="flex-grow cursor-pointer px-10 py-4"
          >1 day/sec</label>
        </div>
        <div class="select-item flex items-stretch">
          <input
            id="mon_sec"
            v-model="speed"
            name="speed"
            type="radio"
            value="mon_sec"
            @change="onSpeedChange"
          >
          <label
            for="mon_sec"
            class="flex-grow cursor-pointer px-10 py-4"
          >1 mon/sec</label>
        </div>
        <div class="select-item flex items-stretch">
          <input
            id="idealized"
            v-model="speed"
            name="speed"
            type="radio"
            value="idealized"
            @change="onSpeedChange"
          >
          <label
            for="idealized"
            class="flex-grow cursor-pointer px-10 py-4"
          >Idealized</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['speedChanged'],
  data() {
    return {
      speed: 'day_sec',
    }
  },
  mounted() {
    this.$emit('speedChanged', this.speed)
  },
  methods: {
    onSpeedChange(e) {
      const value = e.target.value
      this.$emit('speedChanged', value)
    },
  },
}
</script>

<style scoped>
@media (max-height: 360px) {
  .options {
    top: 50px;
  }
}
</style>
