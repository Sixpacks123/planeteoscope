import Home from './views/Home.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'
import Astres from './views/Astres.vue'
import AstreDetail from './views/AstreDetail.vue'

export const routes = [
  { path: '/', component: Home, meta: { title: 'Home' }},
  { path: '/astres', component: Astres, meta: { title: 'Astres' }},
  { path: '/astres/:id', name: 'AstreDetail', component: AstreDetail, props: true },
  { path: '/about', component: About, meta: { title: 'About' }},
  { path: '/:pathMatch(.*)*', component: NotFound, meta: { title: 'Page not found' }},
]
