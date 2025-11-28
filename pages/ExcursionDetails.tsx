
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getExcursionById } from '../services/excursionService';
import { Excursion } from '../types';
import { ADMIN_EMAIL } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { generateSharePDF } from '../services/pdfShareService';

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
  
  // Sharing State
  const [isSharingMenuOpen, setIsSharingMenuOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

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

  const handleSubmit = () => {
      // Direct redirect to WhatsApp
      window.open("https://wa.me/message/TVC7DUGWGV27G1", "_blank");
  };

  // --- SHARE LOGIC ---
  const handleSharePdf = async () => {
    if (!excursion) return;
    setIsGeneratingPdf(true);
    // Pass 'excursion' as ListingItem
    const itemForPdf = { ...excursion, type: 'excursion' as const };
    await generateSharePDF(itemForPdf, formatPrice(excursion.price));
    setIsGeneratingPdf(false);
    setIsSharingMenuOpen(false);
  };

  const shareUrl = window.location.href;
  const shareText = `Mira esta excursión en ABRAS Travel: ${excursion?.title}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(excursion?.title || '')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;

  if (!excursion) return <div className="p-10 text-center">Cargando...</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Sticky Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <div>
                  <h1 className="text-lg md:text-xl font-bold text-gray-800 leading-tight truncate max-w-[200px] md:max-w-md">{excursion.title}</h1>
                  <p className="text-gray-500 text-xs flex items-center mt-1">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {excursion.location}
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
                    onClick={handleSubmit} 
                    disabled={!selectedDate}
                    className="w-full bg-cyan-600 text-white font-bold py-3 rounded hover:bg-cyan-700 disabled:bg-gray-300"
                  >
                      Reservar Lugar
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ExcursionDetails;
