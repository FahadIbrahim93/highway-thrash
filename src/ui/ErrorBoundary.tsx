import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message || 'Unknown error' }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            background: '#0a0a0c',
            color: '#f0f0f0',
            padding: 24,
            textAlign: 'center'
          }}
        >
          <h2 style={{ color: '#ff3b3b' }}>Something crashed</h2>
          <p style={{ color: '#888', marginTop: 8 }}>{this.state.message}</p>
          <button
            className="btn primary"
            style={{ marginTop: 24 }}
            onClick={() => window.location.reload()}
          >
            RELOAD
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
