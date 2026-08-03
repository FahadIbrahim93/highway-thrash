import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import type { AdaptiveQualitySettings } from '../core/types'

/** Quality-gated post-processing: bloom + subtle vignette. */
export class PostFX {
  private composer: EffectComposer | null = null
  private bloom: UnrealBloomPass | null = null
  private vignette: ShaderPass | null = null
  private enabled = false
  private readonly renderer: THREE.WebGLRenderer
  private readonly scene: THREE.Scene
  private readonly camera: THREE.Camera

  constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) {
    this.renderer = renderer
    this.scene = scene
    this.camera = camera
  }

  applySettings(qs: AdaptiveQualitySettings, width: number, height: number): void {
    const want = qs.enableBloom
    if (!want) {
      this.enabled = false
      return
    }
    if (!this.composer) {
      this.composer = new EffectComposer(this.renderer)
      this.composer.addPass(new RenderPass(this.scene, this.camera))
      this.bloom = new UnrealBloomPass(new THREE.Vector2(width, height), 0.35, 0.6, 0.85)
      this.composer.addPass(this.bloom)
      this.vignette = new ShaderPass({
        uniforms: {
          tDiffuse: { value: null },
          dark: { value: 0.35 },
          offset: { value: 1.15 }
        },
        vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `uniform sampler2D tDiffuse; uniform float dark; uniform float offset; varying vec2 vUv; void main() { vec4 c = texture2D(tDiffuse, vUv); vec2 uv = vUv - 0.5; float v = smoothstep(0.8, 0.2, length(uv) * offset); c.rgb *= mix(1.0 - dark, 1.0, v); gl_FragColor = c; }`
      })
      this.composer.addPass(this.vignette)
    }
    this.composer.setSize(width, height)
    this.bloom?.setSize(width, height)
    if (this.bloom) this.bloom.strength = qs.enableMotionBlur ? 0.42 : 0.28
    this.enabled = true
  }

  render(): void {
    if (this.enabled && this.composer) this.composer.render()
    else this.renderer.render(this.scene, this.camera)
  }

  setSize(w: number, h: number): void {
    this.composer?.setSize(w, h)
    this.bloom?.setSize(w, h)
  }

  dispose(): void {
    this.composer?.dispose()
    this.composer = null
    this.bloom = null
    this.vignette = null
  }
}
