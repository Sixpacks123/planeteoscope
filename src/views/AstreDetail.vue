<template>
  <div>
    <div
      v-if="astre"
      class="bg-white dark:bg-gray-900 flex-col items-center justify-center h-screen pt-10"
    >
      <div class="py-10 px-4 mx-auto w-full sm:py-16 lg:px-6">
        <div class="mt-18 pt-10 w-full flex flex-row items-center">
          <div class="pl-5">
            <Button
              class="p-5"
              @click="$router.go(-1)"
            >
              Retour
            </Button>
          </div>
          <div class="py-2 px-4 mx-auto max-w-screen-xl ">
            <h1 class="text-6xl text-center font-extrabold pb-4">
              {{ astre.name }}
            </h1>
          </div>
        </div>
        <tabs
          v-model="activeTab"
          variant="underline"
          class="p-5"
        >
          <!-- class appends to content DIV for all tabs -->
          <tab
            name="identification"
            title="Identification"
          >
            <div class="flex flex-col gap-y-1">
              <p><strong>English name:</strong> {{ astre.englishName }}</p>
              <p><strong>ID:</strong> {{ astre.id }}</p>
              <p><strong>Is planet:</strong> {{ astre.isPlanet }}</p>
              <p><strong>Alternative name:</strong> {{ astre.alternativeName }}</p>
              <p><strong>Discovered by:</strong> {{ astre.discoveredBy }}</p>
              <p><strong>Discovery date:</strong> {{ astre.discoveryDate }}</p>
            </div>
          </tab>
          <tab
            name="crateristique"
            title="Caractéristiques physiques"
          >
            <div class="flex flex-col gap-y-1">
              <p><strong>Dimension:</strong> {{ astre.dimension }}</p>
              <p><strong>Density:</strong> {{ astre.density }}</p>
              <p><strong>Gravity:</strong> {{ astre.gravity }}</p>
              <p><strong>Escape velocity:</strong> {{ astre.escape }}</p>
              <p><strong>Mean radius:</strong> {{ astre.meanRadius }}</p>
              <p><strong>Equatorial radius:</strong> {{ astre.equaRadius }}</p>
              <p><strong>Polar radius:</strong> {{ astre.polarRadius }}</p>
              <p><strong>Flattening:</strong> {{ astre.flattening }}</p>
            </div>
          </tab>
          <tab
            name="orbite"
            title="Orbite"
          >
            <div class="flex flex-col gap-y-1">
              <p><strong>Semi-major axis:</strong> {{ astre.semimajorAxis }}</p>
              <p><strong>Perihelion:</strong> {{ astre.perihelion }}</p>
              <p><strong>Aphelion:</strong> {{ astre.aphelion }}</p>
              <p><strong>Eccentricity:</strong> {{ astre.eccentricity }}</p>
              <p><strong>Inclination:</strong> {{ astre.inclination }}</p>
              <p><strong>Sidereal orbit:</strong> {{ astre.sideralOrbit }}</p>
              <p><strong>Main anomaly:</strong> {{ astre.mainAnomaly }}</p>
              <p><strong>Argument of periapsis:</strong> {{ astre.argPeriapsis }}</p>
              <p><strong>Longitude of      </strong></p>
            </div>
          </tab>
          <tab
            name="temperature"
            title="Température"
          >
            <p><strong>Average temperature:</strong> {{ astre.avgTemp }}</p>
            <p><strong>Minimum temperature:</strong> {{ astre.minTemp }}</p>
            <p><strong>Maximum temperature:</strong> {{ astre.maxTemp }}</p>
          </tab>
          <tab
            name="rotation"
            title="Rotation"
          >
            <div class="flex flex-col gap-y-1">
              <p><strong>Sidereal rotation:</strong> {{ astre.sideralRotation }}</p>
              <p><strong>Equatorial rotation velocity:</strong> {{ astre.equatorialRotationVelocity }}</p>
              <p><strong>Axial tilt:</strong> {{ astre.axialTilt }}</p>
            </div>
          </tab>
          <tab
            name="lune"
            title="Lune"
            :disabled="hasMoon"
          >
            <div
              v-if="astre.moons"
              class="relative overflow-x-auto shadow-md sm:rounded-lg"
            >
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3"
                    >
                      Nom de la lune
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3"
                    >
                      <span class="sr-only">link </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="moon in astre.moons"
                    :key="moon"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {{ moon.moon }}
                    </th>

                    <td class="px-6 py-4 text-right">
                      <Button
                        color="default"
                        @click="view(getLastParam(moon.rel))"
                      >
                        Voir Details Lune
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </tab>
        </tabs>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter} from 'vue-router'
import { useAstresStore } from '../store/astre'
import { Button } from 'flowbite-vue'
import { Tabs, Tab } from 'flowbite-vue'

const astresStore = useAstresStore()
const route = useRoute()
const router = useRouter()

const astreId = route.params.id
const activeTab = ref('identification')
const astre = computed(() => {
  const astre = astresStore.getAstreById(astreId)
  console.log(astreId)
  return astre
})

const getLastParam = (url) => {
  const segments = url.split('/')
  return segments[segments.length - 1]
}

const view = (url) => {
  router.push({ name: 'AstreDetail', params: { id: url } })

}

const hasMoon = ref(!!astre.value.moon)

</script>


