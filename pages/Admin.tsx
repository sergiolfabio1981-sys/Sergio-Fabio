
import React, { useState, useEffect } from 'react';
import { Trip, Apartment, Excursion, Hotel, InstallmentTrip, WorldCupTrip, GroupTrip, HeroSlide, PromoBanner } from '../types';
import { getTrips, saveTrip, deleteTrip, createEmptyTrip } from '../services/tripService';
import { getRentals, saveRental, deleteRental, createEmptyRental } from '../services/rentalService';
import { getExcursions, saveExcursion, deleteExcursion, createEmptyExcursion } from '../services/excursionService';
import { getHotels, saveHotel, deleteHotel, createEmptyHotel } from '../services/hotelService';
import { getInstallmentTrips, saveInstallmentTrip, deleteInstallmentTrip, createEmptyInstallmentTrip } from '../services/installmentService';
import { getWorldCupTrips, saveWorldCupTrip, deleteWorldCupTrip, createEmptyWorldCupTrip } from '../services/worldCupService';
import { getGroupTrips, saveGroupTrip, deleteGroupTrip, createEmptyGroupTrip } from '../services/groupService';
import { getHeroSlides, saveHeroSlide, getPromoBanners, savePromoBanner } from '../services/heroService';
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

  const handleDelete = async (id: string, type: string) => {
      if(!window.confirm("¿Eliminar este elemento?")) return;
      if (type === 'trip') await deleteTrip(id);
      if (type === 'rental') await deleteRental(id);
      if (type === 'hotel') await deleteHotel(id);
      if (type === 'excursion') await deleteExcursion(id);
      if (type === 'group') await deleteGroupTrip(id);
      if (type === 'installment') await deleteInstallmentTrip(id);
      if (type === 'worldcup') await deleteWorldCupTrip(id);
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
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
            <h1 className="text-3xl font-bold text-gray-800">Panel de Administración (Online)</h1>
            <div className="flex items-center gap-4">
                <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm overflow-x-auto">
                    <button onClick={() => setActiveTab('hero')} className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'hero' ? 'bg-orange-600 text-white' : 'hover:bg-gray-100'}`}>Portada</button>
                    <button onClick={() => setActiveTab('trips')} className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'trips' ? 'bg-cyan-600 text-white' : 'hover:bg-gray-100'}`}>Viajes</button>
                    <button onClick={() => setActiveTab('groups')} className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'groups' ? 'bg-purple-600 text-white' : 'hover:bg-gray-100'}`}>Grupales</button>
                    <button onClick={() => setActiveTab('hotels')} className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'hotels' ? 'bg-cyan-600 text-white' : 'hover:bg-gray-100'}`}>Hoteles</button>
                    <button onClick={() => setActiveTab('rentals')} className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'rentals' ? 'bg-cyan-600 text-white' : 'hover:bg-gray-100'}`}>Alquileres</button>
                    <button onClick={() => setActiveTab('excursions')} className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'excursions' ? 'bg-cyan-600 text-white' : 'hover:bg-gray-100'}`}>Excursiones</button>
                    <button onClick={() => setActiveTab('installments')} className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'installments' ? 'bg-cyan-600 text-white' : 'hover:bg-gray-100'}`}>Cuotas</button>
                    <button onClick={() => setActiveTab('worldcup')} className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'worldcup' ? 'bg-blue-800 text-white' : 'hover:bg-gray-100'}`}>Mundial</button>
                </div>
                <button onClick={handleLogout} className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-200">Salir</button>
            </div>
        </div>

        {/* --- LISTS --- */}
        {activeTab === 'trips' && (<div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex justify-between mb-4"><h2 className="font-bold text-xl">Paquetes</h2><button onClick={()=>{resetEditState(); setEditingTrip(createEmptyTrip()); setTripDatesInput(''); setIsModalOpen(true)}} className="bg-green-500 text-white px-4 py-2 rounded">+ Nuevo</button></div>{trips.map(t=><div key={t.id} className="flex justify-between border-b py-2 items-center"><span>{t.title}</span><div><button onClick={()=>{resetEditState(); setEditingTrip({...t}); setTripDatesInput(t.availableDates.join('\n')); setIsModalOpen(true)}} className="text-blue-500 mr-4">Editar</button><button onClick={()=>handleDelete(t.id, 'trip')} className="text-red-500">Eliminar</button></div></div>)}</div>)}
        {activeTab === 'groups' && (<div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex justify-between mb-4"><h2 className="font-bold text-xl text-purple-700">Grupales</h2><button onClick={()=>{resetEditState(); setEditingGroup(createEmptyGroupTrip()); setGroupDatesInput(''); setIsModalOpen(true)}} className="bg-green-500 text-white px-4 py-2 rounded">+ Nuevo</button></div>{groupTrips.map(g=><div key={g.id} className="flex justify-between border-b py-2 items-center"><span>{g.title}</span><div><button onClick={()=>{resetEditState(); setEditingGroup({...g}); setGroupDatesInput(g.availableDates.join('\n')); setIsModalOpen(true)}} className="text-blue-500 mr-4">Editar</button><button onClick={()=>handleDelete(g.id, 'group')} className="text-red-500">Eliminar</button></div></div>)}</div>)}
        {activeTab === 'hotels' && (<div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex justify-between mb-4"><h2 className="font-bold text-xl">Hoteles</h2><button onClick={()=>{resetEditState(); setEditingHotel(createEmptyHotel()); setHotelAmenitiesInput(''); setIsModalOpen(true)}} className="bg-green-500 text-white px-4 py-2 rounded">+ Nuevo</button></div>{hotels.map(h=><div key={h.id} className="flex justify-between border-b py-2 items-center"><span>{h.title}</span><div><button onClick={()=>{resetEditState(); setEditingHotel({...h}); setHotelAmenitiesInput(h.amenities.join('\n')); setIsModalOpen(true)}} className="text-blue-500 mr-4">Editar</button><button onClick={()=>handleDelete(h.id, 'hotel')} className="text-red-500">Eliminar</button></div></div>)}</div>)}
        {activeTab === 'rentals' && (<div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex justify-between mb-4"><h2 className="font-bold text-xl">Alquileres</h2><button onClick={()=>{resetEditState(); setEditingRental(createEmptyRental()); setRentalAmenitiesInput(''); setIsModalOpen(true)}} className="bg-green-500 text-white px-4 py-2 rounded">+ Nuevo</button></div>{rentals.map(r=><div key={r.id} className="flex justify-between border-b py-2 items-center"><span>{r.title}</span><div><button onClick={()=>{resetEditState(); setEditingRental({...r}); setRentalAmenitiesInput(r.amenities.join('\n')); setIsModalOpen(true)}} className="text-blue-500 mr-4">Editar</button><button onClick={()=>handleDelete(r.id, 'rental')} className="text-red-500">Eliminar</button></div></div>)}</div>)}
        {activeTab === 'excursions' && (<div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex justify-between mb-4"><h2 className="font-bold text-xl">Excursiones</h2><button onClick={()=>{resetEditState(); setEditingExcursion(createEmptyExcursion()); setExcursionDatesInput(''); setIsModalOpen(true)}} className="bg-green-500 text-white px-4 py-2 rounded">+ Nuevo</button></div>{excursions.map(e=><div key={e.id} className="flex justify-between border-b py-2 items-center"><span>{e.title}</span><div><button onClick={()=>{resetEditState(); setEditingExcursion({...e}); setExcursionDatesInput(e.availableDates.join('\n')); setIsModalOpen(true)}} className="text-blue-500 mr-4">Editar</button><button onClick={()=>handleDelete(e.id, 'excursion')} className="text-red-500">Eliminar</button></div></div>)}</div>)}
        {activeTab === 'installments' && (<div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex justify-between mb-4"><h2 className="font-bold text-xl text-indigo-800">Cuotas</h2><button onClick={()=>{resetEditState(); setEditingInstallment(createEmptyInstallmentTrip()); setIsModalOpen(true)}} className="bg-green-500 text-white px-4 py-2 rounded">+ Nuevo</button></div>{installments.map(i=><div key={i.id} className="flex justify-between border-b py-2 items-center"><span>{i.title}</span><div><button onClick={()=>{resetEditState(); setEditingInstallment({...i}); setIsModalOpen(true)}} className="text-blue-500 mr-4">Editar</button><button onClick={()=>handleDelete(i.id, 'installment')} className="text-red-500">Eliminar</button></div></div>)}</div>)}
        {activeTab === 'worldcup' && (<div className="bg-white p-6 rounded-xl shadow-sm"><div className="flex justify-between mb-4"><h2 className="font-bold text-xl text-blue-900">Mundial</h2><button onClick={()=>{resetEditState(); setEditingWorldCup(createEmptyWorldCupTrip()); setIsModalOpen(true)}} className="bg-green-500 text-white px-4 py-2 rounded">+ Nuevo</button></div>{worldCupTrips.map(w=><div key={w.id} className="flex justify-between border-b py-2 items-center"><span>{w.title}</span><div><button onClick={()=>{resetEditState(); setEditingWorldCup({...w}); setIsModalOpen(true)}} className="text-blue-500 mr-4">Editar</button><button onClick={()=>handleDelete(w.id, 'worldcup')} className="text-red-500">Eliminar</button></div></div>)}</div>)}
        
        {activeTab === 'hero' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Carrusel Home</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {heroSlides.map(s => <div key={s.id} className="border p-2 rounded cursor-pointer hover:bg-gray-50" onClick={()=>{resetEditState(); setEditingSlide({...s}); setIsModalOpen(true)}}><img src={s.image} className="h-20 w-full object-cover mb-2" /><p className="text-xs font-bold">{s.title}</p></div>)}
                </div>
                <h2 className="text-xl font-bold mb-4">Banners Promocionales</h2>
                <div className="grid grid-cols-2 gap-4">
                    {promoBanners.map(b => <div key={b.id} className="border p-2 rounded cursor-pointer hover:bg-gray-50" onClick={()=>{resetEditState(); setEditingBanner({...b}); setIsModalOpen(true)}}><img src={b.image} className="h-20 w-full object-cover mb-2" /><p className="text-xs font-bold">{b.title}</p></div>)}
                </div>
            </div>
        )}
      </div>

      {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
                  
                  {/* HERO SLIDE FORM */}
                  {editingSlide && (
                      <form onSubmit={handleSave} className="space-y-4">
                          <h3 className="text-xl font-bold">Editar Slide Home</h3>
                          <input value={editingSlide.title} onChange={e=>setEditingSlide({...editingSlide, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                          <input value={editingSlide.subtitle} onChange={e=>setEditingSlide({...editingSlide, subtitle:e.target.value})} className="border p-2 w-full rounded" placeholder="Subtítulo" />
                          <div className="grid grid-cols-2 gap-4">
                              <input value={editingSlide.ctaText} onChange={e=>setEditingSlide({...editingSlide, ctaText:e.target.value})} className="border p-2 w-full rounded" placeholder="Texto Botón" />
                              <input value={editingSlide.ctaLink} onChange={e=>setEditingSlide({...editingSlide, ctaLink:e.target.value})} className="border p-2 w-full rounded" placeholder="Link Botón" />
                          </div>
                          <div><label>Imagen</label><div className="flex gap-2 mb-2"><input value={editingSlide.image} onChange={e=>setEditingSlide({...editingSlide, image:e.target.value})} className="border p-2 flex-grow rounded" placeholder="URL Imagen" /><input type="file" onChange={handleSlideImageUpload} /></div>{editingSlide.image && <img src={editingSlide.image} className="h-32 w-full object-cover" />}</div>
                          <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="border px-4 py-2 rounded">Cancelar</button><button disabled={isSaving} className="bg-blue-600 text-white px-4 py-2 rounded">{isSaving ? 'Guardando...' : 'Guardar'}</button></div>
                      </form>
                  )}

                  {/* BANNER FORM */}
                  {editingBanner && (
                      <form onSubmit={handleSave} className="space-y-4">
                          <h3 className="text-xl font-bold">Editar Banner</h3>
                          <input value={editingBanner.title} onChange={e=>setEditingBanner({...editingBanner, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                          <input value={editingBanner.subtitle} onChange={e=>setEditingBanner({...editingBanner, subtitle:e.target.value})} className="border p-2 w-full rounded" placeholder="Subtítulo" />
                          <input value={editingBanner.badge} onChange={e=>setEditingBanner({...editingBanner, badge:e.target.value})} className="border p-2 w-full rounded" placeholder="Badge" />
                          <div><label>Imagen</label><div className="flex gap-2 mb-2"><input value={editingBanner.image} onChange={e=>setEditingBanner({...editingBanner, image:e.target.value})} className="border p-2 flex-grow rounded" placeholder="URL Imagen" /><input type="file" onChange={handleBannerImageUpload} /></div>{editingBanner.image && <img src={editingBanner.image} className="h-32 w-full object-cover" />}</div>
                          <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="border px-4 py-2 rounded">Cancelar</button><button disabled={isSaving} className="bg-blue-600 text-white px-4 py-2 rounded">{isSaving ? 'Guardando...' : 'Guardar'}</button></div>
                      </form>
                  )}

                  {/* TRIP FORM */}
                  {editingTrip && (
                      <form onSubmit={handleSave} className="space-y-4">
                           <h3 className="text-xl font-bold">Editar Paquete</h3>
                           <input value={editingTrip.title} onChange={e=>setEditingTrip({...editingTrip, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                           <input value={editingTrip.location} onChange={e=>setEditingTrip({...editingTrip, location:e.target.value})} className="border p-2 w-full rounded" placeholder="Ubicación" />
                           <div className="grid grid-cols-3 gap-4">
                                <input type="number" value={editingTrip.price} onChange={e=>setEditingTrip({...editingTrip, price:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio USD" />
                                <input type="number" value={editingTrip.discount || 0} onChange={e=>setEditingTrip({...editingTrip, discount:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Desc %" />
                                <input value={editingTrip.specialLabel || ''} onChange={e=>setEditingTrip({...editingTrip, specialLabel:e.target.value})} className="border p-2 w-full rounded" placeholder="Etiqueta Especial" />
                           </div>
                           <textarea value={editingTrip.description} onChange={e=>setEditingTrip({...editingTrip, description:e.target.value})} className="border p-2 w-full rounded" rows={3} placeholder="Descripción" />
                           <textarea value={tripDatesInput} onChange={e=>setTripDatesInput(e.target.value)} className="border p-2 w-full rounded" rows={3} placeholder="Fechas (una por línea)" />
                           <label><input type="checkbox" checked={editingTrip.isOffer} onChange={e=>setEditingTrip({...editingTrip, isOffer:e.target.checked})} /> Oferta</label>
                           <div><label>Imágenes</label><div className="flex gap-2 flex-wrap mb-2">{editingTrip.images.map((img,i)=><div key={i} className="relative w-20 h-20"><img src={img} className="w-full h-full object-cover" /><button type="button" onClick={()=>{const n=[...editingTrip.images];n.splice(i,1);setEditingTrip({...editingTrip, images:n})}} className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">x</button></div>)}</div><div className="flex gap-2"><input value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} className="border p-1 flex-grow" placeholder="URL" /><button type="button" onClick={()=>{if(imageUrlInput)setEditingTrip({...editingTrip, images:[...editingTrip.images, imageUrlInput]});setImageUrlInput('')}} className="bg-gray-200 px-2 rounded">Add URL</button><input type="file" multiple onChange={(e)=>handleFileUpload(e, setEditingTrip)} /></div></div>
                           <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="border px-4 py-2 rounded">Cancelar</button><button disabled={isSaving} className="bg-blue-600 text-white px-4 py-2 rounded">{isSaving ? 'Guardando...' : 'Guardar'}</button></div>
                      </form>
                  )}

                  {/* HOTEL FORM */}
                  {editingHotel && (
                      <form onSubmit={handleSave} className="space-y-4">
                           <h3 className="text-xl font-bold">Editar Hotel</h3>
                           <input value={editingHotel.title} onChange={e=>setEditingHotel({...editingHotel, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                           <input value={editingHotel.location} onChange={e=>setEditingHotel({...editingHotel, location:e.target.value})} className="border p-2 w-full rounded" placeholder="Ubicación" />
                           <div className="grid grid-cols-3 gap-4">
                                <input type="number" value={editingHotel.pricePerNight} onChange={e=>setEditingHotel({...editingHotel, pricePerNight:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio x Noche" />
                                <input type="number" value={editingHotel.stars} onChange={e=>setEditingHotel({...editingHotel, stars:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Estrellas" />
                                <input type="number" value={editingHotel.discount || 0} onChange={e=>setEditingHotel({...editingHotel, discount:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Desc %" />
                           </div>
                           <textarea value={editingHotel.description} onChange={e=>setEditingHotel({...editingHotel, description:e.target.value})} className="border p-2 w-full rounded" rows={3} placeholder="Descripción" />
                           <textarea value={hotelAmenitiesInput} onChange={e=>setHotelAmenitiesInput(e.target.value)} className="border p-2 w-full rounded" rows={3} placeholder="Servicios (uno por línea)" />
                           <div><label>Imágenes</label><div className="flex gap-2 flex-wrap mb-2">{editingHotel.images.map((img,i)=><div key={i} className="relative w-20 h-20"><img src={img} className="w-full h-full object-cover" /><button type="button" onClick={()=>{const n=[...editingHotel.images];n.splice(i,1);setEditingHotel({...editingHotel, images:n})}} className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">x</button></div>)}</div><div className="flex gap-2"><input value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} className="border p-1 flex-grow" placeholder="URL" /><button type="button" onClick={()=>{if(imageUrlInput)setEditingHotel({...editingHotel, images:[...editingHotel.images, imageUrlInput]});setImageUrlInput('')}} className="bg-gray-200 px-2 rounded">Add URL</button><input type="file" multiple onChange={(e)=>handleFileUpload(e, setEditingHotel)} /></div></div>
                           <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="border px-4 py-2 rounded">Cancelar</button><button disabled={isSaving} className="bg-blue-600 text-white px-4 py-2 rounded">{isSaving ? 'Guardando...' : 'Guardar'}</button></div>
                      </form>
                  )}

                  {/* RENTAL FORM */}
                  {editingRental && (
                      <form onSubmit={handleSave} className="space-y-4">
                           <h3 className="text-xl font-bold">Editar Alquiler</h3>
                           <input value={editingRental.title} onChange={e=>setEditingRental({...editingRental, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                           <div className="grid grid-cols-4 gap-4">
                                <input type="number" value={editingRental.pricePerNight} onChange={e=>setEditingRental({...editingRental, pricePerNight:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio x Noche" />
                                <input type="number" value={editingRental.bedrooms} onChange={e=>setEditingRental({...editingRental, bedrooms:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Habitaciones" />
                                <input type="number" value={editingRental.maxGuests} onChange={e=>setEditingRental({...editingRental, maxGuests:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Huéspedes" />
                                <input type="number" value={editingRental.discount || 0} onChange={e=>setEditingRental({...editingRental, discount:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Desc %" />
                           </div>
                           <textarea value={editingRental.description} onChange={e=>setEditingRental({...editingRental, description:e.target.value})} className="border p-2 w-full rounded" rows={3} placeholder="Descripción" />
                           <textarea value={rentalAmenitiesInput} onChange={e=>setRentalAmenitiesInput(e.target.value)} className="border p-2 w-full rounded" rows={3} placeholder="Comodidades (una por línea)" />
                           <div><label>Imágenes</label><div className="flex gap-2 flex-wrap mb-2">{editingRental.images.map((img,i)=><div key={i} className="relative w-20 h-20"><img src={img} className="w-full h-full object-cover" /><button type="button" onClick={()=>{const n=[...editingRental.images];n.splice(i,1);setEditingRental({...editingRental, images:n})}} className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">x</button></div>)}</div><div className="flex gap-2"><input value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} className="border p-1 flex-grow" placeholder="URL" /><button type="button" onClick={()=>{if(imageUrlInput)setEditingRental({...editingRental, images:[...editingRental.images, imageUrlInput]});setImageUrlInput('')}} className="bg-gray-200 px-2 rounded">Add URL</button><input type="file" multiple onChange={(e)=>handleFileUpload(e, setEditingRental)} /></div></div>
                           <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="border px-4 py-2 rounded">Cancelar</button><button disabled={isSaving} className="bg-blue-600 text-white px-4 py-2 rounded">{isSaving ? 'Guardando...' : 'Guardar'}</button></div>
                      </form>
                  )}

                  {/* GROUP FORM */}
                  {editingGroup && (
                      <form onSubmit={handleSave} className="space-y-4">
                           <h3 className="text-xl font-bold">Editar Grupal</h3>
                           <input value={editingGroup.title} onChange={e=>setEditingGroup({...editingGroup, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                           <input type="number" value={editingGroup.price} onChange={e=>setEditingGroup({...editingGroup, price:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio USD" />
                           <textarea value={editingGroup.description} onChange={e=>setEditingGroup({...editingGroup, description:e.target.value})} className="border p-2 w-full rounded" rows={3} placeholder="Descripción" />
                           <textarea value={groupDatesInput} onChange={e=>setGroupDatesInput(e.target.value)} className="border p-2 w-full rounded" rows={3} placeholder="Fechas (una por línea)" />
                           <div><label>Imágenes</label><div className="flex gap-2 flex-wrap mb-2">{editingGroup.images.map((img,i)=><div key={i} className="relative w-20 h-20"><img src={img} className="w-full h-full object-cover" /><button type="button" onClick={()=>{const n=[...editingGroup.images];n.splice(i,1);setEditingGroup({...editingGroup, images:n})}} className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">x</button></div>)}</div><div className="flex gap-2"><input value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} className="border p-1 flex-grow" placeholder="URL" /><button type="button" onClick={()=>{if(imageUrlInput)setEditingGroup({...editingGroup, images:[...editingGroup.images, imageUrlInput]});setImageUrlInput('')}} className="bg-gray-200 px-2 rounded">Add URL</button><input type="file" multiple onChange={(e)=>handleFileUpload(e, setEditingGroup)} /></div></div>
                           <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="border px-4 py-2 rounded">Cancelar</button><button disabled={isSaving} className="bg-blue-600 text-white px-4 py-2 rounded">{isSaving ? 'Guardando...' : 'Guardar'}</button></div>
                      </form>
                  )}

                  {/* EXCURSION FORM */}
                  {editingExcursion && (
                      <form onSubmit={handleSave} className="space-y-4">
                           <h3 className="text-xl font-bold">Editar Excursión</h3>
                           <input value={editingExcursion.title} onChange={e=>setEditingExcursion({...editingExcursion, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                           <div className="grid grid-cols-2 gap-4">
                               <input type="number" value={editingExcursion.price} onChange={e=>setEditingExcursion({...editingExcursion, price:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio" />
                               <input value={editingExcursion.duration} onChange={e=>setEditingExcursion({...editingExcursion, duration:e.target.value})} className="border p-2 w-full rounded" placeholder="Duración" />
                           </div>
                           <textarea value={editingExcursion.description} onChange={e=>setEditingExcursion({...editingExcursion, description:e.target.value})} className="border p-2 w-full rounded" rows={3} placeholder="Descripción" />
                           <textarea value={excursionDatesInput} onChange={e=>setExcursionDatesInput(e.target.value)} className="border p-2 w-full rounded" rows={3} placeholder="Días disponibles (uno por línea)" />
                           <div><label>Imágenes</label><div className="flex gap-2 flex-wrap mb-2">{editingExcursion.images.map((img,i)=><div key={i} className="relative w-20 h-20"><img src={img} className="w-full h-full object-cover" /><button type="button" onClick={()=>{const n=[...editingExcursion.images];n.splice(i,1);setEditingExcursion({...editingExcursion, images:n})}} className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">x</button></div>)}</div><div className="flex gap-2"><input value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} className="border p-1 flex-grow" placeholder="URL" /><button type="button" onClick={()=>{if(imageUrlInput)setEditingExcursion({...editingExcursion, images:[...editingExcursion.images, imageUrlInput]});setImageUrlInput('')}} className="bg-gray-200 px-2 rounded">Add URL</button><input type="file" multiple onChange={(e)=>handleFileUpload(e, setEditingExcursion)} /></div></div>
                           <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="border px-4 py-2 rounded">Cancelar</button><button disabled={isSaving} className="bg-blue-600 text-white px-4 py-2 rounded">{isSaving ? 'Guardando...' : 'Guardar'}</button></div>
                      </form>
                  )}

                  {/* INSTALLMENT FORM */}
                  {editingInstallment && (
                      <form onSubmit={handleSave} className="space-y-4">
                           <h3 className="text-xl font-bold">Editar Plan Cuotas</h3>
                           <input value={editingInstallment.title} onChange={e=>setEditingInstallment({...editingInstallment, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                           <div className="grid grid-cols-2 gap-4">
                               <input type="number" value={editingInstallment.totalPrice} onChange={e=>setEditingInstallment({...editingInstallment, totalPrice:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio Total" />
                               <input type="date" value={editingInstallment.departureDate} onChange={e=>setEditingInstallment({...editingInstallment, departureDate:e.target.value})} className="border p-2 w-full rounded" />
                           </div>
                           <textarea value={editingInstallment.description} onChange={e=>setEditingInstallment({...editingInstallment, description:e.target.value})} className="border p-2 w-full rounded" rows={3} placeholder="Descripción" />
                           <div><label>Imágenes</label><div className="flex gap-2 flex-wrap mb-2">{editingInstallment.images.map((img,i)=><div key={i} className="relative w-20 h-20"><img src={img} className="w-full h-full object-cover" /><button type="button" onClick={()=>{const n=[...editingInstallment.images];n.splice(i,1);setEditingInstallment({...editingInstallment, images:n})}} className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">x</button></div>)}</div><div className="flex gap-2"><input value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} className="border p-1 flex-grow" placeholder="URL" /><button type="button" onClick={()=>{if(imageUrlInput)setEditingInstallment({...editingInstallment, images:[...editingInstallment.images, imageUrlInput]});setImageUrlInput('')}} className="bg-gray-200 px-2 rounded">Add URL</button><input type="file" multiple onChange={(e)=>handleFileUpload(e, setEditingInstallment)} /></div></div>
                           <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="border px-4 py-2 rounded">Cancelar</button><button disabled={isSaving} className="bg-blue-600 text-white px-4 py-2 rounded">{isSaving ? 'Guardando...' : 'Guardar'}</button></div>
                      </form>
                  )}

                  {/* WORLDCUP FORM */}
                  {editingWorldCup && (
                      <form onSubmit={handleSave} className="space-y-4">
                           <h3 className="text-xl font-bold">Editar Mundial</h3>
                           <input value={editingWorldCup.title} onChange={e=>setEditingWorldCup({...editingWorldCup, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                           <input value={editingWorldCup.originCountry} onChange={e=>setEditingWorldCup({...editingWorldCup, originCountry:e.target.value})} className="border p-2 w-full rounded" placeholder="Origen" />
                           <div className="grid grid-cols-2 gap-4">
                               <input type="number" value={editingWorldCup.totalPrice} onChange={e=>setEditingWorldCup({...editingWorldCup, totalPrice:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio Total" />
                               <input type="date" value={editingWorldCup.departureDate} onChange={e=>setEditingWorldCup({...editingWorldCup, departureDate:e.target.value})} className="border p-2 w-full rounded" />
                           </div>
                           <textarea value={editingWorldCup.description} onChange={e=>setEditingWorldCup({...editingWorldCup, description:e.target.value})} className="border p-2 w-full rounded" rows={3} placeholder="Descripción" />
                           <div><label>Imágenes</label><div className="flex gap-2 flex-wrap mb-2">{editingWorldCup.images.map((img,i)=><div key={i} className="relative w-20 h-20"><img src={img} className="w-full h-full object-cover" /><button type="button" onClick={()=>{const n=[...editingWorldCup.images];n.splice(i,1);setEditingWorldCup({...editingWorldCup, images:n})}} className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">x</button></div>)}</div><div className="flex gap-2"><input value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} className="border p-1 flex-grow" placeholder="URL" /><button type="button" onClick={()=>{if(imageUrlInput)setEditingWorldCup({...editingWorldCup, images:[...editingWorldCup.images, imageUrlInput]});setImageUrlInput('')}} className="bg-gray-200 px-2 rounded">Add URL</button><input type="file" multiple onChange={(e)=>handleFileUpload(e, setEditingWorldCup)} /></div></div>
                           <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="border px-4 py-2 rounded">Cancelar</button><button disabled={isSaving} className="bg-blue-600 text-white px-4 py-2 rounded">{isSaving ? 'Guardando...' : 'Guardar'}</button></div>
                      </form>
                  )}

              </div>
          </div>
      )}
    </div>
  );
};

export default Admin;
