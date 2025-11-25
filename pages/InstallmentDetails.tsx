
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getInstallmentTripById } from '../services/installmentService';
import { InstallmentTrip } from '../types';
import { ADMIN_EMAIL } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';

declare global {
  interface Window {
    jspdf: any;
  }
}

const InstallmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState<InstallmentTrip | undefined>(undefined);
  const [passengers, setPassengers] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titularName, setTitularName] = useState('');
  const [titularEmail, setTitularEmail] = useState('');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  const { t } = useLanguage();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (id) {
      setTrip(getInstallmentTripById(id));
    }
  }, [id]);

  useEffect(() => {
    if (!trip || trip.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % trip.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [trip]);

  // Installment Calculation
  const now = new Date();
  const depDate = trip ? new Date(trip.departureDate) : new Date();
  const diffMonths = (depDate.getFullYear() - now.getFullYear()) * 12 + (depDate.getMonth() - now.getMonth());
  const monthsCount = diffMonths > 0 ? diffMonths : 1; // Minimum 1 payment

  const totalPrice = trip ? trip.totalPrice * passengers : 0;
  const installmentValue = totalPrice / monthsCount;

  const handleBook = (e: React.FormEvent) => {
      e.preventDefault();
      const code = 'PLAN-' + Math.floor(Math.random()*100000);
      setBookingCode(code);
      console.log(`📧 Nuevo ABRAS Cuotas ${code} para ${ADMIN_EMAIL}`);
      setIsModalOpen(false);
      setIsPaymentOpen(true);
  };

  const generatePDF = () => {
    if (!trip) return;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(75, 0, 130);
    doc.text("ABRAS Travel - ABRAS Cuotas", 20, 20);

    doc.setFontSize(14);
    doc.setTextColor(0,0,0);
    doc.text(`Código: ${bookingCode}`, 20, 35);
    doc.text(`Titular: ${titularName}`, 20, 45);
    doc.text(`Destino: ${trip.title}`, 20, 55);
    doc.text(`Salida: ${trip.departureDate}`, 20, 65);
    
    doc.text(`Pasajeros: ${passengers}`, 20, 80);
    doc.text(`Total Contrato: ${formatPrice(totalPrice)}`, 20, 90);
    doc.text(`Plan: ${monthsCount} Cuotas Fijas`, 20, 100);
    
    doc.setTextColor(0, 128, 0);
    doc.text(`Cuota 1 Pagada: ${formatPrice(installmentValue)}`, 20, 115);
    
    doc.setTextColor(100,100,100);
    doc.setFontSize(10);
    doc.text("Las cuotas restantes se debitarán o abonarán del 1 al 10 de cada mes.", 20, 130);
    
    doc.save(`ABRASCuotas-${bookingCode}.pdf`);
  };

  if (!trip) return <div className="p-10 text-center">Cargando...</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
        <div className="relative h-[50vh] w-full overflow-hidden">
             <img src={trip.images[currentImageIndex]} className="w-full h-full object-cover" alt={trip.title} />
             <div className="absolute inset-0 bg-indigo-900/40 flex items-end p-8">
                 <div className="max-w-7xl mx-auto w-full text-white">
                     <span className="bg-yellow-400 text-indigo-900 px-3 py-1 rounded font-bold mb-2 inline-block">SALIDA: {trip.departureDate}</span>
                     <h1 className="text-4xl md:text-6xl font-bold">{trip.title}</h1>
                     <p className="text-xl opacity-90">{trip.location}</p>
                 </div>
             </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-xl shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalles de ABRAS Cuotas</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{trip.description}</p>
                    
                    <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-indigo-900 font-bold text-lg">Financiación Propia</p>
                            <p className="text-indigo-700 text-sm">Sin bancos, sin intereses ocultos.</p>
                        </div>
                        <div className="text-3xl font-bold text-indigo-600">{monthsCount} CUOTAS</div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24 border-t-4 border-indigo-600">
                    <h3 className="text-xl font-bold mb-6 text-center">Calculadora de Cuotas</h3>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-500 mb-1">Pasajeros</label>
                        <div className="flex border rounded">
                            <button onClick={()=>setPassengers(Math.max(1, passengers-1))} className="px-4 py-2 hover:bg-gray-100">-</button>
                            <span className="flex-1 text-center py-2 font-bold">{passengers}</span>
                            <button onClick={()=>setPassengers(passengers+1)} className="px-4 py-2 hover:bg-gray-100">+</button>
                        </div>
                    </div>

                    <div className="space-y-3 py-4 border-t border-b border-gray-100">
                        <div className="flex justify-between text-gray-600">
                            <span>Precio Total ({passengers} pax)</span>
                            <span>{formatPrice(totalPrice)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Meses hasta salida</span>
                            <span>{monthsCount} meses</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-indigo-600 pt-2">
                            <span>Valor Cuota Mensual</span>
                            <span>{formatPrice(installmentValue)}</span>
                        </div>
                    </div>

                    <p className="text-xs text-center text-gray-400 mt-2 mb-4">
                        Abonando la 1ra cuota hoy congelas el precio total.
                    </p>

                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="w-full bg-indigo-600 text-white font-bold py-4 rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-500/30"
                    >
                        Pagar 1ra Cuota y Reservar
                    </button>
                </div>
            </div>
        </div>

        {isModalOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <form onSubmit={handleBook} className="bg-white p-6 rounded-xl w-full max-w-md">
                    <h3 className="text-xl font-bold mb-4">Datos del Suscriptor</h3>
                    <input className="w-full border p-3 rounded mb-3" placeholder="Nombre Completo" required value={titularName} onChange={e=>setTitularName(e.target.value)}/>
                    <input className="w-full border p-3 rounded mb-3" placeholder="Email" type="email" required value={titularEmail} onChange={e=>setTitularEmail(e.target.value)}/>
                    <div className="flex gap-3">
                        <button type="button" onClick={()=>setIsModalOpen(false)} className="flex-1 border p-3 rounded hover:bg-gray-50">Cancelar</button>
                        <button type="submit" className="flex-1 bg-indigo-600 text-white p-3 rounded font-bold hover:bg-indigo-700">Confirmar</button>
                    </div>
                </form>
            </div>
        )}

        {isPaymentOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-white p-8 rounded-xl w-full max-w-md text-center">
                    {!isPaid ? (
                        <>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Pago Cuota 1</h3>
                            <p className="text-4xl font-bold text-indigo-600 mb-6">{formatPrice(installmentValue)}</p>
                            <button onClick={()=>setIsPaid(true)} className="w-full bg-indigo-600 text-white py-3 rounded font-bold mb-3">Pagar</button>
                            <button onClick={()=>setIsPaymentOpen(false)} className="text-gray-500">Cancelar</button>
                        </>
                    ) : (
                        <>
                            <div className="text-green-500 text-5xl mb-4">✓</div>
                            <h3 className="text-2xl font-bold mb-2">¡Felicitaciones!</h3>
                            <p className="text-gray-600 mb-6">Has iniciado tu suscripción a ABRAS Cuotas correctamente.</p>
                            <button onClick={generatePDF} className="w-full bg-gray-800 text-white py-3 rounded font-bold mb-3">Descargar Contrato PDF</button>
                            <button onClick={()=>{setIsPaymentOpen(false); setIsPaid(false);}} className="text-blue-500 underline">Cerrar</button>
                        </>
                    )}
                </div>
            </div>
        )}
    </div>
  );
};

export default InstallmentDetails;