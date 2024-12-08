import { create } from 'zustand';
import type { Vehicle, Driver, RideRequest } from '../types';

interface FleetStore {
  vehicles: Vehicle[];
  drivers: Driver[];
  rideRequests: RideRequest[];
  setVehicles: (vehicles: Vehicle[]) => void;
  setDrivers: (drivers: Driver[]) => void;
  setRideRequests: (requests: RideRequest[]) => void;
  updateVehicleStatus: (id: string, status: Vehicle['status']) => void;
  updateDriverStatus: (id: string, status: Driver['status']) => void;
  updateRideStatus: (id: string, status: RideRequest['status']) => void;
}

export const useFleetStore = create<FleetStore>((set) => ({
  vehicles: [],
  drivers: [],
  rideRequests: [],
  
  setVehicles: (vehicles) => set({ vehicles }),
  setDrivers: (drivers) => set({ drivers }),
  setRideRequests: (rideRequests) => set({ rideRequests }),
  
  updateVehicleStatus: (id, status) =>
    set((state) => ({
      vehicles: state.vehicles.map((v) =>
        v.id === id ? { ...v, status } : v
      ),
    })),
    
  updateDriverStatus: (id, status) =>
    set((state) => ({
      drivers: state.drivers.map((d) =>
        d.id === id ? { ...d, status } : d
      ),
    })),
    
  updateRideStatus: (id, status) =>
    set((state) => ({
      rideRequests: state.rideRequests.map((r) =>
        r.id === id ? { ...r, status } : r
      ),
    })),
}));