import { Trip, ItineraryDay } from '../types';
import { INITIAL_TRIPS } from '../constants';

const STORAGE_KEY = 'abras_travel_trips';

export const getTrips = (): Trip[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TRIPS));
    return INITIAL_TRIPS;
  }
  return JSON.parse(stored);
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
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
};

export const deleteTrip = (id: string): void => {
  const trips = getTrips();
  const filtered = trips.filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const createEmptyTrip = (): Trip => ({
  id: Date.now().toString(),
  title: '',
  location: '',
  price: 0,
  description: '',
  images: [`https://picsum.photos/seed/${Date.now()}/800/600`],
  isOffer: false,
  itinerary: [{ day: 1, activity: '' }]
});