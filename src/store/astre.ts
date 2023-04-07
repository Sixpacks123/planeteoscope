import { defineStore } from 'pinia'
import { Astre } from '../type/astres'

interface AstresState {
  astres: Astre[];
}

export const useAstresStore = defineStore({
  id: 'astres',

  state: (): AstresState => ({
    astres: [],
  }),

  actions: {
    async fetchAstres() {
      try {
        const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies/')
        const data = await response.json()

        // Map each Astre object to extract all the necessary fields, including the ID
        this.astres = data.bodies.map((astre: Astre) => ({
          id: astre.id,
          name: astre.name,
          englishName: astre.englishName,
          isPlanet: astre.isPlanet,
          // Include all other necessary fields
        }))
      } catch (error) {
        console.error(error)
      }
    },
  },

  getters: {
    getAstreById: state => (id: string) => {
      return state.astres.find(astre => astre.id === id)
    },
  },
})
