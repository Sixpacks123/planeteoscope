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
          moons: astre.moons,
          semimajorAxis: astre.semimajorAxis,
          perihelion: astre.perihelion,
          aphelion: astre.aphelion,
          eccentricity: astre.eccentricity,
          inclination: astre.inclination,
          mass: {
            massValue: astre.mass.massValue,
            massExponent: astre.mass.massExponent,
          },
          vol: {
            volValue: astre.vol.volValue,
            volExponent: astre.vol.volExponent,
          },
          density: astre.density,
          gravity: astre.gravity,
          escape: astre.escape,
          meanRadius: astre.meanRadius,
          equaRadius: astre.equaRadius,
          polarRadius: astre.polarRadius,
          flattening: astre.flattening,
          dimension: astre.dimension,
          sideralOrbit: astre.sideralOrbit,
          sideralRotation: astre.sideralRotation,
          aroundPlanet: astre.aroundPlanet,
          discoveredBy: astre.discoveredBy,
          discoveryDate: astre.discoveryDate,
          alternativeName: astre.alternativeName,
          axialTilt: astre.axialTilt,
          avgTemp: astre.avgTemp,
          mainAnomaly: astre.mainAnomaly,
          argPeriapsis: astre.argPeriapsis,
          longAscNode: astre.longAscNode,
          bodyType: astre.bodyType,
          rel: astre.rel,
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
