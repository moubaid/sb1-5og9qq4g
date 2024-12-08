import React from 'react';
import { Car, Users, MapPin, TrendingUp } from 'lucide-react';

const stats = [
  { name: 'Active Vehicles', value: '24', icon: Car, change: '+2.5%', changeType: 'increase' },
  { name: 'Available Drivers', value: '18', icon: Users, change: '-4.1%', changeType: 'decrease' },
  { name: 'Ongoing Rides', value: '12', icon: MapPin, change: '+12.3%', changeType: 'increase' },
  { name: 'Revenue Today', value: '$2,854', icon: TrendingUp, change: '+8.2%', changeType: 'increase' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-blue-500 rounded-md p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{stat.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Activity items would go here */}
            <p className="text-gray-500">Loading activities...</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Vehicle Status</h2>
          <div className="space-y-4">
            {/* Vehicle status items would go here */}
            <p className="text-gray-500">Loading vehicle status...</p>
          </div>
        </div>
      </div>
    </div>
  );
}