
import { GroupTrip } from '../types';
import { INITIAL_GROUP_TRIPS } from '../constants';

const CURRENT_KEY = 'abras_travel_groups_main';
const LEGACY_KEYS = ['abras_travel_groups_v1'];

export const getGroupTrips = (): GroupTrip[] => {
  const stored = localStorage.getItem(CURRENT_KEY);
  if (stored) return JSON.parse(stored);

  for (const key of LEGACY_KEYS) {
      const legacyData = localStorage.getItem(key);
      if (legacyData) {
          localStorage.setItem(CURRENT_KEY, legacyData);
          return JSON.parse(legacyData);
      }
  }

  localStorage.setItem(CURRENT_KEY, JSON.stringify(INITIAL_GROUP_TRIPS));
  return INITIAL_GROUP_TRIPS;
};

export const getGroupTripById = (id: string): GroupTrip | undefined => {
  const trips = getGroupTrips();
  return trips.find((t) => t.id === id);
};

export const saveGroupTrip = (trip: GroupTrip): void => {
  const trips = getGroupTrips();
  const existingIndex = trips.findIndex((t) => t.id === trip.id);
  
  if (existingIndex >= 0) {
    trips[existingIndex] = trip;
  } else {
    trips.push(trip);
  }
  
  localStorage.setItem(CURRENT_KEY, JSON.stringify(trips));
};

export const deleteGroupTrip = (id: string): void => {
  const trips = getGroupTrips();
  const filtered = trips.filter((t) => t.id !== id);
  localStorage.setItem(CURRENT_KEY, JSON.stringify(filtered));
};

export const createEmptyGroupTrip = (): GroupTrip => ({
  id: Date.now().toString(),
  title: '',
  location: '',
  price: 0,
  description: '',
  images: [`https://picsum.photos/seed/${Date.now()}/800/600`],
  availableDates: [],
  isOffer: false,
  type: 'group',
  discount: 0,
  baseCurrency: 'USD',
  specialLabel: ''
});
