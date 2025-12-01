
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
  // --- BRASIL VERANO 2026 (FROM PDF) ---
  {
    id: 'bra-camboriu-bus',
    title: 'Verano en Camboriú - En Bus',
    location: 'Brasil',
    price: 872,
    description: '7 Noches de alojamiento en Hamburgo Palace Hotel. Salida Enero/Febrero 2026. Bus Cama.',
    images: ['https://images.unsplash.com/photo-1563806461-12778943df44?q=80&w=2070&auto=format&fit=crop'],
    isOffer: true,
    durationLabel: '10 DÍAS / 7 NOCHES',
    availableDates: ['Enero 2026', 'Febrero 2026'],
    includesFlight: false,
    rating: 8.5,
    reviewsCount: 12,
    baseCurrency: 'USD',
    type: 'trip',
    specialLabel: 'BUS CAMA'
  },
  {
    id: 'bra-floripa-eco',
    title: 'Paquete a Florianópolis - 8 días',
    location: 'Brasil',
    price: 475,
    description: 'Opción económica. Salida desde Buenos Aires. Fechas disponibles Diciembre 2025, Enero 2026.',
    images: ['https://images.unsplash.com/photo-1544256667-27e1f486cc4e?q=80&w=2071&auto=format&fit=crop'],
    isOffer: true,
    durationLabel: '8 DÍAS / 7 NOCHES',
    availableDates: ['Diciembre 2025', 'Enero 2026', 'Marzo 2026'],
    includesFlight: false,
    rating: 8.0,
    reviewsCount: 40,
    baseCurrency: 'USD',
    type: 'trip',
    specialLabel: 'ECONÓMICO'
  },
  {
    id: 'bra-floripa-varadero',
    title: 'Florianópolis Verano! Varadero Palace',
    location: 'Brasil',
    price: 1326,
    description: 'Pagá el 50% y el resto en CUOTAS. Hotel Varadero Palace II. Vuelo Directo BUE-FLN. Enero 2026.',
    images: ['https://images.unsplash.com/photo-1626240291902-690226c45982?q=80&w=1932&auto=format&fit=crop'],
    isOffer: false,
    durationLabel: '8 DÍAS / 7 NOCHES',
    availableDates: ['Enero 2026'],
    includesFlight: true,
    rating: 9.4,
    reviewsCount: 8,
    baseCurrency: 'USD',
    type: 'trip',
    specialLabel: 'FINANCIACIÓN'
  },
  {
    id: 'bra-floripa-balmare',
    title: 'Escapate a Florianópolis – Hotel Balmare',
    location: 'Brasil',
    price: 1265,
    description: '¡Pagalo en cuotas! Hotel Balmare. Salida Enero 2026. Vuelo Directo.',
    images: ['https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1932&auto=format&fit=crop'],
    isOffer: false,
    durationLabel: '8 DÍAS / 7 NOCHES',
    availableDates: ['Enero 2026'],
    includesFlight: true,
    rating: 8.8,
    reviewsCount: 5,
    baseCurrency: 'USD',
    type: 'trip'
  },
  {
    id: 'bra-floripa-ingleses',
    title: 'OFERTA 30%OFF Verano 2026 - Ingleses Praia',
    location: 'Brasil',
    price: 866,
    description: 'Hotel Ingleses Praia. Desayuno incluido. Vuelo Directo BUE-FLN. Enero/Febrero 2026.',
    images: ['https://images.unsplash.com/photo-1535443274868-756b0f070b6e?q=80&w=2070&auto=format&fit=crop'],
    isOffer: true,
    specialLabel: '30% OFF',
    discount: 30,
    durationLabel: '8 DÍAS / 7 NOCHES',
    availableDates: ['Enero 2026', 'Febrero 2026'],
    includesFlight: true,
    rating: 9.0,
    reviewsCount: 22,
    baseCurrency: 'USD',
    type: 'trip'
  },
  {
    id: 'bra-camboriu-brut',
    title: 'OFERTA 30%OFF Verano 2026 - Hotel Brut',
    location: 'Brasil',
    price: 849,
    description: 'Paquete a Camboriu Hotel Brut. Enero/Febrero 2026. Vuelo Directo.',
    images: ['https://images.unsplash.com/photo-1555979869-7da2696b738e?q=80&w=1974&auto=format&fit=crop'],
    isOffer: true,
    specialLabel: '30% OFF',
    discount: 30,
    durationLabel: '8 DÍAS / 7 NOCHES',
    availableDates: ['Enero 2026', 'Febrero 2026'],
    includesFlight: true,
    rating: 9.1,
    reviewsCount: 18,
    baseCurrency: 'USD',
    type: 'trip'
  },
  {
    id: 'bra-bombinhas',
    title: 'Paquete a Bombinhas - 8 días',
    location: 'Brasil',
    price: 799,
    description: 'Destino BBH - Florianópolis. Salida desde Buenos Aires. Diciembre 2025, Enero 2026.',
    images: ['https://images.unsplash.com/photo-1519832276906-e77fa7478054?q=80&w=2069&auto=format&fit=crop'],
    isOffer: true,
    durationLabel: '8 DÍAS / 7 NOCHES',
    availableDates: ['Diciembre 2025', 'Enero 2026'],
    includesFlight: true,
    rating: 8.7,
    reviewsCount: 14,
    baseCurrency: 'USD',
    type: 'trip'
  },
  {
    id: 'bra-floripa-maiken',
    title: 'OFERTA VERANO 2026 - Posada Maiken',
    location: 'Brasil',
    price: 891,
    description: 'Paquete a Florianópolis Posada Maiken. Desayuno incluido. Vuelo Directo BUE-FLN. Enero/Feb 2026.',
    images: ['https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop'],
    isOffer: true,
    durationLabel: '8 DÍAS / 7 NOCHES',
    availableDates: ['Enero 2026', 'Febrero 2026'],
    includesFlight: true,
    rating: 8.2,
    reviewsCount: 9,
    baseCurrency: 'USD',
    type: 'trip',
    specialLabel: 'VERANO 2026'
  },
  {
    id: 'bra-camboriu-rieger',
    title: 'OFERTA 30%OFF Verano 2026 - Hotel Rieger',
    location: 'Brasil',
    price: 849,
    description: 'Paquete a Camboriu Hotel Rieger. Enero 2026. Vuelo Directo.',
    images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop'],
    isOffer: true,
    specialLabel: '30% OFF',
    discount: 30,
    durationLabel: '8 DÍAS / 7 NOCHES',
    availableDates: ['Enero 2026'],
    includesFlight: true,
    rating: 8.9,
    reviewsCount: 30,
    baseCurrency: 'USD',
    type: 'trip'
  },
  {
    id: 'bra-camboriu-ilha',
    title: 'OFERTA VERANO 2026 - Hotel Ilha de Madeira',
    location: 'Brasil',
    price: 893,
    description: 'Paquete a Camboriu Hotel Ilha de Madeira. Enero 2026. Vuelo Directo.',
    images: ['https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=2070&auto=format&fit=crop'],
    isOffer: true,
    durationLabel: '8 DÍAS / 7 NOCHES',
    availableDates: ['Enero 2026'],
    includesFlight: true,
    rating: 8.6,
    reviewsCount: 15,
    baseCurrency: 'USD',
    type: 'trip',
    specialLabel: 'VERANO 2026'
  },

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
    baseCurrency: 'USD',
    type: 'trip'
  }
];

export const INITIAL_RENTALS: Apartment[] = [];
export const INITIAL_HOTELS: Hotel[] = [];
export const INITIAL_EXCURSIONS: Excursion[] = [];
export const INITIAL_INSTALLMENT_TRIPS: InstallmentTrip[] = [];
export const INITIAL_WORLDCUP_TRIPS: WorldCupTrip[] = [];
export const INITIAL_GROUP_TRIPS: GroupTrip[] = [];
