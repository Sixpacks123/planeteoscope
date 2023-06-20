<template>
  <div class="">
    <Navbar />
    <div class="mt-20">
      <router-view
        :key="$route.fullPath"
        class="bg-white"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from './components/Navbar.vue'
</script>

