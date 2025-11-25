
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trip, ListingItem } from '../types';
import { getTrips } from '../services/tripService';
import { getRentals } from '../services/rentalService';
import { getExcursions } from '../services/excursionService';
import { getHotels } from '../services/hotelService';
import TripCard from '../components/TripCard';

const Home: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [combinedOffers, setCombinedOffers] = useState<ListingItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showImportToast, setShowImportToast] = useState(false);
  
  useEffect(() => {
    const allTrips = getTrips();
    const allRentals = getRentals();
    const allExcursions = getExcursions();
    const allHotels = getHotels();

    // Show simulation toast
    setTimeout(() => setShowImportToast(true), 1000);
    setTimeout(() => setShowImportToast(false), 6000);

    // Force Type Tags if missing in storage
    const taggedTrips = allTrips.map(t => ({...t, type: 'trip' as const}));
    const taggedRentals = allRentals.map(r => ({...r, type: 'rental' as const}));
    const taggedExcursions = allExcursions.map(e => ({...e, type: 'excursion' as const}));
    const taggedHotels = allHotels.map(h => ({...h, type: 'hotel' as const}));

    setTrips(taggedTrips);

    // Combine all offers
    const offers = [
        ...taggedTrips.filter(t => t.isOffer),
        ...taggedRentals.filter(r => r.isOffer),
        ...taggedExcursions.filter(e => e.isOffer),
        ...taggedHotels.filter(h => h.isOffer)
    ];
    
    // Shuffle offers slightly so they aren't always grouped by type
    setCombinedOffers(offers.sort(() => Math.random() - 0.5));

  }, []);

  const filteredTrips = trips.filter(trip => 
    trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Display only regular trips in the bottom section (not offers)
  const regularTrips = filteredTrips.filter(trip => !trip.isOffer);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Simulation Toast */}
      {showImportToast && (
        <div className="fixed top-24 right-5 bg-white border-l-4 border-green-500 shadow-2xl p-4 rounded-lg z-[60] animate-bounce-in max-w-sm">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Importación Completada</h3>
                    <div className="mt-1 text-sm text-gray-500">
                        <p>Datos de inventario global actualizados.</p>
                        <ul className="list-disc list-inside mt-1 text-xs">
                            <li>Paquetes con Aéreos</li>
                            <li>Hoteles 5 Estrellas</li>
                            <li>Alquileres de Lujo</li>
                        </ul>
                    </div>
                </div>
                <button onClick={() => setShowImportToast(false)} className="ml-auto text-gray-400 hover:text-gray-500">x</button>
            </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-[600px] bg-cyan-900 flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
            poster="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
          >
            {/* Video más global: Vuelo sobre nubes / Paisajes variados */}
            <source src="https://videos.pexels.com/video-files/2048256/2048256-uhd_2560_1440_24fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-cyan-900/40 to-slate-50"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl px-6 mt-10">
          <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 border border-orange-400 text-orange-300 text-sm font-bold mb-4 backdrop-blur-sm uppercase tracking-wider">
            Viaja sin límites
          </span>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl leading-tight">
            Descubre el Mundo con <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">ABRAS Travel</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto font-light">
            Desde las playas del Caribe hasta las capitales de Europa. 
            Planificamos tu próxima aventura internacional con el mejor servicio.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur-md p-3 rounded-full shadow-2xl flex flex-col md:flex-row items-center max-w-3xl mx-auto border border-white/50">
            <div className="flex-grow w-full md:w-auto relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="¿A dónde sueñas ir? (París, Cancún, Brasil...)"
                className="w-full pl-12 pr-4 py-4 rounded-full text-gray-800 focus:outline-none bg-transparent text-lg placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="w-full md:w-auto mt-2 md:mt-0 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-10 rounded-full transition-all duration-200 shadow-lg transform hover:scale-105">
              Buscar Viaje
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        {/* Offers Section (Mixed) */}
        {combinedOffers.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center">
                 <h2 className="text-3xl font-bold text-white drop-shadow-lg mr-4">Ofertas Mundiales</h2>
                 <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-lg border border-red-400">¡Últimos lugares!</span>
               </div>
               <Link to="/trips" className="hidden md:block text-white/90 hover:text-white font-medium drop-shadow-md">Ver todas las ofertas &rarr;</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {combinedOffers.slice(0, 6).map((item, idx) => ( // Show max 6 offers on home
                <TripCard key={`${item.type}-${item.id}-${idx}`} trip={item} />
              ))}
            </div>
          </div>
        )}

        {/* --- INSTALLMENTS BANNER --- */}
        <Link to="/installments" className="block w-full mb-16 transform transition-transform hover:scale-[1.01]">
            <div className="rounded-2xl overflow-hidden shadow-2xl relative bg-gradient-to-r from-indigo-900 to-purple-800 h-64 flex items-center">
                <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
                <div className="relative z-10 px-8 md:px-16 w-full flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                         <span className="bg-yellow-400 text-indigo-900 font-bold px-3 py-1 rounded-full text-sm mb-2 inline-block">¡NUEVO!</span>
                         <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Comprá tus vacaciones con ABRAS Cuotas</h2>
                         <p className="text-indigo-200 text-lg">Sin interés, pagando mes a mes hasta la fecha de salida.</p>
                    </div>
                    <div className="bg-white text-indigo-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-400 transition-colors">
                        Ver ABRAS Cuotas
                    </div>
                </div>
            </div>
        </Link>

        {/* Categories/Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center hover:shadow-xl transition-shadow cursor-pointer group">
                <div className="p-4 bg-cyan-100 text-cyan-600 rounded-full mr-4 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-gray-800">Destinos Internacionales</h3>
                    <p className="text-sm text-gray-500">Europa, Caribe y América.</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center hover:shadow-xl transition-shadow cursor-pointer group">
                <div className="p-4 bg-orange-100 text-orange-600 rounded-full mr-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-gray-800">Mejores Precios</h3>
                    <p className="text-sm text-gray-500">Financiación y ofertas exclusivas.</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center hover:shadow-xl transition-shadow cursor-pointer group">
                <div className="p-4 bg-purple-100 text-purple-600 rounded-full mr-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-gray-800">Soporte 24/7</h3>
                    <p className="text-sm text-gray-500">Estamos contigo en cada paso.</p>
                </div>
            </div>
        </div>

        {/* All Destinations (Trips Only) */}
        <div className="mt-8">
          <div className="flex items-end justify-between mb-8 border-b pb-4">
             <div>
                <span className="text-cyan-600 font-bold uppercase tracking-wider text-sm">Explora</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-1">
                    Todos los Paquetes
                </h2>
             </div>
          </div>
          
          {regularTrips.length === 0 && combinedOffers.length === 0 ? (
             <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                <p className="text-xl text-gray-500">No encontramos destinos con ese nombre.</p>
                <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-4 text-cyan-600 hover:text-cyan-800 underline font-medium"
                >
                    Ver todo el catálogo
                </button>
             </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {regularTrips.map(trip => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
