
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getExcursionById } from '../services/excursionService';
import { Excursion } from '../types';
import { ADMIN_EMAIL } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';

declare global {
  interface Window {
    jspdf: any;
  }
}

const ExcursionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [excursion, setExcursion] = useState<Excursion | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState('');
  const [passengers, setPassengers] = useState(2);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Booking State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titularName, setTitularName] = useState('');
  const [titularEmail, setTitularEmail] = useState('');
  
  // Payment State
  const [bookingCode, setBookingCode] = useState('');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const { t } = useLanguage();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (id) {
      setExcursion(getExcursionById(id));
    }
  }, [id]);

  // Auto-play carousel
  useEffect(() => {
    if (!excursion || excursion.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % excursion.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [excursion]);

  const totalPrice = excursion ? excursion.price * passengers : 0;
  const bookingFee = totalPrice * 0.10;

  const generateBookingCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'EXC-';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const code = generateBookingCode();
      setBookingCode(code);
      console.log(`📧 Enviando reserva excursión ${code} a ${ADMIN_EMAIL}`);
      setIsModalOpen(false);
      setIsPaymentOpen(true);
  };

  const handlePay = () => {
      window.open("https://link.mercadopago.com.ar/lumat2", "_blank");
      setIsPaid(true);
  };

  const generatePDF = () => {
    if (!excursion) return;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(0, 150, 136);
    doc.text("ABRAS Travel - Voucher Excursión", 20, 20);
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Reserva: ${bookingCode}`, 20, 35);
    doc.text(`Excursión: ${excursion.title}`, 20, 45);
    doc.text(`Fecha: ${selectedDate}`, 20, 55);
    doc.text(`Pasajeros: ${passengers}`, 20, 65);
    doc.text(`Duración: ${excursion.duration}`, 20, 75);
    
    doc.text(`Titular: ${titularName}`, 20, 90);
    
    doc.setTextColor(255, 87, 34);
    doc.text(`Pago Reserva (10%): CONFIRMADO`, 20, 105);
    doc.text(`Saldo a pagar: ${formatPrice(totalPrice - bookingFee)}`, 20, 115);

    doc.save(`Voucher-${bookingCode}.pdf`);
  };

  if (!excursion) return <div className="p-10 text-center">Cargando...</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero */}
      <div className="relative h-[50vh] w-full overflow-hidden">
          <img src={excursion.images[currentImageIndex]} className="w-full h-full object-cover" alt={excursion.title} />
          <div className="absolute inset-0 bg-black/40 flex items-end p-8">
               <div className="max-w-7xl mx-auto w-full">
                   <span className="bg-green-600 text-white px-2 py-1 text-sm font-bold rounded mb-2 inline-block">EXCURSIÓN</span>
                   <h1 className="text-4xl font-bold text-white">{excursion.title}</h1>
                   <p className="text-white text-lg">{excursion.location}</p>
               </div>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                  <h2 className="text-2xl font-bold mb-4">Descripción</h2>
                  <p className="text-gray-600 mb-4">{excursion.description}</p>
                  <div className="flex gap-4 text-sm font-bold text-gray-500">
                      <span className="bg-gray-100 px-3 py-1 rounded">Duración: {excursion.duration}</span>
                      <span className="bg-gray-100 px-3 py-1 rounded">Salidas: {excursion.availableDates.join(', ')}</span>
                  </div>
              </div>
          </div>

          <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24">
                  <div className="flex justify-between items-end mb-4">
                      <span className="text-gray-500">Precio x persona</span>
                      <span className="text-2xl font-bold text-cyan-600">{formatPrice(excursion.price)}</span>
                  </div>
                  
                  <div className="mb-4">
                      <label className="block text-sm font-bold mb-1">Fecha Preferida</label>
                      <input type="date" className="w-full border rounded p-2" value={selectedDate} onChange={(e)=>setSelectedDate(e.target.value)} />
                  </div>

                  <div className="mb-4">
                      <label className="block text-sm font-bold mb-1">Cantidad de Personas</label>
                      <div className="flex items-center border rounded">
                          <button onClick={()=>setPassengers(Math.max(1, passengers-1))} className="p-2 px-4 hover:bg-gray-100">-</button>
                          <span className="flex-1 text-center font-bold">{passengers}</span>
                          <button onClick={()=>setPassengers(passengers+1)} className="p-2 px-4 hover:bg-gray-100">+</button>
                      </div>
                  </div>

                  <div className="border-t pt-4 mb-4 space-y-2">
                      <div className="flex justify-between text-sm">
                          <span>Total</span>
                          <span>{formatPrice(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-orange-600">
                          <span>Reserva (10%)</span>
                          <span>{formatPrice(bookingFee)}</span>
                      </div>
                  </div>

                  <button 
                    onClick={() => setIsModalOpen(true)} 
                    disabled={!selectedDate}
                    className="w-full bg-cyan-600 text-white font-bold py-3 rounded hover:bg-cyan-700 disabled:bg-gray-300"
                  >
                      Reservar Lugar
                  </button>
              </div>
          </div>
      </div>

      {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-full max-w-md">
                  <h3 className="text-xl font-bold mb-4">Datos de Contacto</h3>
                  <input type="text" placeholder="Nombre Completo" required value={titularName} onChange={e=>setTitularName(e.target.value)} className="w-full border p-2 rounded mb-3" />
                  <input type="email" placeholder="Email" required value={titularEmail} onChange={e=>setTitularEmail(e.target.value)} className="w-full border p-2 rounded mb-3" />
                  <div className="flex gap-3">
                      <button type="button" onClick={()=>setIsModalOpen(false)} className="flex-1 border p-2 rounded">Cancelar</button>
                      <button type="submit" className="flex-1 bg-cyan-600 text-white p-2 rounded">Confirmar</button>
                  </div>
              </form>
          </div>
      )}

      {isPaymentOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white p-6 rounded-xl w-full max-w-md text-center">
                  {!isPaid ? (
                      <>
                        <h3 className="text-xl font-bold mb-2">Pago de Reserva</h3>
                        <p className="text-3xl font-bold text-cyan-600 mb-4">{formatPrice(bookingFee)}</p>
                        <button onClick={handlePay} className="w-full bg-cyan-600 text-white font-bold py-3 rounded mb-3">Pagar Ahora</button>
                        <button onClick={()=>setIsPaymentOpen(false)} className="text-gray-500 text-sm">Cancelar</button>
                      </>
                  ) : (
                      <>
                        <h3 className="text-xl font-bold text-green-600 mb-2">¡Confirmado!</h3>
                        <p className="mb-4">Tu voucher está listo.</p>
                        <button onClick={generatePDF} className="w-full bg-gray-800 text-white font-bold py-3 rounded mb-3">Descargar PDF</button>
                        <button onClick={()=>{setIsPaymentOpen(false); setIsPaid(false);}} className="text-gray-500 text-sm">Cerrar</button>
                      </>
                  )}
              </div>
          </div>
      )}
    </div>
  );
};

export default ExcursionDetails;