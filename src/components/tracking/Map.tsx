import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
})

// Custom train icon
const trainIcon = new L.Icon({
  iconUrl: '/train-icon.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
})

export default function Map() {
  // Example route coordinates (should be fetched from API)
  const routeCoordinates = [
    [20.5937, 78.9629], // Starting point
    [21.1458, 79.0882], // Intermediate point
    [22.5726, 88.3639], // End point
  ]

  // Current train position (should be updated in real-time)
  const trainPosition: [number, number] = [21.1458, 79.0882]

  return (
    <MapContainer
      center={trainPosition}
      zoom={5}
      style={{ height: '100%', width: '100%' }}
      className="rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Train Route */}
      <Polyline
        positions={routeCoordinates}
        color="#3B82F6"
        weight={3}
        opacity={0.7}
      />

      {/* Train Marker */}
      <Marker position={trainPosition} icon={trainIcon}>
        <Popup>
          <div className="p-2">
            <h3 className="font-semibold">Rajdhani Express</h3>
            <p className="text-sm text-gray-600">Speed: 120 km/h</p>
            <p className="text-sm text-gray-600">On time</p>
          </div>
        </Popup>
      </Marker>

      {/* Station Markers */}
      {routeCoordinates.map((position, index) => (
        <Marker
          key={index}
          position={position}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">Station {index + 1}</h3>
              <p className="text-sm text-gray-600">
                {index === 0 ? 'Origin' : index === routeCoordinates.length - 1 ? 'Destination' : 'Stop'}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
} 