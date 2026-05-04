import './MapView.css'
import { useState, useRef } from 'react'

import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
} from 'react-leaflet'
import { fetchGpsPoints } from '../api/gps.ts'
import { startShipHub } from '../api/signalr.ts'
import DataFlowIndicator from './DataFlowIndicator'

type GpsPoint = {
  lat: number
  lng: number
  label: string
}


export default function MapView() {
  const [gpsPoints, setGpsPoints] = useState<GpsPoint[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [listening, setListening] = useState(false);
  const stopRef = useRef<(() => void) | null>(null)
  const [pulse, setPulse] = useState(0)
  const lastPulseTime = useRef(0)
const [flowing, setFlowing] = useState(false)
const flowTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleStartListening = async () => {
    //   setGpsPoints((prev) => [
    //   ...prev,
    //   { lat: 51.5 + Math.random() * 0.1, lng: -0.09 + Math.random() * 0.1, label: 'Test Point' }
    // ]);
    setListening(true);
    const stop = startShipHub((ship) => {
      console.log('ship object', ship)
      console.log('keys:', Object.keys(ship));
      const now = Date.now()
      if (now - lastPulseTime.current > 2000) {
        lastPulseTime.current = now
        setPulse((p) => p + 1)
      }
      if (flowTimeoutRef.current) clearTimeout(flowTimeoutRef.current)
      flowTimeoutRef.current = setTimeout(() => setFlowing(false), 2000)
      setFlowing(true)
      setGpsPoints((prev) => [
        ...prev,
        { lat: ship.Latitude, lng: ship.Longitude, label: ship.ShipName }
      ]);
    });
    stopRef.current = stop;
  };

  const handleStopListening = () => {
    stopRef.current?.();
    stopRef.current = null; 
    setListening(false);

  };
  
  const loadPoints = async () => {
    setLoading(true)
    setError(null)

    try {
      console.log('button pressed')

      const points = await fetchGpsPoints()
      setGpsPoints(points)
      console.log('another press')
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : 'Failed to load GPS points'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  
  
  const mapCenter = gpsPoints.length > 0
    ? ([gpsPoints[0].lat, gpsPoints[0].lng] as [number, number])
    : ([51.505, -0.09] as [number, number])

  return (
    <section className="mapview-container">
      <div className="mapview-header">
        <h1>Map</h1>
        <p>____________</p>
        <p>This is an AIS data visualizer</p>
        <p>Click 'Load GPS Points' to get 100 random ship locations</p>
        <p>Click 'Start Listening for Ships' to receive every new ship locaion in real time</p>
        <p>Of course 'Stop Listening' can be used to stop real time updates</p>
      </div>
        <DataFlowIndicator active={flowing} pulse={pulse} />      <div className="mapview-controls">
        <button onClick={loadPoints} disabled={loading}>
          {loading ? 'Loading...' : 'Load GPS Points'}
        </button>
        <button onClick={handleStartListening} disabled={listening}>
          {listening ? 'Listening...' : 'Start Listening for Ships'}
        </button>
        <button onClick={handleStopListening} disabled={!listening}>
          {listening ? 'Stop Listening' : 'Stopped'}
        </button>
        {error ? <p className="mapview-error">{error}</p> : null}
      </div>
      <div className="mapview-content">
        <div className="map-canvas">
          <MapContainer
            center={mapCenter}
            zoom={1}
            scrollWheelZoom
            className="leaflet-map"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {gpsPoints.filter(p => p.lat != null && p.lng != null && !isNaN(p.lat) && !isNaN(p.lng)).map((point, i) => (
              <CircleMarker
                key={i}
                center={[point.lat, point.lng]}
                radius={8}
                pathOptions={{ color: '#fff', fillColor: '#ef4444', fillOpacity: 1, weight: 2 }}
              >
                <Popup>{point.label}</Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  )
}