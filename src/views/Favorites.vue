<template>
  <div class="dark:bg-gray-900 flex items-center justify-center">
    <div class="py-10 mx-auto w-full sm:py-16 lg:px-6">
      <div class="w-full">
        <div class="py-2 px-4 mx-auto max-w-screen-xl">
          <h1 class="text-6xl text-center font-extrabold pb-4">
            vos astres préféré
          </h1>
          <the-card
            v-for="astre in favoriteAstres"
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
              <router-link :to="{ name: 'AstreDetail', params: { id: astre.id } }">
                <Button
                  :to="{ name: 'AstreDetail', params: { id: astre.id } }"
                  color="default"
                >
                  Détails
                </Button>
              </router-link>
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
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAstresStore } from '../store/astre'
import { Button, TheCard } from 'flowbite-vue'
import { useWarning } from '../composable/notif'
import { computed } from 'vue'

const astresStore = useAstresStore()
const favoriteAstres = computed(() => astresStore.getFavorites())
const toggleFavorite = (astre) => {
  if (astre.isFavorite) {
    astresStore.removeFromFavorites(astre.id)
    useWarning(astre.name)
  } else {
  }
}

console.log(favoriteAstres.value)
</script>

