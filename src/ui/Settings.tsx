import { useGameStore } from '../store/gameStore'

export function Settings() {
  const { progress, updateSettings, setScreen } = useGameStore()
  const s = progress.settings

  return (
    <div className="menu-screen">
      <div className="menu-content" style={{ maxWidth: 420 }}>
        <h2>SETTINGS</h2>
        <label style={{ display: 'block', marginTop: 16 }}>
          Sensitivity: {s.sensitivity.toFixed(1)}
          <input
            type="range"
            min={0.5}
            max={2}
            step={0.1}
            value={s.sensitivity}
            onChange={(e) => updateSettings({ sensitivity: parseFloat(e.target.value) })}
            style={{ width: '100%' }}
          />
        </label>
        <label style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={s.performanceMode}
            onChange={(e) => updateSettings({ performanceMode: e.target.checked })}
          />
          Performance mode (potato quality)
        </label>
        <label style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={s.inverted}
            onChange={(e) => updateSettings({ inverted: e.target.checked })}
          />
          Invert steer
        </label>
        <button className="btn primary" style={{ marginTop: 24 }} onClick={() => setScreen('menu')}>
          BACK
        </button>
      </div>
    </div>
  )
}
