export interface Vehicle {
  id: string;
  plateNumber: string;
  model: string;
  status: 'available' | 'in-use' | 'maintenance';
  currentLocation?: {
    lat: number;
    lng: number;
  };
  fuelLevel: number;
  lastMaintenance: string;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  rating: number;
  status: 'available' | 'on-trip' | 'off-duty';
  currentVehicleId?: string;
}

export interface RideRequest {
  id: string;
  customerId: string;
  pickupLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  dropoffLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'pending' | 'accepted' | 'in-progress' | 'completed';
  driverId?: string;
  vehicleId?: string;
  createdAt: string;
  estimatedArrival?: string;
}