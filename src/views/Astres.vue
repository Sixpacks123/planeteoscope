<template>
  <div class="bg-white dark:bg-gray-900 flex  items-center justify-center">
    <div class="py-10 px-4 mx-auto w-full sm:py-16 lg:px-6">
      <div class=" mt-20  bg-white w-full ">
        <div class="py-2 px-4 mx-auto max-w-screen-xl  ">
          <h1 class="text-6xl text-center font-extrabold pb-4">
            Liste des Astres
          </h1>
          <div class="flex flex-row items-center gap-x-4">
            <div class="w-full">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >Search</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  /></svg>
                </div>
                <input
                  id="default-search"
                  v-model="searchTerm"
                  type="search"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Recherche un astre"
                  required
                >
                <button
                  type="submit"
                  class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </div>
            <dropdown text="Triez">
              <list-group>
                <list-group-item @click="selectedType = null">
                  All Astres
                </list-group-item>
                <list-group-item @click="selectedType = true">
                  Planets
                </list-group-item>
                <list-group-item @click="selectedType = false">
                  Non-planets
                </list-group-item>
                <list-group-item @click="selectedType = 'moon'">
                  Possède des lunes
                </list-group-item>
              </list-group>
            </dropdown>
          </div>
        </div>
      </div>
      <div class="py-2 px-4 mx-auto max-w-screen-xl ">
        <div
          v-if="filteredAstres.length > 0"
          class=" flex flex-row flex-wrap gap-5 w-full justify-between"
        >
          <the-card
            v-for="astre in filteredAstres"
            :key="astre.id"
            class="w-2/4"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ astre.name }}
            </h5>
            <p
              v-if="astre.isPlanet"
              class="font-normal"
            >
              Cette astre est une planette
            </p>
            <p v-else>
              Cette astre n'est pas une planette
            </p>
            <div>
              <p v-if="astre.moons === null || undefined">
                Pas de lunes pour cet astre.
              </p>
              <p
                v-else
                class="font-normal"
              >
                Nombre de lunes : {{ astre.moons.length }}
              </p>
            </div>

            <router-link :to="{ name: 'AstreDetail', params: { id: astre.id } }">
              <Button
                :to="{ name: 'AstreDetail', params: { id: astre.id } }"
                color="default"
              >
                Details
              </Button>
            </router-link>
          </the-card>
        </div>
        <div
          v-else
          class="flex justify-center items-center w-full py-8"
        >
          <spinner
            color="blue"
            size="6"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { TheCard, Button,Dropdown,ListGroup, Spinner,ListGroupItem  } from 'flowbite-vue'
import { ref, onMounted, computed } from 'vue'
import { useAstresStore } from '../store/astre'

const astresStore = useAstresStore()
const astres = ref([])

// Fetch the astres when the component is mounted
onMounted(async () => {
  try {
    await astresStore.fetchAstres()
    astres.value = astresStore.astres
  } catch (error) {
    console.error(error)
  }
})

const searchTerm = ref('')
const selectedType = ref(null)
const countMoons = (astre) => {
  console.log(astre.moons)
}
// Filter the astres based on the search term and planet filter
const filteredAstres = computed(() => {
  const term = searchTerm.value.toLowerCase()
  return astres.value.filter(astre => {
    if (typeof astre.name !== 'string') {
      return false
    }
    if (selectedType.value === true && !astre.isPlanet) {
      return false
    }
    if (selectedType.value === false && astre.isPlanet) {
      return false
    }
    if (selectedType.value === 'moon' && astre.moons === null) {
      return false
    }
    return astre.name.toLowerCase().includes(term)
  })
})


</script>
