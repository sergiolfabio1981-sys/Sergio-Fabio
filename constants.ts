import { Trip } from './types';

export const ADMIN_EMAIL = "sergiolfabio1981@gmail.com";
export const ADMIN_PASS = "Colo1981";

export const INITIAL_TRIPS: Trip[] = [
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
    itinerary: [
      { day: 1, activity: 'Llegada y check-in en Hotel frente al mar.' },
      { day: 2, activity: 'Tour por Ilha do Campeche.' },
      { day: 3, activity: 'Día libre en Barra da Lagoa.' },
      { day: 4, activity: 'Cena despedida y regreso.' }
    ]
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
    itinerary: [
      { day: 1, activity: 'Llegada y caipiriña de bienvenida.' },
      { day: 2, activity: 'Visita al Cristo Redentor y Pan de Azúcar.' },
      { day: 3, activity: 'Día de playa en Ipanema.' },
      { day: 4, activity: 'Tour histórico por el centro.' },
      { day: 5, activity: 'Regreso.' }
    ]
  },
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
    itinerary: [
      { day: 1, activity: 'Traslado privado y alojamiento.' },
      { day: 2, activity: 'Paseo en Buggy por 7 playas.' },
      { day: 3, activity: 'Navegación en Escuna.' },
      { day: 4, activity: 'Día libre para compras en Rua das Pedras.' },
      { day: 5, activity: 'Regreso.' }
    ]
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
    itinerary: [
      { day: 1, activity: 'Llegada a Salvador.' },
      { day: 2, activity: 'City Tour Histórico Pelourinho.' },
      { day: 3, activity: 'Playa Praia do Forte.' },
      { day: 4, activity: 'Show folclórico y cena bahiana.' },
      { day: 5, activity: 'Regreso.' }
    ]
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
    itinerary: [
      { day: 1, activity: 'Recepción y traslado.' },
      { day: 2, activity: 'Paseo en Jangada a las piscinas naturales.' },
      { day: 3, activity: 'Tour de playas en Buggy.' },
      { day: 4, activity: 'Día libre.' },
      { day: 5, activity: 'Regreso.' }
    ]
  }
];