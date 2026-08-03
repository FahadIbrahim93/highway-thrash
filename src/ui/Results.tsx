import { useGameStore } from '../store/gameStore'

export function Results() {
  const { lastRun, setScreen, startRun, progress } = useGameStore()

  if (!lastRun) {
    return (
      <div className="menu-screen">
        <button className="btn" onClick={() => setScreen('menu')}>Back to Menu</button>
      </div>
    )
  }

  return (
    <div className="results-screen">
      <h2>RUN COMPLETE</h2>
      <div className="results-grid">
        <div className="result-item">
          <span className="label">Distance</span>
          <span className="value">{(lastRun.distance / 1000).toFixed(2)} km</span>
        </div>
        <div className="result-item">
          <span className="label">Near Misses</span>
          <span className="value">{lastRun.nearMisses}</span>
        </div>
        <div className="result-item">
          <span className="label">Max Speed</span>
          <span className="value">{Math.round(lastRun.maxSpeed)} km/h</span>
        </div>
        <div className="result-item">
          <span className="label">Combat</span>
          <span className="value">{lastRun.combats}</span>
        </div>
        <div className="result-item highlight">
          <span className="label">Cash Earned</span>
          <span className="value">${lastRun.cashEarned}</span>
        </div>
        <div className="result-item">
          <span className="label">Wallet</span>
          <span className="value">${progress.cash.toLocaleString()}</span>
        </div>
      </div>
      <div className="menu-buttons" style={{ marginTop: 24 }}>
        <button className="btn primary" onClick={() => startRun()}>RIDE AGAIN</button>
        <button className="btn" onClick={() => setScreen('garage')}>GARAGE</button>
        <button className="btn subtle" onClick={() => setScreen('menu')}>MENU</button>
      </div>
    </div>
  )
}
