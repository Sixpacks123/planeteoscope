<template>
  <div>
    <Navbar />
    <div>
      <router-view
        :key="$route.fullPath"
        class="bg-white"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from './components/Navbar.vue'

export default defineComponent({
  components: { Navbar },
})
</script>
