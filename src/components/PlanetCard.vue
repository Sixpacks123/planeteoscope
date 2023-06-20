<template>
  <div class="planet-card">
    <img
      class="planet-img"
      :src="`public/static/assets/cards/${planetInfo.name}.png`"
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
:root{
  --primary: #191C44;
  --secondary: #1A1D79;
  --tertiary: #0587cc;
  --text: #F3F3F3;
  --dark: #05051A;
  --radius: 18px;
}
.planet-card {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 280px;
  box-shadow: -8px -9px 14px rgb(255 255 255 / 8%);
  overflow: hidden;
  font-size: 14px;
  background-color: var(--primary) ;
}

.planet-card .planet-img {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  border-radius: var(--radius);
  background-color: var(--primary);
}

.planet-card .info {
  margin-top: 150px;
  min-height: 250px;
  width: 100%;
  border-radius: var(--radius);
  background: linear-gradient(131.76deg, var(--primary) -34.78%, var(--dark) 93.37%);
  padding: 6px 12px;
}

.planet-card .info h5 {
  text-align: center;
  font-size: 18px;
  color: var(--tertiary);
  font-weight: 100;
}

.planet-card .info ul {
  margin: 10px 0;
  text-align: left;
  list-style: none;
  padding-left: 0;
}

.planet-card .info ul li {
  margin: 4px 0;
  color: #d5d5d5;
}

.planet-card .info ul li .value {
  font-weight: bold;
  color: #fff;
}

.planet-card .title {
  position: absolute;
  text-align: center;
  top: 2px;
  width: 100%;
}

.planet-card .title h2 {
  text-transform: uppercase;
  font-weight: 400;
  font-size: 20px;
}

.planet-card .temperature {
  position: absolute;
  top: 50px;
  right: 10px;
  font-weight: 600;
  text-shadow: -4px 1px 11px #000;
  font-size: 14px;
  font-weight: lighter;
}

.planet-card .temperature .value {
  font-weight: bold;
  text-shadow: 0 0 10px #fff;
}

.planet-card .temperature .icon {
  vertical-align: middle;
}

.planet-card .close {
  position: absolute;
  top: 2px;
  right: 6px;
  background-color: transparent;
  border: 0;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
}

.planet-card .description {
  margin: 6px 0;
  color: #fff;
}

@media (max-width: 560px) {
  .planet-card {
    width: auto;
    height: auto;
    transform: none;
    top: 125px;
    left: 10px;
    right: 10px;
    bottom: 20px;
    z-index: 4;
  }

  .planet-card .info {
    top: 250px;
  }

  .planet-card .close {
    font-size: 32px;
  }
}

@media (max-height: 360px) {
  .planet-card {
    width: auto;
    height: auto;
    transform: none;
    top: 15px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    z-index: 4;
  }

  .planet-card .planet-img {
    height: 100%;
    width: auto;
  }

  .planet-card .info {
    top: 0;
    right: 0;
    width: auto;
    height: 100%;
    left: 230px;
  }

  .planet-card .title {
    max-width: 250px;
  }

  .planet-card .temperature {
    left: 110px;
    right: auto;
  }

  .planet-card .close {
    right: auto;
    left: 6px;
    font-size: 32px;
  }
}

</style>

