import type { AdaptiveQualitySettings, DeviceTier, QualityLevel } from './types'

const PRESETS: Record<QualityLevel, AdaptiveQualitySettings> = {
  potato: {
    resolutionScale: 0.5,
    shadowMapSize: 0,
    maxTraffic: 8,
    particleBudget: 20,
    enableBloom: false,
    enableSSR: false,
    enableMotionBlur: false,
    enableFilmGrain: false,
    antialias: false,
    maxPixelRatio: 1
  },
  low: {
    resolutionScale: 0.7,
    shadowMapSize: 512,
    maxTraffic: 14,
    particleBudget: 40,
    enableBloom: false,
    enableSSR: false,
    enableMotionBlur: false,
    enableFilmGrain: false,
    antialias: false,
    maxPixelRatio: 1.25
  },
  medium: {
    resolutionScale: 0.85,
    shadowMapSize: 1024,
    maxTraffic: 22,
    particleBudget: 80,
    enableBloom: true,
    enableSSR: false,
    enableMotionBlur: false,
    enableFilmGrain: true,
    antialias: true,
    maxPixelRatio: 1.5
  },
  high: {
    resolutionScale: 1.0,
    shadowMapSize: 2048,
    maxTraffic: 32,
    particleBudget: 140,
    enableBloom: true,
    enableSSR: true,
    enableMotionBlur: true,
    enableFilmGrain: true,
    antialias: true,
    maxPixelRatio: 2
  },
  ultra: {
    resolutionScale: 1.0,
    shadowMapSize: 4096,
    maxTraffic: 48,
    particleBudget: 220,
    enableBloom: true,
    enableSSR: true,
    enableMotionBlur: true,
    enableFilmGrain: true,
    antialias: true,
    maxPixelRatio: 2
  }
}

export class AdaptiveQualityManager {
  private current: QualityLevel = 'medium'
  private settings: AdaptiveQualitySettings = { ...PRESETS.medium }
  private fpsHistory: number[] = []
  private readonly historySize = 60
  private forcedPerformanceMode = false
  private deviceTier: DeviceTier = 'mid'
  private onChange?: (level: QualityLevel, settings: AdaptiveQualitySettings) => void

  constructor() {
    this.detectDeviceTier()
    this.applyTierDefaults()
  }

  setOnChange(cb: (level: QualityLevel, settings: AdaptiveQualitySettings) => void): void {
    this.onChange = cb
  }

  private detectDeviceTier(): void {
    const cores = navigator.hardwareConcurrency ?? 4
    const mem = (navigator as any).deviceMemory ?? 4
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)

    if (isMobile && (cores <= 4 || mem <= 2)) {
      this.deviceTier = 'low'
    } else if (cores >= 8 && mem >= 8 && !isMobile) {
      this.deviceTier = 'high'
    } else {
      this.deviceTier = 'mid'
    }
  }

  private applyTierDefaults(): void {
    if (this.deviceTier === 'low') this.setLevel('low')
    else if (this.deviceTier === 'high') this.setLevel('high')
    else this.setLevel('medium')
  }

  setPerformanceMode(enabled: boolean): void {
    this.forcedPerformanceMode = enabled
    if (enabled) this.setLevel('potato')
    else this.applyTierDefaults()
  }

  setLevel(level: QualityLevel): void {
    if (level === this.current) return
    this.current = level
    this.settings = { ...PRESETS[level] }
    this.onChange?.(level, this.settings)
  }

  getSettings(): AdaptiveQualitySettings {
    return this.settings
  }

  getLevel(): QualityLevel {
    return this.current
  }

  getDeviceTier(): DeviceTier {
    return this.deviceTier
  }

  update(fps: number): void {
    if (this.forcedPerformanceMode) return

    this.fpsHistory.push(fps)
    if (this.fpsHistory.length > this.historySize) {
      this.fpsHistory.shift()
    }

    if (this.fpsHistory.length < 30) return

    const avg =
      this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length

    if (avg < 28 && this.current !== 'potato') {
      const order: QualityLevel[] = ['ultra', 'high', 'medium', 'low', 'potato']
      const idx = order.indexOf(this.current)
      if (idx < order.length - 1) {
        this.setLevel(order[idx + 1])
        this.fpsHistory = []
      }
    } else if (avg > 55 && this.current !== 'ultra' && this.deviceTier !== 'low') {
      const order: QualityLevel[] = ['potato', 'low', 'medium', 'high', 'ultra']
      const idx = order.indexOf(this.current)
      if (idx < order.length - 1) {
        this.setLevel(order[idx + 1])
        this.fpsHistory = []
      }
    }
  }
}
