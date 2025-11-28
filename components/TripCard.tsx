
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListingItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';

interface TripCardProps {
  trip: ListingItem;
}

const TripCard: React.FC<TripCardProps> = ({ trip: item }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();

  // Determine type safely
  const isRental = item.type === 'rental' || 'pricePerNight' in item;
  const isHotel = item.type === 'hotel' || ('stars' in item && 'pricePerNight' in item);
  const isInstallment = item.type === 'installment';
  const isWorldCup = item.type === 'worldcup';
  const isExcursion = item.type === 'excursion';

  const baseCurrency = (item as any).baseCurrency || 'ARS';
  const includesFlight = (item as any).includesFlight;
  const rating = (item as any).rating;
  const specialLabel = (item as any).specialLabel;
  const durationLabel = (item as any).durationLabel; 

  // Determine Link URL
  let linkUrl = `/trip/${item.id}`;
  if (isRental) linkUrl = `/rentals/${item.id}`;
  if (isExcursion) linkUrl = `/excursions/${item.id}`;
  if (isHotel) linkUrl = `/hotels/${item.id}`;
  if (isInstallment) linkUrl = `/installments/${item.id}`;
  if (isWorldCup) linkUrl = `/worldcup/${item.id}`;

  // Price Logic
  let displayPrice = 0;
  let priceLabel = 'Precio final por persona';

  if ('pricePerNight' in item) {
      displayPrice = (item as any).pricePerNight || 0;
      priceLabel = 'Precio por noche';
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
    <Link to={linkUrl} className="block group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200 overflow-hidden">
      
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
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{categoryLabel}</span>
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
        <p className="text-xs text-gray-500 mb-2">Saliendo desde Buenos Aires</p> {/* Static for style match or dynamic if avail */}
        
        {includesFlight && (
            <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                <span className="text-gray-400">Hotel + Vuelo</span>
            </p>
        )}

        {/* BADGES (Purple / Green) */}
        <div className="space-y-1 mb-4">
            {specialLabel && (
                <div className="inline-block bg-[#4c1d95] text-white text-xs font-bold px-2 py-0.5 rounded-md">
                    {specialLabel}
                </div>
            )}
            {hasDiscount && (
                <div className="inline-block bg-[#ccfbf1] text-[#0f766e] text-xs font-bold px-2 py-0.5 rounded-md ml-0 block w-fit">
                    Ahorrás {formatPrice(savingAmount, baseCurrency)}
                </div>
            )}
        </div>

        {/* PRICE SECTION */}
        <div className="pt-2 border-t border-gray-100">
            <p className="text-[10px] text-gray-500">{priceLabel}</p>
            {hasDiscount && (
                <p className="text-xs text-gray-400 line-through decoration-gray-400">
                    {formatPrice(originalPrice, baseCurrency)}
                </p>
            )}
            <div className="flex items-baseline gap-1">
                <span className="text-xs text-gray-500">$</span>
                <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(displayPrice, baseCurrency).replace(/[^0-9.,]/g, '')}
                </span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Incluye Impuestos, Tasas y Cargos</p>
        </div>

      </div>
    </Link>
  );
};

export default TripCard;
