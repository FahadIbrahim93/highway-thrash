import * as THREE from 'three'

interface Prop {
  mesh: THREE.Object3D
  z: number
  active: boolean
}

/** Cheap roadside props — trees, signs, poles — for depth and motion parallax. */
export class PropSystem {
  private props: Prop[] = []
  private readonly scene: THREE.Scene
  private spawnTimer = 2
  private readonly maxProps = 24

  private treeMat: THREE.MeshStandardMaterial
  private trunkMat: THREE.MeshStandardMaterial
  private signMat: THREE.MeshStandardMaterial
  private poleMat: THREE.MeshStandardMaterial

  constructor(scene: THREE.Scene) {
    this.scene = scene
    this.treeMat = new THREE.MeshStandardMaterial({ color: 0x2d6b2d, roughness: 0.9 })
    this.trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a3020, roughness: 0.95 })
    this.signMat = new THREE.MeshStandardMaterial({ color: 0x2a5a2a, metalness: 0.3, roughness: 0.5 })
    this.poleMat = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.6, roughness: 0.4 })
  }

  private makeTree(): THREE.Group {
    const g = new THREE.Group()
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 1.4, 6), this.trunkMat)
    trunk.position.y = 0.7
    g.add(trunk)
    const canopy = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.8, 7), this.treeMat)
    canopy.position.y = 2.0
    canopy.castShadow = true
    g.add(canopy)
    return g
  }

  private makeSign(): THREE.Group {
    const g = new THREE.Group()
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.2, 6), this.poleMat)
    pole.position.y = 1.1
    g.add(pole)
    const board = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.7, 0.08), this.signMat)
    board.position.y = 2.3
    g.add(board)
    return g
  }

  private spawn(bikeZ: number): void {
    if (this.props.filter((p) => p.active).length >= this.maxProps) return
    const side = Math.random() > 0.5 ? 1 : -1
    const x = side * (10 + Math.random() * 14)
    const z = bikeZ + 80 + Math.random() * 120
    const kind = Math.random()
    const mesh = kind > 0.35 ? this.makeTree() : this.makeSign()
    mesh.position.set(x, 0, 0)
    mesh.scale.setScalar(0.85 + Math.random() * 0.4)
    this.scene.add(mesh)
    this.props.push({ mesh, z, active: true })
  }

  update(dt: number, bikeZ: number): void {
    this.spawnTimer -= dt
    if (this.spawnTimer <= 0) {
      this.spawn(bikeZ)
      this.spawnTimer = 0.8 + Math.random() * 1.2
    }
    const still: Prop[] = []
    for (const p of this.props) {
      if (!p.active) continue
      const rel = p.z - bikeZ
      p.mesh.position.z = rel
      if (rel < -50) {
        this.scene.remove(p.mesh)
        p.active = false
        continue
      }
      still.push(p)
    }
    this.props = still
  }

  dispose(): void {
    for (const p of this.props) this.scene.remove(p.mesh)
    this.props = []
    this.treeMat.dispose()
    this.trunkMat.dispose()
    this.signMat.dispose()
    this.poleMat.dispose()
  }
}
