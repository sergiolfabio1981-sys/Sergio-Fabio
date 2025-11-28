
import { Trip } from '../types';
import { INITIAL_TRIPS } from '../constants';

// Stable key for persistent user data
const CURRENT_KEY = 'abras_travel_trips_main';
// List of previous keys to migrate data from if found
const LEGACY_KEYS = ['abras_travel_trips_v16', 'abras_travel_trips_v15', 'abras_travel_trips_v13'];

export const getTrips = (): Trip[] => {
  // 1. Check for stable user data
  const stored = localStorage.getItem(CURRENT_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  // 2. Migration: Check for legacy data from previous versions
  for (const key of LEGACY_KEYS) {
      const legacyData = localStorage.getItem(key);
      if (legacyData) {
          console.log(`Migrating Trips data from ${key} to ${CURRENT_KEY}`);
          localStorage.setItem(CURRENT_KEY, legacyData);
          return JSON.parse(legacyData);
      }
  }

  // 3. Fallback: Load Initial Data
  localStorage.setItem(CURRENT_KEY, JSON.stringify(INITIAL_TRIPS));
  return INITIAL_TRIPS;
};

export const getTripById = (id: string): Trip | undefined => {
  const trips = getTrips();
  return trips.find((t) => t.id === id);
};

export const saveTrip = (trip: Trip): void => {
  const trips = getTrips();
  const existingIndex = trips.findIndex((t) => t.id === trip.id);
  
  if (existingIndex >= 0) {
    trips[existingIndex] = trip;
  } else {
    trips.push(trip);
  }
  
  localStorage.setItem(CURRENT_KEY, JSON.stringify(trips));
};

export const deleteTrip = (id: string): void => {
  const trips = getTrips();
  const filtered = trips.filter((t) => t.id !== id);
  localStorage.setItem(CURRENT_KEY, JSON.stringify(filtered));
};

export const createEmptyTrip = (): Trip => ({
  id: Date.now().toString(),
  title: '',
  location: '',
  price: 0,
  description: '',
  images: [`https://picsum.photos/seed/${Date.now()}/800/600`],
  isOffer: false,
  availableDates: [],
  discount: 0,
  includesFlight: false,
  rating: undefined,
  specialLabel: '',
  durationLabel: '',
  baseCurrency: 'USD'
});
