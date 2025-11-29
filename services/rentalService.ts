
import { Apartment } from '../types';
import { INITIAL_RENTALS } from '../constants';
import { supabase } from './supabase';

export const getRentals = async (): Promise<Apartment[]> => {
  try {
    const { data, error } = await supabase.from('rentals').select('*');
    if (error) {
      console.error('Error fetching rentals:', error);
      return INITIAL_RENTALS;
    }
    return (data as Apartment[]) || INITIAL_RENTALS;
  } catch (err) {
    return INITIAL_RENTALS;
  }
};

export const getRentalById = async (id: string): Promise<Apartment | undefined> => {
  try {
    const { data, error } = await supabase.from('rentals').select('*').eq('id', id).single();
    if (error) return INITIAL_RENTALS.find(r => r.id === id);
    return data as Apartment;
  } catch {
    return INITIAL_RENTALS.find(r => r.id === id);
  }
};

export const saveRental = async (rental: Apartment): Promise<void> => {
  const rentalToSave = {
      ...rental,
      images: Array.isArray(rental.images) ? rental.images : [],
      amenities: Array.isArray(rental.amenities) ? rental.amenities : []
  };
  const { error } = await supabase.from('rentals').upsert(rentalToSave);
  if (error) console.error('Error saving rental:', error);
};

export const deleteRental = async (id: string): Promise<void> => {
  const { error } = await supabase.from('rentals').delete().eq('id', id);
  if (error) console.error('Error deleting rental:', error);
};

export const createEmptyRental = (): Apartment => ({
  id: crypto.randomUUID(),
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
  baseCurrency: 'USD',
  type: 'rental'
});
