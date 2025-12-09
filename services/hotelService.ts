
import { Hotel } from '../types';
import { INITIAL_HOTELS } from '../constants';
import { supabase } from './supabase';

export const getHotels = async (): Promise<Hotel[]> => {
  try {
    const { data, error } = await supabase.from('hotels').select('*');
    if (error) {
      console.error('Error fetching hotels:', error);
      return INITIAL_HOTELS;
    }

    // AUTO-SEEDING FOR HOTELS
    if (!data || data.length < 5) {
        console.log("Seeding Database with Hotels...");
        const { error: seedError } = await supabase.from('hotels').upsert(INITIAL_HOTELS);
        if (seedError) console.error("Error seeding hotels:", seedError);
        return INITIAL_HOTELS;
    }

    // Ensure arrays are arrays and not null
    return (data as Hotel[]).map(h => ({
        ...h,
        images: h.images || [],
        amenities: h.amenities || []
    }));
  } catch (err) {
    return INITIAL_HOTELS;
  }
};

export const getHotelById = async (id: string): Promise<Hotel | undefined> => {
  try {
    const { data, error } = await supabase.from('hotels').select('*').eq('id', id).single();
    if (error) return INITIAL_HOTELS.find(h => h.id === id);
    // Ensure arrays
    const hotel = data as Hotel;
    return {
        ...hotel,
        images: hotel.images || [],
        amenities: hotel.amenities || []
    };
  } catch {
    return INITIAL_HOTELS.find(h => h.id === id);
  }
};

export const saveHotel = async (hotel: Hotel): Promise<void> => {
  const hotelToSave = {
      ...hotel,
      images: Array.isArray(hotel.images) ? hotel.images : [],
      amenities: Array.isArray(hotel.amenities) ? hotel.amenities : []
  };
  const { error } = await supabase.from('hotels').upsert(hotelToSave);
  if (error) {
      console.error('Error saving hotel:', error);
      throw error; // Re-throw to catch in Admin component
  }
};

export const deleteHotel = async (id: string): Promise<void> => {
  const { error } = await supabase.from('hotels').delete().eq('id', id);
  if (error) console.error('Error deleting hotel:', error);
};

export const createEmptyHotel = (): Hotel => ({
  id: crypto.randomUUID(),
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
