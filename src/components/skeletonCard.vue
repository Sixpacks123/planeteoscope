<template>
  <div class="flex flex-wrap py-2 justify-center">
    <the-card
      v-for="astre in 20"
      :key="astre"
      class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-2"
    >
      <div
        role="status"
        class="space-y-2.5 animate-pulse max-w-lg"
      >
        <div class="flex items-center w-full space-x-2">
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32" />
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24" />
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
        </div>
        <div class="flex items-center w-full space-x-2 max-w-[480px]">
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24" />
        </div>
        <div class="flex items-center w-full space-x-2 max-w-[400px]">
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80" />
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
        </div>
        <div class="flex items-center w-full space-x-2 max-w-[480px]">
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24" />
        </div>
        <div class="flex items-center w-full space-x-2 max-w-[440px]">
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32" />
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24" />
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
        </div>
        <div class="flex items-center w-full space-x-2 max-w-[360px]">
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80" />
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
        </div>
        <span class="sr-only">Loading...</span>
      </div>
    </the-card>
  </div>
</template>
<script setup lang="ts">
import { TheCard } from 'flowbite-vue'
</script>
