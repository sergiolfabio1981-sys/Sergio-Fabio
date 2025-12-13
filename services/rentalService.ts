
import { Apartment } from '../types';
import { INITIAL_RENTALS } from '../constants';
import { supabase } from './supabase';

// Helper to unpack frequency from amenities
const unpackRental = (rental: Apartment): Apartment => {
  const amenities = rental.amenities || [];
  const freqTag = amenities.find(a => a.startsWith('__freq:'));
  
  let frequency: 'nightly' | 'monthly' = 'nightly';
  let cleanAmenities = amenities;

  if (freqTag) {
      frequency = freqTag.split(':')[1] as 'nightly' | 'monthly';
      cleanAmenities = amenities.filter(a => !a.startsWith('__freq:'));
  } else if (rental.priceFrequency) {
      // Fallback if it was somehow saved in the column in a legacy row
      frequency = rental.priceFrequency;
  }

  return {
      ...rental,
      amenities: cleanAmenities,
      priceFrequency: frequency,
      type: 'rental'
  };
};

export const getRentals = async (): Promise<Apartment[]> => {
  try {
    const { data, error } = await supabase.from('rentals').select('*');
    if (error) {
      console.error('Error fetching rentals:', error);
      return [];
    }

    return (data as Apartment[]).map(unpackRental) || [];
  } catch (err) {
    return [];
  }
};

export const getRentalById = async (id: string): Promise<Apartment | undefined> => {
  try {
    const { data, error } = await supabase.from('rentals').select('*').eq('id', id).single();
    if (error) return undefined;
    return unpackRental(data as Apartment);
  } catch {
    return undefined;
  }
};

export const saveRental = async (rental: Apartment): Promise<void> => {
  // 1. Prepare Amenities with hidden Frequency Tag
  const currentAmenities = Array.isArray(rental.amenities) ? rental.amenities : [];
  // Remove any existing tags to avoid dupes
  const cleanAmenities = currentAmenities.filter(a => !a.startsWith('__freq:'));
  
  if (rental.priceFrequency === 'monthly') {
      cleanAmenities.push('__freq:monthly');
  }

  // 2. Construct Payload (removing virtual fields that don't exist in DB)
  // We explicitly destructure to avoid sending 'type' or 'priceFrequency' which might block the INSERT
  const { type, priceFrequency, ...rentalData } = rental;

  const rentalToSave = {
      ...rentalData,
      images: Array.isArray(rental.images) ? rental.images : [],
      amenities: cleanAmenities
  };

  const { error } = await supabase.from('rentals').upsert(rentalToSave);
  
  if (error) {
      console.error('Error saving rental:', error);
      throw error; // Rethrow so Admin UI can alert the user
  }
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
  priceFrequency: 'nightly', // Default
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
