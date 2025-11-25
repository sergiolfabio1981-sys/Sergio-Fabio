
import { Trip, Apartment, Excursion, Hotel, InstallmentTrip } from './types';

export const ADMIN_EMAIL = "sergiolfabio1981@gmail.com";
export const ADMIN_PASS = "Colo1981";

const DATES_GENERIC = [
  "Salidas diarias Enero 2026",
  "Salidas diarias Febrero 2026",
  "Salidas diarias Marzo 2026"
];

// --- PAQUETES (Vuelo + Hotel) ---
export const INITIAL_TRIPS: Trip[] = [
  {
    id: 'pkg-rio-1',
    title: 'Paquete Rio de Janeiro - Vuelo + Hotel',
    location: 'Rio de Janeiro, Brasil',
    price: 980000,
    description: 'Disfruta de 7 noches en Copacabana. Incluye aéreos directos con equipaje, traslados aeropuerto-hotel y alojamiento en Hotel Atlántico Travel con desayuno. Asistencia al viajero incluida.',
    images: [
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1518639192441-8fce0a666f91?q=80&w=2000&auto=format&fit=crop', 
    ],
    isOffer: true,
    discount: 15,
    availableDates: ["Salidas Enero y Febrero 2026"],
    includesFlight: true,
    rating: 8.5,
    reviewsCount: 124,
    type: 'trip'
  },
  {
    id: 'pkg-cancun-1',
    title: 'Cancún All Inclusive - Oasis Palm',
    location: 'Cancún, México',
    price: 1850000,
    description: 'La experiencia definitiva del Caribe. 8 días y 7 noches en régimen Todo Incluido. Vuelos con escala en Panamá o Lima. Hotel a pie de playa con actividades para toda la familia.',
    images: [
      'https://images.unsplash.com/photo-1544144433-d50aff500b91?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=2080&auto=format&fit=crop'
    ],
    isOffer: true,
    discount: 10,
    availableDates: ["Salidas Diarias"],
    includesFlight: true,
    rating: 9.0,
    reviewsCount: 450,
    type: 'trip'
  },
  {
    id: 'pkg-bariloche-1',
    title: 'Escapada a Bariloche - Lagos y Montañas',
    location: 'Bariloche, Argentina',
    price: 450000,
    description: '5 noches para disfrutar del sur argentino. Vuelo directo desde Buenos Aires. Alojamiento céntrico en Hotel Nahuel Huapi. Excursión a Circuito Chico incluida de regalo.',
    images: [
      'https://images.unsplash.com/photo-1612294002150-13d80327ae83?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574450373727-22d733db9b9c?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: false,
    availableDates: ["Fines de semana largos 2026"],
    includesFlight: true,
    rating: 8.8,
    reviewsCount: 89,
    type: 'trip'
  },
  {
    id: 'pkg-iguazu-1',
    title: 'Cataratas del Iguazú Full Experience',
    location: 'Misiones, Argentina',
    price: 380000,
    description: '4 días y 3 noches. Vuelo + Hotel con piscina en la selva. Incluye traslados a los parques nacionales (Lado Argentino y Brasileño). Ideal para conectar con la naturaleza.',
    images: [
      'https://images.unsplash.com/photo-1582294406604-51c3608d13b4?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534234828563-02511c94368b?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: true,
    discount: 20,
    availableDates: ["Salidas diarias"],
    includesFlight: true,
    rating: 9.2,
    reviewsCount: 210,
    type: 'trip'
  },
  {
    id: 'pkg-disney-1',
    title: 'Magia en Orlando - Disney & Universal',
    location: 'Orlando, USA',
    price: 2500000,
    description: 'El viaje de tus sueños. 10 noches de alojamiento en hotel dentro de Disney (All-Star Movies). Vuelos ida y vuelta. Entradas Park Hopper para 4 días incluidas.',
    images: [
      'https://images.unsplash.com/photo-1597466599360-3b9775841aec?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534951474654-88451907c2e8?q=80&w=1974&auto=format&fit=crop'
    ],
    isOffer: true,
    availableDates: ["Febrero y Marzo 2026"],
    includesFlight: true,
    rating: 9.8,
    reviewsCount: 530,
    type: 'trip'
  },
  {
    id: 'pkg-madrid-1',
    title: 'Eurotrip: Madrid, Barcelona y París',
    location: 'Europa',
    price: 3100000,
    description: '15 días recorriendo lo mejor de Europa. Vuelos internacionales, trenes de alta velocidad entre ciudades y hoteles 4 estrellas con desayuno buffet.',
    images: [
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop'
    ],
    isOffer: false,
    availableDates: ["Salidas Grupales Mayo 2026"],
    includesFlight: true,
    rating: 9.4,
    reviewsCount: 76,
    type: 'trip'
  }
];

// --- HOTELES (Simulando Booking/Despegar) ---
export const INITIAL_HOTELS: Hotel[] = [
  {
    id: 'htl-llao',
    title: 'Llao Llao Resort, Golf & Spa',
    location: 'Bariloche, Argentina',
    pricePerNight: 420000,
    description: 'El hotel más exclusivo de la Patagonia. Rodeado de lagos y montañas, ofrece campo de golf, spa de lujo, piscina climatizada in/out y gastronomía patagónica de autor.',
    images: [
        'https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop'
    ],
    stars: 5,
    amenities: ['Spa', 'Campo de Golf', 'Piscina Infinita', 'Desayuno Buffet'],
    isOffer: false,
    rating: 9.6,
    reviewsCount: 1205,
    lat: -41.055,
    lng: -71.530,
    type: 'hotel'
  },
  {
    id: 'htl-palladium',
    title: 'Grand Palladium Imbassaí Resort & Spa',
    location: 'Bahía, Brasil',
    pricePerNight: 550000,
    description: 'Resort All Inclusive 5 estrellas en la reserva natural de Imbassaí. Ideal para familias. Kids club, espectáculos nocturnos y acceso directo a playas vírgenes.',
    images: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571896349842-6e53ce41e8f2?q=80&w=2071&auto=format&fit=crop'
    ],
    stars: 5,
    amenities: ['All Inclusive', 'Club de Niños', 'Playa Privada', 'Spa'],
    isOffer: true,
    discount: 15,
    rating: 8.9,
    reviewsCount: 3400,
    lat: -12.489,
    lng: -38.005,
    type: 'hotel'
  },
  {
    id: 'htl-hardrock',
    title: 'Hard Rock Hotel Cancun',
    location: 'Cancún, México',
    pricePerNight: 680000,
    description: 'Vive como una estrella de rock. Habitaciones con hidromasaje, servicio a la habitación 24h, fiestas en la piscina y entretenimiento de clase mundial frente al mar Caribe.',
    images: [
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop'
    ],
    stars: 5,
    amenities: ['Rock Spa', 'Música en Vivo', 'Todo Incluido', 'Playa'],
    isOffer: true,
    discount: 5,
    rating: 9.1,
    reviewsCount: 5600,
    lat: 21.137,
    lng: -86.749,
    type: 'hotel'
  },
  {
    id: 'htl-melia',
    title: 'Gran Meliá Iguazú',
    location: 'Misiones, Argentina',
    pricePerNight: 620000,
    description: 'El único hotel dentro del Parque Nacional Iguazú. Despierta con vista a la Garganta del Diablo. Piscina infinita, restaurantes gourmet y acceso exclusivo a las pasarelas.',
    images: [
        'https://images.unsplash.com/photo-1582294406604-51c3608d13b4?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop'
    ],
    stars: 5,
    amenities: ['Vista a Cataratas', 'Piscina Infinity', 'Spa', 'Restaurante Gourmet'],
    isOffer: false,
    rating: 9.7,
    reviewsCount: 890,
    lat: -25.684,
    lng: -54.445,
    type: 'hotel'
  },
  {
    id: 'htl-riu',
    title: 'Riu Plaza Miami Beach',
    location: 'Miami, USA',
    pricePerNight: 350000,
    description: 'Ubicación privilegiada en Collins Avenue, con acceso directo a la playa. Habitaciones modernas, desayuno buffet variado y piscina rodeada de palmeras.',
    images: [
        'https://images.unsplash.com/photo-1535498730771-e735b998cd64?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'
    ],
    stars: 4,
    amenities: ['Acceso a Playa', 'Wifi Gratis', 'Gimnasio', 'Bar en la Piscina'],
    isOffer: false,
    rating: 8.4,
    reviewsCount: 2100,
    lat: 25.805,
    lng: -80.123,
    type: 'hotel'
  }
];

// --- DEPARTAMENTOS / ALQUILERES ---
export const INITIAL_RENTALS: Apartment[] = [
  {
    id: 'apt-recoleta',
    title: 'Elegante Studio en Recoleta',
    location: 'Buenos Aires, Argentina',
    pricePerNight: 45000,
    description: 'Departamento moderno en el corazón de Recoleta, cerca del Cementerio y Plaza Francia. Balcón francés, cocina equipada y seguridad 24hs. Ideal para parejas.',
    images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop'
    ],
    bedrooms: 1,
    maxGuests: 2,
    amenities: ['Wifi', 'Smart TV', 'Cocina', 'Seguridad'],
    isOffer: true,
    discount: 10,
    rating: 9.3,
    reviewsCount: 45,
    lat: -34.588,
    lng: -58.396,
    type: 'rental'
  },
  {
    id: 'apt-copa',
    title: 'Frente al Mar en Copacabana',
    location: 'Rio de Janeiro, Brasil',
    pricePerNight: 120000,
    description: 'Vista panorámica a la playa más famosa del mundo. Departamento de 2 ambientes, reformado a nuevo. A pasos de bares, restaurantes y la arena.',
    images: [
        'https://images.unsplash.com/photo-1512918760532-3edbed71741b?q=80&w=2076&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1502005229766-3c622724c071?q=80&w=1974&auto=format&fit=crop'
    ],
    bedrooms: 1,
    maxGuests: 4,
    amenities: ['Vista al Mar', 'Aire Acondicionado', 'Wifi', 'Portería'],
    isOffer: false,
    rating: 8.8,
    reviewsCount: 112,
    lat: -22.969,
    lng: -43.180,
    type: 'rental'
  },
  {
    id: 'apt-playa',
    title: 'Condo de Lujo en Playa del Carmen',
    location: 'Playa del Carmen, México',
    pricePerNight: 210000,
    description: 'Ubicado en la zona de Mamitas Beach. Edificio con rooftop pool, gimnasio y estacionamiento subterráneo. A dos cuadras de la Quinta Avenida.',
    images: [
        'https://images.unsplash.com/photo-1520483602335-3b3dd1c5c148?q=80&w=2069&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=2071&auto=format&fit=crop'
    ],
    bedrooms: 2,
    maxGuests: 5,
    amenities: ['Piscina en Azotea', 'Gimnasio', 'Estacionamiento', 'Lavadora/Secadora'],
    isOffer: true,
    discount: 20,
    rating: 9.5,
    reviewsCount: 67,
    lat: 20.629,
    lng: -87.073,
    type: 'rental'
  },
  {
    id: 'apt-sma',
    title: 'Cabaña Alpina en San Martín',
    location: 'San Martín de los Andes, Argentina',
    pricePerNight: 95000,
    description: 'Acogedora cabaña de madera y piedra, rodeada de bosque nativo. Hogar a leña, parrilla individual y vistas al Cerro Chapelco. Perfecta para desconectar.',
    images: [
        'https://images.unsplash.com/photo-1585543805890-6051f7829f98?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?q=80&w=2074&auto=format&fit=crop'
    ],
    bedrooms: 2,
    maxGuests: 6,
    amenities: ['Hogar a Leña', 'Parrilla', 'Jardín', 'Wifi'],
    isOffer: false,
    rating: 9.8,
    reviewsCount: 23,
    lat: -40.150,
    lng: -71.350,
    type: 'rental'
  }
];

// --- EXCURSIONES ---
export const INITIAL_EXCURSIONS: Excursion[] = [
  {
    id: 'exc-glaciar',
    title: 'Minitrekking Glaciar Perito Moreno',
    location: 'El Calafate, Argentina',
    price: 150000,
    description: 'Caminata sobre el hielo del glaciar más famoso. Incluye navegación frente a la pared sur, caminata con crampones y brindis con whisky y hielo milenario.',
    images: [
        'https://images.unsplash.com/photo-1517154596051-c6b5c62e3276?q=80&w=1991&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1463321568269-1229f3d6c1b9?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: true,
    discount: 5,
    duration: 'Full Day (10hs)',
    availableDates: ['Lunes a Sábado'],
    rating: 9.9,
    reviewsCount: 850,
    type: 'excursion'
  },
  {
    id: 'exc-cataratas',
    title: 'Gran Aventura Náutica Iguazú',
    location: 'Iguazú, Argentina',
    price: 65000,
    description: 'La experiencia más adrenalínica. Navegación en lancha rápida por el río Iguazú inferior, ingresando al cañón de la Garganta del Diablo y bautismo bajo los saltos.',
    images: [
        'https://images.unsplash.com/photo-1534234828563-02511c94368b?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop'
    ],
    isOffer: false,
    duration: '2 horas',
    availableDates: ['Todos los días'],
    rating: 9.7,
    reviewsCount: 1200,
    type: 'excursion'
  },
  {
    id: 'exc-cristo',
    title: 'Rio Completo: Cristo, Pan de Azúcar y Selarón',
    location: 'Rio de Janeiro, Brasil',
    price: 55000,
    description: 'Visita los puntos más icónicos de Río en un solo día. Incluye ascenso al Cristo Redentor en tren, teleférico del Pan de Azúcar, Escalera Selarón y almuerzo buffet.',
    images: [
        'https://images.unsplash.com/photo-1596488376776-5e72325f0a44?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070&auto=format&fit=crop'
    ],
    isOffer: true,
    discount: 10,
    duration: 'Full Day (8hs)',
    availableDates: ['Todos los días'],
    rating: 9.2,
    reviewsCount: 3400,
    type: 'excursion'
  },
  {
    id: 'exc-disney',
    title: 'Ticket Disney Magic Kingdom - 1 Día',
    location: 'Orlando, USA',
    price: 180000,
    description: 'Entrada general para un día en Magic Kingdom. Conoce el Castillo de Cenicienta, Space Mountain y los desfiles de personajes. Acceso a todas las atracciones.',
    images: [
        'https://images.unsplash.com/photo-1628191139360-4083564d03fd?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1534951474654-88451907c2e8?q=80&w=1974&auto=format&fit=crop'
    ],
    isOffer: false,
    duration: 'Libre',
    availableDates: ['Sujeto a calendario'],
    rating: 9.8,
    reviewsCount: 15000,
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
