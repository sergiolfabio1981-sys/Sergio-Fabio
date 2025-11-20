import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTripById } from '../services/tripService';
import { Trip } from '../types';
import { ADMIN_EMAIL } from '../constants';

// Type definition for jsPDF since it's loaded via CDN
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
  email?: string; // Required only for passenger 1
}

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState<Trip | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Booking Data Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [passengers, setPassengers] = useState<PassengerData[]>([]);
  
  // Payment & Confirmation State
  const [bookingCode, setBookingCode] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [availableSpots, setAvailableSpots] = useState(25); 
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (id) {
      const found = getTripById(id);
      setTrip(found);
    }
  }, [id]);

  // Auto-play hero carousel
  useEffect(() => {
    if (!trip || trip.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % trip.images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [trip]);

  const nextImage = () => {
    if (!trip) return;
    setCurrentImageIndex((prev) => (prev + 1) % trip.images.length);
  };

  const prevImage = () => {
    if (!trip) return;
    setCurrentImageIndex((prev) => (prev - 1 + trip.images.length) % trip.images.length);
  };

  const generateBookingCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `BR-${code}`; // Example: BR-X7Z9
  };

  const handleInitiateBooking = () => {
    if (!selectedDate) return;
    
    // Initialize empty passenger data based on guest count
    const initialData = Array(guests).fill(null).map(() => ({
      fullName: '',
      dni: '',
      birthDate: '',
      address: '',
      city: '',
      province: '',
      nationality: '',
      email: ''
    }));
    
    setPassengers(initialData);
    setIsBookingModalOpen(true);
  };

  const handlePassengerChange = (index: number, field: keyof PassengerData, value: string) => {
    const newPassengers = [...passengers];
    newPassengers[index] = {
      ...newPassengers[index],
      [field]: value
    };
    setPassengers(newPassengers);
  };

  const handleDataSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCode = generateBookingCode();
    setBookingCode(newCode);
    
    // Simulate sending email to admin
    console.log(`📧 Enviando datos de reserva ${newCode} a ${ADMIN_EMAIL}...`);
    console.log("Datos:", {
        trip: trip?.title,
        date: selectedDate,
        passengers,
        code: newCode
    });

    setIsBookingModalOpen(false);
    setIsPaymentModalOpen(true);
    
    // Start countdown of spots logic to create urgency
    let currentSpots = 25;
    setAvailableSpots(currentSpots); // Start at 25
    
    const interval = setInterval(() => {
        if (currentSpots > 15) {
            currentSpots -= 2;
            if (currentSpots < 15) currentSpots = 15; // Ensure we don't go below 15
            setAvailableSpots(currentSpots);
        } else {
            clearInterval(interval);
        }
    }, 5000); // Update every 5 seconds
  };

  const handlePay = () => {
      // Open MercadoPago link
      window.open("https://link.mercadopago.com.ar/lumat2", "_blank");
      
      // Simulate payment verification success in UI
      setIsPaid(true);
  };

  // Format currency helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    }).format(amount);
  };

  const generatePDF = () => {
    if (!trip) return;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Title
    doc.setFontSize(22);
    doc.setTextColor(0, 150, 136); // Cyan-ish
    doc.text("ABRAS Travel - Comprobante de Reserva", 20, 20);

    // Booking Code
    doc.setFontSize(16);
    doc.setTextColor(255, 87, 34); // Orange
    doc.text(`Código de Reserva: ${bookingCode}`, 20, 30);

    // Trip Info
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Destino: ${trip.title}`, 20, 45);
    doc.text(`Ubicación: ${trip.location}`, 20, 52);
    doc.text(`Fecha de Salida: ${selectedDate}`, 20, 59);
    doc.text(`Cantidad de Pasajeros: ${guests}`, 20, 66);

    // Payment Info
    const basePrice = trip.price * guests;
    const bookingFee = basePrice * 0.10;
    doc.text(`Estado del Pago (Reserva): CONFIRMADO`, 20, 80);
    doc.text(`Monto Abonado (Servicio): ${formatCurrency(bookingFee)}`, 20, 87);

    // Passengers
    doc.setFontSize(14);
    doc.text("Pasajeros:", 20, 100);
    
    let yPos = 110;
    doc.setFontSize(10);
    passengers.forEach((p, i) => {
        doc.text(`${i + 1}. ${p.fullName} - DNI: ${p.dni} (${p.nationality})`, 25, yPos);
        yPos += 7;
    });

    doc.setFontSize(8);
    doc.text("Este documento es un comprobante provisorio de reserva.", 20, yPos + 20);
    doc.text("Contáctanos: +54 9 11 4063 2644 | info@abrastravel.com", 20, yPos + 25);

    doc.save(`Reserva-${bookingCode}.pdf`);
  };

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Destino no encontrado</h2>
        <Link to="/" className="text-cyan-600 hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  // Calculations
  const basePrice = trip.price * guests;
  const bookingFee = basePrice * 0.10;
  const totalPrice = basePrice + bookingFee;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Carousel */}
      <div className="relative h-[60vh] w-full overflow-hidden group">
        <img 
          src={trip.images[currentImageIndex]} 
          alt={trip.title} 
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Controls */}
        {trip.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            >
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            >
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            {/* Indicators */}
            <div className="absolute bottom-32 left-0 right-0 flex justify-center gap-2 z-20">
              {trip.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-7xl mx-auto">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">
              {trip.isOffer ? 'OFERTA ESPECIAL' : 'DESTINO TOP'}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{trip.title}</h1>
            <div className="flex items-center text-white/90 text-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {trip.location}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content: Description & Dates */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sobre este viaje</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{trip.description}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Próximas Salidas
            </h2>
            {trip.availableDates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trip.availableDates.map((date, idx) => (
                  <div key={idx} className="flex items-center p-4 bg-cyan-50 rounded-lg border border-cyan-100 hover:bg-cyan-100 transition-colors">
                     <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                     <span className="text-cyan-900 font-medium">{date}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Consulta por nuevas fechas disponibles.</p>
            )}
          </div>
        </div>

        {/* Right Content: Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border border-gray-100">
            <div className="flex justify-between items-end mb-6">
              <span className="text-gray-500">Precio por persona</span>
              <span className="text-3xl font-bold text-cyan-600">{formatCurrency(trip.price)}</span>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleInitiateBooking(); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Elige tu fecha de salida</label>
                <select 
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500 p-3 border bg-white"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                >
                  <option value="" disabled>-- Selecciona una fecha --</option>
                  {trip.availableDates.map((date, idx) => (
                    <option key={idx} value={date}>{date}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Viajeros</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-1">
                  <button 
                    type="button"
                    className="p-2 text-gray-500 hover:text-cyan-600"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold">{guests}</span>
                  <button 
                    type="button"
                    className="p-2 text-gray-500 hover:text-cyan-600"
                    onClick={() => setGuests(guests + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Subtotal ({guests} viajeros)</span>
                  <span>{formatCurrency(basePrice)}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Cargo por servicio (10%)</span>
                  <span>{formatCurrency(bookingFee)}</span>
                </div>
                <div className="flex justify-between font-bold text-xl text-cyan-700 pt-2 border-t border-gray-100 mt-2">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={!selectedDate}
                className="w-full bg-orange-500 disabled:bg-gray-300 text-white font-bold py-4 rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 mt-4 disabled:shadow-none disabled:cursor-not-allowed"
              >
                {selectedDate ? 'Reservar Ahora' : 'Selecciona fecha'}
              </button>
              <p className="text-center text-xs text-gray-400 mt-2">Se solicitarán los datos a continuación.</p>
            </form>
          </div>
        </div>
      </div>

      {/* Passenger Details Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 bg-cyan-600 text-white sticky top-0 z-10 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Finalizar Reserva</h2>
                <p className="text-cyan-100 text-sm">Complete los datos de todos los pasajeros</p>
              </div>
              <button 
                onClick={() => setIsBookingModalOpen(false)}
                className="text-white/80 hover:text-white p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleDataSubmit} className="p-6 space-y-8">
              {passengers.map((passenger, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-cyan-700 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-xs">
                        {index + 1}
                    </span>
                    Datos del Pasajero {index + 1}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre y Apellido</label>
                        <input 
                            type="text" 
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                            placeholder="Tal como figura en el DNI"
                            value={passenger.fullName}
                            onChange={(e) => handlePassengerChange(index, 'fullName', e.target.value)}
                        />
                    </div>
                    
                    {/* Email field only for Passenger 1 */}
                    {index === 0 && (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-orange-50 p-4 rounded-lg border border-orange-100">
                            <label className="block text-xs font-bold text-orange-600 uppercase mb-1">Correo Electrónico (Principal)</label>
                            <input 
                                type="email" 
                                required
                                placeholder="ejemplo@email.com"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white"
                                value={passenger.email}
                                onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                            />
                            <p className="text-xs text-orange-500 mt-1">Aquí enviaremos la confirmación de reserva.</p>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">DNI</label>
                        <input 
                            type="text" 
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                            value={passenger.dni}
                            onChange={(e) => handlePassengerChange(index, 'dni', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Fecha de Nacimiento</label>
                        <input 
                            type="date" 
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                            value={passenger.birthDate}
                            onChange={(e) => handlePassengerChange(index, 'birthDate', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nacionalidad</label>
                        <input 
                            type="text" 
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                            value={passenger.nationality}
                            onChange={(e) => handlePassengerChange(index, 'nationality', e.target.value)}
                        />
                    </div>

                    <div className="col-span-1 md:col-span-3 lg:col-span-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Dirección</label>
                        <input 
                            type="text" 
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                            value={passenger.address}
                            onChange={(e) => handlePassengerChange(index, 'address', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ciudad</label>
                        <input 
                            type="text" 
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                            value={passenger.city}
                            onChange={(e) => handlePassengerChange(index, 'city', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Provincia</label>
                        <input 
                            type="text" 
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                            value={passenger.province}
                            onChange={(e) => handlePassengerChange(index, 'province', e.target.value)}
                        />
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end pt-4 border-t border-gray-200 gap-4">
                <button 
                    type="button" 
                    onClick={() => setIsBookingModalOpen(false)}
                    className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                >
                    Cancelar
                </button>
                <button 
                    type="submit" 
                    className="px-8 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 shadow-lg shadow-cyan-500/30 transition-transform transform hover:scale-105"
                >
                    Siguiente Paso: Pago
                </button>
              </div>
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
                        {/* Header with Urgency */}
                        <div className="bg-orange-500 p-6 text-center text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-2">¡Casi listo!</h3>
                                <p className="text-orange-100 text-sm">Ya estás más cerca de tu viaje soñado.</p>
                            </div>
                            <div className="absolute inset-0 bg-orange-600 opacity-20 animate-pulse"></div>
                        </div>

                        <div className="p-8">
                            <div className="mb-6 text-center">
                                <p className="text-gray-500 text-sm mb-2">Total a abonar en concepto de reserva:</p>
                                <p className="text-4xl font-bold text-gray-800">{formatCurrency(bookingFee)}</p>
                                <p className="text-xs text-gray-400 mt-1">(Cargo por servicio del 10%)</p>
                            </div>

                            {/* Urgency Counter */}
                            <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-6 flex items-center justify-between">
                                <span className="text-red-600 text-sm font-bold flex items-center">
                                    <svg className="w-4 h-4 mr-1 animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                                    ¡Date prisa!
                                </span>
                                <span className="text-gray-700 text-sm">
                                    Solo quedan <strong className="text-red-600 text-lg">{availableSpots}</strong> lugares
                                </span>
                            </div>

                            <button 
                                onClick={handlePay}
                                className="w-full bg-cyan-600 text-white font-bold py-4 rounded-xl hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-500/40 transform hover:-translate-y-1 mb-3 flex items-center justify-center"
                            >
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                Pagar Reserva
                            </button>
                            <p className="text-center text-xs text-gray-400">Serás redirigido a MercadoPago de forma segura.</p>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Payment Success State */}
                        <div className="bg-green-500 p-6 text-center text-white">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold">¡Reserva Confirmada!</h3>
                            <p className="text-green-100 text-sm mt-1">Tu código: <span className="font-mono font-bold bg-green-600 px-2 py-0.5 rounded">{bookingCode}</span></p>
                        </div>

                        <div className="p-8 text-center">
                            <p className="text-gray-600 mb-6">
                                Gracias por elegir ABRAS Travel. Hemos enviado los detalles de tu reserva al administrador.
                            </p>

                            <button 
                                onClick={generatePDF}
                                className="w-full bg-gray-800 text-white font-bold py-3 rounded-xl hover:bg-gray-900 transition-all flex items-center justify-center mb-4"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                Descargar Comprobante (PDF)
                            </button>

                            <button 
                                onClick={() => { setIsPaymentModalOpen(false); setIsPaid(false); }}
                                className="text-cyan-600 hover:underline text-sm"
                            >
                                Cerrar ventana
                            </button>
                        </div>
                    </>
                )}
            </div>
         </div>
      )}
    </div>
  );
};

export default Details;