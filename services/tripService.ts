
import { Trip } from '../types';
import { INITIAL_TRIPS } from '../constants';
import { supabase } from './supabase';

export const getTrips = async (): Promise<Trip[]> => {
  try {
    const { data, error } = await supabase
      .from('trips')
      .select('*');

    if (error) {
      console.error('Error fetching trips from Supabase:', error);
      return INITIAL_TRIPS; 
    }

    // SEEDING LOGIC: Only run if DB is completely empty.
    // This respects deletions made by the admin.
    if (!data || data.length === 0) {
        console.log("Seeding Database with Default Trips...");
        const { error: seedError } = await supabase.from('trips').upsert(INITIAL_TRIPS);
        if (seedError) console.error("Error seeding trips:", seedError);
        return INITIAL_TRIPS; 
    }

    return data as Trip[];
  } catch (err) {
    console.error('Unexpected error fetching trips:', err);
    return INITIAL_TRIPS;
  }
};

export const getTripById = async (id: string): Promise<Trip | undefined> => {
  try {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
       return INITIAL_TRIPS.find(t => t.id === id);
    }
    
    return data as Trip;
  } catch (err) {
    return INITIAL_TRIPS.find(t => t.id === id);
  }
};

export const saveTrip = async (trip: Trip): Promise<void> => {
  const tripToSave = {
      ...trip,
      images: Array.isArray(trip.images) ? trip.images : [],
      availableDates: Array.isArray(trip.availableDates) ? trip.availableDates : []
  };

  const { error } = await supabase
    .from('trips')
    .upsert(tripToSave);

  if (error) {
    console.error('Error saving trip to Supabase:', error);
    throw error;
  }
};

export const deleteTrip = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('trips')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting trip:', error);
  }
};

export const createEmptyTrip = (): Trip => ({
  id: crypto.randomUUID(),
  title: '',
  location: '',
  price: 0,
  description: '',
  images: [`https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop`],
  isOffer: false,
  availableDates: [],
  discount: 0,
  includesFlight: false,
  rating: 0,
  reviewsCount: 0,
  specialLabel: '',
  durationLabel: '',
  baseCurrency: 'USD',
  type: 'trip'
});
