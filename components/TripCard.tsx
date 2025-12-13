
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListingItem, Apartment } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';

interface TripCardProps {
  trip: ListingItem;
}

const TripCard: React.FC<TripCardProps> = ({ trip: item }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useLanguage();
  const { formatPrice, currency } = useCurrency();

  // Determine type safely
  const isRental = item.type === 'rental';
  const isHotel = item.type === 'hotel';
  const isInstallment = item.type === 'installment';
  const isWorldCup = item.type === 'worldcup';
  const isExcursion = item.type === 'excursion';
  const isGroup = item.type === 'group';

  const baseCurrency = (item as any).baseCurrency || 'USD';
  const includesFlight = (item as any).includesFlight;
  const rating = (item as any).rating;
  const specialLabel = (item as any).specialLabel;
  const durationLabel = (item as any).durationLabel; 
  const isOffer = (item as any).isOffer;

  // Determine Link URL
  let linkUrl = `/trip/${item.id}`;
  if (isRental) linkUrl = `/rentals/${item.id}`;
  if (isExcursion) linkUrl = `/excursions/${item.id}`;
  if (isHotel) linkUrl = `/hotels/${item.id}`;
  if (isInstallment) linkUrl = `/installments/${item.id}`;
  if (isWorldCup) linkUrl = `/worldcup/${item.id}`;
  if (isGroup) linkUrl = `/groups/${item.id}`;

  // Price Logic
  let displayPrice = 0;
  let priceLabel = 'Precio final por persona';

  if ('pricePerNight' in item) {
      displayPrice = (item as any).pricePerNight || 0;
      
      // Robust check for monthly frequency, regardless of type tag
      const freq = (item as any).priceFrequency;
      if (freq === 'monthly') {
          priceLabel = 'Precio por mes';
      } else {
          priceLabel = 'Precio por noche';
      }

  } else if (isInstallment || isWorldCup) {
      const total = (item as any).totalPrice || 0;
      displayPrice = total; // Just show total or calculate monthly if needed, keeping simple for this view
      priceLabel = 'Precio Total';
  } else if ('price' in item) {
      displayPrice = (item as any).price || 0;
  }

  const discount = (item as any).discount || 0;
  const hasDiscount = discount > 0;
  const originalPrice = hasDiscount && displayPrice > 0 ? displayPrice / (1 - (discount/100)) : 0;
  const savingAmount = originalPrice - displayPrice;

  // Category Label
  let categoryLabel = "PAQUETE";
  if (isHotel) categoryLabel = "HOTEL";
  if (isRental) categoryLabel = "ALQUILER";
  if (isExcursion) categoryLabel = "EXCURSIÓN";
  if (isWorldCup) categoryLabel = "EVENTO DEPORTIVO";
  if (isInstallment) categoryLabel = "PLAN AHORRO";
  if (isGroup) categoryLabel = "SALIDA GRUPAL";

  // Manual Navigation
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  return (
    <Link 
      to={linkUrl} 
      className={`block group bg-white rounded-xl overflow-hidden transition-all duration-300 relative ${
        isOffer 
          ? 'border-2 border-orange-400 shadow-xl transform hover:-translate-y-1' 
          : 'border border-gray-200 shadow-sm hover:shadow-lg'
      }`}
    >
      
      {/* BRAND HEADER FOR OFFERS */}
      {isOffer && (
        <div className="bg-gradient-to-r from-orange-500 to-cyan-600 text-white text-[10px] font-bold text-center py-1 tracking-widest uppercase shadow-sm">
           ★ Recomendado ABRAS Travel ★
        </div>
      )}

      {/* IMAGE SECTION */}
      <div className="relative h-48 overflow-hidden">
        <img 
            src={item.images[currentImageIndex]} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Navigation Arrows */}
        {item.images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}

        {/* DURATION BADGE (Bottom Left of Image) */}
        {durationLabel && (
            <div className="absolute bottom-2 left-0 bg-gray-800/90 text-white text-[10px] font-bold px-2 py-1 rounded-r-md uppercase tracking-wide">
                {durationLabel}
            </div>
        )}
      </div>

      {/* CONTENT SECTION */}
      <div className="p-4">
        
        {/* Category & Title */}
        <div className="mb-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isGroup ? 'text-purple-600' : 'text-gray-500'}`}>{categoryLabel}</span>
            <h3 className="text-lg font-bold text-gray-800 leading-tight mt-1 line-clamp-2">{item.title}</h3>
        </div>

        {/* Rating */}
        {rating && (
            <div className="flex items-center gap-2 mb-2">
                <div className="bg-indigo-100 text-indigo-700 text-xs font-bold px-1.5 py-0.5 rounded border border-indigo-200">{rating}</div>
                <div className="flex text-orange-400 text-xs">
                    {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
                </div>
            </div>
        )}

        {/* Location / Details */}
        <p className="text-xs text-gray-500 mb-2 truncate flex items-center">
            <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {item.location}
        </p>
        
        {includesFlight && (
            <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded flex items-center gap-1 font-semibold">
                    ✈️ Hotel + Vuelo
                </span>
            </p>
        )}

        {/* BADGES (Purple / Green) */}
        <div className="space-y-1 mb-4 min-h-[48px]">
            {specialLabel && (
                <div className="inline-block bg-[#4c1d95] text-white text-xs font-bold px-2 py-0.5 rounded-md shadow-sm">
                    {specialLabel}
                </div>
            )}
            {hasDiscount && (
                <div className="bg-[#ccfbf1] text-[#0f766e] text-xs font-bold px-2 py-0.5 rounded-md w-fit mt-1 shadow-sm">
                    Ahorrás {formatPrice(savingAmount, baseCurrency)}
                </div>
            )}
        </div>

        {/* PRICE SECTION */}
        <div className="pt-2 border-t border-gray-100">
            <p className="text-[10px] text-gray-500 uppercase font-semibold">{priceLabel}</p>
            {hasDiscount && (
                <p className="text-xs text-gray-400 line-through decoration-gray-400">
                    {formatPrice(originalPrice, baseCurrency)}
                </p>
            )}
            <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-bold ${isOffer ? 'text-orange-600' : 'text-gray-900'}`}>
                    {formatPrice(displayPrice, baseCurrency)}
                </span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Incluye Impuestos, Tasas y Cargos</p>
        </div>

      </div>
    </Link>
  );
};

export default TripCard;
