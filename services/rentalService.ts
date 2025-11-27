
import { Apartment } from '../types';
import { INITIAL_RENTALS } from '../constants';

const RENTAL_STORAGE_KEY = 'abras_travel_rentals_v7';

export const getRentals = (): Apartment[] => {
  const stored = localStorage.getItem(RENTAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(RENTAL_STORAGE_KEY, JSON.stringify(INITIAL_RENTALS));
    return INITIAL_RENTALS;
  }
  return JSON.parse(stored);
};

export const getRentalById = (id: string): Apartment | undefined => {
  const rentals = getRentals();
  return rentals.find((r) => r.id === id);
};

export const saveRental = (rental: Apartment): void => {
  const rentals = getRentals();
  const existingIndex = rentals.findIndex((r) => r.id === rental.id);
  
  if (existingIndex >= 0) {
    rentals[existingIndex] = rental;
  } else {
    rentals.push(rental);
  }
  
  localStorage.setItem(RENTAL_STORAGE_KEY, JSON.stringify(rentals));
};

export const deleteRental = (id: string): void => {
  const rentals = getRentals();
  const filtered = rentals.filter((r) => r.id !== id);
  localStorage.setItem(RENTAL_STORAGE_KEY, JSON.stringify(filtered));
};

export const createEmptyRental = (): Apartment => ({
  id: Date.now().toString(),
  title: '',
  location: '',
  pricePerNight: 0,
  description: '',
  images: [`https://picsum.photos/seed/${Date.now()}/800/600`],
  bedrooms: 1,
  maxGuests: 2,
  amenities: [],
  isOffer: false,
  lat: undefined,
  lng: undefined,
  discount: 0
});
