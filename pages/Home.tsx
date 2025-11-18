import React, { useState, useEffect } from 'react';
import { Trip } from '../types';
import { getTrips } from '../services/tripService';
import TripCard from '../components/TripCard';

const Home: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const allTrips = getTrips();
    setTrips(allTrips);
  }, []);

  const filteredTrips = trips.filter(trip => 
    trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const offers = filteredTrips.filter(trip => trip.isOffer);
  const regularTrips = filteredTrips.filter(trip => !trip.isOffer);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-cyan-900 flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50"
            poster="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
          >
            {/* Video de playa tropical/Brasil */}
            <source src="https://videos.pexels.com/video-files/4434242/4434242-uhd_2560_1440_24fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/50 to-slate-50"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Descubre las Playas de <span className="text-orange-400">Brasil</span>
          </h1>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            ABRAS Travel te lleva a los paraísos tropicales más exclusivos. Reserva tu experiencia inolvidable hoy mismo.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white p-2 rounded-full shadow-xl flex flex-col md:flex-row items-center max-w-2xl mx-auto">
            <div className="flex-grow w-full md:w-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="¿A dónde quieres ir? (ej: Buzios, Rio...)"
                className="w-full pl-10 pr-4 py-3 rounded-full text-gray-700 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="w-full md:w-auto mt-2 md:mt-0 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200">
              Buscar
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        {/* Offers Section */}
        {offers.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-6">
               <h2 className="text-3xl font-bold text-white drop-shadow-md mr-4">Ofertas Relámpago</h2>
               <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">¡Tiempo Limitado!</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offers.map(trip => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </div>
        )}

        {/* All Destinations */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-cyan-500 pl-4">
            Todos los Destinos
          </h2>
          
          {regularTrips.length === 0 && offers.length === 0 ? (
             <div className="text-center py-10">
                <p className="text-xl text-gray-500">No encontramos destinos con ese nombre.</p>
                <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-4 text-cyan-600 hover:text-cyan-800 underline"
                >
                    Ver todos
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