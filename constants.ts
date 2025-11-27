
import { Trip, Apartment, Excursion, Hotel, InstallmentTrip, WorldCupTrip, HeroSlide, PromoBanner } from './types';

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
    baseCurrency: 'ARS',
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
    baseCurrency: 'ARS',
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
    baseCurrency: 'ARS',
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
    baseCurrency: 'ARS',
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
    baseCurrency: 'ARS',
    type: 'trip'
  }
];

// --- HOTELES (Cadenas Internacionales) ---
export const INITIAL_HOTELS: Hotel[] = [
  {
    id: 'htl-cris',
    title: 'Cris Hotel',
    location: 'Praia da Joaquina, Florianópolis',
    pricePerNight: 165000,
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
    baseCurrency: 'ARS',
    type: 'hotel'
  },
  {
    id: 'htl-porto-sol',
    title: 'Hotel Porto Sol Beach',
    location: 'Ingleses, Florianópolis',
    pricePerNight: 195000,
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
    rating: 8.5,
    reviewsCount: 950,
    lat: -27.427,
    lng: -48.396,
    baseCurrency: 'ARS',
    type: 'hotel'
  },
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
    baseCurrency: 'ARS',
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
    baseCurrency: 'ARS',
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
    baseCurrency: 'ARS',
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
    baseCurrency: 'ARS',
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
    baseCurrency: 'ARS',
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
    baseCurrency: 'ARS',
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
    baseCurrency: 'ARS',
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
    baseCurrency: 'ARS',
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
    baseCurrency: 'ARS',
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
    baseCurrency: 'ARS',
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
        baseCurrency: 'ARS',
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
        baseCurrency: 'ARS',
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
