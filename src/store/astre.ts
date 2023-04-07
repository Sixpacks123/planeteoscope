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
        // Ajouter Guillaume à la liste d'astres
        // Ajouter Guillaume à la liste d'astres
        this.astres.push({
          mass:{
           massValue:90,
           massExponent:40,
          }, vol: {
            volValue:90,
            volExponent:40,
          },
          alternativeName: '',
          aphelion: 0,
          moons: null, rel:'null',
          argPeriapsis: 0,
          aroundPlanet: null,
          avgTemp: 0,
          axialTilt: 0,
          bodyType: '',
          density: 0,
          dimension: '',
          discoveredBy: '',
          discoveryDate: '',
          eccentricity: 0,
          equaRadius: 0,
          escape: 0,
          flattening: 0,
          gravity: 0,
          inclination: 0,
          longAscNode: 0,
          mainAnomaly: 0,
          meanRadius: 0,
          perihelion: 0,
          polarRadius: 0,
          semimajorAxis: 0,
          sideralOrbit: 0,
          sideralRotation: 0,
          id: 'guillaume',
          name: 'Guillaume',
          englishName: 'Guillaume',
          isPlanet: false,
        })
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
