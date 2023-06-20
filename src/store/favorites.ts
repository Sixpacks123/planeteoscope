import { defineStore } from 'pinia'
import { Astre } from '../type/astres'
import { useAstresStore } from './astre'

interface FavoritesState {
  favorites: Astre[];
}

export const useFavoritesStore = defineStore('favorites', {
  state: (): FavoritesState => ({
    favorites: [],
  }),

  actions: {
    addToFavorites(id: string) {
      const astresStore = useAstresStore()
      const favoriteAstre = astresStore.getAstreById(id)

      if (favoriteAstre && !this.favorites.some(astre => astre.id === id)) {
        favoriteAstre.isFavorite = true
        favoriteAstre.isFavorite = favoriteAstre.isFavorite ?? true // Set isFavorite to true if it's null
        this.favorites.push(favoriteAstre)
        this.persistFavorites()
      }
    },

    removeFromFavorites(id: string) {
      const astresStore = useAstresStore()
      const favoriteAstre = astresStore.getAstreById(id)

      if (favoriteAstre) {
        const index = this.favorites.findIndex(astre => astre.id === id)

        if (index !== -1) {
          favoriteAstre.isFavorite = false
          this.favorites.splice(index, 1)
          this.persistFavorites()
        }
      }
    },

    persistFavorites() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },


    loadFavorites() {
      try {
        const favorites = localStorage.getItem('favorites')

        if (favorites) {
          this.favorites = JSON.parse(favorites)
        }
      } catch (err) {
        console.error('Failed to load favorites from localStorage', err)
      }
    },

  },
})
