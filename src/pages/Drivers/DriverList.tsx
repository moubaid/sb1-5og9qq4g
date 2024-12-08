import React from 'react';
import { useFleetStore } from '../../store/useFleetStore';
import type { Driver } from '../../types';

export function DriverList() {
  const drivers = useFleetStore((state) => state.drivers);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rating
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              License
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{driver.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${driver.status === 'available' ? 'bg-green-100 text-green-800' : 
                    driver.status === 'on-trip' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'}`}>
                  {driver.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {driver.rating.toFixed(1)} ⭐
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {driver.licenseNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {driver.phone}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}