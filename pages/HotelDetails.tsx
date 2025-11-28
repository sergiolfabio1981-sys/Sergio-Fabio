
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHotelById } from '../services/hotelService';
import { Hotel } from '../types';
import { ADMIN_EMAIL } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { generateSharePDF } from '../services/pdfShareService';

declare global {
  interface Window {
    jspdf: any;
  }
}

interface PassengerData {
  fullName: string;
  dni: string;
  email: string;
  phone: string;
}

const HotelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<Hotel | undefined>(undefined);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Booking State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [passenger, setPassenger] = useState<PassengerData>({ fullName: '', dni: '', email: '', phone: '' });
  
  // Payment State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  const [availableSpots, setAvailableSpots] = useState(8); // Start higher for hotels
  const [isPaid, setIsPaid] = useState(false);

  // Sharing State
  const [isSharingMenuOpen, setIsSharingMenuOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const { t } = useLanguage();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (id) {
      setHotel(getHotelById(id));
    }
  }, [id]);

  // Auto-play Carousel
  useEffect(() => {
    if (!hotel || hotel.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [hotel, currentImageIndex]);

  const calculateDays = () => {
      if (!checkIn || !checkOut) return 0;
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return diffDays > 0 ? diffDays : 0;
  };

  const nights = calculateDays();
  const totalPrice = hotel ? hotel.pricePerNight * nights : 0;
  const bookingFee = totalPrice * 0.10; // 10% reserve

  const generateBookingCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'HTL-';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleInitiateBooking = () => {
    if (!nights || nights <= 0) {
        alert("Por favor seleccione fechas válidas (mínimo 1 noche)");
        return;
    }
    setIsBookingModalOpen(true);
  };

  const handlePassengerChange = (field: keyof PassengerData, value: string) => {
    setPassenger(prev => ({ ...prev, [field]: value }));
  };

  const handleDataSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCode = generateBookingCode();
    setBookingCode(newCode);
    
    console.log(`📧 Enviando reserva hotel ${newCode} a ${ADMIN_EMAIL}...`);
    setIsBookingModalOpen(false);
    setIsPaymentModalOpen(true);
    
    // Urgency countdown logic
    let currentSpots = 8;
    setAvailableSpots(currentSpots);
    const interval = setInterval(() => {
        if (currentSpots > 2) {
            currentSpots -= 1;
            setAvailableSpots(currentSpots);
        } else {
            clearInterval(interval);
        }
    }, 3500);
  };

  const handlePay = () => {
      window.open("https://link.mercadopago.com.ar/lumat2", "_blank");
      setIsPaid(true);
  };

  const generateVoucherPDF = () => {
    if (!hotel) return;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(`Voucher Hotel: ${bookingCode}`, 20, 20);
    doc.save(`Hotel-${bookingCode}.pdf`);
  };

  // --- SHARE LOGIC ---
  const handleSharePdf = async () => {
    if (!hotel) return;
    setIsGeneratingPdf(true);
    // Pass 'hotel' as ListingItem
    const itemForPdf = { ...hotel, type: 'hotel' as const };
    await generateSharePDF(itemForPdf, formatPrice(hotel.pricePerNight));
    setIsGeneratingPdf(false);
    setIsSharingMenuOpen(false);
  };

  const shareUrl = window.location.href;
  const shareText = `Mira este hotel en ABRAS Travel: ${hotel?.title}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(hotel?.title || '')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;

  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Hotel no encontrado</h2>
        <Link to="/hotels" className="text-blue-600 hover:underline">Volver a Hoteles</Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Sticky Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <div>
                  <h1 className="text-lg md:text-xl font-bold text-gray-800 leading-tight truncate max-w-[200px] md:max-w-md">{hotel.title}</h1>
                  <p className="text-gray-500 text-xs flex items-center mt-1">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {hotel.location}
                  </p>
              </div>
              
              {/* Share Menu */}
              <div className="relative">
                  <button 
                    onClick={() => setIsSharingMenuOpen(!isSharingMenuOpen)} 
                    disabled={isGeneratingPdf}
                    className="p-2 md:p-3 rounded-full hover:bg-gray-100 text-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 flex items-center gap-2"
                    title="Compartir"
                  >
                      {isGeneratingPdf ? (
                          <svg className="animate-spin h-5 w-5 text-cyan-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                      ) : (
                          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                      )}
                  </button>

                  {isSharingMenuOpen && (
                      <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsSharingMenuOpen(false)}></div>
                          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-fade-in-up">
                              <div className="p-2">
                                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors" onClick={()=>setIsSharingMenuOpen(false)}>
                                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.897.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                      WhatsApp
                                  </a>
                                  <a href={emailUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors" onClick={()=>setIsSharingMenuOpen(false)}>
                                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                      Email
                                  </a>
                                  <button onClick={handleSharePdf} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors text-left">
                                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                      Descargar PDF
                                  </button>
                              </div>
                          </div>
                      </>
                  )}
              </div>
          </div>
      </div>

      {/* Hero Carousel */}
      <div className="relative h-[60vh] w-full overflow-hidden group">
        <img 
            src={hotel.images[currentImageIndex]} 
            alt={hotel.title} 
            className="w-full h-full object-cover transition-opacity duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        {/* Carousel Controls */}
        {hotel.images.length > 1 && (
             <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                 <button 
                    onClick={() => setCurrentImageIndex((currentImageIndex - 1 + hotel.images.length) % hotel.images.length)} 
                    className="pointer-events-auto bg-black/30 text-white p-3 rounded-full hover:bg-black/50 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                 >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                 </button>
                 <button 
                    onClick={() => setCurrentImageIndex((currentImageIndex + 1) % hotel.images.length)} 
                    className="pointer-events-auto bg-black/30 text-white p-3 rounded-full hover:bg-black/50 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                 >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                 </button>
             </div>
        )}

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">HOTEL & RESORT</span>
                <div className="flex text-yellow-400 drop-shadow-md">
                     {Array(hotel.stars).fill(0).map((_,i)=><span key={i} className="text-xl">★</span>)}
                </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">{hotel.title}</h1>
            <p className="text-white/90 text-lg flex items-center drop-shadow-md">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {hotel.location}
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Thumbnails */}
      {hotel.images.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 mb-8">
            <div className="flex gap-2 overflow-x-auto pb-4 pt-4 scrollbar-hide snap-x">
                {hotel.images.map((img, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden border-2 transition-all shadow-md snap-start ${idx === currentImageIndex ? 'border-orange-500 scale-105 ring-2 ring-orange-200' : 'border-white opacity-80 hover:opacity-100'}`}
                    >
                        <img src={img} className="w-full h-full object-cover" alt={`View ${idx}`} />
                    </button>
                ))}
            </div>
        </div>
      )}

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${hotel.images.length > 1 ? '' : '-mt-10 relative z-10'} grid grid-cols-1 lg:grid-cols-3 gap-8`}>
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Acerca del Alojamiento</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-8 whitespace-pre-line">{hotel.description}</p>
            
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                Servicios y Comodidades
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                {hotel.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-start text-gray-700">
                        <svg className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="text-sm font-medium">{amenity}</span>
                    </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right Content: Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-xl p-6 sticky top-24 border border-blue-100">
            <div className="flex justify-between items-end mb-6">
              <span className="text-gray-500 font-medium">Precio por noche</span>
              <div className="text-right">
                  {hotel.discount && (
                      <span className="text-sm text-gray-400 line-through mr-2">{formatPrice(hotel.pricePerNight / (1 - hotel.discount/100))}</span>
                  )}
                  <span className="text-3xl font-bold text-blue-700">{formatPrice(hotel.pricePerNight)}</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleInitiateBooking(); }}>
              <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Check-in</label>
                    <input 
                        type="date" 
                        required
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Check-out</label>
                    <input 
                        type="date" 
                        required
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        min={checkIn}
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
              </div>

              {nights > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm mt-4 border border-blue-100">
                      <div className="flex justify-between text-gray-700">
                          <span>{formatPrice(hotel.pricePerNight)} x {nights} noches</span>
                          <span>{formatPrice(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-orange-600 pt-2 border-t border-blue-200 mt-2">
                          <span>Reserva (10%)</span>
                          <span>{formatPrice(bookingFee)}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 italic">El saldo restante se abona en el hotel.</p>
                  </div>
              )}

              <button 
                type="submit"
                disabled={nights <= 0}
                className="w-full bg-blue-600 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 mt-4 transform hover:-translate-y-1"
              >
                {nights > 0 ? 'Continuar Reserva' : 'Selecciona Fechas'}
              </button>
              
              <div className="text-center mt-4 text-xs text-gray-400 flex items-center justify-center gap-1">
                 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                 Reserva segura y garantizada
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Passenger Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in">
            <div className="p-6 bg-blue-700 text-white flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Datos del Titular</h2>
                    <p className="text-blue-200 text-xs">A nombre de quién quedará la reserva</p>
                </div>
                <button onClick={() => setIsBookingModalOpen(false)} className="bg-blue-800/50 p-2 rounded-full hover:bg-blue-800"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <form onSubmit={handleDataSubmit} className="p-8 space-y-5">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre Completo</label>
                    <input type="text" required value={passenger.fullName} onChange={(e) => handlePassengerChange('fullName', e.target.value)} className="w-full border-b-2 border-gray-200 focus:border-blue-500 outline-none py-2 transition-colors" placeholder="Ej: Juan Pérez" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">DNI / Pasaporte</label>
                    <input type="text" required value={passenger.dni} onChange={(e) => handlePassengerChange('dni', e.target.value)} className="w-full border-b-2 border-gray-200 focus:border-blue-500 outline-none py-2 transition-colors" placeholder="Número de documento" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                    <input type="email" required value={passenger.email} onChange={(e) => handlePassengerChange('email', e.target.value)} className="w-full border-b-2 border-gray-200 focus:border-blue-500 outline-none py-2 transition-colors" placeholder="nombre@ejemplo.com" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Teléfono</label>
                    <input type="tel" required value={passenger.phone} onChange={(e) => handlePassengerChange('phone', e.target.value)} className="w-full border-b-2 border-gray-200 focus:border-blue-500 outline-none py-2 transition-colors" placeholder="+54 9 11..." />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 mt-4 shadow-lg shadow-blue-500/30">
                    Ir a Pagar
                </button>
            </form>
          </div>
        </div>
      )}

      {/* Payment / Urgency Modal */}
      {isPaymentModalOpen && (
         <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
                {!isPaid ? (
                    <>
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-center text-white">
                            <h3 className="text-2xl font-bold mb-1">¡Último Paso!</h3>
                            <p className="text-orange-100 text-sm opacity-90">Confirma tu reserva antes de que se agote.</p>
                        </div>

                        <div className="p-8">
                            <div className="text-center mb-8">
                                <p className="text-gray-500 text-sm uppercase font-bold tracking-wider">Monto a pagar ahora</p>
                                <p className="text-5xl font-bold text-gray-800 my-2">{formatPrice(bookingFee)}</p>
                                <p className="text-xs text-gray-400">Restante {formatPrice(totalPrice - bookingFee)} en el hotel</p>
                            </div>

                            {/* Urgency Counter */}
                            <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-8 flex items-center justify-between animate-pulse">
                                <div className="flex items-center text-red-600 font-bold">
                                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Alta Demanda
                                </div>
                                <span className="text-gray-700 text-sm">
                                    Quedan <strong className="text-red-600 text-lg">{availableSpots}</strong> habitaciones
                                </span>
                            </div>

                            <button onClick={handlePay} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/40 mb-4">
                                Pagar con MercadoPago
                            </button>
                            <button onClick={() => setIsPaymentModalOpen(false)} className="w-full text-gray-400 text-sm hover:text-gray-600">Cancelar</button>
                        </div>
                    </>
                ) : (
                    <div className="bg-white">
                        <div className="bg-green-500 p-8 text-center text-white">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h3 className="text-3xl font-bold">¡Reserva Exitosa!</h3>
                            <p className="mt-2 opacity-90 font-mono bg-green-600 inline-block px-3 py-1 rounded">{bookingCode}</p>
                        </div>

                        <div className="p-8 text-center">
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Tu habitación ha sido bloqueada correctamente. Te esperamos para disfrutar de tu estadía.
                            </p>

                            <button onClick={generateVoucherPDF} className="w-full bg-gray-800 text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-all flex items-center justify-center gap-2 mb-4">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Descargar Voucher PDF
                            </button>

                            <button onClick={() => { setIsPaymentModalOpen(false); setIsPaid(false); }} className="text-blue-600 font-medium hover:underline">
                                Cerrar ventana
                            </button>
                        </div>
                    </div>
                )}
            </div>
         </div>
      )}
    </div>
  );
};

export default HotelDetails;
