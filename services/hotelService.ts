
import { Hotel } from '../types';
import { INITIAL_HOTELS } from '../constants';

const CURRENT_KEY = 'abras_travel_hotels_main';
const LEGACY_KEYS = ['abras_travel_hotels_v12', 'abras_travel_hotels_v11', 'abras_travel_hotels_v9'];

export const getHotels = (): Hotel[] => {
  const stored = localStorage.getItem(CURRENT_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  for (const key of LEGACY_KEYS) {
      const legacyData = localStorage.getItem(key);
      if (legacyData) {
          localStorage.setItem(CURRENT_KEY, legacyData);
          return JSON.parse(legacyData);
      }
  }

  localStorage.setItem(CURRENT_KEY, JSON.stringify(INITIAL_HOTELS));
  return INITIAL_HOTELS;
};

export const getHotelById = (id: string): Hotel | undefined => {
  const hotels = getHotels();
  return hotels.find((h) => h.id === id);
};

export const saveHotel = (hotel: Hotel): void => {
  const hotels = getHotels();
  const existingIndex = hotels.findIndex((h) => h.id === hotel.id);
  
  if (existingIndex >= 0) {
    hotels[existingIndex] = hotel;
  } else {
    hotels.push(hotel);
  }
  
  localStorage.setItem(CURRENT_KEY, JSON.stringify(hotels));
};

export const deleteHotel = (id: string): void => {
  const hotels = getHotels();
  const filtered = hotels.filter((h) => h.id !== id);
  localStorage.setItem(CURRENT_KEY, JSON.stringify(filtered));
};

export const createEmptyHotel = (): Hotel => ({
  id: Date.now().toString(),
  title: '',
  location: '',
  pricePerNight: 0,
  description: '',
  images: [`https://picsum.photos/seed/${Date.now()}/800/600`],
  stars: 3,
  amenities: [],
  isOffer: false,
  lat: undefined,
  lng: undefined,
  type: 'hotel',
  discount: 0,
  specialLabel: '',
  baseCurrency: 'USD'
});
