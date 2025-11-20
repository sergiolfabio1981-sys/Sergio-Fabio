import { Trip } from './types';

export const ADMIN_EMAIL = "sergiolfabio1981@gmail.com";
export const ADMIN_PASS = "Colo1981";

// Helper to generate requested dates for the example
const DATES_JAN_2026_FRIDAYS = [
  "Viernes 02 de Enero, 2026",
  "Viernes 09 de Enero, 2026",
  "Viernes 16 de Enero, 2026",
  "Viernes 23 de Enero, 2026",
  "Viernes 30 de Enero, 2026"
];

const DATES_FEB_2026_FRIDAYS = [
  "Viernes 06 de Febrero, 2026",
  "Viernes 13 de Febrero, 2026",
  "Viernes 20 de Febrero, 2026",
  "Viernes 27 de Febrero, 2026"
];

const DATES_MAR_2026_SUNDAYS = [
  "Domingo 01 de Marzo, 2026",
  "Domingo 08 de Marzo, 2026",
  "Domingo 15 de Marzo, 2026",
  "Domingo 22 de Marzo, 2026",
  "Domingo 29 de Marzo, 2026"
];

const ALL_EXAMPLE_DATES = [
  ...DATES_JAN_2026_FRIDAYS,
  ...DATES_FEB_2026_FRIDAYS,
  ...DATES_MAR_2026_SUNDAYS
];

export const INITIAL_TRIPS: Trip[] = [
  // OFERTAS DESTACADAS EXISTENTES
  {
    id: '1',
    title: 'Florianópolis Mágico',
    location: 'Florianópolis, Brasil',
    price: 850,
    description: 'Disfruta de las playas más hermosas del sur de Brasil. Un viaje inolvidable con aguas cristalinas y vida nocturna vibrante.',
    images: [
      'https://picsum.photos/seed/floripa1/800/600',
      'https://picsum.photos/seed/floripa2/800/600',
      'https://picsum.photos/seed/floripa3/800/600'
    ],
    isOffer: true,
    offerExpiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    availableDates: ALL_EXAMPLE_DATES
  },
  {
    id: '2',
    title: 'Rio de Janeiro Carnaval',
    location: 'Rio de Janeiro, Brasil',
    price: 1200,
    description: 'Vive la experiencia del Carnaval en la ciudad maravillosa. Copacabana, Cristo Redentor y mucho samba.',
    images: [
      'https://picsum.photos/seed/rio1/800/600',
      'https://picsum.photos/seed/rio2/800/600',
      'https://picsum.photos/seed/rio3/800/600'
    ],
    isOffer: true,
    offerExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    availableDates: ALL_EXAMPLE_DATES
  },
  // NUEVAS OFERTAS (4)
  {
    id: '6',
    title: 'Natal & Dunas',
    location: 'Rio Grande do Norte, Brasil',
    price: 1150,
    description: 'Conocida como la Ciudad del Sol. Paseos en buggy por las dunas de Genipabu y playas interminables.',
    images: [
      'https://picsum.photos/seed/natal1/800/600',
      'https://picsum.photos/seed/natal2/800/600'
    ],
    isOffer: true,
    offerExpiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    availableDates: ALL_EXAMPLE_DATES
  },
  {
    id: '7',
    title: 'Caribe Brasileño: Maceió',
    location: 'Alagoas, Brasil',
    price: 1080,
    description: 'Aguas verdes esmeralda, piscinas naturales en Pajuçara y una costanera imperdible.',
    images: [
      'https://picsum.photos/seed/maceio1/800/600',
      'https://picsum.photos/seed/maceio2/800/600'
    ],
    isOffer: true,
    offerExpiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    availableDates: ALL_EXAMPLE_DATES
  },
  {
    id: '8',
    title: 'Jericoacoara Exclusivo',
    location: 'Ceará, Brasil',
    price: 1350,
    description: 'Un paraíso entre dunas y lagunas. Disfruta del atardecer y la famosa Pedra Furada.',
    images: [
      'https://picsum.photos/seed/jeri1/800/600',
      'https://picsum.photos/seed/jeri2/800/600'
    ],
    isOffer: true,
    offerExpiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    availableDates: ALL_EXAMPLE_DATES
  },
  {
    id: '9',
    title: 'Buceo en Arraial do Cabo',
    location: 'Rio de Janeiro, Brasil',
    price: 920,
    description: 'Conocida como la capital del buceo. Playas de arena blanca y aguas turquesas impresionantes.',
    images: [
      'https://picsum.photos/seed/arraial1/800/600',
      'https://picsum.photos/seed/arraial2/800/600'
    ],
    isOffer: true,
    offerExpiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    availableDates: ALL_EXAMPLE_DATES
  },

  // DESTINOS REGULARES (Existentes + Nuevos)
  {
    id: '3',
    title: 'Relax en Buzios',
    location: 'Buzios, Brasil',
    price: 950,
    description: 'Escápate al paraíso. Buzios ofrece calma, sofisticación y playas tranquilas para toda la familia.',
    images: [
      'https://picsum.photos/seed/buzios1/800/600',
      'https://picsum.photos/seed/buzios2/800/600',
      'https://picsum.photos/seed/buzios3/800/600'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES
  },
  {
    id: '4',
    title: 'Salvador de Bahía Cultural',
    location: 'Salvador, Brasil',
    price: 1100,
    description: 'Sumérgete en la cultura afrobrasileña, el Pelourinho y las playas del nordeste.',
    images: [
      'https://picsum.photos/seed/salvador1/800/600',
      'https://picsum.photos/seed/salvador2/800/600'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES
  },
  {
    id: '5',
    title: 'Porto Galinhas',
    location: 'Pernambuco, Brasil',
    price: 1050,
    description: 'Piscinas naturales, peces de colores y sol eterno. El destino ideal para relajarse.',
    images: [
      'https://picsum.photos/seed/porto1/800/600',
      'https://picsum.photos/seed/porto2/800/600',
      'https://picsum.photos/seed/porto3/800/600'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES
  },
  // NUEVOS DESTINOS REGULARES (8)
  {
    id: '10',
    title: 'Fernando de Noronha',
    location: 'Pernambuco, Brasil',
    price: 2500,
    description: 'El archipiélago más exclusivo de Brasil. Santuario ecológico, delfines y playas vírgenes.',
    images: [
      'https://picsum.photos/seed/noronha1/800/600',
      'https://picsum.photos/seed/noronha2/800/600'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES
  },
  {
    id: '11',
    title: 'Recife & Olinda',
    location: 'Pernambuco, Brasil',
    price: 980,
    description: 'Historia colonial, carnavales callejeros y la belleza de la Venecia brasileña.',
    images: [
      'https://picsum.photos/seed/recife1/800/600',
      'https://picsum.photos/seed/recife2/800/600'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES
  },
  {
    id: '12',
    title: 'Ilha Grande Aventura',
    location: 'Rio de Janeiro, Brasil',
    price: 890,
    description: 'Sin autos, solo senderos, cascadas y playas de ensueño como Lopes Mendes.',
    images: [
      'https://picsum.photos/seed/ilhagrande1/800/600',
      'https://picsum.photos/seed/ilhagrande2/800/600'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES
  },
  {
    id: '13',
    title: 'Morro de São Paulo',
    location: 'Bahía, Brasil',
    price: 1020,
    description: 'Fiesta y relax en una isla paradisíaca. Tirolesa, playas numeradas y buena gastronomía.',
    images: [
      'https://picsum.photos/seed/morro1/800/600',
      'https://picsum.photos/seed/morro2/800/600'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES
  },
  {
    id: '14',
    title: 'Praia do Forte Eco',
    location: 'Bahía, Brasil',
    price: 1150,
    description: 'Proyecto Tamar (tortugas marinas), resorts de lujo y una villa encantadora.',
    images: [
      'https://picsum.photos/seed/praiaforte1/800/600',
      'https://picsum.photos/seed/praiaforte2/800/600'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES
  },
  {
    id: '15',
    title: 'Canoa Quebrada',
    location: 'Ceará, Brasil',
    price: 940,
    description: 'Famosa por sus acantilados rojos y el símbolo de la luna y la estrella. Vuelos en parapente.',
    images: [
      'https://picsum.photos/seed/canoa1/800/600',
      'https://picsum.photos/seed/canoa2/800/600'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES
  },
  {
    id: '16',
    title: 'Maragogi',
    location: 'Alagoas, Brasil',
    price: 1060,
    description: 'Conocida por sus Galés (piscinas naturales) en alta mar. Un espectáculo visual.',
    images: [
      'https://picsum.photos/seed/maragogi1/800/600',
      'https://picsum.photos/seed/maragogi2/800/600'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES
  },
  {
    id: '17',
    title: 'Itacaré Surf & Selva',
    location: 'Bahía, Brasil',
    price: 990,
    description: 'Donde la selva atlántica se encuentra con el mar. Ideal para surfistas y amantes de la naturaleza.',
    images: [
      'https://picsum.photos/seed/itacare1/800/600',
      'https://picsum.photos/seed/itacare2/800/600'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES
  }
];