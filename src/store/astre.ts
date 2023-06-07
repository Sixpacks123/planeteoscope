import { defineStore } from 'pinia'

import { Astre } from '../type/astres'

interface AstresState {
  astres: Astre[];
}

export const useAstresStore = defineStore('astres', {
  state: (): AstresState => ({
    astres: [],
  }),

  actions: {
    async fetchAstres() {
      if (this.astres.length > 0) {
        return // La liste d'astres est déjà remplie, retourner sans effectuer la requête
      }

      try {
        const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies/')
        const data = await response.json()

        const astres = data.bodies.map((astre: Astre) => ({
          ...astre,
          isFavorite: false,
        }))

        const guillaumeAstre: Astre = {
          id: 'guillaume',
          name: 'Guillaume La lune',
          englishName: 'Guillaume',
          isPlanet: false,
          moons: null,
          semimajorAxis: 0,
          perihelion: 0,
          aphelion: 0,
          eccentricity: 0,
          inclination: 0,
          density: 0,
          gravity: 0,
          escape: 0,
          meanRadius: 0,
          equaRadius: 0,
          polarRadius: 0,
          flattening: 0,
          dimension: '',
          sideralOrbit: 0,
          sideralRotation: 0,
          aroundPlanet: null,
          discoveredBy: '',
          discoveryDate: '',
          alternativeName: '',
          axialTilt: 0,
          avgTemp: 0,
          mainAnomaly: 0,
          argPeriapsis: 0,
          longAscNode: 0,
          bodyType: '',
          rel: null,
          isFavorite: false,
        }

        // Check if favorite Astres exist in localStorage
        const favorites = this.getFavorites()
        astres.forEach(astre => {
          if (favorites.includes(astre.id)) {
            astre.isFavorite = true
          }
        })

        this.astres = [...astres, guillaumeAstre]
      } catch (error) {
        console.error(error)
      }
    },

    addToFavorites(id: string) {
      const astre = this.astres.find(astre => astre.id === id)
      if (astre) {
        astre.isFavorite = true
        this.persistFavorites()
      }
    },

    removeFromFavorites(id: string) {
      const astre = this.astres.find(astre => astre.id === id)
      if (astre) {
        astre.isFavorite = false
        this.persistFavorites()
      }
    },

    persistFavorites() {
      const favorites = this.astres
        .filter(astre => astre.isFavorite)
        .map(astre => astre)
      localStorage.setItem('favorites', JSON.stringify(favorites))
    },

    getFavorites() {
      const favorites = localStorage.getItem('favorites')
      return favorites ? JSON.parse(favorites) : []
    },
  },

  getters: {
    getAstreById: (state) => (id: string) => {
      return state.astres.find(astre => astre.id === id)
    },
  },
})
