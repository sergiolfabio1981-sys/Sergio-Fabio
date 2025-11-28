
import { InstallmentTrip } from '../types';
import { INITIAL_INSTALLMENT_TRIPS } from '../constants';

const CURRENT_KEY = 'abras_travel_installments_main';
const LEGACY_KEYS = ['abras_travel_installments_v8', 'abras_travel_installments_v7'];

export const getInstallmentTrips = (): InstallmentTrip[] => {
  const stored = localStorage.getItem(CURRENT_KEY);
  if (stored) return JSON.parse(stored);

  for (const key of LEGACY_KEYS) {
      const legacyData = localStorage.getItem(key);
      if (legacyData) {
          localStorage.setItem(CURRENT_KEY, legacyData);
          return JSON.parse(legacyData);
      }
  }

  localStorage.setItem(CURRENT_KEY, JSON.stringify(INITIAL_INSTALLMENT_TRIPS));
  return INITIAL_INSTALLMENT_TRIPS;
};

export const getInstallmentTripById = (id: string): InstallmentTrip | undefined => {
  const trips = getInstallmentTrips();
  return trips.find((t) => t.id === id);
};

export const saveInstallmentTrip = (trip: InstallmentTrip): void => {
  const trips = getInstallmentTrips();
  const existingIndex = trips.findIndex((t) => t.id === trip.id);
  
  if (existingIndex >= 0) {
    trips[existingIndex] = trip;
  } else {
    trips.push(trip);
  }
  
  localStorage.setItem(CURRENT_KEY, JSON.stringify(trips));
};

export const deleteInstallmentTrip = (id: string): void => {
  const trips = getInstallmentTrips();
  const filtered = trips.filter((t) => t.id !== id);
  localStorage.setItem(CURRENT_KEY, JSON.stringify(filtered));
};

export const createEmptyInstallmentTrip = (): InstallmentTrip => ({
  id: Date.now().toString(),
  title: '',
  location: '',
  totalPrice: 0,
  description: '',
  images: [`https://picsum.photos/seed/${Date.now()}/800/600`],
  departureDate: '2026-01-01',
  isOffer: false,
  type: 'installment',
  discount: 0,
  specialLabel: '',
  baseCurrency: 'USD'
});
