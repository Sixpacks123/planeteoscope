import Home from './views/Home.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'
import Astres from './views/Astres.vue'
import AstreDetail from './views/AstreDetail.vue'
import Favorites from './views/Favorites.vue'
import system from './views/system.vue'
import ImageJour from './views/imageJour.vue'

export const routes = [
  { path: '/', component: Home, meta: { title: 'Home' }},
  { path: '/astres', component: Astres, meta: { title: 'Astres' }},
  { path: '/astres/:id', name: 'AstreDetail', component: AstreDetail, props: true },
  { path: '/about', component: About, meta: { title: 'About' }},
  { path: '/fav', component: Favorites, meta: { title: 'Liste des fav' }},
  { path: '/system', component: system, meta: { title: 'Liste des fav' }},
  { path: '/images', component: ImageJour, meta: { title: 'Image du jours'}},
  { path: '/:pathMatch(.*)*', component: NotFound, meta: { title: 'Page not found' }},
]
