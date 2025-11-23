import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRentalById } from '../services/rentalService';
import { Apartment } from '../types';
import { ADMIN_EMAIL } from '../constants';

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
  }, [rental]);

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    }).format(amount);
  };

  const generatePDF = () => {
    if (!rental) return;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setTextColor(0, 150, 136);
    doc.text("ABRAS Travel - Alquiler Temporario", 20, 20);

    doc.setFontSize(16);
    doc.setTextColor(255, 87, 34);
    doc.text(`Código de Reserva: ${bookingCode}`, 20, 30);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Propiedad: ${rental.title}`, 20, 45);
    doc.text(`Ubicación: ${rental.location}`, 20, 52);
    doc.text(`Check-in: ${checkIn}`, 20, 59);
    doc.text(`Check-out: ${checkOut}`, 20, 66);
    doc.text(`Noches: ${nights}`, 20, 73);

    doc.text(`Estado del Pago (Reserva 10%): CONFIRMADO`, 20, 85);
    doc.text(`Monto Abonado: ${formatCurrency(bookingFee)}`, 20, 92);
    doc.text(`Saldo a pagar en destino: ${formatCurrency(totalPrice - bookingFee)}`, 20, 99);

    doc.setFontSize(14);
    doc.text("Titular de la Reserva:", 20, 115);
    const p = passengers[0];
    doc.setFontSize(10);
    doc.text(`${p.fullName} - DNI: ${p.dni} - Email: ${p.email}`, 25, 125);

    doc.setFontSize(8);
    doc.text("Este documento es un comprobante provisorio de reserva de alquiler.", 20, 150);
    doc.text("Contáctanos: +54 9 11 4063 2644 | info@abrastravel.com", 20, 155);

    doc.save(`Alquiler-${bookingCode}.pdf`);
  };

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
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
            <p className="text-gray-600 leading-relaxed text-lg mb-6">{rental.description}</p>
            
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
              <span className="text-3xl font-bold text-cyan-600">{formatCurrency(rental.pricePerNight)}</span>
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
                          <span>{formatCurrency(rental.pricePerNight)} x {nights} noches</span>
                          <span>{formatCurrency(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-orange-600 pt-2 border-t border-gray-200">
                          <span>Reserva (10%)</span>
                          <span>{formatCurrency(bookingFee)}</span>
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
                        
                        <div className="text-4xl font-bold text-cyan-600 mb-2">{formatCurrency(bookingFee)}</div>
                        <p className="text-xs text-gray-400 mb-6">Saldo restante: {formatCurrency(totalPrice - bookingFee)}</p>

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
                        <button onClick={generatePDF} className="w-full bg-gray-800 text-white font-bold py-3 rounded-lg">Descargar Comprobante</button>
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