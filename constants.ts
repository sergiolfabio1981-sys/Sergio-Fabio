
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

// --- PAQUETES (Precios en USD) ---
export const INITIAL_TRIPS: Trip[] = [
  {
    id: 'pkg-rio-buzios-combo',
    title: 'Relax en Rio de Janeiro + Búzios',
    location: 'Brasil',
    price: 1290, // USD
    description: 'La combinación perfecta entre la "Cidade Maravilhosa" y el encanto de Búzios. Incluye aéreos ida y vuelta, traslados entre aeropuertos y destinos, 4 noches en Rio de Janeiro (Hotel Copacabana) y 4 noches en Búzios (Pousada con encanto). Desayuno incluido en ambos destinos.',
    images: [
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544015759-3660632906b3?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: true,
    discount: 10,
    specialLabel: 'COMBINADO BRASIL',
    durationLabel: '9 DÍAS / 8 NOCHES',
    availableDates: ["Salida especial 18 de Marzo 2026", "Salidas diarias Abril 2026"],
    includesFlight: true,
    rating: 9.3,
    reviewsCount: 420,
    baseCurrency: 'USD',
    type: 'trip'
  },
  {
    id: 'pkg-flori-canas',
    title: 'Verano en Florianópolis - Canasvieiras',
    location: 'Florianópolis, Brasil',
    price: 820, // USD
    description: 'Disfruta de la playa favorita de los argentinos. Incluye vuelo directo, traslados y 7 noches en Posada a 200 metros del mar con desayuno. Ideal para familias.',
    images: [
      'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1932&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545389369-588725ae4991?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: true,
    discount: 5,
    specialLabel: 'OFERTA VERANO',
    durationLabel: '8 DÍAS / 7 NOCHES',
    availableDates: ["Enero y Febrero 2026"],
    includesFlight: true,
    rating: 8.9,
    reviewsCount: 1500,
    baseCurrency: 'USD',
    type: 'trip'
  },
  {
    id: 'pkg-natal-pipa',
    title: 'Nordeste Mágico: Natal + Pipa',
    location: 'Rio Grande do Norte, Brasil',
    price: 1550, // USD
    description: 'Descubre las dunas de Genipabu y los acantilados de Pipa. Paquete combinado: 3 noches en Natal y 4 noches en Pipa. Hoteles con piscina. Vuelos con equipaje incluido.',
    images: [
      'https://images.unsplash.com/photo-1518182170546-0766aaef3129?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591739266746-9907b22a009c?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: false,
    durationLabel: '8 DÍAS / 7 NOCHES',
    availableDates: ["Salidas Marzo y Abril"],
    includesFlight: true,
    rating: 9.4,
    reviewsCount: 320,
    baseCurrency: 'USD',
    type: 'trip'
  },
  {
    id: 'pkg-porto-seguro',
    title: 'Porto Seguro All Inclusive',
    location: 'Bahía, Brasil',
    price: 1380, // USD
    description: 'Relax total en Bahía. Vuelos + 7 noches en Resort All Inclusive frente al mar. Comidas, bebidas y entretenimiento diario incluido. La mejor relación precio-calidad.',
    images: [
      'https://images.unsplash.com/photo-1596766782290-7591440786ba?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: true,
    discount: 15,
    specialLabel: 'ALL INCLUSIVE',
    durationLabel: '8 DÍAS / 7 NOCHES',
    availableDates: ["Todo el año"],
    includesFlight: true,
    rating: 9.0,
    reviewsCount: 850,
    baseCurrency: 'USD',
    type: 'trip'
  },
  {
    id: 'pkg-rio-fly',
    title: 'Paquetes a Río de Janeiro',
    location: 'Río de Janeiro, Brasil',
    price: 1050, // USD
    description: 'Viajá a Río con todo resuelto. Incluye aéreos directos desde Buenos Aires, traslados y 7 noches en Hotel Windsor Excelsior Copacabana con desayuno. Asistencia al viajero incluida.',
    images: [
      'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?q=80&w=2026&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621287959062-09418934444d?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: true,
    discount: 15,
    specialLabel: 'Oferta Imbatible',
    durationLabel: '8 DÍAS / 7 NOCHES',
    availableDates: ["Salidas diarias Enero y Febrero"],
    includesFlight: true,
    rating: 9.2,
    reviewsCount: 1250,
    baseCurrency: 'USD',
    type: 'trip'
  },
  {
    id: 'pkg-cancun-all',
    title: 'Cancún All Inclusive - 5 Estrellas',
    location: 'Quintana Roo, México',
    price: 2350, // USD
    description: 'El paraíso te espera. Vuelos + 7 noches en Hard Rock Hotel Cancún con sistema All Inclusive las 24hs. Acceso ilimitado a bebidas, comidas y entretenimiento.',
    images: [
      'https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=1935&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614350280436-15949176395b?q=80&w=2071&auto=format&fit=crop'
    ],
    isOffer: true,
    discount: 10,
    specialLabel: 'Semana de Locura',
    durationLabel: '8 DÍAS / 7 NOCHES',
    availableDates: ["Salidas Domingos de Marzo"],
    includesFlight: true,
    rating: 9.5,
    reviewsCount: 840,
    baseCurrency: 'USD',
    type: 'trip'
  },
  {
    id: 'pkg-bariloche-fly',
    title: 'Escapada a Bariloche - Llao Llao',
    location: 'Río Negro, Argentina',
    price: 820, // USD
    description: 'Lujo en la Patagonia. Aéreos + 4 noches en el exclusivo Llao Llao Resort, Golf & Spa. Incluye circuito de Spa y té de la tarde. Traslados privados.',
    images: [
      'https://images.unsplash.com/photo-1571896349842-6e53ce41e8f2?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1612294069631-9a746a551842?q=80&w=1974&auto=format&fit=crop'
    ],
    isOffer: false,
    durationLabel: '5 DÍAS / 4 NOCHES',
    availableDates: ["Fines de semana largos 2026"],
    includesFlight: true,
    rating: 9.8,
    reviewsCount: 3200,
    baseCurrency: 'USD',
    type: 'trip'
  },
  {
    id: 'pkg-madrid-tour',
    title: 'Madrid y Barcelona en Tren',
    location: 'España',
    price: 2600, // USD
    description: 'Eurotrip Express. Aéreos a Madrid. 3 noches en Madrid + Tren AVE + 3 noches en Barcelona. Hoteles céntricos 4 estrellas. City tour en ambas ciudades.',
    images: [
      'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: true,
    durationLabel: '7 DÍAS / 6 NOCHES',
    availableDates: ["Salidas Abril y Mayo"],
    includesFlight: true,
    rating: 8.9,
    reviewsCount: 510,
    baseCurrency: 'USD',
    type: 'trip'
  },
  {
    id: 'pkg-miami-shop',
    title: 'Miami Beach & Shopping',
    location: 'Florida, USA',
    price: 1650, // USD
    description: 'Playa y compras. Vuelo directo + 6 noches en Hotel Riu Plaza Miami Beach. Desayuno incluido. Cuponera de descuentos para Sawgrass Mills.',
    images: [
      'https://images.unsplash.com/photo-1535498730771-e735b998cd64?q=80&w=1887&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?q=80&w=1974&auto=format&fit=crop'
    ],
    isOffer: true,
    discount: 5,
    durationLabel: '7 DÍAS / 6 NOCHES',
    availableDates: ["Todo el año"],
    includesFlight: true,
    rating: 8.7,
    reviewsCount: 1100,
    baseCurrency: 'USD',
    type: 'trip'
  }
];

// --- GRUPALES (EXTRACCIÓN PDF COMPLETA) ---
export const INITIAL_GROUP_TRIPS: GroupTrip[] = [
  // EUROPA
  {
    id: 'grp-inglaterra',
    title: 'Inglaterra, Escocia e Irlanda',
    location: 'Europa',
    price: 6999,
    description: 'Incluye Bus hasta Ezeiza, Aéreos directos, Hoteles y Excursiones. Visitando Londres, Edimburgo, Glasgow, Dublin, Liverpool y Madrid de regalo.',
    images: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: false,
    durationLabel: '18 DÍAS / 16 NOCHES',
    availableDates: ['6 de Mayo 2026', '15 de Julio 2026', '2 de Septiembre 2026'],
    includesFlight: true,
    rating: 9.8,
    reviewsCount: 45,
    baseCurrency: 'USD',
    type: 'group'
  },
  {
    id: 'grp-portugal',
    title: 'Portugal y Pais Vasco',
    location: 'Europa',
    price: 5399,
    description: 'Con Lourdes y Andalucia. Recorriendo Madrid, Granada, Sevilla, Lisboa, Oporto, Santiago, Oviedo, Santander, San Sebastian, Burdeos y Lourdes.',
    images: [
      'https://images.unsplash.com/photo-1555881400-74d7acaacd81?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582234220760-4965823184f9?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: false,
    durationLabel: '18 DÍAS / 16 NOCHES',
    availableDates: ['6 de Mayo 2026', '15 de Julio 2026', '2 de Septiembre 2026'],
    includesFlight: true,
    rating: 9.5,
    reviewsCount: 30,
    baseCurrency: 'USD',
    type: 'group'
  },
  {
    id: 'grp-europa-clasica',
    title: 'Europa Clásica',
    location: 'Europa',
    price: 5999,
    description: 'Con Pausas y Hoteles Céntricos. Madrid, Barcelona, Roma, Paris. Traslado a Ezeiza incluido para interior de PBA, Santa Fe, Entre Rios y La Pampa.',
    images: [
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop'
    ],
    isOffer: true,
    durationLabel: '18 DÍAS / 16 NOCHES',
    availableDates: ['8 de Octubre 2025', '21 de Enero 2026', '4 de Marzo 2026', '1 de Abril 2026', '22 de Abril 2026', '6 de Mayo 2026', '3 de Junio 2026'],
    includesFlight: true,
    rating: 9.7,
    reviewsCount: 120,
    baseCurrency: 'USD',
    type: 'group'
  },
  {
    id: 'grp-sur-italia',
    title: 'Sur de Italia: Capri, Sorrento y Sicilia',
    location: 'Italia',
    price: 5299,
    description: 'Recorriendo Roma, Bari, Brindisi, Napoles, Salerno, Taormina, Agrigento, Palermo. Incluye traslados, aéreos y excursiones.',
    images: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1887&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1619546952912-335dd051ebf9?q=80&w=1887&auto=format&fit=crop'
    ],
    isOffer: false,
    durationLabel: '16 DÍAS / 13 NOCHES',
    availableDates: ['16 de Marzo 2026', '13 de Abril 2026', '18 de Mayo 2026'],
    includesFlight: true,
    rating: 9.6,
    reviewsCount: 25,
    baseCurrency: 'USD',
    type: 'group'
  },
  {
    id: 'grp-europa-apasionante',
    title: 'Europa Apasionante: España, Francia e Italia',
    location: 'Europa',
    price: 4449,
    description: 'Madrid, Burdeos, Paris, Aosta, Venecia, Roma, Florencia, Costa Azul, Barcelona. Aéreos en vuelo directo.',
    images: [
      'https://images.unsplash.com/photo-1499856871940-a09627c6d7db?q=80&w=2020&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529260830199-42c42dda5f3d?q=80&w=2071&auto=format&fit=crop'
    ],
    isOffer: true,
    durationLabel: '18 DÍAS / 16 NOCHES',
    availableDates: ['8 Oct 2025', '5 Nov 2025', '21 Ene 2026', '4 Mar 2026', '1 Abr 2026', '22 Abr 2026', '6 May 2026', '3 Jun 2026', '22 Jul 2026'],
    includesFlight: true,
    rating: 9.4,
    reviewsCount: 88,
    baseCurrency: 'USD',
    type: 'group'
  },
  // CARIBE
  {
    id: 'grp-punta-cana-ene',
    title: 'Punta Cana y Bayahibe - Enero 2026',
    location: 'República Dominicana',
    price: 3579,
    description: 'Especial 8 de Enero. 5 Noches en Bayahibe + 5 Noches en Punta Cana. All Inclusive. Vuelo Directo.',
    images: [
      'https://images.unsplash.com/photo-1614350280436-15949176395b?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=1935&auto=format&fit=crop'
    ],
    isOffer: true,
    specialLabel: 'SALIDA ENERO',
    durationLabel: '11 DÍAS / 10 NOCHES',
    availableDates: ['8 de Enero 2026'],
    includesFlight: true,
    rating: 9.2,
    reviewsCount: 15,
    baseCurrency: 'USD',
    type: 'group'
  },
  {
    id: 'grp-miches-bayahibe',
    title: 'Combinado Miches y Bayahibe',
    location: 'República Dominicana',
    price: 2999,
    description: '10 Noches con All Inclusive. Pasajes aéreos directo. Coordinador acompañante.',
    images: [
      'https://images.unsplash.com/photo-1596423736767-4861cb78923a?q=80&w=1936&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574621100236-d25a64a47e63?q=80&w=2069&auto=format&fit=crop'
    ],
    isOffer: false,
    durationLabel: '11 DÍAS / 10 NOCHES',
    availableDates: ['20 de Julio 2026', '22 de Julio 2026', '16 de Agosto 2026', '7 de Octubre 2026'],
    includesFlight: true,
    rating: 9.3,
    reviewsCount: 10,
    baseCurrency: 'USD',
    type: 'group'
  },
  {
    id: 'grp-bayahibe-ene',
    title: 'Especial Bayahibe - Enero 2026',
    location: 'República Dominicana',
    price: 2899,
    description: 'Salida 2 de Enero. 8 Noches con All Inclusive. Pasajes aéreos directo. Traslado a Ezeiza.',
    images: [
      'https://images.unsplash.com/photo-1540206395-688085723adb?q=80&w=2048&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1949&auto=format&fit=crop'
    ],
    isOffer: true,
    specialLabel: 'AÑO NUEVO',
    durationLabel: '9 DÍAS / 8 NOCHES',
    availableDates: ['2 de Enero 2026'],
    includesFlight: true,
    rating: 9.1,
    reviewsCount: 12,
    baseCurrency: 'USD',
    type: 'group'
  },
  {
    id: 'grp-punta-cana-bayahibe',
    title: 'Combinado Punta Cana y Bayahibe',
    location: 'República Dominicana',
    price: 2749,
    description: '10 Noches All Inclusive. Salidas en Enero, Marzo y Mayo. Bus hasta Ezeiza incluido.',
    images: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614350280436-15949176395b?q=80&w=2071&auto=format&fit=crop'
    ],
    isOffer: false,
    durationLabel: '11 DÍAS / 10 NOCHES',
    availableDates: ['5 de Enero 2026', '19 de Enero 2026', '11 de Marzo 2026', '11 de Mayo 2026'],
    includesFlight: true,
    rating: 9.3,
    reviewsCount: 18,
    baseCurrency: 'USD',
    type: 'group'
  },
  {
    id: 'grp-cuba-13d',
    title: 'Cuba Sol y Playa (13 Días)',
    location: 'Cuba',
    price: 2699,
    description: '3 Noches en Habana, 5 en Cayo Santa Maria, 4 en Varadero. Visa incluida. Aéreos con LATAM.',
    images: [
      'https://images.unsplash.com/photo-1503464093195-36b34a0869bd?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585671758509-c88a8047ce40?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: false,
    durationLabel: '13 DÍAS / 12 NOCHES',
    availableDates: ['24 de Febrero 2026', '15 de Marzo 2026', '11 de Abril 2026'],
    includesFlight: true,
    rating: 8.9,
    reviewsCount: 22,
    baseCurrency: 'USD',
    type: 'group'
  },
  {
    id: 'grp-cuba-11d',
    title: 'Cuba Sol y Playa (11 Días)',
    location: 'Cuba',
    price: 2549,
    description: '3 Noches en Habana, 7 Noches en Varadero. Visa incluida. Salida especial Octubre.',
    images: [
      'https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542998966-23573229b673?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: true,
    durationLabel: '11 DÍAS / 10 NOCHES',
    availableDates: ['18 de Octubre 2025'],
    includesFlight: true,
    rating: 8.8,
    reviewsCount: 14,
    baseCurrency: 'USD',
    type: 'group'
  },
  {
    id: 'grp-cancun',
    title: 'Cancún y Playa del Carmen',
    location: 'México',
    price: 3149,
    description: 'Con Stop de Regalo en Panamá. 3 Noches Panamá, 3 Noches Playa del Carmen, 4 Noches Cancún. All Inclusive en playas.',
    images: [
      'https://images.unsplash.com/photo-1563297136-1e031eb09dfb?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=1935&auto=format&fit=crop'
    ],
    isOffer: false,
    durationLabel: '12 DÍAS / 11 NOCHES',
    availableDates: ['10 de Marzo 2026', '22 de Abril 2026', '3 de Junio 2026'],
    includesFlight: true,
    rating: 9.4,
    reviewsCount: 33,
    baseCurrency: 'USD',
    type: 'group'
  },
  // BRASIL
  {
    id: 'grp-rio-buzios-26',
    title: 'Rio de Janeiro y Búzios (2026)',
    location: 'Brasil',
    price: 1779,
    description: '3 Noches en Rio, 7 Noches en Búzios. Incluye Paseo en Barco, City Tour Rio y Búzios. Asistencia al viajero.',
    images: [
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544015759-3660632906b3?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: false,
    durationLabel: '11 DÍAS / 10 NOCHES',
    availableDates: ['5 de Enero 2026', '16 de Febrero 2026', '10 de Marzo 2026'],
    includesFlight: true,
    rating: 9.5,
    reviewsCount: 50,
    baseCurrency: 'USD',
    type: 'group'
  },
  {
    id: 'grp-rio-buzios-25',
    title: 'Rio de Janeiro y Búzios (2025)',
    location: 'Brasil',
    price: 1449,
    description: 'Salidas 2025. 3 Noches en Rio, 7 Noches en Búzios. Excursiones incluidas.',
    images: [
      'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?q=80&w=2026&auto=format&fit=crop'
    ],
    isOffer: true,
    durationLabel: '11 DÍAS / 10 NOCHES',
    availableDates: ['1 de Octubre 2025', '25 de Noviembre 2025'],
    includesFlight: true,
    rating: 9.4,
    reviewsCount: 45,
    baseCurrency: 'USD',
    type: 'group'
  },
  {
    id: 'grp-salvador',
    title: 'Salvador de Bahia - Palladium Imbassai',
    location: 'Brasil',
    price: 2499,
    description: '4 Noches en Grand Palladium Imbassai (All Inclusive) + 3 Noches en Salvador. City Tour histórico incluido.',
    images: [
      'https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574005697380-4965d83c3933?q=80&w=1964&auto=format&fit=crop'
    ],
    isOffer: false,
    durationLabel: '10 DÍAS / 8 NOCHES',
    availableDates: ['20 de Septiembre 2025'],
    includesFlight: true,
    rating: 9.2,
    reviewsCount: 20,
    baseCurrency: 'USD',
    type: 'group'
  },
  // EXOTICOS
  {
    id: 'grp-china-japon',
    title: 'China y Japón: Asia Milenaria',
    location: 'Asia',
    price: 6690,
    description: '4 Beijing, 2 Xian, 3 Shanghai, 1 Osaka, 2 Kyoto, 3 Tokyo. Vuelos con Turkish. Hoteles de lujo.',
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1988&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: false,
    durationLabel: '20 DÍAS / 17 NOCHES',
    availableDates: ['31 de Marzo 2026', '9 de Mayo 2026'],
    includesFlight: true,
    rating: 9.9,
    reviewsCount: 15,
    baseCurrency: 'USD',
    type: 'group'
  },
  {
    id: 'grp-sudafrica',
    title: 'Sudafrica: Aventura Salvaje',
    location: 'África',
    price: 4790,
    description: '12 Noches en hoteles. Excursiones y Safaris incluidos. Coordinador acompañante.',
    images: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2072&auto=format&fit=crop'
    ],
    isOffer: false,
    durationLabel: '14 DÍAS / 12 NOCHES',
    availableDates: ['9 de Enero 2026'],
    includesFlight: true,
    rating: 9.7,
    reviewsCount: 10,
    baseCurrency: 'USD',
    type: 'group'
  },
  {
    id: 'grp-india-dubai',
    title: 'India y Dubai: Mística y Modernidad',
    location: 'Asia / Medio Oriente',
    price: 4990,
    description: '4 Noches en India Hoteles 4*, 4 Noches en Dubai Hoteles 4*. Vuelos con Emirates.',
    images: [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512453979798-5ea932a88406?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: false,
    durationLabel: '13 DÍAS / 11 NOCHES',
    availableDates: ['10 de Noviembre 2025', '17 de Enero 2026'],
    includesFlight: true,
    rating: 9.6,
    reviewsCount: 22,
    baseCurrency: 'USD',
    type: 'group'
  },
  {
    id: 'grp-dubai-fin-ano',
    title: 'Dubai y Abu Dhabi: Fin de Año',
    location: 'Emiratos Árabes',
    price: 3949,
    description: 'Salida Especial Fin de Año. 7 Noches Dubai, 3 Abu Dhabi. Safari 4x4, Cena Dhow Cruise.',
    images: [
      'https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1974&auto=format&fit=crop'
    ],
    isOffer: true,
    specialLabel: 'AÑO NUEVO',
    durationLabel: '12 DÍAS / 10 NOCHES',
    availableDates: ['27 de Diciembre 2025'],
    includesFlight: true,
    rating: 9.8,
    reviewsCount: 18,
    baseCurrency: 'USD',
    type: 'group'
  },
  {
    id: 'grp-egipto-dubai',
    title: 'Egipto y Dubai',
    location: 'Medio Oriente',
    price: 4299,
    description: '4 Noches Dubai, 4 Noches Cairo, 4 Noches Crucero por Egipto. Vuelos con Emirates.',
    images: [
      'https://images.unsplash.com/photo-1539650116455-8efdbec6431a?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop'
    ],
    isOffer: false,
    durationLabel: '14 DÍAS / 12 NOCHES',
    availableDates: ['20 de Octubre 2025', '12 de Enero 2026'],
    includesFlight: true,
    rating: 9.5,
    reviewsCount: 40,
    baseCurrency: 'USD',
    type: 'group'
  },
  {
    id: 'grp-dubai-emiratos',
    title: 'Lo Mejor de los Emiratos',
    location: 'Emiratos Árabes',
    price: 2999,
    description: '7 Noches Dubai, 3 Noches Abu Dhabi. Múltiples salidas todo el año. Bus hasta Ezeiza.',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea932a88406?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1974&auto=format&fit=crop'
    ],
    isOffer: true,
    durationLabel: '12 DÍAS / 10 NOCHES',
    availableDates: ['Sep/Oct/Nov 2025', 'Ene/Feb/Mar/Abr/May 2026'],
    includesFlight: true,
    rating: 9.4,
    reviewsCount: 60,
    baseCurrency: 'USD',
    type: 'group'
  },
  // AMERICAS
  {
    id: 'grp-costa-oeste',
    title: 'Costa Oeste de Estados Unidos',
    location: 'USA',
    price: 4699,
    description: 'Los Angeles, Las Vegas, Yosemite, San Francisco, Cañón del Colorado. Salida desde tu ciudad.',
    images: [
      'https://images.unsplash.com/photo-1453974336165-b5c58464f1ed?q=80&w=2073&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1474433188271-d3f339f41911?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: false,
    durationLabel: 'Salidas 2026',
    availableDates: ['3 de Abril 2026', '1 de Mayo 2026'],
    includesFlight: true,
    rating: 9.6,
    reviewsCount: 20,
    baseCurrency: 'USD',
    type: 'group'
  },
  {
    id: 'grp-costa-rica',
    title: 'Costa Rica Inolvidable',
    location: 'Costa Rica',
    price: 3599,
    description: 'Encanto Natural. San José, Tortuguero, La Fortuna, Tamarindo. Naturaleza pura.',
    images: [
      'https://images.unsplash.com/photo-1518182170546-0766aaef3129?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596237563267-8453e5c68430?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: false,
    durationLabel: '11 DÍAS / 10 NOCHES',
    availableDates: ['12 de Marzo 2026', '9 de Mayo 2026'],
    includesFlight: true,
    rating: 9.3,
    reviewsCount: 15,
    baseCurrency: 'USD',
    type: 'group'
  },
  {
    id: 'grp-peru-andina',
    title: 'Perú con Machu Picchu: Mística Andina',
    location: 'Perú',
    price: 2649,
    description: 'Lima, Cusco, Valle Sagrado, Machu Picchu. Hoteles con desayuno y excursiones.',
    images: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop'
    ],
    isOffer: true,
    durationLabel: '10 DÍAS / 8 NOCHES',
    availableDates: ['Oct/Nov 2025', 'Ene-Jul 2026'],
    includesFlight: true,
    rating: 9.7,
    reviewsCount: 100,
    baseCurrency: 'USD',
    type: 'group'
  }
];

// --- HOTELES (Precios en USD) ---
export const INITIAL_HOTELS: Hotel[] = [
  {
    id: 'htl-cris',
    title: 'Cris Hotel',
    location: 'Praia da Joaquina, Florianópolis',
    pricePerNight: 135, // USD
    description: 'Ubicado directamente sobre las arenas blancas de la Playa de Joaquina. El Cris Hotel ofrece habitaciones con balcón privado y vistas al mar o las dunas. Es el lugar ideal para amantes del surf y familias que buscan estar a pasos del agua. Cuenta con un desayuno buffet variado servido en un salón con vista panorámica.',
    images: [
        'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1932&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop'
    ],
    stars: 3,
    amenities: [
        'Frente a la playa',
        'Desayuno Incluido',
        'Wifi Gratis',
        'Habitaciones con Balcón',
        'Aire Acondicionado',
        'Estacionamiento',
        'Recepción 24hs'
    ],
    isOffer: true,
    discount: 5,
    rating: 8.8,
    reviewsCount: 1400,
    lat: -27.610,
    lng: -48.450,
    baseCurrency: 'USD',
    type: 'hotel'
  },
  {
    id: 'htl-porto-sol',
    title: 'Hotel Porto Sol Beach',
    location: 'Ingleses, Florianópolis',
    pricePerNight: 160, // USD
    description: 'El Hotel Porto Sol Beach ofrece una experiencia inigualable frente al mar en la playa de Ingleses. Este hotel de 4 estrellas cuenta con el reconocido restaurante Maricota, que sirve platos regionales e internacionales. Los huéspedes pueden disfrutar de una piscina al aire libre, cancha de tenis y una sala de juegos. Las habitaciones son amplias, luminosas y disponen de aire acondicionado, TV por cable, caja fuerte y baño privado. Además, el hotel ofrece servicio de playa con sombrillas y reposeras para su total comodidad.',
    images: [
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1563784462386-044fd95e9852?q=80&w=2070&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=2070&auto=format&fit=crop' 
    ],
    stars: 4,
    amenities: [
        'Frente a la playa', 
        'Piscina al aire libre', 
        'Restaurante Maricota', 
        'Cancha de Tenis', 
        'Sala de Juegos', 
        'Desayuno Buffet', 
        'Wifi Gratis',
        'Servicio de Playa',
        'Recepción 24 horas',
        'Bar',
        'Aire Acondicionado',
        'Estacionamiento (con cargo)'
    ],
    isOffer: true,
    discount: 10,
    specialLabel: 'OFERTA VERANO',
    rating: 8.5,
    reviewsCount: 950,
    lat: -27.427,
    lng: -48.396,
    baseCurrency: 'USD',
    type: 'hotel'
  },
  {
    id: 'htl-hilton-ba',
    title: 'Hilton Buenos Aires',
    location: 'Puerto Madero, Argentina',
    pricePerNight: 210, // USD
    description: 'Lujo contemporáneo en Puerto Madero. Piscina en la terraza con vista al la ciudad, gimnasio de última generación y acceso al Lounge Ejecutivo.',
    images: [
        'https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop'
    ],
    stars: 5,
    amenities: ['Piscina Rooftop', 'Spa', 'Executive Lounge', 'Pet Friendly'],
    isOffer: true,
    discount: 25,
    rating: 9.1,
    reviewsCount: 4500,
    lat: -34.610,
    lng: -58.365,
    baseCurrency: 'USD',
    type: 'hotel'
  },
  {
    id: 'htl-sheraton-rio',
    title: 'Sheraton Grand Rio Hotel & Resort',
    location: 'Leblon, Río de Janeiro',
    pricePerNight: 270, // USD
    description: 'El único resort frente al mar en la ciudad con acceso directo a la playa. Jardines tropicales, canchas de tenis y spa completo.',
    images: [
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1949&auto=format&fit=crop'
    ],
    stars: 5,
    amenities: ['Playa Privada', 'Tenis', '3 Piscinas', 'Kids Club'],
    isOffer: false,
    rating: 8.8,
    reviewsCount: 3200,
    lat: -22.990,
    lng: -43.230,
    baseCurrency: 'USD',
    type: 'hotel'
  },
  {
    id: 'htl-majestic',
    title: 'Majestic Palace Hotel',
    location: 'Florianópolis, Centro',
    pricePerNight: 150, // USD
    description: 'Ubicado en la Avenida Beira Mar Norte con vistas impresionantes a la bahía. Habitaciones de lujo, piscina y spa. Ideal para negocios y placer.',
    images: [
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop'
    ],
    stars: 5,
    amenities: ['Vista al Mar', 'Spa', 'Restaurante Gourmet', 'Parking'],
    isOffer: true,
    discount: 20,
    rating: 9.0,
    reviewsCount: 1800,
    lat: -27.585,
    lng: -48.545,
    baseCurrency: 'USD',
    type: 'hotel'
  },
  {
    id: 'htl-grand-palladium',
    title: 'Grand Palladium Imbassaí',
    location: 'Bahía, Brasil',
    pricePerNight: 380, // USD
    description: 'Resort All Inclusive de lujo dentro de una reserva natural. Suites amplias, gastronomía internacional y entretenimiento de primer nivel.',
    images: [
        'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop'
    ],
    stars: 5,
    amenities: ['All Inclusive', 'Playa', 'Spa Zentropia', 'Show Nocturno'],
    isOffer: true,
    rating: 9.3,
    reviewsCount: 5100,
    lat: -12.490,
    lng: -38.000,
    baseCurrency: 'USD',
    type: 'hotel'
  }
];

// --- DEPARTAMENTOS / ALQUILERES (Precios en USD) ---
export const INITIAL_RENTALS: Apartment[] = [
  {
    id: 'apt-miami-beach',
    title: 'Apartamento de Lujo en Collins Ave',
    location: 'Miami Beach, USA',
    pricePerNight: 180, // USD
    description: 'Moderno apartamento con vista al océano. Acceso directo a la playa, piscina del edificio y valet parking incluido. A minutos de Lincoln Road.',
    images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=2070&auto=format&fit=crop'
    ],
    bedrooms: 2,
    maxGuests: 4,
    amenities: ['Vista al Mar', 'Piscina', 'Wifi Alta Velocidad', 'Cocina Completa'],
    isOffer: true,
    discount: 10,
    rating: 9.6,
    reviewsCount: 120,
    lat: 25.790,
    lng: -80.130,
    baseCurrency: 'USD',
    type: 'rental'
  },
  {
    id: 'apt-recoleta',
    title: 'Penthouse Clásico en Recoleta',
    location: 'Buenos Aires, Argentina',
    pricePerNight: 80, // USD
    description: 'Elegante penthouse cerca del Cementerio de Recoleta. Terraza privada con parrilla. Decoración de estilo francés, pisos de roble.',
    images: [
        'https://images.unsplash.com/photo-1502005229766-3c8ef95a5d78?q=80&w=2074&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop'
    ],
    bedrooms: 3,
    maxGuests: 6,
    amenities: ['Terraza', 'Parrilla', 'Aire Acondicionado', 'Lavavajillas'],
    isOffer: false,
    rating: 9.4,
    reviewsCount: 85,
    lat: -34.588,
    lng: -58.390,
    baseCurrency: 'USD',
    type: 'rental'
  },
  {
    id: 'apt-jurere',
    title: 'Casa en Jurerê Internacional',
    location: 'Florianópolis, Brasil',
    pricePerNight: 290, // USD
    description: 'Mansión a pasos del Open Shopping. 4 suites, piscina privada y jardín parquizado. Seguridad 24hs. La mejor zona de la isla.',
    images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop'
    ],
    bedrooms: 4,
    maxGuests: 10,
    amenities: ['Piscina Privada', 'Jardín', 'Seguridad', 'Barbacoa'],
    isOffer: true,
    rating: 9.9,
    reviewsCount: 45,
    lat: -27.430,
    lng: -48.490,
    baseCurrency: 'USD',
    type: 'rental'
  }
];

// --- EXCURSIONES (Precios en USD) ---
export const INITIAL_EXCURSIONS: Excursion[] = [
  {
    id: 'exc-disney',
    title: 'Entradas Disney Magic Kingdom',
    location: 'Orlando, USA',
    price: 150, // USD
    description: 'Ticket de 1 día para Magic Kingdom Park. Disfruta de las atracciones clásicas, el desfile y los fuegos artificiales frente al castillo.',
    images: [
        'https://images.unsplash.com/photo-1534951474654-88451907c2e8?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1597466599360-3b9775841aec?q=80&w=2000&auto=format&fit=crop'
    ],
    isOffer: false,
    duration: 'Full Day',
    availableDates: ['Todos los días'],
    rating: 9.8,
    reviewsCount: 15000,
    baseCurrency: 'USD',
    type: 'excursion'
  },
  {
    id: 'exc-cristo',
    title: 'Cristo Redentor + Pan de Azúcar',
    location: 'Río de Janeiro, Brasil',
    price: 70, // USD
    description: 'El tour definitivo de Río. Sube al Corcovado en tren y toma el teleférico del Pan de Azúcar. Almuerzo buffet incluido.',
    images: [
        'https://images.unsplash.com/photo-1598556776374-2c5eb6046df1?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: true,
    discount: 10,
    duration: '8 horas',
    availableDates: ['Lunes a Sábado'],
    rating: 9.7,
    reviewsCount: 4200,
    baseCurrency: 'USD',
    type: 'excursion'
  },
  {
    id: 'exc-tulum',
    title: 'Ruinas de Tulum y Cenotes',
    location: 'Riviera Maya, México',
    price: 90, // USD
    description: 'Historia y naturaleza. Visita guiada a la zona arqueológica de Tulum frente al mar y nado en un cenote sagrado subterráneo.',
    images: [
        'https://images.unsplash.com/photo-1504730655509-52e032298782?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1563297136-1e031eb09dfb?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: true,
    discount: 15,
    duration: 'Full Day',
    availableDates: ['Martes y Jueves'],
    rating: 9.5,
    reviewsCount: 1800,
    baseCurrency: 'USD',
    type: 'excursion'
  }
];

export const INITIAL_INSTALLMENT_TRIPS: InstallmentTrip[] = [
    {
        id: 'inst-disney-26',
        title: 'Disney 15 Años - Salida Grupal',
        location: 'Orlando, USA',
        totalPrice: 3800, // USD
        description: 'El viaje de 15 soñado. Parques Disney y Universal, fiestas exclusivas, pensión completa y acompañamiento permanente. Salida Febrero y Julio 2027.',
        images: [
            'https://images.unsplash.com/photo-1534951474654-88451907c2e8?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1575089776834-8be34696ffb9?q=80&w=1974&auto=format&fit=crop'
        ],
        departureDate: '2027-02-15',
        isOffer: true,
        baseCurrency: 'USD',
        type: 'installment'
    },
    {
        id: 'inst-caribe-26',
        title: 'Punta Cana Familiar 2026',
        location: 'República Dominicana',
        totalPrice: 2350, // USD
        description: 'Enero en el Caribe. All Inclusive 5 estrellas Riu Bambu. Vuelos directos. Ideal para congelar precio en pesos y pagar mes a mes.',
        images: [
            'https://images.unsplash.com/photo-1614350280436-15949176395b?q=80&w=2071&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=1935&auto=format&fit=crop'
        ],
        departureDate: '2026-01-15',
        isOffer: true,
        baseCurrency: 'USD',
        type: 'installment'
    }
];

// --- MUNDIAL 2026 (BASE CURRENCY USD) ---
export const INITIAL_WORLDCUP_TRIPS: WorldCupTrip[] = [
    {
        id: 'wc-arg-usa',
        title: 'Paquete Argentina - Mundial 2026',
        location: 'USA - México - Canadá',
        totalPrice: 8500, // USD
        description: '¡Seguí a la Scaloneta en la defensa del título! Incluye vuelos desde Buenos Aires, traslados, 15 noches de alojamiento y entradas garantizadas para fase de grupos.',
        images: [
            'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1931&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=2070&auto=format&fit=crop'
        ],
        departureDate: '2026-06-10',
        originCountry: 'Salida desde Argentina',
        isOffer: true,
        baseCurrency: 'USD',
        type: 'worldcup'
    },
    {
        id: 'wc-bra-usa',
        title: 'Pacote Brasil - Copa 2026',
        location: 'USA - México - Canadá',
        totalPrice: 8800, // USD
        description: 'Acompanhe a seleção brasileira rumo ao Hexa! Voos saindo de São Paulo/Rio, hotéis categoria 4 estrelas e ingressos para os jogos.',
        images: [
            'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=2070&auto=format&fit=crop'
        ],
        departureDate: '2026-06-10',
        originCountry: 'Salida desde Brasil',
        isOffer: true,
        baseCurrency: 'USD',
        type: 'worldcup'
    },
    {
        id: 'wc-col-usa',
        title: 'Paquete Colombia - Mundial 2026',
        location: 'USA - México - Canadá',
        totalPrice: 7800, // USD
        description: '¡Apoya a la Tricolor en el Mundial! Vuelos directos desde Bogotá, traslados, alojamiento y entradas para seguir a la selección.',
        images: [
            'https://images.unsplash.com/photo-1518605348400-43ded60bdf73?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1628102491629-778571d893a3?q=80&w=2000&auto=format&fit=crop'
        ],
        departureDate: '2026-06-10',
        originCountry: 'Salida desde Colombia',
        isOffer: true,
        baseCurrency: 'USD',
        type: 'worldcup'
    },
    {
        id: 'wc-bol-usa',
        title: 'Paquete Bolivia - Mundial 2026',
        location: 'USA - México - Canadá',
        totalPrice: 7500, // USD
        description: 'Vive la emoción del mundial. Salida desde Santa Cruz de la Sierra. Hotelería seleccionada, traslados y entradas.',
        images: [
            'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2070&auto=format&fit=crop'
        ],
        departureDate: '2026-06-10',
        originCountry: 'Salida desde Bolivia',
        isOffer: false,
        baseCurrency: 'USD',
        type: 'worldcup'
    },
    {
        id: 'wc-ecu-usa',
        title: 'Paquete Ecuador - Mundial 2026',
        location: 'USA - México - Canadá',
        totalPrice: 7700, // USD
        description: 'Alienta a la Tri. Paquete completo con vuelos desde Quito/Guayaquil, alojamiento 4 estrellas y tickets oficiales.',
        images: [
            'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2070&auto=format&fit=crop'
        ],
        departureDate: '2026-06-10',
        originCountry: 'Salida desde Ecuador',
        isOffer: false,
        baseCurrency: 'USD',
        type: 'worldcup'
    },
    {
        id: 'wc-uru-usa',
        title: 'Paquete Uruguay - Mundial 2026',
        location: 'USA - México - Canadá',
        totalPrice: 8500, // USD
        description: 'La Celeste te necesita. Paquete completo con salida desde Montevideo. Pagá en cuotas fijas en dólares.',
        images: [
            'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2005&auto=format&fit=crop'
        ],
        departureDate: '2026-06-10',
        originCountry: 'Salida desde Uruguay',
        isOffer: false,
        baseCurrency: 'USD',
        type: 'worldcup'
    }
];
