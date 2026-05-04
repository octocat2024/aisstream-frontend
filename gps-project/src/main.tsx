import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'leaflet/dist/leaflet.css'
import './index.css'
import HomeView from './components/HomeView.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomeView />
  </StrictMode>,
)
