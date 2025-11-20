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

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}