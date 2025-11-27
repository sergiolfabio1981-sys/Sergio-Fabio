
import { WorldCupTrip } from '../types';
import { INITIAL_WORLDCUP_TRIPS } from '../constants';

// Bump version to v2 to load new USD trips and countries
const WORLDCUP_STORAGE_KEY = 'abras_travel_worldcup_v2';

export const getWorldCupTrips = (): WorldCupTrip[] => {
  const stored = localStorage.getItem(WORLDCUP_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(WORLDCUP_STORAGE_KEY, JSON.stringify(INITIAL_WORLDCUP_TRIPS));
    return INITIAL_WORLDCUP_TRIPS;
  }
  return JSON.parse(stored);
};

export const getWorldCupTripById = (id: string): WorldCupTrip | undefined => {
  const trips = getWorldCupTrips();
  return trips.find((t) => t.id === id);
};

export const saveWorldCupTrip = (trip: WorldCupTrip): void => {
  const trips = getWorldCupTrips();
  const existingIndex = trips.findIndex((t) => t.id === trip.id);
  
  if (existingIndex >= 0) {
    trips[existingIndex] = trip;
  } else {
    trips.push(trip);
  }
  
  localStorage.setItem(WORLDCUP_STORAGE_KEY, JSON.stringify(trips));
};

export const deleteWorldCupTrip = (id: string): void => {
  const trips = getWorldCupTrips();
  const filtered = trips.filter((t) => t.id !== id);
  localStorage.setItem(WORLDCUP_STORAGE_KEY, JSON.stringify(filtered));
};

export const createEmptyWorldCupTrip = (): WorldCupTrip => ({
  id: Date.now().toString(),
  title: '',
  location: 'USA - México - Canadá',
  totalPrice: 0,
  description: '',
  images: [`https://picsum.photos/seed/${Date.now()}/800/600`],
  departureDate: '2026-06-10',
  originCountry: 'Salida desde Argentina',
  isOffer: false,
  type: 'worldcup',
  discount: 0,
  baseCurrency: 'USD'
});
