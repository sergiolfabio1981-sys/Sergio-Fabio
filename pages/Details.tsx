import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTripById } from '../services/tripService';
import { Trip } from '../types';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState<Trip | undefined>(undefined);
  const [bookingDate, setBookingDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const found = getTripById(id);
      setTrip(found);
    }
  }, [id]);

  const nextImage = () => {
    if (!trip) return;
    setCurrentImageIndex((prev) => (prev + 1) % trip.images.length);
  };

  const prevImage = () => {
    if (!trip) return;
    setCurrentImageIndex((prev) => (prev - 1 + trip.images.length) % trip.images.length);
  };

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Destino no encontrado</h2>
        <Link to="/" className="text-cyan-600 hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Carousel */}
      <div className="relative h-[60vh] w-full overflow-hidden group">
        <img 
          src={trip.images[currentImageIndex]} 
          alt={trip.title} 
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Controls */}
        {trip.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            >
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            >
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            {/* Indicators */}
            <div className="absolute bottom-32 left-0 right-0 flex justify-center gap-2 z-20">
              {trip.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-7xl mx-auto">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">
              {trip.isOffer ? 'OFERTA ESPECIAL' : 'DESTINO TOP'}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{trip.title}</h1>
            <div className="flex items-center text-white/90 text-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {trip.location}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content: Description & Itinerary */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sobre este viaje</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{trip.description}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Itinerario de Viaje
            </h2>
            <div className="space-y-6 border-l-2 border-cyan-100 ml-3 pl-6">
              {trip.itinerary.map((item, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-[33px] bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm ring-4 ring-white">
                    {item.day}
                  </span>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">Día {item.day}</h3>
                  <p className="text-gray-600">{item.activity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content: Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border border-gray-100">
            <div className="flex justify-between items-end mb-6">
              <span className="text-gray-500">Precio por persona</span>
              <span className="text-3xl font-bold text-cyan-600">${trip.price}</span>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Salida</label>
                <input 
                  type="date" 
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500 p-3 border"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Viajeros</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-1">
                  <button 
                    type="button"
                    className="p-2 text-gray-500 hover:text-cyan-600"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold">{guests}</span>
                  <button 
                    type="button"
                    className="p-2 text-gray-500 hover:text-cyan-600"
                    onClick={() => setGuests(guests + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between mb-2">
                  <span>${trip.price} x {guests} viajeros</span>
                  <span>${trip.price * guests}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-900 mt-2">
                  <span>Total</span>
                  <span>${trip.price * guests}</span>
                </div>
              </div>

              <button className="w-full bg-orange-500 text-white font-bold py-4 rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 mt-4">
                Reservar Ahora
              </button>
              <p className="text-center text-xs text-gray-400 mt-2">No se hará ningún cargo todavía.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;