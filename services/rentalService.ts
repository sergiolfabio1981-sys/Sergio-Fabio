
import { Apartment } from '../types';
import { INITIAL_RENTALS } from '../constants';

const CURRENT_KEY = 'abras_travel_rentals_main';
const LEGACY_KEYS = ['abras_travel_rentals_v9', 'abras_travel_rentals_v8'];

export const getRentals = (): Apartment[] => {
  const stored = localStorage.getItem(CURRENT_KEY);
  if (stored) return JSON.parse(stored);

  for (const key of LEGACY_KEYS) {
      const legacyData = localStorage.getItem(key);
      if (legacyData) {
          localStorage.setItem(CURRENT_KEY, legacyData);
          return JSON.parse(legacyData);
      }
  }

  localStorage.setItem(CURRENT_KEY, JSON.stringify(INITIAL_RENTALS));
  return INITIAL_RENTALS;
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
  
  localStorage.setItem(CURRENT_KEY, JSON.stringify(rentals));
};

export const deleteRental = (id: string): void => {
  const rentals = getRentals();
  const filtered = rentals.filter((r) => r.id !== id);
  localStorage.setItem(CURRENT_KEY, JSON.stringify(filtered));
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
  discount: 0,
  specialLabel: '',
  baseCurrency: 'USD'
});
