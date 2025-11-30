
import { GroupTrip } from '../types';
import { INITIAL_GROUP_TRIPS } from '../constants';
import { supabase } from './supabase';

export const getGroupTrips = async (): Promise<GroupTrip[]> => {
  try {
    // Changed table from 'groups' to 'group_trips'
    const { data, error } = await supabase.from('group_trips').select('*');
    
    if (error) {
        console.error('Error fetching group trips:', error);
        return INITIAL_GROUP_TRIPS;
    }

    // AUTO-SEEDING LOGIC
    // If database is empty or has very few items (indicating older test data), populate it with the full PDF extracted data.
    if (!data || data.length < 5) {
        console.log("Seeding Database with Group Trips from PDF...");
        const { error: seedError } = await supabase.from('group_trips').upsert(INITIAL_GROUP_TRIPS);
        if (seedError) {
            console.error("Error seeding groups:", seedError);
        } else {
            console.log("Seeding complete. Refreshing...");
            return INITIAL_GROUP_TRIPS;
        }
    }

    return (data as GroupTrip[]) || INITIAL_GROUP_TRIPS;
  } catch (err) {
    console.error(err);
    return INITIAL_GROUP_TRIPS;
  }
};

export const getGroupTripById = async (id: string): Promise<GroupTrip | undefined> => {
  try {
    const { data, error } = await supabase.from('group_trips').select('*').eq('id', id).single();
    if (error) return INITIAL_GROUP_TRIPS.find(t => t.id === id);
    return data as GroupTrip;
  } catch {
    return INITIAL_GROUP_TRIPS.find(t => t.id === id);
  }
};

export const saveGroupTrip = async (trip: GroupTrip): Promise<void> => {
  const tripToSave = {
      ...trip,
      images: Array.isArray(trip.images) ? trip.images : [],
      availableDates: Array.isArray(trip.availableDates) ? trip.availableDates : []
  };
  const { error } = await supabase.from('group_trips').upsert(tripToSave);
  if (error) console.error('Error saving group trip:', error);
};

export const deleteGroupTrip = async (id: string): Promise<void> => {
  const { error } = await supabase.from('group_trips').delete().eq('id', id);
  if (error) console.error('Error deleting group trip:', error);
};

export const createEmptyGroupTrip = (): GroupTrip => ({
  id: crypto.randomUUID(),
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
  specialLabel: '',
  durationLabel: ''
});
