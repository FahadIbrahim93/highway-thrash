import { useGameStore } from '../store/gameStore'
import { upgradeCost, effectiveStats } from '../data/bikes'
import type { BikeStats } from '../core/types'

export function Garage() {
  const {
    bikes,
    progress,
    selectBike,
    buyBike,
    upgradeBike,
    setScreen,
    getSelectedBike
  } = useGameStore()

  const selected = getSelectedBike()
  const eff = effectiveStats(selected)
  const ownedSelected = progress.ownedBikes.includes(selected.id)

  return (
    <div className="garage-screen">
      <header className="garage-header">
        <button className="btn subtle" onClick={() => setScreen('menu')}>
          ← BACK
        </button>
        <h2>GARAGE</h2>
        <div className="cash-display">${progress.cash.toLocaleString()}</div>
      </header>

      <div className="garage-layout">
        <div className="bike-list">
          {bikes.map((b) => {
            const owned = progress.ownedBikes.includes(b.id)
            const isSelected = selected.id === b.id
            const lockedByRep = !owned && progress.reputation < (b.unlockReputation ?? 0)
            return (
              <button
                key={b.id}
                className={`bike-card ${isSelected ? 'selected' : ''} ${owned ? 'owned' : ''}`}
                disabled={lockedByRep}
                onClick={() => {
                  if (owned) selectBike(b.id)
                  else if (!lockedByRep) buyBike(b.id)
                }}
              >
                <div
                  className="bike-swatch"
                  style={{ background: b.visual.color, borderColor: b.visual.secondaryColor }}
                />
                <div className="bike-info">
                  <strong>{b.name}</strong>
                  <span className="class">
                    T{b.tier} · {b.class.toUpperCase()}
                  </span>
                  <span>
                    {b.topSpeed} km/h · {b.powerHp} hp
                  </span>
                </div>
                {!owned && !lockedByRep && (
                  <span className="price">${b.price.toLocaleString()}</span>
                )}
                {!owned && lockedByRep && (
                  <span className="price" style={{ color: '#888' }}>
                    Rep {b.unlockReputation}
                  </span>
                )}
                {owned && isSelected && <span className="badge">SELECTED</span>}
              </button>
            )
          })}
        </div>

        <div className="bike-detail">
          <h3>{selected.name}</h3>
          <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.75rem' }}>
            {selected.description}
          </p>
          <div className="stats-grid">
            <Stat label="Top Speed" value={eff.topSpeed} max={360} />
            <Stat label="Accel" value={eff.acceleration * 100} max={140} />
            <Stat label="Handling" value={eff.handling * 100} max={120} />
            <Stat label="Brakes" value={eff.brakes * 100} max={120} />
            <Stat label="Durability" value={eff.durability * 100} max={100} />
          </div>

          {ownedSelected && (
            <div className="upgrades">
              <h4>Upgrades</h4>
              {(Object.keys(selected.upgrades) as Array<keyof BikeStats['upgrades']>).map(
                (part) => {
                  const cost = upgradeCost(selected, part)
                  const maxed = selected.upgrades[part] >= 5
                  return (
                    <div key={part} className="upgrade-row">
                      <span>
                        {part} Lv.{selected.upgrades[part]}
                      </span>
                      <button
                        className="btn small"
                        disabled={maxed || progress.cash < cost}
                        onClick={() => upgradeBike(selected.id, part)}
                      >
                        {maxed ? 'MAX' : `+ $${cost.toLocaleString()}`}
                      </button>
                    </div>
                  )
                }
              )}
            </div>
          )}

          <button className="btn primary large" onClick={() => setScreen('menu')}>
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="stat">
      <span>{label}</span>
      <div className="bar">
        <div className="fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="num">{Math.round(value)}</span>
    </div>
  )
}
