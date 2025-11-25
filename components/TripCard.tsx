
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ListingItem } from '../types';
import Countdown from './Countdown';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';

interface TripCardProps {
  trip: ListingItem;
}

const TripCard: React.FC<TripCardProps> = ({ trip: item }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();

  // Quick View Logic State
  const [guests, setGuests] = useState(2);
  // For Hotels/Rentals
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  // Determine type
  const isRental = item.type === 'rental';
  const isExcursion = item.type === 'excursion';
  const isHotel = item.type === 'hotel';
  const isInstallment = item.type === 'installment';
  const isTrip = !isRental && !isExcursion && !isHotel && !isInstallment;

  // Extra features for Trips (Flight) and Others (Rating)
  const includesFlight = (item as any).includesFlight;
  const rating = (item as any).rating;

  // Determine Link URL
  let linkUrl = `/trip/${item.id}`;
  if (isRental) linkUrl = `/rentals/${item.id}`;
  if (isExcursion) linkUrl = `/excursions/${item.id}`;
  if (isHotel) linkUrl = `/hotels/${item.id}`;
  if (isInstallment) linkUrl = `/installments/${item.id}`;

  // Determine Prices & Discounts
  let basePrice = 0;
  let priceLabel = '';
  let installmentCount = 0;
  let installmentValue = 0;

  if (isRental || isHotel) {
      basePrice = (item as any).pricePerNight || 0;
      priceLabel = t('card.perNight');
  } else if (isInstallment) {
      basePrice = (item as any).totalPrice || 0;
      // Calculate months diff
      const now = new Date();
      const depDate = new Date((item as any).departureDate);
      const diffMonths = (depDate.getFullYear() - now.getFullYear()) * 12 + (depDate.getMonth() - now.getMonth());
      installmentCount = diffMonths > 0 ? diffMonths : 1;
      installmentValue = basePrice / installmentCount;
      priceLabel = t('card.perMonth');
  } else {
      basePrice = (item as any).price || 0;
      priceLabel = t('card.totalPrice');
  }

  // Discount Logic
  const discount = (item as any).discount || 0;
  const hasDiscount = discount > 0;
  // If basePrice is the selling price, calculate original.
  const originalPrice = hasDiscount ? basePrice / (1 - (discount/100)) : 0;
  
  // Decide what numeric value to display in the main slot
  const displayPrice = isInstallment ? installmentValue : basePrice;


  // Calculate Totals for Modal
  const calculateDays = () => {
      if (!checkIn || !checkOut) return 1;
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return diffDays > 0 ? diffDays : 1;
  };
  
  const unitCount = (isHotel || isRental) ? calculateDays() : 1;
  
  // Subtotal logic varies
  const subtotal = (isHotel || isRental) 
    ? basePrice * unitCount 
    : (isInstallment ? basePrice * guests : basePrice * guests); 

  const serviceFee = subtotal * 0.10;
  const totalEstimated = subtotal + serviceFee;

  // Auto-play carousel
  useEffect(() => {
    if (item.images.length <= 1 || isHovered) return;
    const intervalDuration = 3000 + Math.random() * 2000;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
    }, intervalDuration);
    return () => clearInterval(interval);
  }, [item.images.length, isHovered]);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  const openQuickView = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsQuickViewOpen(true);
  };

  return (
    <>
    <div 
      className={`group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${item.isOffer ? 'border-2 border-orange-400' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-56 overflow-hidden">
        {/* Image Display */}
        <Link to={linkUrl}>
            <img 
            src={item.images[currentImageIndex]} 
            alt={`${item.title} - view`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
        </Link>
        
        {/* Controls */}
        {item.images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}

        {/* OFFER & DISCOUNT BADGES */}
        <div className="absolute top-0 right-0 flex flex-col items-end z-10">
            {item.isOffer && (
            <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg mb-1 shadow">
                {t('card.offer')}
            </div>
            )}
            {hasDiscount && (
                <div className="bg-red-600 text-white text-sm font-extrabold px-3 py-1 rounded-l-lg shadow-md animate-pulse">
                    {discount}% OFF
                </div>
            )}
        </div>

        <div className="absolute top-2 left-2 z-10 flex flex-col items-start gap-1">
           <div className="flex gap-1">
                {isRental && <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow">{t('card.rental')}</span>}
                {isExcursion && <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow">{t('card.excursion')}</span>}
                {isHotel && <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow">{t('card.hotel')}</span>}
                {isInstallment && <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow">ABRAS CUOTAS</span>}
           </div>
           
           {/* Flight Included Badge */}
           {includesFlight && (
               <div className="bg-sky-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow flex items-center">
                   <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                   Incluye Vuelo
               </div>
           )}
        </div>
        
        {/* Rating Badge (Despegar Style) */}
        {rating && (
            <div className="absolute bottom-2 right-2 bg-blue-900 text-white text-xs font-bold px-2 py-1 rounded flex items-center shadow">
                <span className="text-sm mr-1">{rating}</span>
                <span className="font-normal opacity-80 text-[10px]">Fantástico</span>
            </div>
        )}

        {item.isOffer && (item as any).offerExpiresAt && (
          <div className="absolute bottom-2 left-2 z-10"><Countdown targetDate={(item as any).offerExpiresAt} /></div>
        )}
      </div>
      
      <div className="p-5 flex flex-col h-full min-h-[220px]">
        <Link to={linkUrl} className="block">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-cyan-600 transition-colors line-clamp-1 mb-1">
                {item.title}
            </h3>
        </Link>
        
        {isHotel && (item as any).stars && (
            <div className="flex text-yellow-400 mb-2 text-sm">
                {Array((item as any).stars).fill(0).map((_, i) => (
                    <span key={i}>★</span>
                ))}
            </div>
        )}

        <p className="text-sm text-gray-500 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-1 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          {item.location}
        </p>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
          {item.description}
        </p>
        
        <div className="flex flex-col mt-auto pt-4 border-t border-gray-100 gap-3">
          <div className="flex justify-between items-end">
              <div className="flex flex-col w-full">
                <span className="text-xs text-gray-400 uppercase font-bold tracking-wide mb-1">
                    {isInstallment ? `${installmentCount} ${t('card.installments')} ${t('card.of')}` : t('card.from')}
                </span>
                
                {/* PRICE DISPLAY */}
                <div className="flex flex-wrap items-baseline gap-2">
                    {hasDiscount && !isInstallment && (
                        <span className="text-xs text-gray-400 line-through decoration-red-500">
                            {formatPrice(originalPrice)}
                        </span>
                    )}
                    
                    {displayPrice > 0 ? (
                        <div className="flex items-baseline gap-1">
                            <span className={`text-2xl font-bold ${hasDiscount ? 'text-red-600' : 'text-gray-800'}`}>
                                {formatPrice(displayPrice)}
                            </span>
                            <span className="text-xs text-gray-500 font-medium bg-gray-100 px-1 rounded">{priceLabel}</span>
                        </div>
                    ) : (
                        <span className="text-xl font-bold text-cyan-700 uppercase">
                            {t('card.ask')}
                        </span>
                    )}
                </div>
              </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-2">
              <button 
                onClick={openQuickView}
                className="flex items-center justify-center px-3 py-2 bg-gray-50 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors border border-gray-200"
              >
                  + Info
              </button>
              <Link 
                to={linkUrl}
                className="flex items-center justify-center px-3 py-2 bg-cyan-600 text-white text-sm font-bold rounded-lg hover:bg-cyan-700 transition-colors"
              >
                {t('card.details')}
              </Link>
          </div>
        </div>
      </div>
    </div>

    {/* Quick View Modal */}
    {isQuickViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsQuickViewOpen(false)}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="bg-cyan-700 p-4 text-white flex justify-between items-center">
                    <h3 className="font-bold text-lg">{t('booking.budget')}: {item.title}</h3>
                    <button onClick={() => setIsQuickViewOpen(false)} className="hover:bg-white/20 p-1 rounded"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                <div className="p-6">
                    <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2 font-bold uppercase">{t('booking.availability')}</p>
                        {(isHotel || isRental) ? (
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs text-gray-400">Check-in</label>
                                    <input type="date" className="w-full border rounded p-1 text-sm" value={checkIn} onChange={e=>setCheckIn(e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400">Check-out</label>
                                    <input type="date" className="w-full border rounded p-1 text-sm" min={checkIn} value={checkOut} onChange={e=>setCheckOut(e.target.value)} />
                                </div>
                            </div>
                        ) : isInstallment ? (
                             <div className="bg-indigo-50 p-2 rounded text-center border border-indigo-100 text-indigo-800">
                                 {t('booking.departureDate')}: <strong>{(item as any).departureDate}</strong>
                             </div>
                        ) : (
                            <div className="bg-gray-50 p-2 rounded max-h-32 overflow-y-auto border text-sm">
                                {(item as any).availableDates?.length > 0 ? (item as any).availableDates.map((d:string, i:number) => (
                                    <div key={i} className="mb-1 pb-1 border-b border-gray-200 last:border-0">{d}</div>
                                )) : <span className="text-gray-400">{t('card.details')}</span>}
                            </div>
                        )}
                    </div>
                    
                    <div className="mb-6">
                         <div className="flex justify-between items-center mb-2">
                             <span className="text-sm font-bold text-gray-700">{t('booking.passengers')} / {t('filters.guests')}</span>
                             <div className="flex items-center border rounded">
                                 <button onClick={()=>setGuests(Math.max(1, guests-1))} className="px-3 py-1 bg-gray-100 hover:bg-gray-200">-</button>
                                 <span className="px-3 font-bold">{guests}</span>
                                 <button onClick={()=>setGuests(guests+1)} className="px-3 py-1 bg-gray-100 hover:bg-gray-200">+</button>
                             </div>
                         </div>
                    </div>

                    <div className="bg-cyan-50 p-4 rounded-lg space-y-2 text-sm mb-6">
                        <div className="flex justify-between text-gray-600">
                            <span>Base {(isHotel || isRental) ? `(${unitCount} ${t('card.night')})` : 'x Persona'}</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        {hasDiscount && (
                           <div className="flex justify-between text-green-600 font-bold">
                               <span>Descuento aplicado ({discount}%)</span>
                               <span>-</span>
                           </div>
                        )}
                        <div className="flex justify-between font-bold text-orange-600">
                            <span>{t('booking.serviceFee')} (10%)</span>
                            <span>{formatPrice(serviceFee)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg text-gray-800 pt-2 border-t border-cyan-100 mt-2">
                            <span>{t('booking.total')}</span>
                            <span>{formatPrice(totalEstimated)}</span>
                        </div>
                    </div>

                    <Link 
                        to={linkUrl}
                        className="block w-full text-center bg-cyan-600 text-white font-bold py-3 rounded-lg hover:bg-cyan-700 transition-colors shadow-lg"
                    >
                        {t('booking.continue')}
                    </Link>
                </div>
            </div>
        </div>
    )}
    </>
  );
};

export default TripCard;
