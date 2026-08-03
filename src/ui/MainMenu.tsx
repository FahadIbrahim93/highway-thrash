import { useGameStore } from '../store/gameStore'

export function MainMenu() {
  const { setScreen, setMode, startRun, progress } = useGameStore()

  return (
    <div className="menu-screen">
      <div className="menu-bg" />
      <div className="menu-content">
        <h1 className="logo">
          HIGHWAY<span>THRASH</span>
        </h1>
        <p className="tagline">Road Rash spirit · Traffic Racer loop · Pure web adrenaline</p>

        <div className="menu-buttons">
          <button
            className="btn primary"
            onClick={() => {
              setMode('endless')
              startRun()
            }}
          >
            TRAFFIC RUSH
          </button>
          <button className="btn" onClick={() => setScreen('garage')}>
            GARAGE
          </button>
          <button
            className="btn"
            onClick={() => {
              setMode('thrash')
              startRun()
            }}
          >
            THRASH MODE
          </button>
          <button className="btn subtle" onClick={() => setScreen('settings')}>
            SETTINGS
          </button>
        </div>

        <div className="menu-footer">
          <span>Cash: ${progress.cash.toLocaleString()}</span>
          <span>Rep: {progress.reputation}</span>
        </div>
      </div>
    </div>
  )
}
