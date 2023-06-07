<template>
  <div class="pt-30 bg-red-400">
    <button @click="fetchImagesToday">
      Image du jour
    </button>
    <button @click="fetchImagesByDate('2023-06-06')">
      Image du 6 juin 2023
    </button>
    <button @click="fetchRandomImages(5)">
      5 images aléatoires
    </button>

    <div v-if="loading">
      Chargement...
    </div>
    <div v-else-if="error">
      {{ error }}
    </div>
    <div v-else>
      <div
        v-for="image in apodImages"
        :key="image.date"
      >
        <h2>{{ image.title }}</h2>
        <img
          :src="image.url"
          :alt="image.title"
        >
        <p>{{ image.explanation }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useApodStore } from '../store/apod'

const apodStore = useApodStore()

const loading = apodStore.loading
const error = apodStore.error
const apodImages = apodStore.apodImages
console.log(apodImages)
const fetchImagesToday = () => apodStore.fetchApodImages()
const fetchImagesByDate = (date) => apodStore.fetchApodImages({ date })
const fetchRandomImages = (count) => apodStore.fetchApodImages({ count })
</script>
