
import { Trip, Apartment, Excursion, Hotel, InstallmentTrip } from './types';

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
  {
    id: 'world-1',
    title: 'París & Londres',
    location: 'Europa',
    price: 3200000,
    description: 'El tour clásico europeo. Visita la Torre Eiffel, el Museo del Louvre, el Big Ben y el Palacio de Buckingham. Incluye traslados en tren Eurostar.',
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop', 
    ],
    isOffer: true,
    discount: 15, // 15% OFF Example
    offerExpiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    availableDates: ALL_EXAMPLE_DATES,
    type: 'trip'
  },
  {
    id: 'world-2',
    title: 'Caribe: Punta Cana',
    location: 'República Dominicana',
    price: 1450000,
    description: 'Relájate en las playas de Bávaro con un sistema All Inclusive de lujo. Bebidas, comidas y entretenimiento incluidos las 24 horas.',
    images: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop'
    ],
    isOffer: true,
    offerExpiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    availableDates: ALL_EXAMPLE_DATES,
    type: 'trip'
  },
  {
    id: '1',
    title: 'Florianópolis Mágico',
    location: 'Florianópolis, Brasil',
    price: 850000,
    description: 'Disfruta de las playas más hermosas del sur de Brasil. Un viaje inolvidable con aguas cristalinas y vida nocturna vibrante.',
    images: [
      'https://picsum.photos/seed/floripa1/800/600',
      'https://picsum.photos/seed/floripa2/800/600',
      'https://picsum.photos/seed/floripa3/800/600'
    ],
    isOffer: true,
    offerExpiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    availableDates: ALL_EXAMPLE_DATES,
    type: 'trip'
  },
  {
    id: 'world-3',
    title: 'Orlando & Disney',
    location: 'Florida, USA',
    price: 2100000,
    description: 'La magia te espera. Paquete completo con entradas a los 4 parques principales de Disney World y 2 de Universal Studios. Ideal para familias.',
    images: [
      'https://images.unsplash.com/photo-1597466599360-3b9775841aec?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534951474654-88451907c2e8?q=80&w=1974&auto=format&fit=crop'
    ],
    isOffer: true,
    offerExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    availableDates: ALL_EXAMPLE_DATES,
    type: 'trip'
  },
  {
    id: '2',
    title: 'Rio de Janeiro Carnaval',
    location: 'Rio de Janeiro, Brasil',
    price: 1200000,
    description: 'Vive la experiencia del Carnaval en la ciudad maravillosa. Copacabana, Cristo Redentor y mucho samba.',
    images: [
      'https://picsum.photos/seed/rio1/800/600',
      'https://picsum.photos/seed/rio2/800/600',
      'https://picsum.photos/seed/rio3/800/600'
    ],
    isOffer: true,
    offerExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), 
    availableDates: ALL_EXAMPLE_DATES,
    type: 'trip'
  },
  {
    id: 'world-4',
    title: 'Cancún All Inclusive',
    location: 'México',
    price: 1600000,
    description: 'Mar turquesa, ruinas mayas en Tulum y Chichén Itzá. Disfruta de la mejor hotelería en la zona hotelera de Cancún.',
    images: [
      'https://images.unsplash.com/photo-1552074291-ad4dfdc86026?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544144433-d50aff500b91?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: true,
    offerExpiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    availableDates: ALL_EXAMPLE_DATES,
    type: 'trip'
  },
  {
    id: 'world-5',
    title: 'Roma Eterna',
    location: 'Italia',
    price: 2800000,
    description: 'Historia pura en cada esquina. Coliseo, Vaticano y la mejor pasta del mundo. Un viaje cultural y gastronómico.',
    images: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=2076&auto=format&fit=crop'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES,
    type: 'trip'
  },
  {
    id: '3',
    title: 'Relax en Buzios',
    location: 'Buzios, Brasil',
    price: 950000,
    description: 'Escápate al paraíso. Buzios ofrece calma, sofisticación y playas tranquilas para toda la familia.',
    images: [
      'https://picsum.photos/seed/buzios1/800/600',
      'https://picsum.photos/seed/buzios2/800/600',
      'https://picsum.photos/seed/buzios3/800/600'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES,
    type: 'trip'
  },
  {
    id: 'world-6',
    title: 'Miami Shopping & Beach',
    location: 'Florida, USA',
    price: 1800000,
    description: 'South Beach, Ocean Drive y las mejores compras en Sawgrass Mills. Combinación perfecta de playa y ciudad.',
    images: [
      'https://images.unsplash.com/photo-1535498730771-e735b998cd64?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?q=80&w=1974&auto=format&fit=crop'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES,
    type: 'trip'
  },
  {
    id: '4',
    title: 'Salvador de Bahía Cultural',
    location: 'Salvador, Brasil',
    price: 1100000,
    description: 'Sumérgete en la cultura afrobrasileña, el Pelourinho y las playas del nordeste.',
    images: [
      'https://picsum.photos/seed/salvador1/800/600',
      'https://picsum.photos/seed/salvador2/800/600'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES,
    type: 'trip'
  },
  {
    id: '6',
    title: 'Natal & Dunas',
    location: 'Rio Grande do Norte, Brasil',
    price: 1150000,
    description: 'Conocida como la Ciudad del Sol. Paseos en buggy por las dunas de Genipabu y playas interminables.',
    images: [
      'https://picsum.photos/seed/natal1/800/600',
      'https://picsum.photos/seed/natal2/800/600'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES,
    type: 'trip'
  },
  {
    id: '7',
    title: 'Caribe Brasileño: Maceió',
    location: 'Alagoas, Brasil',
    price: 1080000,
    description: 'Aguas verdes esmeralda, piscinas naturales en Pajuçara y una costanera imperdible.',
    images: [
      'https://picsum.photos/seed/maceio1/800/600',
      'https://picsum.photos/seed/maceio2/800/600'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES,
    type: 'trip'
  },
  {
    id: '8',
    title: 'Jericoacoara Exclusivo',
    location: 'Ceará, Brasil',
    price: 1350000,
    description: 'Un paraíso entre dunas y lagunas. Disfruta del atardecer y la famosa Pedra Furada.',
    images: [
      'https://picsum.photos/seed/jeri1/800/600',
      'https://picsum.photos/seed/jeri2/800/600'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES,
    type: 'trip'
  },
  {
    id: '10',
    title: 'Fernando de Noronha',
    location: 'Pernambuco, Brasil',
    price: 2500000,
    description: 'El archipiélago más exclusivo de Brasil. Santuario ecológico, delfines y playas vírgenes.',
    images: [
      'https://picsum.photos/seed/noronha1/800/600',
      'https://picsum.photos/seed/noronha2/800/600'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES,
    type: 'trip'
  },
  {
    id: '12',
    title: 'Ilha Grande Aventura',
    location: 'Rio de Janeiro, Brasil',
    price: 890000,
    description: 'Sin autos, solo senderos, cascadas y playas de ensueño como Lopes Mendes.',
    images: [
      'https://picsum.photos/seed/ilhagrande1/800/600',
      'https://picsum.photos/seed/ilhagrande2/800/600'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES,
    type: 'trip'
  },
  {
    id: '13',
    title: 'Morro de São Paulo',
    location: 'Bahía, Brasil',
    price: 1020000,
    description: 'Fiesta y relax en una isla paradisíaca. Tirolesa, playas numeradas y buena gastronomía.',
    images: [
      'https://picsum.photos/seed/morro1/800/600',
      'https://picsum.photos/seed/morro2/800/600'
    ],
    isOffer: false,
    availableDates: ALL_EXAMPLE_DATES,
    type: 'trip'
  }
];

export const INITIAL_RENTALS: Apartment[] = [
  {
    id: 'apt-1',
    title: 'Penthouse Jurerê Internacional',
    location: 'Florianópolis, Brasil',
    pricePerNight: 350000,
    description: 'Lujoso ático frente al mar en la zona más exclusiva de Floripa. Cuenta con terraza privada, jacuzzi y vista panorámica al océano. A pasos de los mejores Beach Clubs.',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512918760532-3edbed71741b?q=80&w=2076&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=2071&auto=format&fit=crop'
    ],
    bedrooms: 3,
    maxGuests: 6,
    amenities: ['Wifi Alta Velocidad', 'Aire Acondicionado', 'Jacuzzi Privado', 'Seguridad 24hs', 'Estacionamiento'],
    isOffer: true,
    discount: 10,
    offerExpiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    lat: -27.4361,
    lng: -48.4972,
    type: 'rental'
  },
  {
    id: 'apt-booking-1',
    title: 'Residencial Ilha da Galé',
    location: 'Canasvieiras, Florianópolis',
    pricePerNight: 120000,
    description: 'Apartamentos modernos a solo 50 metros del mar en Canasvieiras. Ideal para familias, cerca de centros comerciales y restaurantes.',
    images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop'
    ],
    bedrooms: 2,
    maxGuests: 5,
    amenities: ['Cocina Completa', 'Wifi Gratis', 'Balcón con Parrilla', 'Aire Acondicionado'],
    isOffer: true,
    offerExpiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    lat: -27.4290,
    lng: -48.4620,
    type: 'rental'
  },
  {
    id: 'apt-booking-2',
    title: 'Solar Beach Barra da Lagoa',
    location: 'Barra da Lagoa, Florianópolis',
    pricePerNight: 95000,
    description: 'Relájate frente al canal de Barra da Lagoa. Departamentos tipo cabaña con acceso directo al agua. Ambiente tranquilo y natural.',
    images: [
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1974&auto=format&fit=crop'
    ],
    bedrooms: 1,
    maxGuests: 3,
    amenities: ['Vista al Canal', 'Wifi', 'Estacionamiento', 'Jardín'],
    isOffer: false,
    lat: -27.5735,
    lng: -48.4214,
    type: 'rental'
  },
  {
    id: 'apt-2',
    title: 'Loft Moderno en Copacabana',
    location: 'Rio de Janeiro, Brasil',
    pricePerNight: 280000,
    description: 'Diseño minimalista y ubicación inmejorable. A solo una cuadra de la playa y cerca de restaurantes y bares. Ventanales de piso a techo con vista parcial al mar.',
    images: [
      'https://images.unsplash.com/photo-1502005229766-3c622724c071?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556020685-ae79c95eda3d?q=80&w=1974&auto=format&fit=crop'
    ],
    bedrooms: 1,
    maxGuests: 3,
    amenities: ['Wifi', 'Smart TV', 'Cocina Completa', 'Aire Acondicionado'],
    isOffer: false,
    lat: -22.9694,
    lng: -43.1868,
    type: 'rental'
  },
  {
    id: 'apt-3',
    title: 'Casa Geribá con Piscina',
    location: 'Buzios, Brasil',
    pricePerNight: 450000,
    description: 'Hermosa casa de estilo buziano a 300 metros de la playa de Geribá. Amplio jardín, piscina privada y quincho con parrilla. Ideal para familias grandes.',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop'
    ],
    bedrooms: 4,
    maxGuests: 10,
    amenities: ['Piscina Privada', 'Parrilla', 'Jardín', 'Wifi', 'Cocina equipada'],
    isOffer: true,
    offerExpiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    lat: -22.7753,
    lng: -41.9054,
    type: 'rental'
  },
  {
    id: 'apt-4',
    title: 'Flat Canasvieiras Family',
    location: 'Florianópolis, Brasil',
    pricePerNight: 220000,
    description: 'Cómodo departamento en el centro de Canasvieiras. A dos cuadras del mar. Edificio con piscina en la terraza y salón de juegos. Muy cerca de supermercados.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-b0346ef41439?q=80&w=2074&auto=format&fit=crop'
    ],
    bedrooms: 2,
    maxGuests: 5,
    amenities: ['Piscina compartida', 'Wifi', 'Balcón', 'Aire Acondicionado'],
    isOffer: false,
    lat: -27.4285,
    lng: -48.4619,
    type: 'rental'
  },
  {
    id: 'apt-5',
    title: 'Ipanema Ocean Front',
    location: 'Rio de Janeiro, Brasil',
    pricePerNight: 550000,
    description: 'La mejor vista de Río. Departamento de categoría frente al Posto 9. Decoración de lujo, servicio de limpieza diario incluido y acceso directo a la playa.',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop'
    ],
    bedrooms: 3,
    maxGuests: 6,
    amenities: ['Vista al mar', 'Servicio de limpieza', 'Wifi Premium', 'Seguridad 24hs', 'Lavandería'],
    isOffer: false,
    lat: -22.9863,
    lng: -43.2039,
    type: 'rental'
  }
];

export const INITIAL_HOTELS: Hotel[] = [
  {
    id: 'htl-1',
    title: 'Majestic Palace Hotel',
    location: 'Florianópolis, Centro',
    pricePerNight: 180000,
    description: 'Ubicado en la Avenida Beira Mar Norte con vistas impresionantes a la bahía. Habitaciones de lujo, piscina y spa. Ideal para familias.',
    images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop'
    ],
    stars: 5,
    amenities: ['Spa y Bienestar', 'Desayuno Buffet', 'Vista al Mar', 'Gimnasio'],
    isOffer: true,
    discount: 20, // 20% OFF Example
    offerExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    lat: -27.5858,
    lng: -48.5455,
    type: 'hotel'
  },
  {
    id: 'htl-2',
    title: 'Costão do Santinho Resort',
    location: 'Praia do Santinho, Florianópolis',
    pricePerNight: 450000,
    description: 'El resort All Inclusive más premiado del sur de Brasil. Acceso directo a la playa, actividades para todas las edades, piscinas climatizadas y gastronomía de primer nivel.',
    images: [
        'https://images.unsplash.com/photo-1571896349842-6e53ce41e8f2?q=80&w=2071&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop'
    ],
    stars: 5,
    amenities: ['All Inclusive', 'Club de Niños', 'Playa Privada', 'Piscinas Climatizadas', 'Shows Nocturnos'],
    isOffer: true,
    offerExpiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    lat: -27.4061,
    lng: -48.3840,
    type: 'hotel'
  },
  {
    id: 'htl-3',
    title: 'IL Campanario Villaggio Resort',
    location: 'Jurerê Internacional, Florianópolis',
    pricePerNight: 320000,
    description: 'El corazón de Jurerê Internacional. Arquitectura inspirada en la Riviera Italiana. A pasos del mar y del Open Shopping. Suites elegantes y confortables.',
    images: [
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=2070&auto=format&fit=crop'
    ],
    stars: 5,
    amenities: ['Piscina Climatizada', 'Club de Playa', 'Sauna', 'Cocina en la Suite'],
    isOffer: false,
    lat: -27.4389,
    lng: -48.4980,
    type: 'hotel'
  },
  {
    id: 'htl-4',
    title: 'Blue Tree Premium',
    location: 'Florianópolis, Centro',
    pricePerNight: 140000,
    description: 'Confort y ubicación estratégica. Habitaciones modernas, piscina en la azotea con vista panorámica al Puente Hercílio Luz.',
    images: [
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1590073242678-cfea533984c5?q=80&w=2070&auto=format&fit=crop'
    ],
    stars: 4,
    amenities: ['Piscina en Azotea', 'Desayuno Incluido', 'Wifi', 'Room Service'],
    isOffer: false,
    lat: -27.5922,
    lng: -48.5503,
    type: 'hotel'
  }
];

export const INITIAL_EXCURSIONS: Excursion[] = [
    {
        id: 'exc-1',
        title: 'Barco Pirata Canasvieiras',
        location: 'Florianópolis, Brasil',
        price: 15000,
        description: 'Diversión asegurada para toda la familia. Show a bordo, paradas para baño en Isla del Francés y mucha música. Incluye frutas y agua.',
        images: [
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1559628233-4358d3109f1e?q=80&w=1983&auto=format&fit=crop'
        ],
        isOffer: true,
        offerExpiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        duration: '5 horas',
        availableDates: ['Lunes', 'Miércoles', 'Viernes'],
        type: 'excursion'
    },
    {
        id: 'exc-2',
        title: 'Cristo Redentor & Pan de Azúcar',
        location: 'Rio de Janeiro, Brasil',
        price: 45000,
        description: 'El tour clásico que no te puedes perder. Visita las dos atracciones más icónicas de Río en un solo día. Incluye entradas, transporte y guía en español.',
        images: [
            'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1596488376776-5e72325f0a44?q=80&w=2070&auto=format&fit=crop'
        ],
        isOffer: true,
        offerExpiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        duration: 'Full Day',
        availableDates: ['Todos los días'],
        type: 'excursion'
    },
    {
        id: 'exc-3',
        title: 'Parque Unipraias Camboriú',
        location: 'Camboriú, Brasil',
        price: 22000,
        description: 'Teleférico que conecta dos playas pasando por la selva atlántica. Atracciones como Youhooo! (trineo de montaña) y ZipRider (tirolesa gigante).',
        images: [
            'https://images.unsplash.com/photo-1572587356426-b25eb9342003?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop'
        ],
        isOffer: false,
        duration: 'Full Day',
        availableDates: ['Martes a Domingo'],
        type: 'excursion'
    },
    {
        id: 'exc-4',
        title: 'Buceo en Arraial do Cabo',
        location: 'Arraial do Cabo, Brasil',
        price: 35000,
        description: 'Bautismo de buceo en las aguas más cristalinas de Brasil. Instructores certificados, equipo completo y fotos bajo el agua incluidas.',
        images: [
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1682687981922-7b55dbb30892?q=80&w=2071&auto=format&fit=crop'
        ],
        isOffer: false,
        duration: '4 horas',
        availableDates: ['Sábados y Domingos'],
        type: 'excursion'
    }
];

export const INITIAL_INSTALLMENT_TRIPS: InstallmentTrip[] = [
    {
        id: 'inst-1',
        title: 'Disney & Universal Diciembre 2026',
        location: 'Orlando, USA',
        totalPrice: 2800000,
        description: 'Planifica con tiempo tu viaje soñado. Incluye aéreos, hoteles Disney y entradas a todos los parques. Salida grupal acompañada.',
        images: [
            'https://images.unsplash.com/photo-1575089776834-8be34696ffb9?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1628191139360-4083564d03fd?q=80&w=2070&auto=format&fit=crop'
        ],
        departureDate: '2026-12-10',
        isOffer: true,
        type: 'installment'
    },
    {
        id: 'inst-2',
        title: 'Europa Mágica Julio 2027',
        location: 'Madrid, París, Roma',
        totalPrice: 4200000,
        description: 'Recorre las capitales europeas en verano. Un tour de 15 días con todo incluido. Paga en pequeñas cuotas mensuales hasta la fecha de salida.',
        images: [
            'https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?q=80&w=2020&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?q=80&w=2067&auto=format&fit=crop'
        ],
        departureDate: '2027-07-15',
        isOffer: true,
        type: 'installment'
    },
    {
        id: 'inst-3',
        title: 'Caribe Punta Cana Enero 2027',
        location: 'República Dominicana',
        totalPrice: 2100000,
        description: 'Empieza el 2027 en el paraíso. Hotel 5 estrellas All Inclusive frente al mar. Congela el precio hoy y paga mes a mes.',
        images: [
            'https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=1935&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop'
        ],
        departureDate: '2027-01-10',
        isOffer: false,
        type: 'installment'
    }
];
