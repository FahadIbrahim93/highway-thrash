import type { RunScore } from '../core/types'

interface HUDProps {
  score: RunScore
  speed: number
  nitro: number
  fps?: number
  quality?: string
  weapon?: string | null
  onPause: () => void
}

export function HUD({ score, speed, nitro, fps, quality, weapon, onPause }: HUDProps) {
  return (
    <div className="hud">
      <div className="hud-top">
        <div className="hud-stat">
          <span className="label">DISTANCE</span>
          <span className="value">{(score.distance / 1000).toFixed(2)} km</span>
        </div>
        <div className="hud-stat center">
          <span className="label">SPEED</span>
          <span className="value speed">{Math.round(speed)}</span>
          <span className="unit">km/h</span>
        </div>
        <div className="hud-stat right">
          <span className="label">NEAR MISS</span>
          <span className="value">{score.nearMisses}</span>
          <span className="mult">×{score.multipliers.toFixed(1)}</span>
        </div>
      </div>

      {weapon && (
        <div
          style={{
            position: 'absolute',
            top: '4.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.55)',
            padding: '0.25rem 0.75rem',
            borderRadius: 6,
            fontSize: '0.8rem',
            color: '#ffcc66',
            letterSpacing: '0.04em'
          }}
        >
          ⚒ {weapon}
        </div>
      )}

      <div className="hud-bottom">
        <div className="nitro-bar">
          <div className="nitro-fill" style={{ width: `${nitro * 100}%` }} />
          <span>NITRO</span>
        </div>
        <button className="pause-btn" onClick={onPause} aria-label="Pause">
          ❚❚
        </button>
        <div className="cash">
          ${score.cashEarned}
          {score.combats > 0 && (
            <span style={{ marginLeft: 8, color: '#ff6b6b', fontSize: '0.85em' }}>
              ⚔{score.combats}
            </span>
          )}
        </div>
      </div>

      {fps !== undefined && (
        <div className="dev-hud">
          {fps} FPS · {quality}
        </div>
      )}

      <div className="touch-hint left">STEER</div>
      <div className="touch-hint right-bottom">GAS</div>
    </div>
  )
}
