export interface ItineraryDay {
  day: number;
  activity: string;
}

export interface Trip {
  id: string;
  title: string;
  location: string;
  price: number;
  description: string;
  images: string[]; // Changed from image: string to images: string[]
  isOffer: boolean;
  offerExpiresAt?: string; // ISO date string
  itinerary: ItineraryDay[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}