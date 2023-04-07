<template>
  <div class="mt-20">
    <h1>{{ astre.name }}</h1>
    <p><strong>English name:</strong> {{ astre.englishName }}</p>
    <p><strong>Is planet:</strong> {{ astre.isPlanet }}</p>
    <!-- Afficher les autres informations de l'astre ici -->
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAstresStore } from '../store/astre'

const astresStore = useAstresStore()
const route = useRoute()
const astreId = route.params.id

const astre = computed(() => {
  const astre = astresStore.getAstreById(astreId)
  console.log(astreId)
  return astre
})
</script>


