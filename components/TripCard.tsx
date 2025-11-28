
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { ListingItem } from '../types';
import Countdown from './Countdown';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { generateSharePDF } from '../services/pdfShareService';

interface TripCardProps {
  trip: ListingItem;
}

const TripCard: React.FC<TripCardProps> = ({ trip: item }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Type Logic
  const isRental = item.type === 'rental' || 'pricePerNight' in item;
  const isHotel = item.type === 'hotel' || ('stars' in item && 'pricePerNight' in item);
  const isInstallment = item.type === 'installment';
  const isWorldCup = item.type === 'worldcup';
  const isExcursion = item.type === 'excursion';
  const isTrip = !isRental && !isExcursion && !isHotel && !isInstallment && !isWorldCup;

  // Features
  const baseCurrency = (item as any).baseCurrency || 'ARS';
  const includesFlight = (item as any).includesFlight;
  const rating = (item as any).rating;
  const duration = (item as any).duration || (isExcursion ? (item as any).duration : null);

  // URLs
  let linkUrl = `/trip/${item.id}`;
  if (isRental) linkUrl = `/rentals/${item.id}`;
  if (isExcursion) linkUrl = `/excursions/${item.id}`;
  if (isHotel) linkUrl = `/hotels/${item.id}`;
  if (isInstallment) linkUrl = `/installments/${item.id}`;
  if (isWorldCup) linkUrl = `/worldcup/${item.id}`;

  // Price Logic
  let displayPrice = 0;
  let rawPriceForCalc = 0;
  let priceLabel = '';
  let installmentCount = 1;

  if ('pricePerNight' in item) {
      displayPrice = (item as any).pricePerNight || 0;
      rawPriceForCalc = displayPrice;
      priceLabel = t('card.perNight');
  } else if (isInstallment && 'totalPrice' in item) {
      const total = (item as any).totalPrice || 0;
      rawPriceForCalc = total;
      const now = new Date();
      const depDate = new Date((item as any).departureDate);
      const diffMonths = (depDate.getFullYear() - now.getFullYear()) * 12 + (depDate.getMonth() - now.getMonth());
      installmentCount = diffMonths > 0 ? diffMonths : 1;
      displayPrice = total / installmentCount;
      priceLabel = t('card.perMonth');
  } else if (isWorldCup && 'totalPrice' in item) {
      const total = (item as any).totalPrice || 0;
      rawPriceForCalc = total;
      const now = new Date();
      const depDate = new Date('2026-06-01');
      const diffMonths = (depDate.getFullYear() - now.getFullYear()) * 12 + (depDate.getMonth() - now.getMonth());
      installmentCount = diffMonths > 0 ? diffMonths : 1;
      displayPrice = total / installmentCount;
      priceLabel = t('card.perMonth');
  } else if ('price' in item) {
      displayPrice = (item as any).price || 0;
      rawPriceForCalc = displayPrice;
      priceLabel = t('card.totalPrice');
  }

  const discount = (item as any).discount || 0;
  const hasDiscount = discount > 0;
  const originalPrice = hasDiscount && displayPrice > 0 ? displayPrice / (1 - (discount/100)) : 0;

  // Modal Calc
  const calculateDays = () => {
      if (!checkIn || !checkOut) return 1;
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return diffDays > 0 ? diffDays : 1;
  };
  
  const unitCount = (isHotel || isRental) ? calculateDays() : 1;
  let subtotal = 0;
  if (isHotel || isRental) subtotal = rawPriceForCalc * unitCount;
  else if (isInstallment || isWorldCup) subtotal = (item as any).totalPrice * guests;
  else subtotal = rawPriceForCalc * guests;

  const serviceFee = subtotal * 0.10;
  const totalEstimated = subtotal + serviceFee;

  // Nav
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  };
  const nextModalImage = (e: React.MouseEvent) => { e.stopPropagation(); setModalImageIndex((prev) => (prev + 1) % item.images.length); };
  const prevModalImage = (e: React.MouseEvent) => { e.stopPropagation(); setModalImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length); };

  const openQuickView = (e: React.MouseEvent) => {
      e.preventDefault(); e.stopPropagation();
      setModalImageIndex(0); 
      setIsQuickViewOpen(true);
  };

  const handleSharePdf = async () => {
      setIsGeneratingPdf(true);
      const priceString = displayPrice > 0 ? `${formatPrice(displayPrice, baseCurrency)}` : t('card.ask');
      await generateSharePDF(item, priceString);
      setIsGeneratingPdf(false);
  };

  // Determine Category Label
  let categoryLabel = t('card.package');
  if(isHotel) categoryLabel = t('card.hotel');
  if(isRental) categoryLabel = t('card.rental');
  if(isExcursion) categoryLabel = t('card.excursion');
  if(isWorldCup) categoryLabel = 'MUNDIAL 2026';
  if(isInstallment) categoryLabel = 'ABRAS CUOTAS';

  return (
    <>
    <div className="group bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative flex flex-col">
      {/* IMAGE SECTION */}
      <div className="relative h-52 w-full overflow-hidden">
        <Link to={linkUrl}>
            <img 
            src={item.images[currentImageIndex]} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
        </Link>
        
        {/* Manual Navigation Arrows (Visible on Hover) */}
        {item.images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
             <button onClick={prevImage} className="bg-black/50 text-white rounded-full p-1 hover:bg-black/70 pointer-events-auto">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
             </button>
             <button onClick={nextImage} className="bg-black/50 text-white rounded-full p-1 hover:bg-black/70 pointer-events-auto">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
             </button>
          </div>
        )}

        {/* DURATION BADGE (Floating on image border) */}
        {duration && (
            <div className="absolute bottom-4 left-0 z-20">
                <span className="bg-gray-800 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wide rounded-r shadow-lg">
                    {duration}
                </span>
            </div>
        )}
      </div>

      {/* CONTENT SECTION */}
      <div className="p-4 flex flex-col flex-grow relative">
        
        {/* Category Label */}
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            {categoryLabel}
        </span>

        {/* Title */}
        <Link to={linkUrl}>
            <h3 className="text-lg font-bold text-slate-800 leading-tight mb-1 group-hover:text-cyan-700 transition-colors line-clamp-2 min-h-[3.5rem]">
                {item.title}
            </h3>
        </Link>

        {/* Rating & Stars */}
        <div className="flex items-center mb-2">
            {rating && (
                <div className="bg-green-700 text-white text-xs font-bold px-1.5 py-0.5 rounded mr-2 flex items-center shadow-sm">
                    {rating}
                </div>
            )}
            {isHotel && (item as any).stars && (
                <div className="flex text-yellow-400 text-xs">
                    {Array((item as any).stars).fill(0).map((_, i) => <span key={i}>★</span>)}
                </div>
            )}
        </div>

        {/* Location */}
        <p className="text-xs text-gray-500 mb-3 line-clamp-1">
            {item.location}
        </p>

        {/* Amenities / Includes */}
        <div className="mb-4">
            {includesFlight ? (
                <span className="text-cyan-600 font-bold text-xs flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                    Hotel + Vuelo
                </span>
            ) : (isHotel || isRental) ? (
                <span className="text-cyan-600 font-bold text-xs">Alojamiento Seleccionado</span>
            ) : null}
        </div>

        {/* Offer Badge */}
        {item.isOffer && (
            <div className="mb-2">
                <span className="bg-purple-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                    Oferta Imbatible
                </span>
            </div>
        )}

        <div className="mt-auto border-t border-gray-100 pt-3">
            {/* Price Section */}
            <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-medium">
                    {priceLabel === t('card.perMonth') ? 'Valor cuota mensual' : 'Precio final por persona'}
                </span>
                
                <div className="flex items-end gap-2">
                    {displayPrice > 0 ? (
                        <>
                            <span className="text-2xl font-bold text-slate-800 leading-none">
                                {formatPrice(displayPrice, baseCurrency)}
                            </span>
                            {hasDiscount && (
                                <span className="text-xs text-gray-400 line-through mb-1">
                                    {formatPrice(originalPrice, baseCurrency)}
                                </span>
                            )}
                        </>
                    ) : (
                        <span className="text-lg font-bold text-cyan-700 uppercase">{t('card.ask')}</span>
                    )}
                </div>
                
                {displayPrice > 0 && (
                    <span className="text-[10px] text-gray-400 mt-1">
                        {t('card.taxes')}
                    </span>
                )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-3">
                <button onClick={openQuickView} className="text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 py-2 rounded transition-colors text-center">
                    + Info
                </button>
                <button onClick={handleSharePdf} disabled={isGeneratingPdf} className="text-xs font-bold text-white bg-cyan-700 hover:bg-cyan-800 py-2 rounded transition-colors text-center disabled:opacity-50">
                    {isGeneratingPdf ? '...' : 'Compartir'}
                </button>
            </div>
        </div>
      </div>
    </div>

    {/* Quick View Modal */}
    {isQuickViewOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsQuickViewOpen(false)}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] relative" onClick={e => e.stopPropagation()}>
                <div className="bg-cyan-700 p-4 text-white flex justify-between items-center shrink-0">
                    <h3 className="font-bold text-lg truncate pr-4">{item.title}</h3>
                    <button onClick={() => setIsQuickViewOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                <div className="overflow-y-auto">
                    <div className="relative h-64 w-full bg-gray-100 group">
                        <img src={item.images[modalImageIndex]} alt="view" className="w-full h-full object-cover" />
                        {item.images.length > 1 && (
                            <>
                                <button onClick={prevModalImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
                                <button onClick={nextModalImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
                                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded font-mono">{modalImageIndex + 1} / {item.images.length}</div>
                            </>
                        )}
                    </div>
                    <div className="p-6">
                        <button onClick={handleSharePdf} disabled={isGeneratingPdf} className="w-full mb-6 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50">
                            {isGeneratingPdf ? 'Generando...' : 'Descargar PDF'}
                        </button>
                        <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-2 font-bold uppercase">{t('booking.availability')}</p>
                            {(isHotel || isRental) ? (
                                <div className="grid grid-cols-2 gap-2">
                                    <div><label className="text-xs text-gray-400">Check-in</label><input type="date" className="w-full border rounded p-1 text-sm" value={checkIn} onChange={e=>setCheckIn(e.target.value)} /></div>
                                    <div><label className="text-xs text-gray-400">Check-out</label><input type="date" className="w-full border rounded p-1 text-sm" min={checkIn} value={checkOut} onChange={e=>setCheckOut(e.target.value)} /></div>
                                </div>
                            ) : (
                                <div className="bg-gray-50 p-2 rounded max-h-32 overflow-y-auto border text-sm">
                                    {(item as any).availableDates?.length > 0 ? (item as any).availableDates.map((d:string, i:number) => <div key={i} className="mb-1 pb-1 border-b border-gray-200">{d}</div>) : <span className="text-gray-400">{t('card.details')}</span>}
                                </div>
                            )}
                        </div>
                        <div className="mb-6 flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-700">{t('booking.passengers')}</span>
                            <div className="flex items-center border rounded"><button onClick={()=>setGuests(Math.max(1, guests-1))} className="px-3 py-1 bg-gray-100">-</button><span className="px-3 font-bold">{guests}</span><button onClick={()=>setGuests(guests+1)} className="px-3 py-1 bg-gray-100">+</button></div>
                        </div>
                        <div className="bg-cyan-50 p-4 rounded-lg space-y-2 text-sm mb-6">
                            <div className="flex justify-between text-gray-600"><span>Base</span><span>{formatPrice(subtotal, baseCurrency)}</span></div>
                            <div className="flex justify-between font-bold text-orange-600"><span>{t('booking.serviceFee')} (10%)</span><span>{formatPrice(serviceFee, baseCurrency)}</span></div>
                            <div className="flex justify-between font-bold text-lg text-gray-800 pt-2 border-t border-cyan-100 mt-2"><span>{t('booking.total')}</span><span>{formatPrice(totalEstimated, baseCurrency)}</span></div>
                        </div>
                        <Link to={linkUrl} className="block w-full text-center bg-cyan-600 text-white font-bold py-3 rounded-lg hover:bg-cyan-700 transition-colors shadow-lg">{t('booking.continue')}</Link>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )}
    </>
  );
};

export default TripCard;
