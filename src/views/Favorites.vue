<template>
  <div class="container mx-auto py-10">
    <h1 class="text-3xl font-bold mb-4">
      Favorite Astres
    </h1>
    <ul>
      <li
        v-for="(astre, index) in favoriteAstres"
        :key="index"
        class="mb-2"
      >
        {{ astre }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useAstresStore } from '../store/astre'

const astresStore = useAstresStore()
const favoriteAstres = astresStore.getFavorites()

console.log(favoriteAstres)
</script>
