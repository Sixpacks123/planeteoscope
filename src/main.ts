import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import './index.css'
import { createPinia } from 'pinia'
import { useAstresStore } from './store/astre'
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { MotionPlugin } from '@vueuse/motion'


const pinia = createPinia()

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: import.meta.hot ? [] : routes,
})

if (import.meta.hot) {
  const removeRoutes = []

  for (const route of routes) {
    removeRoutes.push(router.addRoute(route))
  }
}
if (import.meta.hot) {
  import.meta.hot?.accept('./routes.ts', ({ routes }) => {
    for (const removeRoute of removeRoutes) removeRoute()
    removeRoutes = []
    for (const route of routes) {
      removeRoutes.push(router.addRoute(route))
    }
    router.replace('')
  })
}

app.use(pinia)
app.use(router)
app.use(autoAnimatePlugin)
app.use(
    Vue3Toasity,
    {
      autoClose: 3000,
      // ...
    } as ToastContainerOptions,
  )
app.use(MotionPlugin)
app.mount('#app')
const astreStore = useAstresStore()
