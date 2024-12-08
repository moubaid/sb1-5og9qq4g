import React from 'react';
import { ScheduleCalendar } from './ScheduleCalendar';

export function Schedule() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Schedule</h1>
      </div>
      <ScheduleCalendar />
    </div>
  );
}