
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRentalById } from '../services/rentalService';
import { Apartment } from '../types';
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
  birthDate: string;
  address: string;
  city: string;
  province: string;
  nationality: string;
  email?: string;
}

const RentalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [rental, setRental] = useState<Apartment | undefined>(undefined);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Booking State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [passengers, setPassengers] = useState<PassengerData[]>([]);
  
  // Payment State
  const [bookingCode, setBookingCode] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [availableSpots, setAvailableSpots] = useState(5); // Less spots for rentals
  const [isPaid, setIsPaid] = useState(false);

  // Sharing State
  const [isSharingMenuOpen, setIsSharingMenuOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const { t } = useLanguage();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (id) {
      setRental(getRentalById(id));
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
  const bookingFee = totalPrice * 0.10; // 10% reserve

  const generateBookingCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'ALQ-';
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
    
    // Initialize primary guest
    const initialData = [{
      fullName: '',
      dni: '',
      birthDate: '',
      address: '',
      city: '',
      province: '',
      nationality: '',
      email: ''
    }];
    
    setPassengers(initialData);
    setIsBookingModalOpen(true);
  };

  const handlePassengerChange = (index: number, field: keyof PassengerData, value: string) => {
    const newPassengers = [...passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    setPassengers(newPassengers);
  };

  const handleDataSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCode = generateBookingCode();
    setBookingCode(newCode);
    
    console.log(`📧 Enviando datos de alquiler ${newCode} a ${ADMIN_EMAIL}...`);
    setIsBookingModalOpen(false);
    setIsPaymentModalOpen(true);
    
    // Urgency countdown
    let currentSpots = 5;
    setAvailableSpots(currentSpots);
    const interval = setInterval(() => {
        if (currentSpots > 1) {
            currentSpots -= 1;
            setAvailableSpots(currentSpots);
        } else {
            clearInterval(interval);
        }
    }, 4000);
  };

  const handlePay = () => {
      window.open("https://link.mercadopago.com.ar/lumat2", "_blank");
      setIsPaid(true);
  };

  const generateVoucherPDF = () => {
    // ... logic for voucher (post-payment) ...
    // Reuse existing logic or simple alert for now as prompt focused on Share PDF
    if (!rental) return;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(`Voucher Reserva: ${bookingCode}`, 20, 20);
    doc.save(`Voucher-${bookingCode}.pdf`);
  };

  // --- SHARE LOGIC ---
  const handleSharePdf = async () => {
    if (!rental) return;
    setIsGeneratingPdf(true);
    // Pass 'rental' as ListingItem
    const itemForPdf = { ...rental, type: 'rental' as const };
    await generateSharePDF(itemForPdf, formatPrice(rental.pricePerNight));
    setIsGeneratingPdf(false);
    setIsSharingMenuOpen(false);
  };

  const shareUrl = window.location.href;
  const shareText = `Mira este alquiler en ABRAS Travel: ${rental?.title}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(rental?.title || '')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;


  if (!rental) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Propiedad no encontrada</h2>
        <Link to="/rentals" className="text-cyan-600 hover:underline">Volver a Alquileres</Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Sticky Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <div>
                  <h1 className="text-lg md:text-xl font-bold text-gray-800 leading-tight truncate max-w-[200px] md:max-w-md">{rental.title}</h1>
                  <p className="text-gray-500 text-xs flex items-center mt-1">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {rental.location}
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
        <img src={rental.images[currentImageIndex]} alt={rental.title} className="w-full h-full object-cover transition-opacity duration-500" />
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Carousel Controls */}
        {rental.images.length > 1 && (
             <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                 <button onClick={() => setCurrentImageIndex((currentImageIndex - 1 + rental.images.length) % rental.images.length)} className="pointer-events-auto bg-black/30 text-white p-2 rounded-full hover:bg-black/50">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                 </button>
                 <button onClick={() => setCurrentImageIndex((currentImageIndex + 1) % rental.images.length)} className="pointer-events-auto bg-black/30 text-white p-2 rounded-full hover:bg-black/50">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                 </button>
             </div>
        )}

        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-7xl mx-auto">
            <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">ALQUILER TEMPORARIO</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{rental.title}</h1>
            <p className="text-white/90 text-lg flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {rental.location}
            </p>
          </div>
        </div>
      </div>

       {/* Gallery Thumbnails */}
       {rental.images.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 mb-8">
            <div className="flex gap-2 overflow-x-auto pb-4 pt-4 scrollbar-hide snap-x">
                {rental.images.map((img, idx) => (
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

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${rental.images.length > 1 ? '' : '-mt-10 relative z-10'} grid grid-cols-1 lg:grid-cols-3 gap-8`}>
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center text-gray-700">
                    <span className="font-bold text-xl mr-2">{rental.bedrooms}</span> Habitaciones
                </div>
                <div className="flex items-center text-gray-700">
                    <span className="font-bold text-xl mr-2">{rental.maxGuests}</span> Huéspedes Máx.
                </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Descripción</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6 whitespace-pre-line">{rental.description}</p>
            
            <h3 className="text-lg font-bold text-gray-800 mb-3">Comodidades</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {rental.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        {amenity}
                    </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right Content: Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border border-gray-100">
            <div className="flex justify-between items-end mb-6">
              <span className="text-gray-500">Precio por noche</span>
              <div className="text-right">
                  {rental.discount && (
                      <span className="text-sm text-gray-400 line-through mr-2">{formatPrice(rental.pricePerNight / (1 - rental.discount/100))}</span>
                  )}
                  <span className="text-3xl font-bold text-cyan-600">{formatPrice(rental.pricePerNight)}</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleInitiateBooking(); }}>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                    <input 
                        type="date" 
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-cyan-500"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                    <input 
                        type="date" 
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-cyan-500"
                        min={checkIn}
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
              </div>

              {nights > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                      <div className="flex justify-between">
                          <span>{formatPrice(rental.pricePerNight)} x {nights} noches</span>
                          <span>{formatPrice(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-orange-600 pt-2 border-t border-gray-200">
                          <span>Reserva (10%)</span>
                          <span>{formatPrice(bookingFee)}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">El resto se abona al llegar a la propiedad.</p>
                  </div>
              )}

              <button 
                type="submit"
                disabled={nights <= 0}
                className="w-full bg-cyan-600 disabled:bg-gray-300 text-white font-bold py-4 rounded-lg hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-500/30 mt-4"
              >
                Solicitar Reserva
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Simplified Passenger Modal (Just Titular for Rentals usually) */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="p-6 bg-cyan-600 text-white flex justify-between items-center rounded-t-2xl">
                <h2 className="text-xl font-bold">Datos del Titular de Reserva</h2>
                <button onClick={() => setIsBookingModalOpen(false)}><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <form onSubmit={handleDataSubmit} className="p-6 space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 mb-4">
                     <label className="block text-xs font-bold text-orange-600 uppercase mb-1">Email de Contacto</label>
                     <input type="email" required value={passengers[0].email} onChange={(e) => handlePassengerChange(0, 'email', e.target.value)} className="w-full border rounded p-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs font-bold text-gray-500">Nombre Completo</label><input type="text" required value={passengers[0].fullName} onChange={(e) => handlePassengerChange(0, 'fullName', e.target.value)} className="w-full border rounded p-2" /></div>
                    <div><label className="text-xs font-bold text-gray-500">DNI/Pasaporte</label><input type="text" required value={passengers[0].dni} onChange={(e) => handlePassengerChange(0, 'dni', e.target.value)} className="w-full border rounded p-2" /></div>
                </div>
                <div><label className="text-xs font-bold text-gray-500">Teléfono</label><input type="tel" required className="w-full border rounded p-2" /></div>
                <button type="submit" className="w-full bg-cyan-600 text-white font-bold py-3 rounded-lg hover:bg-cyan-700 mt-4">Confirmar y Pagar Reserva</button>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && (
         <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
                {!isPaid ? (
                    <div className="p-8 text-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Confirmar Alquiler</h3>
                        <p className="text-gray-500 mb-6">Abona el 10% para bloquear las fechas.</p>
                        
                        <div className="text-4xl font-bold text-cyan-600 mb-2">{formatPrice(bookingFee)}</div>
                        <p className="text-xs text-gray-400 mb-6">Saldo restante: {formatPrice(totalPrice - bookingFee)}</p>

                        <div className="bg-red-50 text-red-600 p-2 rounded mb-6 text-sm font-bold animate-pulse">
                            ¡Atención! Solo quedan {availableSpots} propiedades similares disponibles.
                        </div>

                        <button onClick={handlePay} className="w-full bg-cyan-600 text-white font-bold py-3 rounded-lg hover:bg-cyan-700 mb-3">Pagar Reserva Ahora</button>
                        <button onClick={() => setIsPaymentModalOpen(false)} className="text-gray-400 text-sm">Cancelar</button>
                    </div>
                ) : (
                    <div className="p-8 text-center bg-green-50">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white"><svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
                        <h3 className="text-2xl font-bold text-green-800 mb-2">¡Fechas Bloqueadas!</h3>
                        <p className="text-green-600 mb-6">Tu reserva está confirmada. Código: {bookingCode}</p>
                        <button onClick={generateVoucherPDF} className="w-full bg-gray-800 text-white font-bold py-3 rounded-lg">Descargar Comprobante</button>
                        <button onClick={() => { setIsPaymentModalOpen(false); setIsPaid(false); }} className="text-gray-500 text-sm mt-4 block">Cerrar</button>
                    </div>
                )}
            </div>
         </div>
      )}
    </div>
  );
};

export default RentalDetails;
