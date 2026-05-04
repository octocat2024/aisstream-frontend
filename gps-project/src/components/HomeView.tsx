import { useState } from 'react'
import App from '../App'
import MapView from './MapView'

export const HomeView = () => {
  const [view, setView] = useState<'app' | 'map'>('map')

  return (
    <>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
        <button onClick={() => setView('app')}>App</button>
        <button onClick={() => setView('map')}>Map</button>
      </div>

      {view === 'app' && <App />}
      {view === 'map' && <MapView />}
    </>
  )
}

export default HomeView