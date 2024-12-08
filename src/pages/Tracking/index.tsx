import React from 'react';
import { VehicleMap } from './VehicleMap';
import { useFleetStore } from '../../store/useFleetStore';

export function Tracking() {
  const vehicles = useFleetStore((state) => state.vehicles);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Live Tracking</h1>
        <div className="text-sm text-gray-500">
          {vehicles.length} vehicles tracked
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <VehicleMap />
        </div>
        
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <h3 className="font-medium">{vehicle.plateNumber}</h3>
              <p className="text-sm text-gray-600">{vehicle.model}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  vehicle.status === 'available' ? 'bg-green-100 text-green-800' :
                  vehicle.status === 'in-use' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {vehicle.status}
                </span>
                <span className="text-sm text-gray-500">
                  Fuel: {vehicle.fuelLevel}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}