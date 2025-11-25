
import { Trip, Apartment, Excursion, Hotel, InstallmentTrip } from './types';

export const ADMIN_EMAIL = "sergiolfabio1981@gmail.com";
export const ADMIN_PASS = "Colo1981";

// --- PAQUETES (Estilo Despegar: Aéreos + Hotel Internacionales) ---
export const INITIAL_TRIPS: Trip[] = [
  {
    id: 'pkg-rio-fly',
    title: 'Paquete Río de Janeiro: Vuelo + Hotel 4*',
    location: 'Río de Janeiro, Brasil',
    price: 1250000,
    description: 'Viajá a Río con todo resuelto. Incluye aéreos directos desde Buenos Aires, traslados y 7 noches en Hotel Windsor Excelsior Copacabana con desayuno. Asistencia al viajero incluida.',
    images: [
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?q=80&w=2026&auto=format&fit=crop'
    ],
    isOffer: true,
    discount: 15,
    availableDates: ["Salidas diarias Enero y Febrero"],
    includesFlight: true,
    rating: 9.2,
    reviewsCount: 1250,
    type: 'trip'
  },
  {
    id: 'pkg-cancun-all',
    title: 'Cancún All Inclusive - 5 Estrellas',
    location: 'Quintana Roo, México',
    price: 2800000,
    description: 'El paraíso te espera. Vuelos + 7 noches en Hard Rock Hotel Cancún con sistema All Inclusive las 24hs. Acceso ilimitado a bebidas, comidas y entretenimiento.',
    images: [
      'https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=1935&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614350280436-15949176395b?q=80&w=2071&auto=format&fit=crop'
    ],
    isOffer: true,
    discount: 10,
    availableDates: ["Salidas Domingos de Marzo"],
    includesFlight: true,
    rating: 9.5,
    reviewsCount: 840,
    type: 'trip'
  },
  {
    id: 'pkg-bariloche-fly',
    title: 'Escapada a Bariloche - Llao Llao',
    location: 'Río Negro, Argentina',
    price: 980000,
    description: 'Lujo en la Patagonia. Aéreos + 4 noches en el exclusivo Llao Llao Resort, Golf & Spa. Incluye circuito de Spa y té de la tarde. Traslados privados.',
    images: [
      'https://images.unsplash.com/photo-1571896349842-6e53ce41e8f2?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1612294069631-9a746a551842?q=80&w=1974&auto=format&fit=crop'
    ],
    isOffer: false,
    availableDates: ["Fines de semana largos 2026"],
    includesFlight: true,
    rating: 9.8,
    reviewsCount: 3200,
    type: 'trip'
  },
  {
    id: 'pkg-madrid-tour',
    title: 'Madrid y Barcelona en Tren',
    location: 'España',
    price: 3100000,
    description: 'Eurotrip Express. Aéreos a Madrid. 3 noches en Madrid + Tren AVE + 3 noches en Barcelona. Hoteles céntricos 4 estrellas. City tour en ambas ciudades.',
    images: [
      'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: true,
    availableDates: ["Salidas Abril y Mayo"],
    includesFlight: true,
    rating: 8.9,
    reviewsCount: 510,
    type: 'trip'
  },
  {
    id: 'pkg-miami-shop',
    title: 'Miami Beach & Shopping',
    location: 'Florida, USA',
    price: 1950000,
    description: 'Playa y compras. Vuelo directo + 6 noches en Hotel Riu Plaza Miami Beach. Desayuno incluido. Cuponera de descuentos para Sawgrass Mills.',
    images: [
      'https://images.unsplash.com/photo-1535498730771-e735b998cd64?q=80&w=1887&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?q=80&w=1974&auto=format&fit=crop'
    ],
    isOffer: true,
    discount: 5,
    availableDates: ["Todo el año"],
    includesFlight: true,
    rating: 8.7,
    reviewsCount: 1100,
    type: 'trip'
  }
];

// --- HOTELES (Cadenas Internacionales) ---
export const INITIAL_HOTELS: Hotel[] = [
  {
    id: 'htl-hilton-ba',
    title: 'Hilton Buenos Aires',
    location: 'Puerto Madero, Argentina',
    pricePerNight: 250000,
    description: 'Lujo contemporáneo en Puerto Madero. Piscina en la terraza con vista a la ciudad, gimnasio de última generación y acceso al Lounge Ejecutivo.',
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
    type: 'hotel'
  },
  {
    id: 'htl-sheraton-rio',
    title: 'Sheraton Grand Rio Hotel & Resort',
    location: 'Leblon, Río de Janeiro',
    pricePerNight: 320000,
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
    type: 'hotel'
  },
  {
    id: 'htl-majestic',
    title: 'Majestic Palace Hotel',
    location: 'Florianópolis, Centro',
    pricePerNight: 180000,
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
    type: 'hotel'
  },
  {
    id: 'htl-grand-palladium',
    title: 'Grand Palladium Imbassaí',
    location: 'Bahía, Brasil',
    pricePerNight: 450000,
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
    type: 'hotel'
  }
];

// --- DEPARTAMENTOS / ALQUILERES ---
export const INITIAL_RENTALS: Apartment[] = [
  {
    id: 'apt-miami-beach',
    title: 'Apartamento de Lujo en Collins Ave',
    location: 'Miami Beach, USA',
    pricePerNight: 220000,
    description: 'Moderno apartamento con vista al océano. Acceso directo a la playa, piscina del edificio y valet parking incluido. A minutos de Lincoln Road.',
    images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop'
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
    type: 'rental'
  },
  {
    id: 'apt-recoleta',
    title: 'Penthouse Clásico en Recoleta',
    location: 'Buenos Aires, Argentina',
    pricePerNight: 95000,
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
    type: 'rental'
  },
  {
    id: 'apt-jurere',
    title: 'Casa en Jurerê Internacional',
    location: 'Florianópolis, Brasil',
    pricePerNight: 350000,
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
    type: 'rental'
  }
];

// --- EXCURSIONES ---
export const INITIAL_EXCURSIONS: Excursion[] = [
  {
    id: 'exc-disney',
    title: 'Entradas Disney Magic Kingdom',
    location: 'Orlando, USA',
    price: 180000,
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
    type: 'excursion'
  },
  {
    id: 'exc-cristo',
    title: 'Cristo Redentor + Pan de Azúcar',
    location: 'Río de Janeiro, Brasil',
    price: 85000,
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
    type: 'excursion'
  },
  {
    id: 'exc-tulum',
    title: 'Ruinas de Tulum y Cenotes',
    location: 'Riviera Maya, México',
    price: 110000,
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
    type: 'excursion'
  }
];

export const INITIAL_INSTALLMENT_TRIPS: InstallmentTrip[] = [
    {
        id: 'inst-disney-26',
        title: 'Disney 15 Años - Salida Grupal',
        location: 'Orlando, USA',
        totalPrice: 4500000,
        description: 'El viaje de 15 soñado. Parques Disney y Universal, fiestas exclusivas, pensión completa y acompañamiento permanente. Salida Febrero y Julio 2027.',
        images: [
            'https://images.unsplash.com/photo-1534951474654-88451907c2e8?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1575089776834-8be34696ffb9?q=80&w=1974&auto=format&fit=crop'
        ],
        departureDate: '2027-02-15',
        isOffer: true,
        type: 'installment'
    },
    {
        id: 'inst-caribe-26',
        title: 'Punta Cana Familiar 2026',
        location: 'República Dominicana',
        totalPrice: 2800000,
        description: 'Enero en el Caribe. All Inclusive 5 estrellas Riu Bambu. Vuelos directos. Ideal para congelar precio en pesos y pagar mes a mes.',
        images: [
            'https://images.unsplash.com/photo-1614350280436-15949176395b?q=80&w=2071&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=1935&auto=format&fit=crop'
        ],
        departureDate: '2026-01-15',
        isOffer: true,
        type: 'installment'
    }
];
