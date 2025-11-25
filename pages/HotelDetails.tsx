
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHotelById } from '../services/hotelService';
import { Hotel } from '../types';
import { ADMIN_EMAIL } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';

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
  }, [hotel]);

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

  const generatePDF = () => {
    if (!hotel) return;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setTextColor(0, 50, 150); // Blue for hotels
    doc.text("ABRAS Travel - Voucher de Hotel", 20, 20);

    doc.setFontSize(16);
    doc.setTextColor(255, 87, 34);
    doc.text(`Código de Reserva: ${bookingCode}`, 20, 30);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Hotel: ${hotel.title} (${hotel.stars} Estrellas)`, 20, 45);
    doc.text(`Ubicación: ${hotel.location}`, 20, 52);
    doc.text(`Check-in: ${checkIn}`, 20, 59);
    doc.text(`Check-out: ${checkOut}`, 20, 66);
    doc.text(`Noches: ${nights}`, 20, 73);

    doc.text(`Estado del Pago (Reserva 10%): CONFIRMADO`, 20, 85);
    doc.text(`Monto Abonado: ${formatPrice(bookingFee)}`, 20, 92);
    doc.text(`Saldo a pagar en el hotel: ${formatPrice(totalPrice - bookingFee)}`, 20, 99);

    doc.setFontSize(14);
    doc.text("Titular de la Reserva:", 20, 115);
    doc.setFontSize(10);
    doc.text(`${passenger.fullName} - DNI: ${passenger.dni}`, 25, 125);
    doc.text(`Email: ${passenger.email} - Tel: ${passenger.phone}`, 25, 132);

    doc.setFontSize(8);
    doc.text("Este documento es un comprobante provisorio de reserva.", 20, 150);
    doc.text("Contáctanos: +54 9 11 4063 2644 | info@abrastravel.com", 20, 155);

    doc.save(`Hotel-${bookingCode}.pdf`);
  };

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Acerca del Alojamiento</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">{hotel.description}</p>
            
            <h3 className="text-lg font-bold text-gray-800 mb-4">Servicios y Comodidades</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
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
              <span className="text-3xl font-bold text-blue-700">{formatPrice(hotel.pricePerNight)}</span>
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

                            <button onClick={generatePDF} className="w-full bg-gray-800 text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-all flex items-center justify-center gap-2 mb-4">
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