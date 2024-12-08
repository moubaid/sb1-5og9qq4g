import React from 'react';
import { format } from 'date-fns';
import { trpc } from '../../utils/trpc';
import { Calendar, Clock } from 'lucide-react';

export function ScheduleCalendar() {
  const { data: rides, isLoading } = trpc.schedule.list.useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading schedule...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Rides</h2>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            New Ride
          </button>
        </div>

        <div className="space-y-4">
          {rides?.map((ride) => (
            <div
              key={ride.id}
              className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {ride.pickupAddress} → {ride.dropoffAddress}
                  </p>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      ride.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : ride.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {ride.status}
                  </span>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {ride.estimatedArrival
                    ? format(new Date(ride.estimatedArrival), 'MMM d, h:mm a')
                    : 'Time not set'}
                </div>
                {ride.driver && (
                  <p className="mt-1 text-sm text-gray-500">
                    Driver: {ride.driver.name}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}