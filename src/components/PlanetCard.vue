<template>
  <div class="planet-card">
    <img
      class="planet-img"
      :src="`./assets/cards/${planetInfo.name}.png`"
      :alt="planetInfo.displayName"
    >
    <div class="title">
      <h2>{{ planetInfo.displayName }}</h2>
    </div>
    <button
      class="close"
      @click="$emit('closeCard')"
    >
      ×
    </button>
    <div class="temperature">
      <p
        v-if="planetInfo.meanTemp"
        title="Surface temperature"
      >
        mean:
        <span
          class="value"
          :style="{ color: temperatureColor(planetInfo.meanTemp) }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            :stroke="temperatureColor(planetInfo.meanTemp)"
            class="icon icon-tabler icon-tabler-temperature"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          ><path
            stroke="none"
            d="M0 0h24v24H0z"
            fill="none"
          /><path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" /><line
            x1="10"
            y1="9"
            x2="14"
            y2="9"
          /></svg>
          {{ planetInfo.meanTemp }} °C
        </span>
      </p>
      <p
        v-if="planetInfo.minTemp"
        title="Surface temperature"
      >
        min:
        <span
          class="value"
          :style="{ color: temperatureColor(planetInfo.minTemp)}"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            :stroke="temperatureColor(planetInfo.minTemp)"
            class="icon icon-tabler icon-tabler-temperature"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          ><path
            stroke="none"
            d="M0 0h24v24H0z"
            fill="none"
          /><path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" /><line
            x1="10"
            y1="9"
            x2="14"
            y2="9"
          /></svg>
          {{ planetInfo.minTemp }} °C
        </span>
      </p>
      <p
        v-if="planetInfo.maxTemp"
        title="Surface temperature"
      >
        max:
        <span
          class="value"
          :style="{ color: temperatureColor(planetInfo.maxTemp)}"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            :stroke="temperatureColor(planetInfo.maxTemp)"
            class="icon icon-tabler icon-tabler-temperature"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          ><path
            stroke="none"
            d="M0 0h24v24H0z"
            fill="none"
          /><path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" /><line
            x1="10"
            y1="9"
            x2="14"
            y2="9"
          /></svg>
          {{ planetInfo.maxTemp }} °C
        </span>
      </p>
    </div>
    <div class="info">
      <h5>{{ planetInfo.caption }}</h5>
      <p class="description">
        {{ planetInfo.description }}
      </p>
      <ul>
        <li>Radius: <span class="value">{{ planetInfo.radius }} km</span></li>
        <li v-if="planetInfo.timesLarger && planetInfo.timesLarger !== -1">
          <span v-if="planetInfo.timesLarger >= 1"><span class="value">{{ planetInfo.timesLarger }}x</span> larger than Earth</span>
          <span v-else><span class="value">{{ (1 / planetInfo.timesLarger).toFixed(2) }}x</span> smaller than Earth</span>
        </li>
        <li v-if="planetInfo.distanceFromSun && planetInfo.distanceFromSun !== -1">
          Distance from Sun: <span class="value">{{ planetInfo.distanceFromSun }} AU</span>
        </li>
        <li v-if="planetInfo.distance">
          Distance from {{ planetInfo.orbitObject.charAt(0).toUpperCase() + planetInfo.orbitObject.slice(1) }}: <span class="value">{{ planetInfo.distance }} km</span>
        </li>
        <li v-if="planetInfo.year">
          1 year: <span class="value">{{ planetInfo.year }}</span>
        </li>
        <li v-if="planetInfo.day">
          1 day: <span class="value">{{ planetInfo.day }}</span>
        </li>
        <li v-if="planetInfo.moons != null">
          Moons: <span class="value">{{ planetInfo.moons }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    planetInfo: Object,
    default: undefined,
  },
  emits: ['closeCard'],
  data() {
    return {
      temperatureColors: {
        '-130': '#a8f1ff',
        '-90': '#1fb6d0',
        '-40': '#c4f987',
        10: '#c4f987',
        50: '#ffcc33',
        90: '#ee6600',
        150: '#990000',
      },
    }
  },
  methods: {
    temperatureColor(temp) {
      const keys = Object.keys(this.temperatureColors).map(t => parseInt(t))
      keys.sort((a, b) => (+a) - (+b))
      for(let key of keys) {
        if(key > temp) {
          return this.temperatureColors[key]
        }
      }
      return this.temperatureColors[keys[keys.length - 1]]
    },
  },
}
</script>

<style scoped>
canvas {
  width: 100vw;
  height: 100vh;
}

.date-display {
  position: absolute;
  top: 0;
  left: 0;
  padding: 1em;
  display: flex;
  gap: 8px;
}

.date-display.disabled {
  opacity: 0.2;
}

@media (max-width: 560px) {
  .date-display {
    top: 16px;
  }
}
</style>

