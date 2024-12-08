import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useFleetStore } from '../../store/useFleetStore';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Fix for default marker icon in React-Leaflet
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export function VehicleMap() {
  const vehicles = useFleetStore((state) => state.vehicles);

  return (
    <MapContainer
      center={[40.7128, -74.0060]}
      zoom={13}
      className="h-[600px] w-full rounded-lg shadow-md"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {vehicles.map((vehicle) => (
        vehicle.currentLocation && (
          <Marker
            key={vehicle.id}
            position={[vehicle.currentLocation.lat, vehicle.currentLocation.lng]}
            icon={defaultIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{vehicle.plateNumber}</h3>
                <p className="text-sm text-gray-600">{vehicle.model}</p>
                <p className="text-sm text-gray-600">Status: {vehicle.status}</p>
                <p className="text-sm text-gray-600">Fuel: {vehicle.fuelLevel}%</p>
              </div>
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
}