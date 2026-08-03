import { useEffect, useRef, useState, useCallback } from 'react'
import { GameEngine } from '../core/GameEngine'
import { useGameStore } from '../store/gameStore'
import { HUD } from './HUD'
import type { RunScore } from '../core/types'

export function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<GameEngine | null>(null)
  const { getSelectedBike, endRun, setPaused, isPaused, setScreen } = useGameStore()

  const [score, setScore] = useState<RunScore>({
    distance: 0,
    nearMisses: 0,
    wheelies: 0,
    combats: 0,
    maxSpeed: 0,
    cashEarned: 0,
    multipliers: 1
  })
  const [speed, setSpeed] = useState(0)
  const [nitro, setNitro] = useState(1)
  const [fps, setFps] = useState(60)
  const [quality, setQuality] = useState('medium')
  const [flash, setFlash] = useState<'none' | 'near' | 'crash'>('none')
  const [nearMissPopup, setNearMissPopup] = useState<string | null>(null)
  const [weaponLabel, setWeaponLabel] = useState<string | null>(null)

  const handleEnd = useCallback(() => {
    if (engineRef.current) {
      const final = engineRef.current.getScore()
      engineRef.current.stop()
      endRun(final)
    }
  }, [endRun])

  useEffect(() => {
    if (!containerRef.current) return
    const bike = getSelectedBike()
    const engine = new GameEngine(containerRef.current, bike)
    engineRef.current = engine

    engine.onScoreUpdate = (s) => {
      setScore({ ...s })
      setSpeed(engine.getSpeedKmh())
      setNitro(engine.getNitro())
      setFps(engine.getFps())
      setQuality(engine.getQualityLevel())
      const w = engine.getWeaponState()
      if (w.kind === 'none') setWeaponLabel(null)
      else setWeaponLabel(`${w.kind.toUpperCase()} ${w.durability}/${w.maxDurability}`)
    }

    engine.onNearMiss = (mult) => {
      setFlash('near')
      setNearMissPopup(`NEAR MISS ×${mult.toFixed(1)}`)
      try {
        navigator.vibrate?.(30)
      } catch {
        /* ignore */
      }
      window.setTimeout(() => {
        setFlash('none')
        setNearMissPopup(null)
      }, 450)
    }

    engine.onCrash = () => {
      setFlash('crash')
      try {
        navigator.vibrate?.([40, 30, 60])
      } catch {
        /* ignore */
      }
      window.setTimeout(() => setFlash('none'), 600)
    }

    engine.start()

    return () => {
      engine.dispose()
      engineRef.current = null
    }
  }, [getSelectedBike])

  useEffect(() => {
    if (isPaused) {
      engineRef.current?.stop()
    } else {
      engineRef.current?.start()
    }
  }, [isPaused])

  return (
    <div className="game-wrapper">
      <div ref={containerRef} className="game-canvas" />
      <HUD
        score={score}
        speed={speed}
        nitro={nitro}
        fps={fps}
        quality={quality}
        weapon={weaponLabel}
        onPause={() => setPaused(true)}
      />

      {flash === 'near' && <div className="screen-flash near" />}
      {flash === 'crash' && <div className="screen-flash crash" />}
      {nearMissPopup && <div className="near-miss-popup">{nearMissPopup}</div>}

      {isPaused && (
        <div className="pause-overlay">
          <h2>PAUSED</h2>
          <button className="btn primary" onClick={() => setPaused(false)}>
            RESUME
          </button>
          <button className="btn" onClick={handleEnd}>
            END RUN
          </button>
          <button className="btn subtle" onClick={() => setScreen('menu')}>
            MENU
          </button>
        </div>
      )}
    </div>
  )
}
