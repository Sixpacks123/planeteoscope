<template>
  <div class="dark:bg-gray-900 flex items-center justify-center">
    <div class="py-10 mx-auto w-full sm:py-16 lg:px-6">
      <div class="w-full">
        <div class="py-2 px-4 mx-auto max-w-screen-xl">
          <h1 class="text-6xl text-center font-extrabold pb-4">
            Liste des Astres
          </h1>
          <div class="flex flex-row items-center space-x-4">
            <div class="w-full">
              <SearchInput @search="handleSearch" />
            </div>
            <dropdown text="Trier">
              <list-group>
                <list-group-item @click="state.selectedType = null">
                  Tous les astres
                </list-group-item>
                <list-group-item @click="state.selectedType = true">
                  Planètes
                </list-group-item>
                <list-group-item @click="state.selectedType = false">
                  Non-planètes
                </list-group-item>
                <list-group-item @click="state.selectedType = 'favorite'">
                  favories
                </list-group-item>
                <list-group-item @click="state.selectedType = 'moon'">
                  Possède des lunes
                </list-group-item>
              </list-group>
            </dropdown>
          </div>
        </div>
      </div>
      <div class="py-2 px-4">
        <div
          v-if="filteredAstres.length > 0"
          v-auto-animate
          class="flex flex-wrap py-2 justify-center"
        >
          <the-card
            v-for="astre in filteredAstres"
            :key="astre.id"
            class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-2"
          >
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ astre.name }}
            </h5>
            <p
              v-if="astre.isPlanet"
              class="font-normal"
            >
              Cette astre est une planète
            </p>
            <p v-else>
              Cette astre n'est pas une planète
            </p>
            <div>
              <p v-if="astre.moons === null || astre.moons === undefined">
                Pas de lunes pour cet astre.
              </p>
              <p
                v-else
                class="font-normal"
              >
                Nombre de lunes : {{ astre.moons.length }}
              </p>
            </div>
            <div class="flex justify-between mt-4">
              <BaseButton
                :to="{ name: 'AstreDetail', params: { id: astre.id } }"
                color="info"
                label="details"
              />

              <button
                class="h-6 w-6 cursor-pointer text-gray-500 hover"
                :class="astre.isFavorite ? 'text-red-500' : ''"
                @click="toggleFavorite(astre)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  :class="astre.isFavorite ? 'text-red-500' : 'text-gray-500'"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    :class="astre.isFavorite ? 'fill-red-500' : ''"
                  />
                </svg>
              </button>
            </div>
          </the-card>
        </div>
        <div
          v-else
          class="w-full py-8"
        >
          <SkeletonCard />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useAstresStore } from '../store/astre'
import { useFavoritesStore } from '../store/favorites'
import SkeletonCard from '../components/skeletonCard.vue'
import BaseButton from '../components/Base/BaseButton.vue'
import { Dropdown, ListGroup, ListGroupItem, TheCard } from 'flowbite-vue'
import SearchInput from '../components/SearchInput.vue'
import { useSuccess, useWarning } from '../composable/notif'

const astresStore = useAstresStore()
const favoritesStore = useFavoritesStore()

onMounted(async () => {
  try {
    await astresStore.fetchAstres()
    favoritesStore.loadFavorites()
  } catch (error) {
    console.error(error)
  }
})

const state = ref({
  searchTerm: '',
  selectedType: null,
})

const handleSearch = (value) => {
  state.value.searchTerm = value
}

function applyFilter(astre) {
  const term = state.value.searchTerm.toLowerCase()
  if (typeof astre.name !== 'string') {
    return false
  }
  if (state.value.selectedType === true && !astre.isPlanet) {
    return false
  }
  if (state.value.selectedType === false && astre.isPlanet) {
    return false
  }
  if (state.value.selectedType === 'moon' && astre.moons === null) {
    return false
  }
  if (state.value.selectedType === 'favorite' && !astre.isFavorite) {
    return false
  }
  return astre.name.toLowerCase().includes(term)
}

const filteredAstres = computed(() => {
  return astresStore.astres.filter(applyFilter)
})

const toggleFavorite = (astre) => {
  if (astre.isFavorite) {
    favoritesStore.removeFromFavorites(astre.id)
    useWarning(astre.name)
  } else {
    favoritesStore.addToFavorites(astre.id)
    useSuccess(astre.name)
  }
}
</script>
