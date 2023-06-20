import { defineStore } from 'pinia'
import { Astre } from '../type/astres'

interface AstresState {
  astres: Astre[];
}

const API_BASE = 'https://api.le-systeme-solaire.net/rest'

export const useAstresStore = defineStore('astres', {
  state: (): AstresState => ({
    astres: [],
  }),

  actions: {
    async fetchAstres() {
      if (this.astres.length > 0) {
        return
      }

      try {
        const response = await fetch(API_BASE + '/bodies/')
        const data = await response.json()

        const astres = data.bodies.map((astre: any) => astre as Astre)

        this.astres = astres
      } catch (error) {
        console.error(error)
      }
    },
  },

  getters: {
    getAstreById: (state) => (id: string) => {
      return state.astres.find(astre => astre.id === id)
    },
  },
})
