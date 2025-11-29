
import React, { useState, useEffect } from 'react';
import { Trip, Apartment, Excursion, Hotel, InstallmentTrip, WorldCupTrip, GroupTrip, HeroSlide, PromoBanner } from '../types';
import { getTrips, saveTrip, deleteTrip, createEmptyTrip } from '../services/tripService';
import { getRentals, saveRental, deleteRental, createEmptyRental } from '../services/rentalService';
import { getExcursions, saveExcursion, deleteExcursion, createEmptyExcursion } from '../services/excursionService';
import { getHotels, saveHotel, deleteHotel, createEmptyHotel } from '../services/hotelService';
import { getInstallmentTrips, saveInstallmentTrip, deleteInstallmentTrip, createEmptyInstallmentTrip } from '../services/installmentService';
import { getWorldCupTrips, saveWorldCupTrip, deleteWorldCupTrip, createEmptyWorldCupTrip } from '../services/worldCupService';
import { getGroupTrips, saveGroupTrip, deleteGroupTrip, createEmptyGroupTrip } from '../services/groupService';
import { getHeroSlides, saveHeroSlide, getPromoBanners, savePromoBanner, deleteHeroSlide } from '../services/heroService';
import { ADMIN_EMAIL, ADMIN_PASS } from '../constants';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
      return localStorage.getItem('abras_isAdmin') === 'true';
  });
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'trips' | 'rentals' | 'excursions' | 'hotels' | 'installments' | 'worldcup' | 'groups'>('trips');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // State
  const [trips, setTrips] = useState<Trip[]>([]);
  const [rentals, setRentals] = useState<Apartment[]>([]);
  const [excursions, setExcursions] = useState<Excursion[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [installments, setInstallments] = useState<InstallmentTrip[]>([]);
  const [worldCupTrips, setWorldCupTrips] = useState<WorldCupTrip[]>([]);
  const [groupTrips, setGroupTrips] = useState<GroupTrip[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [promoBanners, setPromoBanners] = useState<PromoBanner[]>([]);

  // Edit State
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [editingRental, setEditingRental] = useState<Apartment | null>(null);
  const [editingExcursion, setEditingExcursion] = useState<Excursion | null>(null);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [editingInstallment, setEditingInstallment] = useState<InstallmentTrip | null>(null);
  const [editingWorldCup, setEditingWorldCup] = useState<WorldCupTrip | null>(null);
  const [editingGroup, setEditingGroup] = useState<GroupTrip | null>(null);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [editingBanner, setEditingBanner] = useState<PromoBanner | null>(null);

  const [tripDatesInput, setTripDatesInput] = useState('');
  const [rentalAmenitiesInput, setRentalAmenitiesInput] = useState('');
  const [excursionDatesInput, setExcursionDatesInput] = useState('');
  const [hotelAmenitiesInput, setHotelAmenitiesInput] = useState('');
  const [groupDatesInput, setGroupDatesInput] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
        loadAllData();
    }
  }, [isAuthenticated]);

  const loadAllData = async () => {
      const [t, r, e, h, i, w, g, hs, pb] = await Promise.all([
          getTrips(), getRentals(), getExcursions(), getHotels(),
          getInstallmentTrips(), getWorldCupTrips(), getGroupTrips(),
          getHeroSlides(), getPromoBanners()
      ]);
      setTrips(t); setRentals(r); setExcursions(e); setHotels(h);
      setInstallments(i); setWorldCupTrips(w); setGroupTrips(g);
      setHeroSlides(hs); setPromoBanners(pb);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setIsAuthenticated(true);
      localStorage.setItem('abras_isAdmin', 'true');
    } else {
      alert('Credenciales inválidas');
    }
  };
  
  const handleLogout = () => { setIsAuthenticated(false); localStorage.removeItem('abras_isAdmin'); };

  const resetEditState = () => {
      setEditingTrip(null); setEditingRental(null); setEditingExcursion(null);
      setEditingHotel(null); setEditingInstallment(null); setEditingWorldCup(null);
      setEditingGroup(null); setEditingSlide(null); setEditingBanner(null);
      setImageUrlInput(''); setIsSaving(false);
  };

  const handleDelete = async (id: any, type: string) => {
      if(!window.confirm("¿Eliminar este elemento?")) return;
      if (type === 'trip') await deleteTrip(id);
      if (type === 'rental') await deleteRental(id);
      if (type === 'hotel') await deleteHotel(id);
      if (type === 'excursion') await deleteExcursion(id);
      if (type === 'group') await deleteGroupTrip(id);
      if (type === 'installment') await deleteInstallmentTrip(id);
      if (type === 'worldcup') await deleteWorldCupTrip(id);
      if (type === 'hero_slide') await deleteHeroSlide(id);
      await loadAllData();
  };

  const handleSave = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSaving(true);
      if (editingTrip) await saveTrip({...editingTrip, availableDates: tripDatesInput.split('\n').filter(d=>d.trim()!=='')});
      else if (editingRental) await saveRental({...editingRental, amenities: rentalAmenitiesInput.split('\n').filter(a=>a.trim()!=='')});
      else if (editingHotel) await saveHotel({...editingHotel, amenities: hotelAmenitiesInput.split('\n').filter(a=>a.trim()!=='')});
      else if (editingExcursion) await saveExcursion({...editingExcursion, availableDates: excursionDatesInput.split('\n').filter(d=>d.trim()!=='')});
      else if (editingGroup) await saveGroupTrip({...editingGroup, availableDates: groupDatesInput.split('\n').filter(d=>d.trim()!=='')});
      else if (editingInstallment) await saveInstallmentTrip(editingInstallment);
      else if (editingWorldCup) await saveWorldCupTrip(editingWorldCup);
      else if (editingSlide) await saveHeroSlide(editingSlide);
      else if (editingBanner) await savePromoBanner(editingBanner);
      
      await loadAllData();
      setIsSaving(false);
      setIsModalOpen(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: any) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newImages: string[] = [];
    for (const file of files) {
      const reader = new FileReader();
      const result = await new Promise<string>((resolve) => {
        reader.onload = (event) => resolve(event.target?.result as string);
        reader.readAsDataURL(file as Blob);
      });
      newImages.push(result);
    }
    setter((prev: any) => prev ? { ...prev, images: [...(prev.images || []), ...newImages] } : null);
    e.target.value = '';
  };

  const handleSlideImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.[0]) return;
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => setEditingSlide(prev => prev ? { ...prev, image: ev.target?.result as string } : null);
      reader.readAsDataURL(file);
  };

  const handleBannerImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.[0]) return;
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => setEditingBanner(prev => prev ? { ...prev, image: ev.target?.result as string } : null);
      reader.readAsDataURL(file);
  };

  const createNewHeroSlide = () => {
      const newId = heroSlides.length > 0 ? Math.max(...heroSlides.map(s => s.id)) + 1 : 1;
      setEditingSlide({
          id: newId,
          image: '',
          title: 'Nuevo Anuncio',
          subtitle: 'Descripción breve',
          ctaText: 'Ver Más',
          ctaLink: '/trips',
          highlightColor: 'text-orange-400'
      });
      setIsModalOpen(true);
  };

  if (!isAuthenticated) {
     return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-center">Login Admin</h2>
                <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full border p-2 rounded" />
                <div className="relative"><input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border p-2 rounded" /><button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-2 top-2 text-gray-500">👁️</button></div>
                <button className="w-full bg-cyan-600 text-white py-2 rounded">Entrar</button>
            </form>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Panel de Administración</h1>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm overflow-x-auto w-full md:w-auto">
                    {['hero','trips','groups','hotels','rentals','excursions','installments','worldcup'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-4 py-2 rounded-md whitespace-nowrap capitalize ${activeTab === tab ? 'bg-cyan-600 text-white' : 'hover:bg-gray-100'}`}>
                            {tab === 'hero' ? 'Portada' : tab}
                        </button>
                    ))}
                </div>
                <button onClick={handleLogout} className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-200 whitespace-nowrap">Salir</button>
            </div>
        </div>

        {/* --- LISTS --- */}
        {activeTab === 'trips' && (<div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex justify-between mb-4"><h2 className="font-bold text-xl">Paquetes</h2><button onClick={()=>{resetEditState(); setEditingTrip(createEmptyTrip()); setTripDatesInput(''); setIsModalOpen(true)}} className="bg-green-500 text-white px-4 py-2 rounded">+ Nuevo Paquete</button></div>{trips.map(t=><div key={t.id} className="flex justify-between border-b py-2 items-center"><span>{t.title}</span><div><button onClick={()=>{resetEditState(); setEditingTrip({...t}); setTripDatesInput(t.availableDates.join('\n')); setIsModalOpen(true)}} className="text-blue-500 mr-4">Editar</button><button onClick={()=>handleDelete(t.id, 'trip')} className="text-red-500">Eliminar</button></div></div>)}</div>)}
        {activeTab === 'groups' && (<div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex justify-between mb-4"><h2 className="font-bold text-xl text-purple-700">Grupales</h2><button onClick={()=>{resetEditState(); setEditingGroup(createEmptyGroupTrip()); setGroupDatesInput(''); setIsModalOpen(true)}} className="bg-green-500 text-white px-4 py-2 rounded">+ Nuevo Grupal</button></div>{groupTrips.map(g=><div key={g.id} className="flex justify-between border-b py-2 items-center"><span>{g.title}</span><div><button onClick={()=>{resetEditState(); setEditingGroup({...g}); setGroupDatesInput(g.availableDates.join('\n')); setIsModalOpen(true)}} className="text-blue-500 mr-4">Editar</button><button onClick={()=>handleDelete(g.id, 'group')} className="text-red-500">Eliminar</button></div></div>)}</div>)}
        {activeTab === 'hotels' && (<div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex justify-between mb-4"><h2 className="font-bold text-xl">Hoteles</h2><button onClick={()=>{resetEditState(); setEditingHotel(createEmptyHotel()); setHotelAmenitiesInput(''); setIsModalOpen(true)}} className="bg-green-500 text-white px-4 py-2 rounded">+ Nuevo Hotel</button></div>{hotels.map(h=><div key={h.id} className="flex justify-between border-b py-2 items-center"><span>{h.title}</span><div><button onClick={()=>{resetEditState(); setEditingHotel({...h}); setHotelAmenitiesInput(h.amenities.join('\n')); setIsModalOpen(true)}} className="text-blue-500 mr-4">Editar</button><button onClick={()=>handleDelete(h.id, 'hotel')} className="text-red-500">Eliminar</button></div></div>)}</div>)}
        {activeTab === 'rentals' && (<div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex justify-between mb-4"><h2 className="font-bold text-xl">Alquileres</h2><button onClick={()=>{resetEditState(); setEditingRental(createEmptyRental()); setRentalAmenitiesInput(''); setIsModalOpen(true)}} className="bg-green-500 text-white px-4 py-2 rounded">+ Nuevo Alquiler</button></div>{rentals.map(r=><div key={r.id} className="flex justify-between border-b py-2 items-center"><span>{r.title}</span><div><button onClick={()=>{resetEditState(); setEditingRental({...r}); setRentalAmenitiesInput(r.amenities.join('\n')); setIsModalOpen(true)}} className="text-blue-500 mr-4">Editar</button><button onClick={()=>handleDelete(r.id, 'rental')} className="text-red-500">Eliminar</button></div></div>)}</div>)}
        {activeTab === 'excursions' && (<div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex justify-between mb-4"><h2 className="font-bold text-xl">Excursiones</h2><button onClick={()=>{resetEditState(); setEditingExcursion(createEmptyExcursion()); setExcursionDatesInput(''); setIsModalOpen(true)}} className="bg-green-500 text-white px-4 py-2 rounded">+ Nueva Excursión</button></div>{excursions.map(e=><div key={e.id} className="flex justify-between border-b py-2 items-center"><span>{e.title}</span><div><button onClick={()=>{resetEditState(); setEditingExcursion({...e}); setExcursionDatesInput(e.availableDates.join('\n')); setIsModalOpen(true)}} className="text-blue-500 mr-4">Editar</button><button onClick={()=>handleDelete(e.id, 'excursion')} className="text-red-500">Eliminar</button></div></div>)}</div>)}
        {activeTab === 'installments' && (<div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex justify-between mb-4"><h2 className="font-bold text-xl text-indigo-800">Cuotas</h2><button onClick={()=>{resetEditState(); setEditingInstallment(createEmptyInstallmentTrip()); setIsModalOpen(true)}} className="bg-green-500 text-white px-4 py-2 rounded">+ Nuevo Plan</button></div>{installments.map(i=><div key={i.id} className="flex justify-between border-b py-2 items-center"><span>{i.title}</span><div><button onClick={()=>{resetEditState(); setEditingInstallment({...i}); setIsModalOpen(true)}} className="text-blue-500 mr-4">Editar</button><button onClick={()=>handleDelete(i.id, 'installment')} className="text-red-500">Eliminar</button></div></div>)}</div>)}
        {activeTab === 'worldcup' && (<div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex justify-between mb-4"><h2 className="font-bold text-xl text-blue-900">Mundial</h2><button onClick={()=>{resetEditState(); setEditingWorldCup(createEmptyWorldCupTrip()); setIsModalOpen(true)}} className="bg-green-500 text-white px-4 py-2 rounded">+ Nuevo Paquete</button></div>{worldCupTrips.map(w=><div key={w.id} className="flex justify-between border-b py-2 items-center"><span>{w.title}</span><div><button onClick={()=>{resetEditState(); setEditingWorldCup({...w}); setIsModalOpen(true)}} className="text-blue-500 mr-4">Editar</button><button onClick={()=>handleDelete(w.id, 'worldcup')} className="text-red-500">Eliminar</button></div></div>)}</div>)}
        
        {activeTab === 'hero' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Carrusel Home</h2>
                    <button onClick={createNewHeroSlide} className="bg-green-500 text-white px-4 py-2 rounded text-sm">+ Nueva Imagen</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {heroSlides.map(s => (
                        <div key={s.id} className="border p-2 rounded relative group hover:bg-gray-50">
                            <img src={s.image} className="h-24 w-full object-cover mb-2 rounded" />
                            <p className="text-xs font-bold truncate">{s.title}</p>
                            <div className="absolute top-1 right-1 flex gap-1 bg-white/80 rounded p-1">
                                <button onClick={()=>{resetEditState(); setEditingSlide({...s}); setIsModalOpen(true)}} className="text-blue-600 text-xs">✏️</button>
                                <button onClick={()=>handleDelete(s.id, 'hero_slide')} className="text-red-600 text-xs">🗑️</button>
                            </div>
                        </div>
                    ))}
                </div>
                <h2 className="text-xl font-bold mb-4">Banners Promocionales</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {promoBanners.map(b => (
                        <div key={b.id} className="border p-2 rounded cursor-pointer hover:bg-gray-50 flex items-center gap-4" onClick={()=>{resetEditState(); setEditingBanner({...b}); setIsModalOpen(true)}}>
                            <img src={b.image} className="h-24 w-32 object-cover rounded" />
                            <div>
                                <p className="font-bold text-sm">{b.title}</p>
                                <span className="text-xs bg-gray-200 px-2 rounded">{b.badge}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>

      {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-0 max-h-[95vh] overflow-hidden flex flex-col">
                  
                  {/* MODAL HEADER */}
                  <div className="bg-gray-100 p-4 border-b flex justify-between items-center">
                      <h3 className="text-xl font-bold text-gray-700">
                          {editingTrip ? 'Editar Paquete Turístico' : 
                           editingHotel ? 'Editar Hotel' : 
                           editingRental ? 'Editar Alquiler' : 
                           editingExcursion ? 'Editar Excursión' : 
                           editingGroup ? 'Editar Salida Grupal' : 
                           'Editar Elemento'}
                      </h3>
                      <button onClick={()=>setIsModalOpen(false)} className="text-gray-500 hover:text-red-500 text-2xl font-bold">&times;</button>
                  </div>

                  {/* MODAL BODY - SCROLLABLE */}
                  <div className="p-6 overflow-y-auto flex-1">
                      
                      {/* --- FORMULARIO PAQUETES --- */}
                      {editingTrip && (
                          <form onSubmit={handleSave} className="space-y-6">
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div className="space-y-4">
                                       <h4 className="font-bold text-cyan-700 border-b pb-1">Información Básica</h4>
                                       <input value={editingTrip.title} onChange={e=>setEditingTrip({...editingTrip, title:e.target.value})} className="border p-3 w-full rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="Título del Viaje" />
                                       <input value={editingTrip.location} onChange={e=>setEditingTrip({...editingTrip, location:e.target.value})} className="border p-3 w-full rounded-lg" placeholder="Ubicación (Ciudad, País)" />
                                       <div className="grid grid-cols-2 gap-4">
                                            <input value={editingTrip.durationLabel || ''} onChange={e=>setEditingTrip({...editingTrip, durationLabel:e.target.value})} className="border p-3 rounded-lg" placeholder="Duración (ej: 8 Días / 7 Noches)" />
                                            <label className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                                                <input type="checkbox" checked={editingTrip.includesFlight} onChange={e=>setEditingTrip({...editingTrip, includesFlight:e.target.checked})} className="w-5 h-5 text-cyan-600" />
                                                <span>Incluye Vuelo ✈️</span>
                                            </label>
                                       </div>
                                       <textarea value={editingTrip.description} onChange={e=>setEditingTrip({...editingTrip, description:e.target.value})} className="border p-3 w-full rounded-lg h-32" placeholder="Descripción detallada..." />
                                   </div>
                                   <div className="space-y-4">
                                       <h4 className="font-bold text-green-700 border-b pb-1">Precios y Ofertas (USD)</h4>
                                       <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-gray-500">Precio USD</label>
                                                <input type="number" value={editingTrip.price} onChange={e=>setEditingTrip({...editingTrip, price:Number(e.target.value)})} className="border p-3 w-full rounded-lg font-bold text-lg" placeholder="0.00" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-500">Descuento %</label>
                                                <input type="number" value={editingTrip.discount || 0} onChange={e=>setEditingTrip({...editingTrip, discount:Number(e.target.value)})} className="border p-3 w-full rounded-lg" placeholder="0" />
                                            </div>
                                       </div>
                                       {editingTrip.discount && editingTrip.discount > 0 && (
                                           <div className="text-sm text-green-600 font-bold text-right">Precio Final: USD {Math.round(editingTrip.price * (1 - editingTrip.discount/100))}</div>
                                       )}
                                       <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                            <label className="flex items-center space-x-2 mb-2 cursor-pointer">
                                                <input type="checkbox" checked={editingTrip.isOffer} onChange={e=>setEditingTrip({...editingTrip, isOffer:e.target.checked})} className="w-5 h-5 text-orange-500" />
                                                <span className="font-bold text-orange-700">MARCAR COMO DESTACADO / OFERTA</span>
                                            </label>
                                            <input value={editingTrip.specialLabel || ''} onChange={e=>setEditingTrip({...editingTrip, specialLabel:e.target.value})} className="border p-2 w-full rounded bg-white text-sm" placeholder="Etiqueta Especial (ej: Hot Sale, Cyber Monday)" />
                                       </div>
                                       <div className="grid grid-cols-2 gap-4">
                                            <input type="number" value={editingTrip.rating || 0} max={10} onChange={e=>setEditingTrip({...editingTrip, rating:Number(e.target.value)})} className="border p-2 rounded" placeholder="Puntaje (1-10)" />
                                            <input type="number" value={editingTrip.reviewsCount || 0} onChange={e=>setEditingTrip({...editingTrip, reviewsCount:Number(e.target.value)})} className="border p-2 rounded" placeholder="Cant. Reseñas" />
                                       </div>
                                   </div>
                               </div>
                               <div>
                                   <h4 className="font-bold text-gray-700 border-b pb-1 mb-2">Fechas de Salida</h4>
                                   <textarea value={tripDatesInput} onChange={e=>setTripDatesInput(e.target.value)} className="border p-3 w-full rounded-lg bg-gray-50 text-sm" rows={3} placeholder="Ingrese una fecha por línea (ej: Enero 2026)" />
                               </div>
                               <div>
                                   <h4 className="font-bold text-gray-700 border-b pb-1 mb-2">Galería de Imágenes</h4>
                                   <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-2">
                                       {editingTrip.images.map((img,i)=><div key={i} className="relative group aspect-square"><img src={img} className="w-full h-full object-cover rounded-lg" /><button type="button" onClick={()=>{const n=[...editingTrip.images];n.splice(i,1);setEditingTrip({...editingTrip, images:n})}} className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full shadow-md hover:scale-110 transition-transform">×</button></div>)}
                                   </div>
                                   <div className="flex gap-2">
                                       <input value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} className="border p-2 flex-grow rounded-lg" placeholder="Pegar URL de imagen..." />
                                       <button type="button" onClick={()=>{if(imageUrlInput)setEditingTrip({...editingTrip, images:[...editingTrip.images, imageUrlInput]});setImageUrlInput('')}} className="bg-gray-200 px-4 rounded-lg font-bold hover:bg-gray-300">Agregar URL</button>
                                       <label className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold cursor-pointer hover:bg-blue-200 flex items-center">Subir PC <input type="file" multiple hidden onChange={(e)=>handleFileUpload(e, setEditingTrip)} /></label>
                                   </div>
                               </div>
                          </form>
                      )}

                      {/* --- FORMULARIO HOTELES --- */}
                      {editingHotel && (
                          <form onSubmit={handleSave} className="space-y-6">
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div className="space-y-4">
                                       <h4 className="font-bold text-blue-700 border-b pb-1">Datos del Hotel</h4>
                                       <input value={editingHotel.title} onChange={e=>setEditingHotel({...editingHotel, title:e.target.value})} className="border p-3 w-full rounded-lg font-bold" placeholder="Nombre del Hotel" />
                                       <input value={editingHotel.location} onChange={e=>setEditingHotel({...editingHotel, location:e.target.value})} className="border p-3 w-full rounded-lg" placeholder="Ubicación" />
                                       <div className="grid grid-cols-2 gap-4">
                                            <div><label className="text-xs font-bold text-gray-500">Estrellas</label><select value={editingHotel.stars} onChange={e=>setEditingHotel({...editingHotel, stars:Number(e.target.value)})} className="border p-3 w-full rounded-lg"><option value="3">3 Estrellas</option><option value="4">4 Estrellas</option><option value="5">5 Estrellas</option></select></div>
                                            <div><label className="text-xs font-bold text-gray-500">Precio x Noche (USD)</label><input type="number" value={editingHotel.pricePerNight} onChange={e=>setEditingHotel({...editingHotel, pricePerNight:Number(e.target.value)})} className="border p-3 w-full rounded-lg" /></div>
                                       </div>
                                       <textarea value={editingHotel.description} onChange={e=>setEditingHotel({...editingHotel, description:e.target.value})} className="border p-3 w-full rounded-lg h-32" placeholder="Descripción del alojamiento..." />
                                   </div>
                                   <div className="space-y-4">
                                       <h4 className="font-bold text-gray-700 border-b pb-1">Ubicación y Oferta</h4>
                                       <div className="grid grid-cols-2 gap-4">
                                            <input type="number" value={editingHotel.lat || ''} onChange={e=>setEditingHotel({...editingHotel, lat:Number(e.target.value)})} className="border p-2 rounded" placeholder="Latitud" />
                                            <input type="number" value={editingHotel.lng || ''} onChange={e=>setEditingHotel({...editingHotel, lng:Number(e.target.value)})} className="border p-2 rounded" placeholder="Longitud" />
                                       </div>
                                       <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
                                            <label className="flex items-center space-x-2 mb-2 cursor-pointer">
                                                <input type="checkbox" checked={editingHotel.isOffer} onChange={e=>setEditingHotel({...editingHotel, isOffer:e.target.checked})} className="w-5 h-5 text-orange-500" />
                                                <span className="font-bold text-orange-700">DESTACAR COMO OFERTA</span>
                                            </label>
                                            <div className="flex gap-2">
                                                <input type="number" value={editingHotel.discount || 0} onChange={e=>setEditingHotel({...editingHotel, discount:Number(e.target.value)})} className="border p-2 w-24 rounded bg-white" placeholder="Desc %" />
                                                <input value={editingHotel.specialLabel || ''} onChange={e=>setEditingHotel({...editingHotel, specialLabel:e.target.value})} className="border p-2 flex-grow rounded bg-white" placeholder="Etiqueta Especial" />
                                            </div>
                                       </div>
                                   </div>
                               </div>
                               <div>
                                   <h4 className="font-bold text-gray-700 border-b pb-1 mb-2">Servicios (Amenities)</h4>
                                   <textarea value={hotelAmenitiesInput} onChange={e=>setHotelAmenitiesInput(e.target.value)} className="border p-3 w-full rounded-lg bg-gray-50 text-sm" rows={4} placeholder="Piscina, Wifi, Desayuno... (Uno por línea)" />
                               </div>
                               <div>
                                   <h4 className="font-bold text-gray-700 border-b pb-1 mb-2">Fotos</h4>
                                   <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-2">
                                       {editingHotel.images.map((img,i)=><div key={i} className="relative group aspect-square"><img src={img} className="w-full h-full object-cover rounded-lg" /><button type="button" onClick={()=>{const n=[...editingHotel.images];n.splice(i,1);setEditingHotel({...editingHotel, images:n})}} className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full shadow-md">×</button></div>)}
                                   </div>
                                   <div className="flex gap-2">
                                       <input value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} className="border p-2 flex-grow rounded-lg" placeholder="URL Imagen" />
                                       <button type="button" onClick={()=>{if(imageUrlInput)setEditingHotel({...editingHotel, images:[...editingHotel.images, imageUrlInput]});setImageUrlInput('')}} className="bg-gray-200 px-4 rounded-lg font-bold">Agregar</button>
                                       <label className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold cursor-pointer">Subir <input type="file" multiple hidden onChange={(e)=>handleFileUpload(e, setEditingHotel)} /></label>
                                   </div>
                               </div>
                          </form>
                      )}

                      {/* --- FORMULARIO ALQUILERES --- */}
                      {editingRental && (
                          <form onSubmit={handleSave} className="space-y-6">
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div className="space-y-4">
                                       <h4 className="font-bold text-green-700 border-b pb-1">Datos de la Propiedad</h4>
                                       <input value={editingRental.title} onChange={e=>setEditingRental({...editingRental, title:e.target.value})} className="border p-3 w-full rounded-lg" placeholder="Título del Aviso" />
                                       <input value={editingRental.location} onChange={e=>setEditingRental({...editingRental, location:e.target.value})} className="border p-3 w-full rounded-lg" placeholder="Dirección / Ciudad" />
                                       <div className="grid grid-cols-3 gap-2">
                                            <div><label className="text-xs font-bold text-gray-500">Precio/Noche</label><input type="number" value={editingRental.pricePerNight} onChange={e=>setEditingRental({...editingRental, pricePerNight:Number(e.target.value)})} className="border p-2 w-full rounded" /></div>
                                            <div><label className="text-xs font-bold text-gray-500">Habitaciones</label><input type="number" value={editingRental.bedrooms} onChange={e=>setEditingRental({...editingRental, bedrooms:Number(e.target.value)})} className="border p-2 w-full rounded" /></div>
                                            <div><label className="text-xs font-bold text-gray-500">Huéspedes</label><input type="number" value={editingRental.maxGuests} onChange={e=>setEditingRental({...editingRental, maxGuests:Number(e.target.value)})} className="border p-2 w-full rounded" /></div>
                                       </div>
                                       <textarea value={editingRental.description} onChange={e=>setEditingRental({...editingRental, description:e.target.value})} className="border p-3 w-full rounded-lg h-32" placeholder="Descripción..." />
                                   </div>
                                   <div className="space-y-4">
                                       <h4 className="font-bold text-gray-700 border-b pb-1">Ubicación y Estado</h4>
                                       <div className="grid grid-cols-2 gap-4">
                                            <input type="number" value={editingRental.lat || ''} onChange={e=>setEditingRental({...editingRental, lat:Number(e.target.value)})} className="border p-2 rounded" placeholder="Latitud" />
                                            <input type="number" value={editingRental.lng || ''} onChange={e=>setEditingRental({...editingRental, lng:Number(e.target.value)})} className="border p-2 rounded" placeholder="Longitud" />
                                       </div>
                                       <div className="bg-gray-50 p-4 rounded-lg border mt-4">
                                            <label className="flex items-center space-x-2 mb-2 cursor-pointer">
                                                <input type="checkbox" checked={editingRental.isOffer} onChange={e=>setEditingRental({...editingRental, isOffer:e.target.checked})} className="w-5 h-5 text-green-600" />
                                                <span className="font-bold text-gray-700">Es una Oferta</span>
                                            </label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <input type="number" value={editingRental.discount || 0} onChange={e=>setEditingRental({...editingRental, discount:Number(e.target.value)})} className="border p-2 rounded bg-white" placeholder="Descuento %" />
                                                <input value={editingRental.specialLabel || ''} onChange={e=>setEditingRental({...editingRental, specialLabel:e.target.value})} className="border p-2 rounded bg-white" placeholder="Etiqueta" />
                                            </div>
                                       </div>
                                   </div>
                               </div>
                               <div>
                                   <h4 className="font-bold text-gray-700 border-b pb-1 mb-2">Comodidades</h4>
                                   <textarea value={rentalAmenitiesInput} onChange={e=>setRentalAmenitiesInput(e.target.value)} className="border p-3 w-full rounded-lg bg-gray-50 text-sm" rows={4} placeholder="Wifi, Cocina, Aire Acondicionado... (Uno por línea)" />
                               </div>
                               <div>
                                   <h4 className="font-bold text-gray-700 border-b pb-1 mb-2">Fotos</h4>
                                   <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-2">
                                       {editingRental.images.map((img,i)=><div key={i} className="relative group aspect-square"><img src={img} className="w-full h-full object-cover rounded-lg" /><button type="button" onClick={()=>{const n=[...editingRental.images];n.splice(i,1);setEditingRental({...editingRental, images:n})}} className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full shadow-md">×</button></div>)}
                                   </div>
                                   <div className="flex gap-2">
                                       <input value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} className="border p-2 flex-grow rounded-lg" placeholder="URL Imagen" />
                                       <button type="button" onClick={()=>{if(imageUrlInput)setEditingRental({...editingRental, images:[...editingRental.images, imageUrlInput]});setImageUrlInput('')}} className="bg-gray-200 px-4 rounded-lg font-bold">Agregar</button>
                                       <label className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold cursor-pointer">Subir <input type="file" multiple hidden onChange={(e)=>handleFileUpload(e, setEditingRental)} /></label>
                                   </div>
                               </div>
                          </form>
                      )}

                      {/* --- OTROS FORMULARIOS MANTENIDOS SIMILARES PERO ENRIQUECIDOS --- */}
                      
                      {/* HERO SLIDE FORM */}
                      {editingSlide && (
                          <form onSubmit={handleSave} className="space-y-4">
                              <input value={editingSlide.title} onChange={e=>setEditingSlide({...editingSlide, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título Principal" />
                              <input value={editingSlide.subtitle} onChange={e=>setEditingSlide({...editingSlide, subtitle:e.target.value})} className="border p-2 w-full rounded" placeholder="Subtítulo Descriptivo" />
                              <div className="grid grid-cols-2 gap-4">
                                  <input value={editingSlide.ctaText} onChange={e=>setEditingSlide({...editingSlide, ctaText:e.target.value})} className="border p-2 w-full rounded" placeholder="Texto Botón" />
                                  <input value={editingSlide.ctaLink} onChange={e=>setEditingSlide({...editingSlide, ctaLink:e.target.value})} className="border p-2 w-full rounded" placeholder="Enlace Botón (ej: /trips)" />
                              </div>
                              <div><label>Imagen de Fondo</label><div className="flex gap-2 mb-2"><input value={editingSlide.image} onChange={e=>setEditingSlide({...editingSlide, image:e.target.value})} className="border p-2 flex-grow rounded" placeholder="URL Imagen" /><input type="file" onChange={handleSlideImageUpload} /></div>{editingSlide.image && <img src={editingSlide.image} className="h-32 w-full object-cover" />}</div>
                          </form>
                      )}

                      {/* BANNER FORM */}
                      {editingBanner && (
                          <form onSubmit={handleSave} className="space-y-4">
                              <input value={editingBanner.title} onChange={e=>setEditingBanner({...editingBanner, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                              <input value={editingBanner.subtitle} onChange={e=>setEditingBanner({...editingBanner, subtitle:e.target.value})} className="border p-2 w-full rounded" placeholder="Subtítulo" />
                              <input value={editingBanner.badge} onChange={e=>setEditingBanner({...editingBanner, badge:e.target.value})} className="border p-2 w-full rounded" placeholder="Badge (Ej: PLAN DE AHORRO)" />
                              <div><label>Imagen</label><div className="flex gap-2 mb-2"><input value={editingBanner.image} onChange={e=>setEditingBanner({...editingBanner, image:e.target.value})} className="border p-2 flex-grow rounded" placeholder="URL Imagen" /><input type="file" onChange={handleBannerImageUpload} /></div>{editingBanner.image && <img src={editingBanner.image} className="h-32 w-full object-cover" />}</div>
                          </form>
                      )}

                      {/* GROUP FORM (Similar to Trip but specific) */}
                      {editingGroup && (
                          <form onSubmit={handleSave} className="space-y-6">
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div className="space-y-4">
                                       <h4 className="font-bold text-purple-700">Datos del Viaje Grupal</h4>
                                       <input value={editingGroup.title} onChange={e=>setEditingGroup({...editingGroup, title:e.target.value})} className="border p-3 w-full rounded-lg" placeholder="Título" />
                                       <input value={editingGroup.location} onChange={e=>setEditingGroup({...editingGroup, location:e.target.value})} className="border p-3 w-full rounded-lg" placeholder="Ubicación" />
                                       <input type="number" value={editingGroup.price} onChange={e=>setEditingGroup({...editingGroup, price:Number(e.target.value)})} className="border p-3 w-full rounded-lg" placeholder="Precio USD" />
                                       <textarea value={editingGroup.description} onChange={e=>setEditingGroup({...editingGroup, description:e.target.value})} className="border p-3 w-full rounded-lg h-32" placeholder="Descripción" />
                                   </div>
                                   <div className="space-y-4">
                                       <h4 className="font-bold text-purple-700">Detalles</h4>
                                       <textarea value={groupDatesInput} onChange={e=>setGroupDatesInput(e.target.value)} className="border p-3 w-full rounded-lg h-32" placeholder="Fechas de Salida (Una por línea)" />
                                       <div className="bg-purple-50 p-4 rounded-lg">
                                            <label className="flex items-center space-x-2 mb-2"><input type="checkbox" checked={editingGroup.includesFlight} onChange={e=>setEditingGroup({...editingGroup, includesFlight:e.target.checked})} /> <span>Incluye Vuelo</span></label>
                                            <label className="flex items-center space-x-2 mb-2"><input type="checkbox" checked={editingGroup.isOffer} onChange={e=>setEditingGroup({...editingGroup, isOffer:e.target.checked})} /> <span>Es Oferta</span></label>
                                            <input type="number" value={editingGroup.discount || 0} onChange={e=>setEditingGroup({...editingGroup, discount:Number(e.target.value)})} className="border p-2 w-full rounded bg-white mb-2" placeholder="Descuento %" />
                                            <input value={editingGroup.specialLabel || ''} onChange={e=>setEditingGroup({...editingGroup, specialLabel:e.target.value})} className="border p-2 w-full rounded bg-white" placeholder="Etiqueta Especial (Ej: Salida Confirmada)" />
                                       </div>
                                   </div>
                               </div>
                               {/* Image logic reused */}
                               <div><label>Imágenes</label><div className="flex gap-2 flex-wrap mb-2">{editingGroup.images.map((img,i)=><div key={i} className="relative w-20 h-20"><img src={img} className="w-full h-full object-cover rounded" /><button type="button" onClick={()=>{const n=[...editingGroup.images];n.splice(i,1);setEditingGroup({...editingGroup, images:n})}} className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">x</button></div>)}</div><div className="flex gap-2"><input value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} className="border p-1 flex-grow" placeholder="URL" /><button type="button" onClick={()=>{if(imageUrlInput)setEditingGroup({...editingGroup, images:[...editingGroup.images, imageUrlInput]});setImageUrlInput('')}} className="bg-gray-200 px-2 rounded">Add URL</button><input type="file" multiple onChange={(e)=>handleFileUpload(e, setEditingGroup)} /></div></div>
                          </form>
                      )}

                      {/* EXCURSION FORM */}
                      {editingExcursion && (
                          <form onSubmit={handleSave} className="space-y-4">
                               <input value={editingExcursion.title} onChange={e=>setEditingExcursion({...editingExcursion, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                               <div className="grid grid-cols-2 gap-4">
                                   <input type="number" value={editingExcursion.price} onChange={e=>setEditingExcursion({...editingExcursion, price:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio USD" />
                                   <input value={editingExcursion.duration} onChange={e=>setEditingExcursion({...editingExcursion, duration:e.target.value})} className="border p-2 w-full rounded" placeholder="Duración (ej: Full Day)" />
                               </div>
                               <textarea value={editingExcursion.description} onChange={e=>setEditingExcursion({...editingExcursion, description:e.target.value})} className="border p-2 w-full rounded" rows={3} placeholder="Descripción" />
                               <textarea value={excursionDatesInput} onChange={e=>setExcursionDatesInput(e.target.value)} className="border p-2 w-full rounded" rows={3} placeholder="Días disponibles (uno por línea)" />
                               <div><label>Imágenes</label><div className="flex gap-2 flex-wrap mb-2">{editingExcursion.images.map((img,i)=><div key={i} className="relative w-20 h-20"><img src={img} className="w-full h-full object-cover rounded" /><button type="button" onClick={()=>{const n=[...editingExcursion.images];n.splice(i,1);setEditingExcursion({...editingExcursion, images:n})}} className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">x</button></div>)}</div><div className="flex gap-2"><input value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} className="border p-1 flex-grow" placeholder="URL" /><button type="button" onClick={()=>{if(imageUrlInput)setEditingExcursion({...editingExcursion, images:[...editingExcursion.images, imageUrlInput]});setImageUrlInput('')}} className="bg-gray-200 px-2 rounded">Add URL</button><input type="file" multiple onChange={(e)=>handleFileUpload(e, setEditingExcursion)} /></div></div>
                          </form>
                      )}

                      {/* INSTALLMENT FORM */}
                      {editingInstallment && (
                          <form onSubmit={handleSave} className="space-y-4">
                               <input value={editingInstallment.title} onChange={e=>setEditingInstallment({...editingInstallment, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                               <div className="grid grid-cols-2 gap-4">
                                   <input type="number" value={editingInstallment.totalPrice} onChange={e=>setEditingInstallment({...editingInstallment, totalPrice:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio Total USD" />
                                   <input type="date" value={editingInstallment.departureDate} onChange={e=>setEditingInstallment({...editingInstallment, departureDate:e.target.value})} className="border p-2 w-full rounded" />
                               </div>
                               <textarea value={editingInstallment.description} onChange={e=>setEditingInstallment({...editingInstallment, description:e.target.value})} className="border p-2 w-full rounded" rows={3} placeholder="Descripción" />
                               <div className="bg-indigo-50 p-4 rounded">
                                   <label><input type="checkbox" checked={editingInstallment.isOffer} onChange={e=>setEditingInstallment({...editingInstallment, isOffer:e.target.checked})} /> Destacado</label>
                                   <input value={editingInstallment.specialLabel || ''} onChange={e=>setEditingInstallment({...editingInstallment, specialLabel:e.target.value})} className="border p-1 w-full rounded mt-2" placeholder="Etiqueta (ej: 12 Cuotas)" />
                               </div>
                               <div><label>Imágenes</label><div className="flex gap-2 flex-wrap mb-2">{editingInstallment.images.map((img,i)=><div key={i} className="relative w-20 h-20"><img src={img} className="w-full h-full object-cover rounded" /><button type="button" onClick={()=>{const n=[...editingInstallment.images];n.splice(i,1);setEditingInstallment({...editingInstallment, images:n})}} className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">x</button></div>)}</div><div className="flex gap-2"><input value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} className="border p-1 flex-grow" placeholder="URL" /><button type="button" onClick={()=>{if(imageUrlInput)setEditingInstallment({...editingInstallment, images:[...editingInstallment.images, imageUrlInput]});setImageUrlInput('')}} className="bg-gray-200 px-2 rounded">Add URL</button><input type="file" multiple onChange={(e)=>handleFileUpload(e, setEditingInstallment)} /></div></div>
                          </form>
                      )}

                      {/* WORLDCUP FORM */}
                      {editingWorldCup && (
                          <form onSubmit={handleSave} className="space-y-4">
                               <input value={editingWorldCup.title} onChange={e=>setEditingWorldCup({...editingWorldCup, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                               <input value={editingWorldCup.originCountry} onChange={e=>setEditingWorldCup({...editingWorldCup, originCountry:e.target.value})} className="border p-2 w-full rounded" placeholder="Origen (ej: Salida desde Argentina)" />
                               <div className="grid grid-cols-2 gap-4">
                                   <input type="number" value={editingWorldCup.totalPrice} onChange={e=>setEditingWorldCup({...editingWorldCup, totalPrice:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio Total USD" />
                                   <input type="date" value={editingWorldCup.departureDate} onChange={e=>setEditingWorldCup({...editingWorldCup, departureDate:e.target.value})} className="border p-2 w-full rounded" />
                               </div>
                               <textarea value={editingWorldCup.description} onChange={e=>setEditingWorldCup({...editingWorldCup, description:e.target.value})} className="border p-2 w-full rounded" rows={3} placeholder="Descripción" />
                               <div className="bg-blue-50 p-4 rounded">
                                   <label><input type="checkbox" checked={editingWorldCup.isOffer} onChange={e=>setEditingWorldCup({...editingWorldCup, isOffer:e.target.checked})} /> Destacado</label>
                               </div>
                               <div><label>Imágenes</label><div className="flex gap-2 flex-wrap mb-2">{editingWorldCup.images.map((img,i)=><div key={i} className="relative w-20 h-20"><img src={img} className="w-full h-full object-cover rounded" /><button type="button" onClick={()=>{const n=[...editingWorldCup.images];n.splice(i,1);setEditingWorldCup({...editingWorldCup, images:n})}} className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">x</button></div>)}</div><div className="flex gap-2"><input value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} className="border p-1 flex-grow" placeholder="URL" /><button type="button" onClick={()=>{if(imageUrlInput)setEditingWorldCup({...editingWorldCup, images:[...editingWorldCup.images, imageUrlInput]});setImageUrlInput('')}} className="bg-gray-200 px-2 rounded">Add URL</button><input type="file" multiple onChange={(e)=>handleFileUpload(e, setEditingWorldCup)} /></div></div>
                          </form>
                      )}

                  </div>

                  {/* MODAL FOOTER */}
                  <div className="bg-gray-100 p-4 border-t flex justify-end gap-3">
                      <button type="button" onClick={()=>setIsModalOpen(false)} className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-200 transition-colors">Cancelar</button>
                      <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 rounded-lg bg-cyan-600 text-white font-bold hover:bg-cyan-700 transition-colors disabled:bg-gray-400 shadow-lg">{isSaving ? 'Guardando...' : 'Guardar Cambios'}</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default Admin;
