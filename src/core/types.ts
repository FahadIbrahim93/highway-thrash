/** Shared domain types for Highway Thrash */

export type DeviceTier = 'low' | 'mid' | 'high'

export type QualityLevel = 'potato' | 'low' | 'medium' | 'high' | 'ultra'

export interface AdaptiveQualitySettings {
  resolutionScale: number
  shadowMapSize: number
  maxTraffic: number
  particleBudget: number
  enableBloom: boolean
  enableSSR: boolean
  enableMotionBlur: boolean
  enableFilmGrain: boolean
  antialias: boolean
  maxPixelRatio: number
}

export type BikeClass = 'rat' | 'street' | 'sport' | 'super' | 'special'

export interface BikeUpgrades {
  engine: number
  handling: number
  brakes: number
  suspension: number
  nitro: number
}

export interface BikeVisual {
  color: string
  secondaryColor: string
  modelPath?: string
  variants?: string[]
}

export interface BikeStats {
  id: string
  name: string
  inspiredBy?: string
  class: BikeClass
  tier: 1 | 2 | 3 | 4 | 5
  topSpeed: number
  acceleration: number
  handling: number
  brakes: number
  durability: number
  powerHp: number
  weightKg: number
  price: number
  unlockReputation: number
  unlocked: boolean
  upgrades: BikeUpgrades
  visual: BikeVisual
  description: string
}

export interface PlayerProgress {
  cash: number
  softCurrency: number
  ownedBikes: string[]
  selectedBikeId: string
  reputation: number
  totalDistance: number
  totalNearMisses: number
  totalCombats: number
  achievements: string[]
  settings: {
    sensitivity: number
    inverted: boolean
    reducedMotion: boolean
    performanceMode: boolean
    masterVolume: number
    musicVolume: number
    sfxVolume: number
  }
}

export interface RunScore {
  distance: number
  nearMisses: number
  wheelies: number
  combats: number
  maxSpeed: number
  cashEarned: number
  multipliers: number
}

export type GameMode =
  | 'endless'
  | 'career'
  | 'twoWay'
  | 'timeTrial'
  | 'freeRide'
  | 'thrash'
  | 'daily'

export interface InputState {
  steer: number
  throttle: number
  brake: number
  nitro: boolean
  attack: boolean
  wheelie: boolean
  cameraToggle: boolean
}
