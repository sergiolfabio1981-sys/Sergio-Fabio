
import { Hotel } from '../types';
import { INITIAL_HOTELS } from '../constants';

const HOTEL_STORAGE_KEY = 'abras_travel_hotels_v2';

export const getHotels = (): Hotel[] => {
  const stored = localStorage.getItem(HOTEL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(HOTEL_STORAGE_KEY, JSON.stringify(INITIAL_HOTELS));
    return INITIAL_HOTELS;
  }
  return JSON.parse(stored);
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
  
  localStorage.setItem(HOTEL_STORAGE_KEY, JSON.stringify(hotels));
};

export const deleteHotel = (id: string): void => {
  const hotels = getHotels();
  const filtered = hotels.filter((h) => h.id !== id);
  localStorage.setItem(HOTEL_STORAGE_KEY, JSON.stringify(filtered));
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
  discount: 0
});
