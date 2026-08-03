import * as THREE from 'three'
import type { BikeStats, InputState } from '../core/types'
import { createProceduralBike } from '../assets/loaders/BikeAssetLoader'
import { effectiveStats } from '../data/bikes'

/**
 * Arcade bike physics + visual mesh. Owns position, speed, nitro, wheelie, yaw.
 * Visual comes from BikeAssetLoader (procedural now; GLB when modelPath is set).
 */
export class BikeController {
  readonly group: THREE.Group

  x = 0
  z = 0
  speed = 0
  yaw = 0
  nitroFuel = 1
  isWheelie = false
  private wheelieTimer = 0
  invulnTimer = 0
  private crashTumble = 0

  private stats: BikeStats
  private maxX = 6.2

  constructor(stats: BikeStats) {
    this.stats = stats
    this.group = createProceduralBike(stats)
  }

  setMaxX(v: number): void {
    this.maxX = v
  }

  setStats(stats: BikeStats): void {
    this.stats = stats
  }

  replaceVisual(newGroup: THREE.Group): void {
    while (this.group.children.length) {
      this.group.remove(this.group.children[0])
    }
    newGroup.children.slice().forEach((c) => this.group.add(c))
  }

  update(dt: number, input: InputState): void {
    const eff = effectiveStats(this.stats)
    const topMs = eff.topSpeed / 3.6
    const accel = 16 * eff.acceleration
    const brakeForce = 28 * eff.brakes
    const drag = 0.18 + (this.speed / 80) * 0.22

    if (input.throttle > 0.05) {
      this.speed += accel * input.throttle * dt
    }
    if (input.brake > 0.05) {
      this.speed -= brakeForce * input.brake * dt
    }
    this.speed -= this.speed * drag * dt
    if (this.speed < 0) this.speed = 0
    if (this.speed > topMs) this.speed = topMs

    if (input.nitro && this.nitroFuel > 0) {
      this.speed = Math.min(this.speed + 38 * dt, topMs * 1.28)
      this.nitroFuel = Math.max(0, this.nitroFuel - 0.42 * dt)
    } else {
      this.nitroFuel = Math.min(1, this.nitroFuel + 0.06 * dt)
    }

    const speedFactor = 1 - Math.min(0.55, this.speed / 95)
    const steerFactor = 1.35 * eff.handling * speedFactor
    this.yaw += input.steer * steerFactor * 3.2 * dt
    this.yaw *= Math.pow(0.88, dt * 60)
    this.x += Math.sin(this.yaw) * this.speed * dt * 2.0
    this.x = Math.max(-this.maxX, Math.min(this.maxX, this.x))

    this.z += this.speed * dt

    if (input.wheelie && this.speed > 10) {
      this.isWheelie = true
      this.wheelieTimer += dt
    } else {
      this.isWheelie = false
      this.wheelieTimer = 0
    }

    if (this.invulnTimer > 0) this.invulnTimer -= dt

    this.group.position.x = this.x
    this.group.position.z = 0
    this.group.rotation.y = -this.yaw * 0.75
    this.group.rotation.z = -input.steer * 0.32 - this.yaw * 0.15
    if (this.crashTumble > 0) {
      this.crashTumble -= dt
      const t = this.crashTumble
      this.group.rotation.x = Math.sin(t * 18) * 0.55 * t
      this.group.rotation.z += Math.sin(t * 14) * 0.4 * t
      this.group.position.y = Math.max(0, Math.sin(t * 10) * 0.6 * t)
    } else {
      this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, 0, 10 * dt)
      this.group.rotation.x = this.isWheelie
        ? -0.42
        : THREE.MathUtils.lerp(this.group.rotation.x, 0, 8 * dt)
    }
  }

  applyCrash(): void {
    this.invulnTimer = 2.5
    this.speed *= 0.12
    this.yaw += (Math.random() - 0.5) * 1.2
    this.crashTumble = 1.1
    this.isWheelie = false
    this.x += (Math.random() > 0.5 ? 1 : -1) * (1.5 + Math.random())
    this.x = Math.max(-this.maxX, Math.min(this.maxX, this.x))
  }

  getWheelieTimeThisFrame(dt: number): number {
    return this.isWheelie && this.wheelieTimer > 0.5 ? dt : 0
  }

  getSpeedKmh(): number {
    return this.speed * 3.6
  }

  dispose(): void {
    this.group.traverse((c) => {
      if (c instanceof THREE.Mesh) {
        c.geometry.dispose()
        if (Array.isArray(c.material)) c.material.forEach((m) => m.dispose())
        else (c.material as THREE.Material).dispose()
      }
    })
  }
}
