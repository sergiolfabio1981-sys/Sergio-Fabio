
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trip, ListingItem, HeroSlide, PromoBanner } from '../types';
import { getTrips } from '../services/tripService';
import { getRentals } from '../services/rentalService';
import { getExcursions } from '../services/excursionService';
import { getHotels } from '../services/hotelService';
import { getInstallmentTrips } from '../services/installmentService';
import { getWorldCupTrips } from '../services/worldCupService';
import { getHeroSlides, getPromoBanners } from '../services/heroService';
import TripCard from '../components/TripCard';

const Home: React.FC = () => {
  const [combinedOffers, setCombinedOffers] = useState<ListingItem[]>([]);
  const [allItems, setAllItems] = useState<ListingItem[]>([]); // Everything that is NOT an offer
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showImportToast, setShowImportToast] = useState(false);
  
  // Carousel & Banner State
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [promoBanners, setPromoBanners] = useState<PromoBanner[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Load Hero Content
    setHeroSlides(getHeroSlides());
    setPromoBanners(getPromoBanners());

    // Load ALL Data Sources
    const allTrips = getTrips().map(t => ({...t, type: 'trip' as const}));
    const allRentals = getRentals().map(r => ({...r, type: 'rental' as const}));
    const allExcursions = getExcursions().map(e => ({...e, type: 'excursion' as const}));
    const allHotels = getHotels().map(h => ({...h, type: 'hotel' as const}));
    const allInstallments = getInstallmentTrips().map(i => ({...i, type: 'installment' as const}));
    const allWorldCup = getWorldCupTrips().map(w => ({...w, type: 'worldcup' as const}));

    // Check if user is admin before showing simulation toast
    const isAdmin = localStorage.getItem('abras_isAdmin') === 'true';
    if (isAdmin) {
        setTimeout(() => setShowImportToast(true), 1000);
        setTimeout(() => setShowImportToast(false), 6000);
    }

    // Merge everything
    const fullInventory = [
        ...allTrips,
        ...allRentals,
        ...allExcursions,
        ...allHotels,
        ...allInstallments,
        ...allWorldCup
    ];

    // Split into Offers vs Regular Catalog
    const offers = fullInventory.filter(item => item.isOffer);
    const regular = fullInventory.filter(item => !item.isOffer); // Everything else goes to the main grid

    // Randomize offers slightly for variety
    setCombinedOffers(offers.sort(() => Math.random() - 0.5));
    
    // Set main catalog
    setAllItems(regular);

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

  // Filter Logic for Main Grid
  const getFilteredItems = () => {
      return allItems.filter(item => {
          // 1. Search Filter
          const matchesSearch = 
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(searchTerm.toLowerCase());
          
          // 2. Category Filter
          const matchesCategory = activeCategory === 'all' || item.type === activeCategory;

          return matchesSearch && matchesCategory;
      });
  };

  const filteredItems = getFilteredItems();

  const categories = [
      { id: 'all', label: 'Todos' },
      { id: 'trip', label: 'Paquetes' },
      { id: 'hotel', label: 'Hoteles' },
      { id: 'rental', label: 'Alquileres' },
      { id: 'excursion', label: 'Excursiones' },
      { id: 'installment', label: 'Cuotas' },
      { id: 'worldcup', label: 'Mundial' },
  ];

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
                    <h3 className="text-sm font-medium text-gray-900">Datos Actualizados</h3>
                    <div className="mt-1 text-sm text-gray-500">
                        <p>Inventario completo cargado exitosamente.</p>
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
                    placeholder="Busca por destino, hotel o experiencia..."
                    className="w-full pl-12 pr-4 py-3 rounded-full text-gray-800 focus:outline-none bg-transparent text-lg placeholder-gray-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button 
                    className="w-full md:w-auto mt-2 md:mt-0 bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 shadow-md"
                    onClick={() => {
                        const section = document.getElementById('explore-section');
                        if(section) section.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                  Buscar
                </button>
              </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-20">
        
        {/* MIXED OFFERS SECTION */}
        {combinedOffers.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center">
                 <h2 className="text-3xl font-bold text-gray-800 mr-4">Ofertas Destacadas</h2>
                 <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-lg border border-red-400">¡Tiempo Limitado!</span>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {combinedOffers.slice(0, 6).map((item, idx) => ( // Show max 6 offers on home
                <TripCard key={`offer-${item.type}-${item.id}-${idx}`} trip={item} />
              ))}
            </div>
          </div>
        )}

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

        {/* MAIN CATALOG SECTION (FILTERABLE) */}
        <div className="mt-8" id="explore-section">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-gray-200 pb-4 gap-4">
             <div>
                <span className="text-cyan-600 font-bold uppercase tracking-wider text-sm">Explora</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-1">
                    Todas las Opciones
                </h2>
             </div>
             
             {/* Category Filter Pills */}
             <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto">
                 {categories.map(cat => (
                     <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                            activeCategory === cat.id 
                            ? 'bg-cyan-600 text-white shadow-md' 
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                     >
                         {cat.label}
                     </button>
                 ))}
             </div>
          </div>
          
          {filteredItems.length === 0 ? (
             <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-xl text-gray-500">No encontramos resultados para tu búsqueda.</p>
                <button 
                    onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
                    className="mt-4 text-cyan-600 hover:text-cyan-800 underline font-medium"
                >
                    Ver todo el catálogo
                </button>
             </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in">
                {filteredItems.map(item => (
                  <TripCard key={`reg-${item.type}-${item.id}`} trip={item} />
                ))}
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
