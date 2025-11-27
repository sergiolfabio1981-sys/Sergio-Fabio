
export interface Trip {
  id: string;
  title: string;
  location: string;
  price: number;
  description: string;
  images: string[];
  isOffer: boolean;
  offerExpiresAt?: string; // ISO date string
  availableDates: string[];
  discount?: number;
  includesFlight?: boolean; // New: mimic package feature
  rating?: number; // New: mimic user rating
  reviewsCount?: number; // New
  baseCurrency?: 'ARS' | 'USD';
  type?: 'trip';
}

export interface Apartment {
  id: string;
  title: string;
  location: string;
  pricePerNight: number;
  description: string;
  images: string[];
  bedrooms: number;
  maxGuests: number;
  amenities: string[]; // Wifi, Pileta, Aire Acondicionado, etc.
  isOffer?: boolean;
  offerExpiresAt?: string;
  lat?: number;
  lng?: number;
  discount?: number;
  rating?: number;
  reviewsCount?: number;
  baseCurrency?: 'ARS' | 'USD';
  type?: 'rental';
}

export interface Hotel {
  id: string;
  title: string;
  location: string;
  pricePerNight: number;
  description: string;
  images: string[];
  stars: number;
  amenities: string[];
  isOffer: boolean;
  offerExpiresAt?: string;
  lat?: number;
  lng?: number;
  discount?: number;
  rating?: number;
  reviewsCount?: number;
  baseCurrency?: 'ARS' | 'USD';
  type?: 'hotel';
}

export interface Excursion {
  id: string;
  title: string;
  location: string;
  price: number;
  description: string;
  images: string[];
  isOffer: boolean;
  offerExpiresAt?: string;
  duration: string; // e.g. "Full Day", "4 hours"
  availableDates: string[]; // e.g. "Lunes, Miércoles y Viernes"
  discount?: number;
  rating?: number;
  reviewsCount?: number;
  baseCurrency?: 'ARS' | 'USD';
  type?: 'excursion';
}

export interface InstallmentTrip {
  id: string;
  title: string;
  location: string;
  totalPrice: number;
  description: string;
  images: string[];
  departureDate: string; // ISO string or "YYYY-MM-DD"
  isOffer: boolean; // Just for highlighting
  discount?: number;
  baseCurrency?: 'ARS' | 'USD';
  type?: 'installment';
}

export interface WorldCupTrip {
  id: string;
  title: string;
  location: string;
  totalPrice: number;
  description: string;
  images: string[];
  departureDate: string; // Fixed mostly to June 2026
  originCountry: string; // e.g. "Salida desde Argentina"
  isOffer: boolean;
  discount?: number;
  baseCurrency?: 'ARS' | 'USD'; // Force USD for World Cup
  type?: 'worldcup';
}

export type ListingItem = Trip | Apartment | Excursion | Hotel | InstallmentTrip | WorldCupTrip;

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}
