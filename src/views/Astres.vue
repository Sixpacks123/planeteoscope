<template>
  <div class="mt-20">
    <h1>List of Astres</h1>
    <form>
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
          placeholder="Search Mockups, Logos..."
          required
        >
        <button
          type="submit"
          class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
    <div class="flex flex-row flex-wrap gap-4">
      <the-card
        v-for="astre in filteredAstres"
        :key="astre.id"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ astre.name }}
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
        <p class="font-normal">
          P lanet: {{ astre.isPlanet }}
        </p>
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
  </div>
</template>

<script setup>
import { TheCard,Button } from 'flowbite-vue'
import { ref, onMounted, computed } from 'vue'
import { useAstresStore } from '../store/astre'

const astresStore = useAstresStore()
const astres = ref([])

// Fetch the astres when the component is mounted
onMounted(async () => {
  try {
    await astresStore.fetchAstres()
    astres.value = astresStore.astres
    console.log(astres.value)
  } catch (error) {
    console.error(error)
  }
})

const searchTerm = ref('')

// Filter the astres based on the search term
const filteredAstres = computed(() => {
  const term = searchTerm.value.toLowerCase()
  return astres.value.filter(astre => {
    if (typeof astre.name !== 'string') {
      return false
    }
    return astre.name.toLowerCase().includes(term)
  })
})
</script>