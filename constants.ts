
import { Trip, Apartment, Excursion, Hotel, InstallmentTrip, WorldCupTrip, GroupTrip, HeroSlide, PromoBanner } from './types';

export const ADMIN_EMAIL = "sergiolfabio1981@gmail.com";
export const ADMIN_PASS = "Colo1981";

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=2070&auto=format&fit=crop", // Stadium / Excitement
    title: "MUNDIAL 2026",
    subtitle: "Asegurá tu lugar en USA, México y Canadá. Paquetes exclusivos con entradas garantizadas.",
    ctaText: "Ver Paquetes Mundial",
    ctaLink: "/worldcup",
    highlightColor: "text-blue-400"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop", // Planning / Installments
    title: "ABRAS CUOTAS",
    subtitle: "Congelá el precio hoy y pagá tu viaje mes a mes SIN INTERÉS hasta la fecha de salida.",
    ctaText: "Ver Planes de Ahorro",
    ctaLink: "/installments",
    highlightColor: "text-indigo-400"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1544256667-27e1f486cc4e?q=80&w=2071&auto=format&fit=crop", // Beach / Brazil
    title: "DISFRUTÁ DEL VERANO",
    subtitle: "Las mejores playas de Brasil te esperan. Florianópolis, Río, Buzios y el Nordeste.",
    ctaText: "Ver Destinos de Playa",
    ctaLink: "/trips",
    highlightColor: "text-orange-400"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1499856871940-a09627c6d7db?q=80&w=2020&auto=format&fit=crop", // Europe / Paris
    title: "VIAJÁ A EUROPA",
    subtitle: "Descubrí la magia del viejo continente. Circuitos por España, Francia, Italia y más.",
    ctaText: "Explorar Europa",
    ctaLink: "/trips",
    highlightColor: "text-emerald-400"
  }
];

export const INITIAL_PROMO_BANNERS: PromoBanner[] = [
  {
    id: 'banner_worldcup',
    title: 'MUNDIAL 2026',
    subtitle: 'Asegurá tu lugar para la próxima Copa del Mundo. Paquetes exclusivos.',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=2070&auto=format&fit=crop',
    badge: 'USA - MÉXICO - CANADÁ',
    ctaText: 'Ver Paquetes',
    link: '/worldcup'
  },
  {
    id: 'banner_installments',
    title: 'ABRAS CUOTAS',
    subtitle: 'Congelá el precio y pagá tu viaje en cuotas mensuales sin interés.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop',
    badge: 'PLAN DE AHORRO',
    ctaText: 'Comenzar a Pagar',
    link: '/installments'
  }
];

// --- PAQUETES (Precios en USD) - EXTRAÍDOS DEL PDF ---
export const INITIAL_TRIPS: Trip[] = [
  // --- EUROPA ---
  {
    id: 'pkg-inglaterra-escocia',
    title: 'Inglaterra, Escocia e Irlanda',
    location: 'Europa',
    price: 6999,
    description: '18 Días recorriendo lo mejor de las islas británicas. Visitando Londres, Edimburgo, Glasgow, Dublin, Liverpool y Madrid de regalo. Incluye Bus hasta Ezeiza, Aéreos directos, Hoteles y Excursiones.',
    images: ['https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2070&auto=format&fit=crop'],
    isOffer: false,
    durationLabel: '18 DÍAS / 16 NOCHES',
    availableDates: ['6 de Mayo 2026', '15 de Julio 2026', '2 de Septiembre 2026'],
    includesFlight: true,
    rating: 9.8,
    reviewsCount: 45,
    baseCurrency: 'USD',
    type: 'trip'
  },
  {
    id: 'pkg-portugal-vasco',
    title: 'Portugal y Pais Vasco',
    location: 'Europa',
    price: 5399,
    description: 'Con Lourdes y Andalucia. Recorriendo Madrid, Granada, Sevilla, Lisboa, Oporto, Santiago, Oviedo, Santander, San Sebastian, Burdeos y Lourdes.',
    images: ['https://images.unsplash.com/photo-1555881400-74d7acaacd81?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1582234220760-4965823184f9?q=80&w=2070&auto=format&fit=crop'],
    isOffer: false,
    durationLabel: '18 DÍAS / 16 NOCHES',
    availableDates: ['6 de Mayo 2026', '15 de Julio 2026', '2 de Septiembre 2026'],
    includesFlight: true,
    rating: 9.5,
    reviewsCount: 30,
    baseCurrency: 'USD',
    type: 'trip'
  },
  {
    id: 'pkg-europa-clasica',
    title: 'Europa Clásica',
    location: 'Europa',
    price: 5999,
    description: 'Con Pausas y Hoteles Céntricos. Madrid, Barcelona, Roma, Paris. Traslado a Ezeiza incluido para interior de PBA, Santa Fe, Entre Rios y La Pampa.',
    images: ['https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop'],
    isOffer: true,
    durationLabel: '18 DÍAS / 16 NOCHES',
    availableDates: ['8 de Octubre 2025', '21 de Enero 2026', '4 de Marzo 2026', '1 de Abril 2026', '22 de Abril 2026', '6 de Mayo 2026', '3 de Junio 2026'],
    includesFlight: true,
    rating: 9.7,
    reviewsCount: 120,
    baseCurrency: 'USD',
    type: 'trip'
  },
  {
    id: 'pkg-sur-italia',
    title: 'Sur de Italia: Capri, Sorrento y Sicilia',
    location: 'Italia',
    price: 5299,
    description: 'Recorriendo Roma, Bari, Brindisi, Napoles, Salerno, Taormina, Agrigento, Palermo. Incluye traslados, aéreos y excursiones.',
    images: ['https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1887&auto=format&fit=crop', 'https://images.unsplash.com/photo-1619546952912-335dd051ebf9?q=80&w=1887&auto=format&fit=crop'],
    isOffer: false,
    durationLabel: '16 DÍAS / 13 NOCHES',
    availableDates: ['16 de Marzo 2026', '13 de Abril 2026', '18 de Mayo 2026'],
    includesFlight: true,
    rating: 9.6,
    reviewsCount: 25,
    baseCurrency: 'USD',
    type: 'trip'
  },
  {
    id: 'pkg-europa-apasionante',
    title: 'Europa Apasionante',
    location: 'Europa',
    price: 4449,
    description: 'España, Francia e Italia. Madrid, Burdeos, Paris, Aosta, Venecia, Roma, Florencia, Costa Azul, Barcelona. Aéreos en vuelo directo.',
    images: ['https://images.unsplash.com/photo-1499856871940-a09627c6d7db?q=80&w=2020&auto=format&fit=crop', 'https://images.unsplash.com/photo-1529260830199-42c42dda5f3d?q=80&w=2071&auto=format&fit=crop'],
    isOffer: true,
    durationLabel: '18 DÍAS / 16 NOCHES',
    availableDates: ['8 Oct 2025', '5 Nov 2025', '21 Ene 2026', '4 Mar 2026', '1 Abr 2026', '22 Abr 2026', '6 May 2026', '3 Jun 2026', '22 Jul 2026'],
    includesFlight: true,
    rating: 9.4,
    reviewsCount: 88,
    baseCurrency: 'USD',
    type: 'trip'
  },
  // --- CARIBE ---
  {
    id: 'pkg-punta-cana-ene',
    title: 'Punta Cana y Bayahibe - Enero 2026',
    location: 'República Dominicana',
    price: 3579,
    description: 'Especial 8 de Enero. 5 Noches en Bayahibe + 5 Noches en Punta Cana. All Inclusive. Vuelo Directo.',
    images: ['https://images.unsplash.com/photo-1614350280436-15949176395b?q=80&w=2071&auto=format&fit=crop', 'https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=1935&auto=format&fit=crop'],
    isOffer: true,
    specialLabel: 'SALIDA ENERO',
    durationLabel: '11 DÍAS / 10 NOCHES',
    availableDates: ['8 de Enero 2026'],
    includesFlight: true,
    rating: 9.2,
    reviewsCount: 15,
    baseCurrency: 'USD',
    type: 'trip'
  },
  {
    id: 'pkg-miches-bayahibe',
    title: 'Combinado Miches y Bayahibe',
    location: 'República Dominicana',
    price: 2999,
    description: '10 Noches con All Inclusive. Pasajes aéreos directo. Coordinador acompañante.',
    images: ['https://images.unsplash.com/photo-1596423736767-4861cb78923a?q=80&w=1936&auto=format&fit=crop', 'https://images.unsplash.com/photo-1574621100236-d25a64a47e63?q=80&w=2069&auto=format&fit=crop'],
    isOffer: false,
    durationLabel: '11 DÍAS / 10 NOCHES',
    availableDates: ['20 de Julio 2026', '22 de Julio 2026', '16 de Agosto 2026', '7 de Octubre 2026'],
    includesFlight: true,
    rating: 9.3,
    reviewsCount: 10,
    