<template>
  <div id="container">
    <canvas />
  </div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default {
  name: 'EarthModel',

  mounted() {
    // Set up scene
    const scene = new THREE.Scene()

    // Set up camera
    const width = this.$el.clientWidth
    const height = this.$el.clientHeight
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.z = 1

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas: this.$el.querySelector('canvas') })
    renderer.setPixelRatio(window.devicePixelRatio)
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
      'src/assets/models/earth.glb',
      (model) => {
        model.scene.scale.set(0.5, 0.5, 0.5)
        model.scene.rotation.y = -Math.PI / 2

        scene.add(model.scene)

        // Add lighting to scene
        const light = new THREE.DirectionalLight(0xffffff, 2)
        light.position.set(0, 0, 1)
        scene.add(light)

        // Animate the scene
        const animate = () => {
          this.animationId = requestAnimationFrame(animate)
          model.scene.rotation.y += 0.004
          renderer.render(scene, camera)
        }
        animate()
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
