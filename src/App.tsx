import { useGameStore } from './store/gameStore'
import { MainMenu } from './ui/MainMenu'
import { Garage } from './ui/Garage'
import { GameCanvas } from './ui/GameCanvas'
import { Results } from './ui/Results'
import { Settings } from './ui/Settings'
import { ErrorBoundary } from './ui/ErrorBoundary'
import './App.css'

function App() {
  const screen = useGameStore((s) => s.screen)

  return (
    <ErrorBoundary>
      <div className="app">
        {screen === 'menu' && <MainMenu />}
        {screen === 'garage' && <Garage />}
        {screen === 'playing' && <GameCanvas />}
        {screen === 'results' && <Results />}
        {screen === 'settings' && <Settings />}
      </div>
    </ErrorBoundary>
  )
}

export default App
