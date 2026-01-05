
import { InstallmentTrip } from '../types';
import { supabase } from './supabase';

// Helper para mapear desde la DB al objeto de la App
const mapFromDb = (item: any): InstallmentTrip => {
    return {
        ...item,
        // Soportamos tanto snake_case como camelCase por si la columna se creó distinto
        firstPaymentAmount: item.first_payment_amount !== undefined ? item.first_payment_amount : item.firstPaymentAmount,
        type: 'installment'
    };
};

export const getInstallmentTrips = async (): Promise<InstallmentTrip[]> => {
  try {
    const { data, error } = await supabase.from('installments').select('*');
    if (error) {
        console.error("Error fetching installments:", error);
        return [];
    }
    return (data || []).map(mapFromDb);
  } catch (err) {
    console.error("Unexpected error in getInstallmentTrips:", err);
    return [];
  }
};

export const getInstallmentTripById = async (id: string): Promise<InstallmentTrip | undefined> => {
  try {
    const { data, error } = await supabase.from('installments').select('*').eq('id', id).single();
    if (error) return undefined;
    return mapFromDb(data);
  } catch {
    return undefined;
  }
};

export const saveInstallmentTrip = async (trip: InstallmentTrip): Promise<void> => {
  // Preparamos el objeto para la base de datos
  // Eliminamos 'type' porque es un campo virtual y mapeamos explícitamente el monto inicial
  const { type, firstPaymentAmount, ...rest } = trip;
  
  const tripToSave = {
      ...rest,
      first_payment_amount: firstPaymentAmount, // Mapeo explícito a snake_case para la DB
      firstPaymentAmount: firstPaymentAmount,   // Incluimos ambos por redundancia y seguridad
      images: Array.isArray(trip.images) ? trip.images : []
  };

  const { error } = await supabase.from('installments').upsert(tripToSave);
  
  if (error) {
      console.error('Error saving installment to Supabase:', error);
      throw error;
  }
};

export const deleteInstallmentTrip = async (id: string): Promise<void> => {
  const { error } = await supabase.from('installments').delete().eq('id', id);
  if (error) console.error('Error deleting installment:', error);
};

export const createEmptyInstallmentTrip = (): InstallmentTrip => ({
  id: crypto.randomUUID(),
  title: '',
  location: '',
  totalPrice: 0,
  firstPaymentAmount: 0,
  description: '',
  images: [`https://picsum.photos/seed/${Date.now()}/800/600`],
  departureDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
  isOffer: false,
  type: 'installment',
  discount: 0,
  specialLabel: '',
  baseCurrency: 'USD'
});
