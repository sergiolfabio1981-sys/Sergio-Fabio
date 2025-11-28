
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getWorldCupTripById } from '../services/worldCupService';
import { WorldCupTrip } from '../types';
import { ADMIN_EMAIL } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { generateSharePDF } from '../services/pdfShareService';

declare global {
  interface Window {
    jspdf: any;
  }
}

const WorldCupDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState<WorldCupTrip | undefined>(undefined);
  const [passengers, setPassengers] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titularName, setTitularName] = useState('');
  const [titularEmail, setTitularEmail] = useState('');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Sharing State
  const [isSharingMenuOpen, setIsSharingMenuOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const { t } = useLanguage();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (id) {
      setTrip(getWorldCupTripById(id));
    }
  }, [id]);

  useEffect(() => {
    if (!trip || trip.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % trip.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [trip]);

  // World Cup Calculation (Fixed target date June 2026)
  const now = new Date();
  const depDate = new Date('2026-06-01'); // Fixed date
  const diffMonths = (depDate.getFullYear() - now.getFullYear()) * 12 + (depDate.getMonth() - now.getMonth());
  const monthsCount = diffMonths > 0 ? diffMonths : 1;

  const totalPrice = trip ? trip.totalPrice * passengers : 0;
  const installmentValue = totalPrice / monthsCount;
  
  // Force USD display logic if baseCurrency is USD
  const baseCurrency = trip?.baseCurrency || 'ARS';

  const handleBook = (e: React.FormEvent) => {
      e.preventDefault();
      const code = 'WC26-' + Math.floor(Math.random()*100000);
      setBookingCode(code);
      console.log(`📧 Nuevo Paquete Mundial ${code} para ${ADMIN_EMAIL}`);
      setIsModalOpen(false);
      setIsPaymentOpen(true);
  };

  const generateVoucherPDF = () => {
    if (!trip) return;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(`Voucher Mundial: ${bookingCode}`, 20, 20);
    doc.save(`Mundial2026-${bookingCode}.pdf`);
  };

  // --- SHARE LOGIC ---
  const handleSharePdf = async () => {
    if (!trip) return;
    setIsGeneratingPdf(true);
    // Pass 'trip' as ListingItem
    const itemForPdf = { ...trip, type: 'worldcup' as const };
    await generateSharePDF(itemForPdf, formatPrice(trip.totalPrice, baseCurrency));
    setIsGeneratingPdf(false);
    setIsSharingMenuOpen(false);
  };

  const shareUrl = window.location.href;
  const shareText = `Mira este paquete al MUNDIAL 2026 en ABRAS Travel: ${trip?.title}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(trip?.title || '')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;

  if (!trip) return <div className="p-10 text-center">Cargando...</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
        
        {/* Sticky Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div>
                    <h1 className="text-lg md:text-xl font-bold text-gray-800 leading-tight truncate max-w-[200px] md:max-w-md">{trip.title}</h1>
                    <p className="text-gray-500 text-xs flex items-center mt-1">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {trip.location}
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

        <div className="relative h-[50vh] w-full overflow-hidden">
             <img src={trip.images[currentImageIndex]} className="w-full h-full object-cover" alt={trip.title} />
             <div className="absolute inset-0 bg-blue-900/40 flex items-end p-8">
                 <div className="max-w-7xl mx-auto w-full text-white">
                     <span className="bg-white text-blue-900 px-3 py-1 rounded font-bold mb-2 inline-block shadow">🏆 MUNDIAL 2026</span>
                     <h1 className="text-4xl md:text-6xl font-black italic">{trip.title}</h1>
                     <p className="text-xl opacity-90 font-bold">{trip.originCountry} ✈️ {trip.location}</p>
                 </div>
             </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-xl shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalles del Paquete</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{trip.description}</p>
                    
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-blue-900 font-bold text-lg">Financiación Mundial</p>
                            <p className="text-blue-700 text-sm">Asegura tu lugar para ver a tu selección.</p>
                        </div>
                        <div className="text-3xl font-black text-blue-600">{monthsCount} CUOTAS</div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24 border-t-4 border-blue-600">
                    <h3 className="text-xl font-bold mb-6 text-center">Plan de Pagos</h3>
                    
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
                            <span>{formatPrice(totalPrice, baseCurrency)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Meses hasta Junio 2026</span>
                            <span>{monthsCount} meses</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-blue-600 pt-2">
                            <span>Valor Cuota Mensual</span>
                            <span>{formatPrice(installmentValue, baseCurrency)}</span>
                        </div>
                    </div>

                    <p className="text-xs text-center text-gray-400 mt-2 mb-4">
                        Abonando la 1ra cuota hoy congelas el precio en {baseCurrency}.
                    </p>

                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/30"
                    >
                        Pagar 1ra Cuota y Reservar
                    </button>
                </div>
            </div>
        </div>

        {isModalOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <form onSubmit={handleBook} className="bg-white p-6 rounded-xl w-full max-w-md">
                    <h3 className="text-xl font-bold mb-4">Datos del Hincha</h3>
                    <input className="w-full border p-3 rounded mb-3" placeholder="Nombre Completo" required value={titularName} onChange={e=>setTitularName(e.target.value)}/>
                    <input className="w-full border p-3 rounded mb-3" placeholder="Email" type="email" required value={titularEmail} onChange={e=>setTitularEmail(e.target.value)}/>
                    <div className="flex gap-3">
                        <button type="button" onClick={()=>setIsModalOpen(false)} className="flex-1 border p-3 rounded hover:bg-gray-50">Cancelar</button>
                        <button type="submit" className="flex-1 bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">Confirmar</button>
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
                            <p className="text-4xl font-bold text-blue-600 mb-6">{formatPrice(installmentValue, baseCurrency)}</p>
                            <button onClick={()=>setIsPaid(true)} className="w-full bg-blue-600 text-white py-3 rounded font-bold mb-3">Pagar</button>
                            <button onClick={()=>setIsPaymentOpen(false)} className="text-gray-500">Cancelar</button>
                        </>
                    ) : (
                        <>
                            <div className="text-green-500 text-5xl mb-4">✓</div>
                            <h3 className="text-2xl font-bold mb-2">¡Vamos al Mundial!</h3>
                            <p className="text-gray-600 mb-6">Tu lugar está asegurado.</p>
                            <button onClick={generateVoucherPDF} className="w-full bg-gray-800 text-white py-3 rounded font-bold mb-3">Descargar Voucher PDF</button>
                            <button onClick={()=>{setIsPaymentOpen(false); setIsPaid(false);}} className="text-blue-500 underline">Cerrar</button>
                        </>
                    )}
                </div>
            </div>
        )}
    </div>
  );
};

export default WorldCupDetails;
