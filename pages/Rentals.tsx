import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Apartment } from '../types';
import { getRentals } from '../services/rentalService';

const Rentals: React.FC = () => {
  const [rentals, setRentals] = useState<Apartment[]>([]);
  
  useEffect(() => {
    setRentals(getRentals());
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-cyan-900 flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1512918760532-3edbed71741b?q=80&w=2076&auto=format&fit=crop" 
            alt="Luxury Apartment" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/60 to-slate-50"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Departamentos Exclusivos
          </h1>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Siente la libertad de tu propio espacio en los mejores destinos de Brasil.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rentals.map(rental => (
            <div key={rental.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
               <div className="relative h-64 overflow-hidden">
                 <img 
                   src={rental.images[0]} 
                   alt={rental.title}
                   className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                 />
                 <div className="absolute top-0 left-0 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg z-10">
                    ALQUILER TEMPORAL
                 </div>
               </div>
               
               <div className="p-5">
                 <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">{rental.title}</h3>
                 <p className="text-sm text-gray-500 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-1 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {rental.location}
                 </p>
                 
                 <div className="flex gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        {rental.bedrooms} Hab.
                    </span>
                    <span className="flex items-center">
                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        Hasta {rental.maxGuests} huéspedes
                    </span>
                 </div>

                 <p className="text-gray-600 text-sm line-clamp-2 mb-4 h-10">
                   {rental.description}
                 </p>
                 
                 <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                        <span className="text-xl font-bold text-gray-800">{formatCurrency(rental.pricePerNight)}</span>
                        <span className="text-xs text-gray-400 block">por noche</span>
                    </div>
                    <Link 
                        to={`/rentals/${rental.id}`}
                        className="inline-flex items-center justify-center px-4 py-2 bg-cyan-600 text-white text-sm font-medium rounded-lg hover:bg-cyan-700 transition-colors"
                    >
                        Ver Fechas
                    </Link>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rentals;