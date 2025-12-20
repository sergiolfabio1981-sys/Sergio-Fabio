
import { Trip, Apartment, Excursion, Hotel, InstallmentTrip, WorldCupTrip, GroupTrip, HeroSlide, PromoBanner } from './types';

export const ADMIN_EMAIL = "sergiolfabio1981@gmail.com";
export const ADMIN_PASS = "Colo1981";

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=2070&auto=format&fit=crop",
    title: "MUNDIAL 2026",
    subtitle: "Asegurá tu lugar en USA, México y Canadá. Paquetes exclusivos con entradas garantizadas.",
    ctaText: "Ver Paquetes Mundial",
    ctaLink: "/worldcup",
    highlightColor: "text-blue-400"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
    title: "ABRAS CUOTAS",
    subtitle: "Congelá el precio hoy y pagá tu viaje mes a mes SIN INTERÉS hasta la fecha de salida.",
    ctaText: "Ver Planes de Ahorro",
    ctaLink: "/installments",
    highlightColor: "text-indigo-400"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1544256667-27e1f486cc4e?q=80&w=2071&auto=format&fit=crop",
    title: "DISFRUTÁ DEL VERANO",
    subtitle: "Las mejores playas de Brasil te esperan. Florianópolis, Río, Buzios y el Nordeste.",
    ctaText: "Ver Destinos de Playa",
    ctaLink: "/trips",
    highlightColor: "text-orange-400"
  }
];

export const INITIAL_PROMO_BANNERS: PromoBanner[] = [
  {
    id: 'banner_worldcup',
    title: 'MUNDIAL 2026',
    subtitle: 'Asegurá tu lugar para la próxima Copa del Mundo.',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=2070&auto=format&fit=crop',
    badge: 'USA - MÉXICO - CANADÁ',
    ctaText: 'Ver Paquetes',
    link: '/worldcup'
  }
];

export const INITIAL_TRIPS: Trip[] = [
  {
    id: 'bra-floripa-verano',
    title: 'Florianópolis Verano 2026',
    location: 'Florianópolis, Brasil',
    price: 890,
    description: 'Disfrutá de las mejores playas del sur de Brasil. Incluye aéreos directos y 7 noches de hotel con desayuno.',
    images: ['https://images.unsplash.com/photo-1544256667-27e1f486cc4e?q=80&w=2071&auto=format&fit=crop'],
    isOffer: true,
    durationLabel: '8 DÍAS / 7 NOCHES',
    availableDates: ['Enero 2026', 'Febrero 2026'],
    includesFlight: true,
    rating: 9.0,
    baseCurrency: 'USD',
    type: 'trip',
    specialLabel: 'VERANO 2026'
  },
  {
    id: 'pkg-europa-clasica',
    title: 'Europa Clásica',
    location: 'Madrid, Roma, París',
    price: 5499,
    description: 'Circuito completo por las capitales europeas. Guía en español, hoteles céntricos y traslados incluidos.',
    images: ['https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop'],
    isOffer: false,
    durationLabel: '18 DÍAS / 16 NOCHES',
    availableDates: ['Abril 2026', 'Mayo 2026'],
    includesFlight: true,
    rating: 9.7,
    baseCurrency: 'USD',
    type: 'trip'
  }
];

export const INITIAL_EXCURSIONS: Excursion[] = [
  {
    id: 'exc-city-tour-rio',
    title: 'Tour Panorámico Río de Janeiro',
    location: 'Río de Janeiro, Brasil',
    price: 45,
    description: 'Visitá el Cristo Redentor, Pan de Azúcar y las playas de Copacabana en un tour de día completo.',
    images: ['https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070&auto=format&fit=crop'],
    isOffer: false,
    duration: 'Full Day',
    availableDates: ['Diario'],
    rating: 9.2,
    baseCurrency: 'USD',
    type: 'excursion'
  }
];

export const INITIAL_RENTALS: Apartment[] = [];
export const INITIAL_HOTELS: Hotel[] = [];
export const INITIAL_INSTALLMENT_TRIPS: InstallmentTrip[] = [];
export const INITIAL_WORLDCUP_TRIPS: WorldCupTrip[] = [];
export const INITIAL_GROUP_TRIPS: GroupTrip[] = [];
