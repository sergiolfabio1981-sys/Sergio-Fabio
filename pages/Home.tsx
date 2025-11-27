
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trip, ListingItem, HeroSlide, PromoBanner } from '../types';
import { getTrips } from '../services/tripService';
import { getRentals } from '../services/rentalService';
import { getExcursions } from '../services/excursionService';
import { getHotels } from '../services/hotelService';
import { getHeroSlides, getPromoBanners } from '../services/heroService';
import TripCard from '../components/TripCard';

const Home: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [combinedOffers, setCombinedOffers] = useState<ListingItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showImportToast, setShowImportToast] = useState(false);
  
  // Carousel & Banner State
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [promoBanners, setPromoBanners] = useState<PromoBanner[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Load Hero Content
    setHeroSlides(getHeroSlides());
    setPromoBanners(getPromoBanners());

    const allTrips = getTrips();
    const allRentals = getRentals();
    const allExcursions = getExcursions();
    const allHotels = getHotels();

    // Check if user is admin before showing simulation toast
    const isAdmin = localStorage.getItem('abras_isAdmin') === 'true';
    if (isAdmin) {
        setTimeout(() => setShowImportToast(true), 1000);
        setTimeout(() => setShowImportToast(false), 6000);
    }

    const taggedTrips = allTrips.map(t => ({...t, type: 'trip' as const}));
    const taggedRentals = allRentals.map(r => ({...r, type: 'rental' as const}));
    const taggedExcursions = allExcursions.map(e => ({...e, type: 'excursion' as const}));
    const taggedHotels = allHotels.map(h => ({...h, type: 'hotel' as const}));

    setTrips(taggedTrips);

    const offers = [
        ...taggedTrips.filter(t => t.isOffer),
        ...taggedRentals.filter(r => r.isOffer),
        ...taggedExcursions.filter(e => e.isOffer),
        ...taggedHotels.filter(h => h.isOffer)
    ];
    
    setCombinedOffers(offers.sort(() => Math.random() - 0.5));

  }, []);

  // Auto-rotate slides
  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const filteredTrips = trips.filter(trip => 
    trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                    </div>
                </div>
                <button onClick={() => setShowImportToast(false)} className="ml-auto text-gray-400 hover:text-gray-500">x</button>
            </div>
        </div>
      )}

      {/* DYNAMIC HERO CAROUSEL */}
      <div className="relative h-[650px] w-full overflow-hidden bg-gray-900">
        
        {/* Slides */}
        {heroSlides.map((slide, index) => (
            <div 
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
                {/* Image Background */}
                <div className="absolute inset-0 overflow-hidden bg-gray-800">
                    <img 
                        src={slide.image} 
                        alt={slide.title}
                        className={`w-full h-full object-cover transform transition-transform duration-[6000ms] ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'}`}
                        loading={index === 0 ? "eager" : "lazy"}
                    />
                </div>
                
                {/* Dark Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-10">
                    <h2 className={`text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl animate-fade-in-up tracking-tight uppercase`}>
                        {slide.title}
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl font-light drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                        {slide.subtitle}
                    </p>
                    <Link 
                        to={slide.ctaLink}
                        className={`
                            px-8 py-4 rounded-full font-bold text-lg text-white shadow-2xl 
                            transition-transform transform hover:scale-105 hover:shadow-orange-500/50 
                            animate-fade-in-up
                            bg-gradient-to-r from-orange-500 to-red-600 border border-white/20
                        `}
                        style={{animationDelay: '0.4s'}}
                    >
                        {slide.ctaText}
                    </Link>
                </div>
            </div>
        ))}

        {/* Carousel Controls (Arrows) */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all hidden md:block border border-white/10">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all hidden md:block border border-white/10">
             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* Carousel Indicators (Dots) */}
        <div className="absolute bottom-32 left-0 right-0 z-20 flex justify-center gap-3">
            {heroSlides.map((_, idx) => (
                <button 
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 shadow ${idx === currentSlide ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/70'}`}
                />
            ))}
        </div>

        {/* SEARCH BAR (Floating at bottom of Hero) */}
        <div className="absolute bottom-10 left-0 right-0 z-30 px-4">
             <div className="bg-white/95 backdrop-blur-md p-2 rounded-full shadow-2xl flex flex-col md:flex-row items-center max-w-3xl mx-auto border border-white/50">
                <div className="flex-grow w-full md:w-auto relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Busca tu próximo destino (ej: Cancún, Río, Miami...)"
                    className="w-full pl-12 pr-4 py-3 rounded-full text-gray-800 focus:outline-none bg-transparent text-lg placeholder-gray-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="w-full md:w-auto mt-2 md:mt-0 bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 shadow-md">
                  Buscar
                </button>
              </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-20">
        {/* Offers Section (Mixed) */}
        {combinedOffers.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center">
                 <h2 className="text-3xl font-bold text-gray-800 mr-4">Ofertas Destacadas</h2>
                 <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-lg border border-red-400">¡Tiempo Limitado!</span>
               </div>
               <Link to="/trips" className="hidden md:block text-cyan-600 hover:text-cyan-800 font-medium">Ver todas &rarr;</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {combinedOffers.slice(0, 6).map((item, idx) => ( // Show max 6 offers on home
                <TripCard key={`${item.type}-${item.id}-${idx}`} trip={item} />
              ))}
            </div>
          </div>
        )}

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

        {/* DYNAMIC PROMOTIONAL BANNERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {promoBanners.map((banner, idx) => (
                <Link key={banner.id} to={banner.link} className="relative h-64 rounded-2xl overflow-hidden group shadow-xl">
                    <img 
                        src={banner.image} 
                        alt={banner.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 flex flex-col justify-center px-8 md:px-12 ${idx === 0 ? 'bg-gradient-to-r from-blue-900/90 via-blue-800/60 to-transparent' : 'bg-gradient-to-r from-indigo-900/90 via-indigo-800/60 to-transparent'}`}>
                        <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-2 backdrop-blur-sm border border-white/30">{banner.badge}</span>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-2">{banner.title}</h2>
                        <p className="text-blue-100 mb-4 max-w-xs">{banner.subtitle}</p>
                        <span className="text-white font-bold underline decoration-2 underline-offset-4 group-hover:text-cyan-300 transition-colors">{banner.ctaText} &rarr;</span>
                    </div>
                </Link>
            ))}
        </div>

        {/* All Destinations (Trips Only) */}
        <div className="mt-8">
          <div className="flex items-end justify-between mb-8 border-b border-gray-200 pb-4">
             <div>
                <span className="text-cyan-600 font-bold uppercase tracking-wider text-sm">Explora</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-1">
                    Todos los Paquetes
                </h2>
             </div>
          </div>
          
          {regularTrips.length === 0 && combinedOffers.length === 0 ? (
             <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
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
