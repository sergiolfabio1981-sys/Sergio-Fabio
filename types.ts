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
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}