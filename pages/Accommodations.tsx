
import React, { useState, useEffect } from 'react';
import { getHotels } from '../services/hotelService';
import { getRentals } from '../services/rentalService';
import { Hotel, Apartment, ListingItem } from '../types';
import TripCard from '../components/TripCard';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';

const Accommodations: React.FC = () => {
  const [items, setItems] = useState<ListingItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ListingItem[]>([]);
  const [activeType, setActiveType] = useState<'all' | 'hotel' | 'rental'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { t } = useLanguage();
  const { formatPrice, currency } = useCurrency();

  useEffect(() => {
    const hotels = getHotels().map(h => ({...h, type: 'hotel' as const}));
    const rentals = getRentals().map(r => ({...r, type: 'rental' as const}));
    setItems([...hotels, ...rentals]);
  }, []);

  useEffect(() => {
    let result = [...items];

    // 1. Filter by Type
    if (activeType !== 'all') {
        result = result.filter(item => item.type === activeType);
    }

    // 2. Search
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(item => 
            item.title.toLowerCase().includes(term) || 
            item.location.toLowerCase().includes(term)
        );
    }

    setFilteredItems(result);
  }, [items, activeType, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50">
        <div className="bg-gradient-to-r from-cyan-900 to-blue-900 py-12 px-4 text-center text-white relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
             <div className="relative z-10 max-w-4xl mx-auto">
                 <h1 className="text-4xl font-bold mb-4">Alojamientos Exclusivos</h1>
                 <p className="text-lg text-cyan-100 mb-6">Hoteles de lujo y Departamentos temporarios para tu estadía perfecta.</p>
                 
                 <div className="flex justify-center gap-4 mb-6">
                     <button 
                        onClick={() => setActiveType('all')} 
                        className={`px-6 py-2 rounded-full font-bold transition-all ${activeType === 'all' ? 'bg-white text-cyan-900' : 'bg-white/20 text-white hover:bg-white/30'}`}
                     >
                         Todos
                     </button>
                     <button 
                        onClick={() => setActiveType('hotel')} 
                        className={`px-6 py-2 rounded-full font-bold transition-all ${activeType === 'hotel' ? 'bg-white text-cyan-900' : 'bg-white/20 text-white hover:bg-white/30'}`}
                     >
                         Hoteles
                     </button>
                     <button 
                        onClick={() => setActiveType('rental')} 
                        className={`px-6 py-2 rounded-full font-bold transition-all ${activeType === 'rental' ? 'bg-white text-cyan-900' : 'bg-white/20 text-white hover:bg-white/30'}`}
                     >
                         Alquileres
                     </button>
                 </div>

                 <div className="max-w-lg mx-auto bg-white p-2 rounded-full flex items-center shadow-lg">
                    <svg className="h-5 w-5 text-gray-400 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input 
                        type="text"
                        placeholder="Buscar por destino o nombre..."
                        className="w-full px-4 py-2 rounded-full text-gray-800 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
             </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredItems.map(item => (
                    <TripCard key={`${item.type}-${item.id}`} trip={item} />
                ))}
            </div>
            
            {filteredItems.length === 0 && (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xl text-gray-500">No encontramos alojamientos con esos criterios.</p>
                    <button 
                        onClick={() => { setSearchTerm(''); setActiveType('all'); }}
                        className="mt-4 text-cyan-600 hover:text-cyan-800 underline font-medium"
                    >
                        Ver todos los alojamientos
                    </button>
                </div>
            )}
        </div>
    </div>
  );
};

export default Accommodations;
