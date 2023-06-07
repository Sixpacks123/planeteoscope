<template>
  <div id="container">
    <canvas
      class="webgl"
      :style="{ opacity: ready ? 1 : 0 }"
    />
  </div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
export default {
  data() {
    return {
      ready: false,
    }
  },
  mounted() {
    // Set up scene
    const scene = new THREE.Scene()

    // Set up camera
    const width = this.$el.clientWidth
    const height = this.$el.clientHeight
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(0, 0, 1)
    scene.add(camera)

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas: this.$el.querySelector('canvas') })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)

    // Resize the renderer when the window size changes
    window.addEventListener('resize', () => {
      const width = this.$el.clientWidth
      const height = this.$el.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    })

    // Load Earth model
    const loader = new GLTFLoader()
    loader.load(
      'public/static/assets/models/mars.glb',
      (model) => {
        model.scene.scale.set(0.8, 0.8, 0.8)
        model.scene.rotation.y = -Math.PI / 2

        scene.add(model.scene)

        // Add lighting to scene

        const ambientLight = new THREE.AmbientLight(0xffffff, 1)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
        directionalLight.position.set(1, 1, 1)
        scene.add(directionalLight)

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.2)
        directionalLight2.position.set(-1, -1, -1)
        scene.add(directionalLight2)


        // Set up controls
        const controls = new OrbitControls(camera, this.$el)
        controls.enableDamping = true
        controls.enablePan = false
        controls.enableZoom = false
        controls.minPolarAngle = Math.PI / 2
        controls.maxPolarAngle = Math.PI / 2

        // Animate the scene
        const clock = new THREE.Clock()
        let previousTime = 0

        const animate = () => {
          this.animationId = requestAnimationFrame(animate)
          const elapsedTime = clock.getElapsedTime()
          const deltaTime = elapsedTime - previousTime
          previousTime = elapsedTime

          model.scene.rotation.y += 0.5 * deltaTime


          // Update controls
          controls.update()

          renderer.render(scene, camera)
        }
        animate()

        this.ready = true
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
        console.error(error)
      },
    )
  },

  beforeUnmount() {
    // Stop the animation and remove all objects from the scene
    cancelAnimationFrame(this.animationId)
    this.animationId = null
    const scene = this.$data.scene
    const obj = scene.getObjectByName('LowPoly_Earth')
    scene.remove(obj)
    obj.traverse((o) => {
      if (o.geometry) {
        o.geometry.dispose()
      }
      if (o.material) {
        o.material.dispose()
      }
    })
  },
}
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
canvas {
  width: 100%;
  height: 100%;
}
</style>
