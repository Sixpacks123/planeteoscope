import { defineStore } from 'pinia'

interface ApodImage {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

interface ApodQueryParams {
  date?: string;
  start_date?: string;
  end_date?: string;
  count?: number;
  thumbs?: boolean;
  api_key?: string;
}

export const useApodStore = defineStore('apod', {
  state: () => ({
    loading: false,
    error: null as string | null,
    apodImages: [] as ApodImage[],
  }),

  actions: {
    async fetchApodImages(queryParams: ApodQueryParams = {}) {
      try {
        this.loading = true
        this.error = null

        const baseUrl = 'https://api.nasa.gov/planetary/apod'
        const apiKey = import.meta.env.apikey

        const url = new URL(baseUrl)
        url.searchParams.set('api_key', apiKey)

        for (const key in queryParams) {
          if (queryParams[key]) {
            url.searchParams.set(key, queryParams[key].toString())
          }
        }

        const response = await fetch(url.toString())
        const data = await response.json()

        if (Array.isArray(data)) {
          this.apodImages = data
        } else {
          this.apodImages = [data]
        }
      } catch (error) {
        this.error = 'Une erreur s\'est produite lors de la récupération des images APOD.'
      } finally {
        this.loading = false
      }
    },
  },
})
