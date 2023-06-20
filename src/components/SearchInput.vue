<template>
  <div class="relative">
    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <!-- your svg code here -->
    </div>
    <input
      id="default-search"
      v-model="searchTerm"
      type="search"
      class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Rechercher un astre"
      required
      @input="onSearch"
    >
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const searchTerm = ref('')
const emit = defineEmits(['search'])

const onSearch = () => {
  emit('search', searchTerm.value)
}
</script>
