
import { GroupTrip } from '../types';
import { INITIAL_GROUP_TRIPS } from '../constants';
import { supabase } from './supabase';

export const getGroupTrips = async (): Promise<GroupTrip[]> => {
  try {
    const { data, error } = await supabase.from('groups').select('*');
    if (error) {
        console.error(error);
        return INITIAL_GROUP_TRIPS;
    }
    return (data as GroupTrip[]) || INITIAL_GROUP_TRIPS;
  } catch {
    return INITIAL_GROUP_TRIPS;
  }
};

export const getGroupTripById = async (id: string): Promise<GroupTrip | undefined> => {
  try {
    const { data, error } = await supabase.from('groups').select('*').eq('id', id).single();
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
  const { error } = await supabase.from('groups').upsert(tripToSave);
  if (error) console.error(error);
};

export const deleteGroupTrip = async (id: string): Promise<void> => {
  const { error } = await supabase.from('groups').delete().eq('id', id);
  if (error) console.error(error);
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
