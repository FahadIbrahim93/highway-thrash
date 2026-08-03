import * as THREE from 'three'
import type { BikeController } from './BikeController'

/**
 * Smooth third-person chase camera with optional first-person mode.
 */
export class CameraSystem {
  readonly camera: THREE.PerspectiveCamera
  private firstPerson = false
  private readonly lookTarget = new THREE.Vector3()

  constructor(aspect: number) {
    this.camera = new THREE.PerspectiveCamera(60, aspect, 0.5, 500)
    this.camera.position.set(0, 4.5, -8)
  }

  setFirstPerson(enabled: boolean): void {
    this.firstPerson = enabled
  }

  isFirstPerson(): boolean {
    return this.firstPerson
  }

  toggleFirstPerson(): void {
    this.firstPerson = !this.firstPerson
  }

  update(dt: number, bike: BikeController): void {
    if (this.firstPerson) {
      const targetX = bike.x
      const targetY = 1.45
      const targetZ = 0.3
      this.camera.position.x += (targetX - this.camera.position.x) * Math.min(1, 8 * dt)
      this.camera.position.y += (targetY - this.camera.position.y) * Math.min(1, 8 * dt)
      this.camera.position.z += (targetZ - this.camera.position.z) * Math.min(1, 8 * dt)
      this.lookTarget.set(bike.x * 0.3, 1.2, 12)
      this.camera.lookAt(this.lookTarget)
      this.camera.fov = 75
    } else {
      const targetX = bike.x * 0.85
      const targetY = 3.8 + (bike.isWheelie ? 0.6 : 0)
      const targetZ = -9.5 - bike.speed * 0.04
      this.camera.position.x += (targetX - this.camera.position.x) * Math.min(1, 4 * dt)
      this.camera.position.y += (targetY - this.camera.position.y) * Math.min(1, 3 * dt)
      this.camera.position.z += (targetZ - this.camera.position.z) * Math.min(1, 3 * dt)
      this.lookTarget.set(bike.x * 0.5, 1.2, 6 + bike.speed * 0.08)
      this.camera.lookAt(this.lookTarget)
      this.camera.fov = 60
    }
    this.camera.updateProjectionMatrix()
  }

  onResize(aspect: number): void {
    this.camera.aspect = aspect
    this.camera.updateProjectionMatrix()
  }
}
