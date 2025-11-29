
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRentalById } from '../services/rentalService';
import { Apartment } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { generateSharePDF } from '../services/pdfShareService';

const RentalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [rental, setRental] = useState<Apartment | undefined>(undefined);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSharingMenuOpen, setIsSharingMenuOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (id) {
      getRentalById(id).then(setRental);
    }
  }, [id]);

  useEffect(() => {
    if (!rental || rental.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % rental.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [rental, currentImageIndex]);

  const calculateDays = () => {
      if (!checkIn || !checkOut) return 0;
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return diffDays;
  };

  const nights = calculateDays();
  const totalPrice = rental ? rental.pricePerNight * nights : 0;
  const bookingFee = totalPrice * 0.10;

  const handleInitiateBooking = () => {
    if (!nights || nights <= 0) {
        alert("Por favor seleccione fechas válidas (mínimo 1 noche)");
        return;
    }
    window.open("https://wa.me/message/TVC7DUGWGV27G1", "_blank");
  };

  const handleSharePdf = async () => {
    if (!rental) return;
    setIsGeneratingPdf(true);
    const itemForPdf = { ...rental, type: 'rental' as const };
    await generateSharePDF(itemForPdf, formatPrice(rental.pricePerNight));
    setIsGeneratingPdf(false);
    setIsSharingMenuOpen(false);
  };

  const shareUrl = window.location.href;
  const shareText = `Mira este alquiler en ABRAS Travel: ${rental?.title}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(rental?.title || '')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;

  if (!rental) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div></div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <div>
                  <h1 className="text-lg md:text-xl font-bold text-gray-800 leading-tight truncate max-w-[200px] md:max-w-md">{rental.title}</h1>
                  <p className="text-gray-500 text-xs flex items-center mt-1">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {rental.location}
                  </p>
              </div>
              <div className="relative">
                  <button onClick={() => setIsSharingMenuOpen(!isSharingMenuOpen)} disabled={isGeneratingPdf} className="p-2 md:p-3 rounded-full hover:bg-gray-100 text-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 flex items-center gap-2" title="Compartir">
                      {isGeneratingPdf ? (<svg className="animate-spin h-5 w-5 text-cyan-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>) : (<svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>)}
                  </button>
                  {isSharingMenuOpen && (
                      <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsSharingMenuOpen(false)}></div>
                          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-fade-in-up">
                              <div className="p-2">
                                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors" onClick={()=>setIsSharingMenuOpen(false)}><span className="text-green-500 font-bold">WhatsApp</span></a>
                                  <a href={emailUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors" onClick={()=>setIsSharingMenuOpen(false)}><span className="text-blue-500 font-bold">Email</span></a>
                                  <button onClick={handleSharePdf} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors text-left"><span className="text-red-500 font-bold">Descargar PDF</span></button>
                              </div>
                          </div>
                      </>
                  )}
              </div>
          </div>
      </div>
      <div className="relative h-[60vh] w-full overflow-hidden group">
        <img src={rental.images[currentImageIndex]} alt={rental.title} className="w-full h-full object-cover transition-opacity duration-500" />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-7xl mx-auto">
            <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">ALQUILER TEMPORARIO</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{rental.title}</h1>
            <p className="text-white/90 text-lg flex items-center"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{rental.location}</p>
          </div>
        </div>
      </div>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${rental.images.length > 1 ? '' : '-mt-10 relative z-10'} grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8`}>
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center text-gray-700"><span className="font-bold text-xl mr-2">{rental.bedrooms}</span> Habitaciones</div>
                <div className="flex items-center text-gray-700"><span className="font-bold text-xl mr-2">{rental.maxGuests}</span> Huéspedes Máx.</div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Descripción</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6 whitespace-pre-line">{rental.description}</p>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Comodidades</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {rental.amenities.map((amenity, idx) => (<div key={idx} className="flex items-center text-gray-600"><svg className="w-4 h-4 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{amenity}</div>))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border border-gray-100">
            <div className="flex justify-between items-end mb-6">
              <span className="text-gray-500">Precio por noche</span>
              <div className="text-right">
                  {rental.discount && (<span className="text-sm text-gray-400 line-through mr-2">{formatPrice(rental.pricePerNight / (1 - rental.discount/100))}</span>)}
                  <span className="text-3xl font-bold text-cyan-600">{formatPrice(rental.pricePerNight)}</span>
              </div>
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleInitiateBooking(); }}>
              <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label><input type="date" required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-cyan-500" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label><input type="date" required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-cyan-500" min={checkIn} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} /></div>
              </div>
              {nights > 0 && (<div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm"><div className="flex justify-between"><span>{formatPrice(rental.pricePerNight)} x {nights} noches</span><span>{formatPrice(totalPrice)}</span></div><div className="flex justify-between font-bold text-orange-600 pt-2 border-t border-gray-200"><span>Reserva (10%)</span><span>{formatPrice(bookingFee)}</span></div><p className="text-xs text-gray-400 mt-1">El resto se abona al llegar a la propiedad.</p></div>)}
              <button type="submit" disabled={nights <= 0} className="w-full bg-cyan-600 disabled:bg-gray-300 text-white font-bold py-4 rounded-lg hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-500/30 mt-4">Solicitar Reserva</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalDetails;
