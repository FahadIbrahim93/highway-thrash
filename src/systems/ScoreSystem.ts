import type { RunScore } from '../core/types'

/** Pure scoring logic — distance, near-miss multiplier, combat, cash. */
export class ScoreSystem {
  private score: RunScore = {
    distance: 0,
    nearMisses: 0,
    wheelies: 0,
    combats: 0,
    maxSpeed: 0,
    cashEarned: 0,
    multipliers: 1
  }

  getScore(): RunScore {
    return { ...this.score }
  }

  addDistance(meters: number): void {
    this.score.distance += meters
  }

  addNearMiss(): void {
    this.score.nearMisses += 1
    this.score.multipliers = Math.min(5, 1 + this.score.nearMisses * 0.15)
  }

  addCombat(hits = 1): void {
    this.score.combats += hits
  }

  addWheelieTime(seconds: number): void {
    this.score.wheelies += seconds
  }

  updateMaxSpeed(kmh: number): void {
    if (kmh > this.score.maxSpeed) this.score.maxSpeed = kmh
  }

  onCrash(): void {
    this.score.multipliers = Math.max(1, this.score.multipliers * 0.5)
  }

  recomputeCash(): void {
    const base = this.score.distance * 0.08
    const near = this.score.nearMisses * 25
    const combat = this.score.combats * 40
    const wheelie = this.score.wheelies * 15
    this.score.cashEarned = Math.floor(
      (base + near + combat + wheelie) * this.score.multipliers
    )
  }
}
