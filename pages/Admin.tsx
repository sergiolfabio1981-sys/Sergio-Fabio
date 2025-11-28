
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

  // Helper Inputs
  const [tripDatesInput, setTripDatesInput] = useState('');
  const [rentalAmenitiesInput, setRentalAmenitiesInput] = useState('');
  const [excursionDatesInput, setExcursionDatesInput] = useState('');
  const [hotelAmenitiesInput, setHotelAmenitiesInput] = useState('');
  const [groupDatesInput, setGroupDatesInput] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setTrips(getTrips());
      setRentals(getRentals());
      setExcursions(getExcursions());
      setHotels(getHotels());
      setInstallments(getInstallmentTrips());
      setWorldCupTrips(getWorldCupTrips());
      setGroupTrips(getGroupTrips());
      setHeroSlides(getHeroSlides());
      setPromoBanners(getPromoBanners());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setIsAuthenticated(true);
      localStorage.setItem('abras_isAdmin', 'true');
    } else {
      alert('Credenciales inválidas');
    }
  };
  
  const handleLogout = () => {
      setIsAuthenticated(false);
      localStorage.removeItem('abras_isAdmin');
  };

  const resetEditState = () => {
      setEditingTrip(null);
      setEditingRental(null);
      setEditingExcursion(null);
      setEditingHotel(null);
      setEditingInstallment(null);
      setEditingWorldCup(null);
      setEditingGroup(null);
      setEditingSlide(null);
      setEditingBanner(null);
      setImageUrlInput('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
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

    if (type === 'rental' && editingRental) setEditingRental(prev => prev ? { ...prev, images: [...prev.images, ...newImages] } : null);
    else if (type === 'trip' && editingTrip) setEditingTrip(prev => prev ? { ...prev, images: [...prev.images, ...newImages] } : null);
    else if (type === 'excursion' && editingExcursion) setEditingExcursion(prev => prev ? { ...prev, images: [...prev.images, ...newImages] } : null);
    else if (type === 'hotel' && editingHotel) setEditingHotel(prev => prev ? { ...prev, images: [...prev.images, ...newImages] } : null);
    else if (type === 'installment' && editingInstallment) setEditingInstallment(prev => prev ? { ...prev, images: [...prev.images, ...newImages] } : null);
    else if (type === 'worldcup' && editingWorldCup) setEditingWorldCup(prev => prev ? { ...prev, images: [...prev.images, ...newImages] } : null);
    else if (type === 'group' && editingGroup) setEditingGroup(prev => prev ? { ...prev, images: [...prev.images, ...newImages] } : null);
    else if (type === 'hero' && editingSlide && newImages.length > 0) setEditingSlide(prev => prev ? { ...prev, image: newImages[0] } : null);
    else if (type === 'banner' && editingBanner && newImages.length > 0) setEditingBanner(prev => prev ? { ...prev, image: newImages[0] } : null);

    e.target.value = '';
  };

  const handleAddImageUrl = (type: string) => {
      if (!imageUrlInput.trim()) return;
      if (type === 'rental' && editingRental) setEditingRental(prev => prev ? { ...prev, images: [...prev.images, imageUrlInput] } : null);
      else if (type === 'trip' && editingTrip) setEditingTrip(prev => prev ? { ...prev, images: [...prev.images, imageUrlInput] } : null);
      else if (type === 'excursion' && editingExcursion) setEditingExcursion(prev => prev ? { ...prev, images: [...prev.images, imageUrlInput] } : null);
      else if (type === 'hotel' && editingHotel) setEditingHotel(prev => prev ? { ...prev, images: [...prev.images, imageUrlInput] } : null);
      else if (type === 'installment' && editingInstallment) setEditingInstallment(prev => prev ? { ...prev, images: [...prev.images, imageUrlInput] } : null);
      else if (type === 'worldcup' && editingWorldCup) setEditingWorldCup(prev => prev ? { ...prev, images: [...prev.images, imageUrlInput] } : null);
      else if (type === 'group' && editingGroup) setEditingGroup(prev => prev ? { ...prev, images: [...prev.images, imageUrlInput] } : null);
      else if (type === 'hero' && editingSlide) setEditingSlide(prev => prev ? { ...prev, image: imageUrlInput } : null);
      else if (type === 'banner' && editingBanner) setEditingBanner(prev => prev ? { ...prev, image: imageUrlInput } : null);
      setImageUrlInput('');
  };

  // HANDLERS
  const openCreateTrip = () => { resetEditState(); setEditingTrip(createEmptyTrip()); setTripDatesInput(''); setIsModalOpen(true); };
  const openEditTrip = (t: Trip) => { resetEditState(); setEditingTrip({...t}); setTripDatesInput(t.availableDates.join('\n')); setIsModalOpen(true); };
  const saveCurrentTrip = (e: any) => { e.preventDefault(); if(!editingTrip) return; saveTrip({...editingTrip, availableDates: tripDatesInput.split('\n').filter(d=>d.trim()!=='')}); setTrips(getTrips()); setIsModalOpen(false); };
  const deleteCurrentTrip = (id: string) => { if(window.confirm("¿Eliminar?")) { deleteTrip(id); setTrips(getTrips()); }};

  const openCreateGroup = () => { resetEditState(); setEditingGroup(createEmptyGroupTrip()); setGroupDatesInput(''); setIsModalOpen(true); };
  const openEditGroup = (g: GroupTrip) => { resetEditState(); setEditingGroup({...g}); setGroupDatesInput(g.availableDates.join('\n')); setIsModalOpen(true); };
  const saveCurrentGroup = (e: any) => { e.preventDefault(); if(!editingGroup) return; saveGroupTrip({...editingGroup, availableDates: groupDatesInput.split('\n').filter(d=>d.trim()!=='')}); setGroupTrips(getGroupTrips()); setIsModalOpen(false); };
  const deleteCurrentGroup = (id: string) => { if(window.confirm("¿Eliminar salida grupal?")) { deleteGroupTrip(id); setGroupTrips(getGroupTrips()); }};

  const openCreateRental = () => { resetEditState(); setEditingRental(createEmptyRental()); setRentalAmenitiesInput(''); setIsModalOpen(true); };
  const openEditRental = (r: Apartment) => { resetEditState(); setEditingRental({...r}); setRentalAmenitiesInput(r.amenities.join('\n')); setIsModalOpen(true); };
  const saveCurrentRental = (e: any) => { e.preventDefault(); if(!editingRental) return; saveRental({...editingRental, amenities: rentalAmenitiesInput.split('\n').filter(a=>a.trim()!=='')}); setRentals(getRentals()); setIsModalOpen(false); };
  const deleteCurrentRental = (id: string) => { if(window.confirm("¿Eliminar?")) { deleteRental(id); setRentals(getRentals()); }};

  const openCreateHotel = () => { resetEditState(); setEditingHotel(createEmptyHotel()); setHotelAmenitiesInput(''); setIsModalOpen(true); };
  const openEditHotel = (h: Hotel) => { resetEditState(); setEditingHotel({...h}); setHotelAmenitiesInput(h.amenities.join('\n')); setIsModalOpen(true); };
  const saveCurrentHotel = (e: any) => { e.preventDefault(); if(!editingHotel) return; saveHotel({...editingHotel, amenities: hotelAmenitiesInput.split('\n').filter(a=>a.trim()!=='')}); setHotels(getHotels()); setIsModalOpen(false); };
  const deleteCurrentHotel = (id: string) => { if(window.confirm("¿Eliminar?")) { deleteHotel(id); setHotels(getHotels()); }};

  const openCreateExcursion = () => { resetEditState(); setEditingExcursion(createEmptyExcursion()); setExcursionDatesInput(''); setIsModalOpen(true); };
  const openEditExcursion = (e: Excursion) => { resetEditState(); setEditingExcursion({...e}); setExcursionDatesInput(e.availableDates.join('\n')); setIsModalOpen(true); };
  const saveCurrentExcursion = (e: any) => { e.preventDefault(); if(!editingExcursion) return; saveExcursion({...editingExcursion, availableDates: excursionDatesInput.split('\n').filter(d=>d.trim()!=='')}); setExcursions(getExcursions()); setIsModalOpen(false); };
  const deleteCurrentExcursion = (id: string) => { if(window.confirm("¿Eliminar?")) { deleteExcursion(id); setExcursions(getExcursions()); }};

  const openCreateInstallment = () => { resetEditState(); setEditingInstallment(createEmptyInstallmentTrip()); setIsModalOpen(true); };
  const openEditInstallment = (i: InstallmentTrip) => { resetEditState(); setEditingInstallment({...i}); setIsModalOpen(true); };
  const saveCurrentInstallment = (e: any) => { e.preventDefault(); if(!editingInstallment) return; saveInstallmentTrip(editingInstallment); setInstallments(getInstallmentTrips()); setIsModalOpen(false); };
  const deleteCurrentInstallment = (id: string) => { if(window.confirm("¿Eliminar?")) { deleteInstallmentTrip(id); setInstallments(getInstallmentTrips()); }};

  const openCreateWorldCup = () => { resetEditState(); setEditingWorldCup(createEmptyWorldCupTrip()); setIsModalOpen(true); };
  const openEditWorldCup = (w: WorldCupTrip) => { resetEditState(); setEditingWorldCup({...w}); setIsModalOpen(true); };
  const saveCurrentWorldCup = (e: any) => { e.preventDefault(); if(!editingWorldCup) return; saveWorldCupTrip(editingWorldCup); setWorldCupTrips(getWorldCupTrips()); setIsModalOpen(false); };
  const deleteCurrentWorldCup = (id: string) => { if(window.confirm("¿Eliminar?")) { deleteWorldCupTrip(id); setWorldCupTrips(getWorldCupTrips()); }};

  const openEditSlide = (s: HeroSlide) => { resetEditState(); setEditingSlide({...s}); setIsModalOpen(true); };
  const saveCurrentSlide = (e: any) => { e.preventDefault(); if(!editingSlide) return; saveHeroSlide(editingSlide); setHeroSlides(getHeroSlides()); setIsModalOpen(false); };
  const openEditBanner = (b: PromoBanner) => { resetEditState(); setEditingBanner({...b}); setIsModalOpen(true); };
  const saveCurrentBanner = (e: any) => { e.preventDefault(); if(!editingBanner) return; savePromoBanner(editingBanner); setPromoBanners(getPromoBanners()); setIsModalOpen(false); };


  if (!isAuthenticated) {
     return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-center">Login Admin</h2>
                <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full border p-2 rounded" />
                <div className="relative">
                    <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border p-2 rounded" />
                    <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-2 top-2 text-gray-500">👁️</button>
                </div>
                <button className="w-full bg-cyan-600 text-white py-2 rounded">Entrar</button>
            </form>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
            <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
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

        {/* --- TABS CONTENT --- */}
        {activeTab === 'trips' && (
             <div className="bg-white p-6 rounded-xl shadow-sm">
                 <div className="flex justify-between mb-4"><h2 className="font-bold text-xl">Paquetes</h2><button onClick={openCreateTrip} className="bg-green-500 text-white px-4 py-2 rounded">+ Nuevo</button></div>
                 {trips.map(t=><div key={t.id} className="flex justify-between border-b py-2 items-center"><span>{t.title}</span><div><button onClick={()=>openEditTrip(t)} className="text-blue-500 mr-4">Editar</button><button onClick={()=>deleteCurrentTrip(t.id)} className="text-red-500">Eliminar</button></div></div>)}
             </div>
        )}
        {activeTab === 'groups' && (
             <div className="bg-white p-6 rounded-xl shadow-sm">
                 <div className="flex justify-between mb-4"><h2 className="font-bold text-xl text-purple-700">Salidas Grupales</h2><button onClick={openCreateGroup} className="bg-green-500 text-white px-4 py-2 rounded">+ Nuevo</button></div>
                 {groupTrips.map(g=><div key={g.id} className="flex justify-between border-b py-2 items-center"><span>{g.title}</span><div><button onClick={()=>openEditGroup(g)} className="text-blue-500 mr-4">Editar</button><button onClick={()=>deleteCurrentGroup(g.id)} className="text-red-500">Eliminar</button></div></div>)}
             </div>
        )}
        {activeTab === 'rentals' && (
             <div className="bg-white p-6 rounded-xl shadow-sm">
                 <div className="flex justify-between mb-4"><h2 className="font-bold text-xl">Alquileres</h2><button onClick={openCreateRental} className="bg-green-500 text-white px-4 py-2 rounded">+ Nuevo</button></div>
                 {rentals.map(r=><div key={r.id} className="flex justify-between border-b py-2 items-center"><span>{r.title}</span><div><button onClick={()=>openEditRental(r)} className="text-blue-500 mr-4">Editar</button><button onClick={()=>deleteCurrentRental(r.id)} className="text-red-500">Eliminar</button></div></div>)}
             </div>
        )}
        {activeTab === 'hotels' && (
             <div className="bg-white p-6 rounded-xl shadow-sm">
                 <div className="flex justify-between mb-4"><h2 className="font-bold text-xl">Hoteles</h2><button onClick={openCreateHotel} className="bg-green-500 text-white px-4 py-2 rounded">+ Nuevo</button></div>
                 {hotels.map(h=><div key={h.id} className="flex justify-between border-b py-2 items-center"><span>{h.title}</span><div><button onClick={()=>openEditHotel(h)} className="text-blue-500 mr-4">Editar</button><button onClick={()=>deleteCurrentHotel(h.id)} className="text-red-500">Eliminar</button></div></div>)}
             </div>
        )}
        {activeTab === 'excursions' && (
             <div className="bg-white p-6 rounded-xl shadow-sm">
                 <div className="flex justify-between mb-4"><h2 className="font-bold text-xl">Excursiones</h2><button onClick={openCreateExcursion} className="bg-green-500 text-white px-4 py-2 rounded">+ Nuevo</button></div>
                 {excursions.map(e=><div key={e.id} className="flex justify-between border-b py-2 items-center"><span>{e.title}</span><div><button onClick={()=>openEditExcursion(e)} className="text-blue-500 mr-4">Editar</button><button onClick={()=>deleteCurrentExcursion(e.id)} className="text-red-500">Eliminar</button></div></div>)}
             </div>
        )}
        {activeTab === 'installments' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold text-indigo-800">ABRAS Cuotas</h2><button onClick={openCreateInstallment} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">+ Nuevo</button></div>
                {installments.map(t => (<div key={t.id} className="flex justify-between border-b py-2 items-center"><span>{t.title}</span><div><button onClick={() => openEditInstallment(t)} className="text-blue-600 mr-4">Editar</button><button onClick={() => deleteCurrentInstallment(t.id)} className="text-red-600">Eliminar</button></div></div>))}
            </div>
        )}
        {activeTab === 'worldcup' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold text-blue-900">Mundial 2026</h2><button onClick={openCreateWorldCup} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">+ Nuevo</button></div>
                {worldCupTrips.map(t => (<div key={t.id} className="flex justify-between border-b py-2 items-center"><span>{t.title}</span><div><button onClick={() => openEditWorldCup(t)} className="text-blue-600 mr-4">Editar</button><button onClick={() => deleteCurrentWorldCup(t.id)} className="text-red-600">Eliminar</button></div></div>))}
            </div>
        )}
        {activeTab === 'hero' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Portada Home</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {heroSlides.map(s => <div key={s.id} className="border p-2 rounded cursor-pointer hover:bg-gray-50" onClick={()=>openEditSlide(s)}><img src={s.image} className="h-20 w-full object-cover mb-2" /><p className="text-xs font-bold">{s.title}</p></div>)}
                </div>
                <h3 className="text-lg font-bold mt-6 mb-4">Banners</h3>
                <div className="grid grid-cols-2 gap-4">
                    {promoBanners.map(b => <div key={b.id} className="border p-2 rounded cursor-pointer hover:bg-gray-50" onClick={()=>openEditBanner(b)}><img src={b.image} className="h-20 w-full object-cover mb-2" /><p className="text-xs font-bold">{b.title}</p></div>)}
                </div>
            </div>
        )}
      </div>

      {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
                  
                  {/* GROUP EDIT FORM */}
                  {editingGroup && (
                      <form onSubmit={saveCurrentGroup} className="space-y-4">
                           <h3 className="text-xl font-bold mb-4 text-purple-700">Editar Salida Grupal</h3>
                           <input value={editingGroup.title} onChange={e=>setEditingGroup({...editingGroup, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                           <input value={editingGroup.location} onChange={e=>setEditingGroup({...editingGroup, location:e.target.value})} className="border p-2 w-full rounded" placeholder="Ubicación" />
                           <div className="grid grid-cols-3 gap-4">
                                <input type="number" value={editingGroup.price} onChange={e=>setEditingGroup({...editingGroup, price:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio (USD)" />
                                <div><label className="text-xs font-bold text-red-500">Descuento (%)</label><input type="number" value={editingGroup.discount || 0} onChange={e=>setEditingGroup({...editingGroup, discount:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="0" /></div>
                                <div><label className="text-xs font-bold text-gray-500">Etiqueta Especial</label><input type="text" value={editingGroup.specialLabel || ''} onChange={e=>setEditingGroup({...editingGroup, specialLabel:e.target.value})} className="border p-2 w-full rounded" placeholder="Ej: Salida Confirmada" /></div>
                           </div>
                           <textarea value={editingGroup.description} onChange={e=>setEditingGroup({...editingGroup, description:e.target.value})} className="border p-2 w-full rounded" placeholder="Descripción" rows={3}></textarea>
                           <textarea value={groupDatesInput} onChange={e=>setGroupDatesInput(e.target.value)} className="border p-2 w-full rounded" placeholder="Fechas de Salida (una por línea)" rows={4}></textarea>
                           <div>
                              <label className="block text-sm font-bold mb-1">Imágenes</label>
                              <div className="flex gap-2 mb-2 overflow-x-auto">{editingGroup.images.map((img,i)=><div key={i} className="relative group min-w-[64px]"><img src={img} className="w-16 h-16 object-cover rounded" /><button type="button" onClick={()=>{const newImages = [...editingGroup.images]; newImages.splice(i,1); setEditingGroup({...editingGroup, images: newImages})}} className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">x</button></div>)}</div>
                              <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded border"><div className="flex gap-2"><input type="text" placeholder="URL Imagen" className="border p-2 rounded flex-1 text-sm" value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} /><button type="button" onClick={()=>handleAddImageUrl('group')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm whitespace-nowrap">URL</button></div><input type="file" multiple onChange={(e)=>handleFileUpload(e, 'group')} className="text-sm" /></div>
                           </div>
                           <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancelar</button><button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Guardar</button></div>
                      </form>
                  )}

                  {editingTrip && (
                      <form onSubmit={saveCurrentTrip} className="space-y-4">
                           <h3 className="text-xl font-bold mb-4">Editar Paquete</h3>
                           <input value={editingTrip.title} onChange={e=>setEditingTrip({...editingTrip, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                           <input value={editingTrip.location} onChange={e=>setEditingTrip({...editingTrip, location:e.target.value})} className="border p-2 w-full rounded" placeholder="Ubicación" />
                           <div className="grid grid-cols-3 gap-4">
                                <input type="number" value={editingTrip.price} onChange={e=>setEditingTrip({...editingTrip, price:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio (USD)" />
                                <input type="number" value={editingTrip.discount || 0} onChange={e=>setEditingTrip({...editingTrip, discount:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Desc %" />
                                <input type="text" value={editingTrip.specialLabel || ''} onChange={e=>setEditingTrip({...editingTrip, specialLabel:e.target.value})} className="border p-2 w-full rounded" placeholder="Etiqueta" />
                           </div>
                           <textarea value={editingTrip.description} onChange={e=>setEditingTrip({...editingTrip, description:e.target.value})} className="border p-2 w-full rounded" rows={3} placeholder="Descripción" />
                           <textarea value={tripDatesInput} onChange={e=>setTripDatesInput(e.target.value)} className="border p-2 w-full rounded" rows={3} placeholder="Fechas" />
                           <label><input type="checkbox" checked={editingTrip.isOffer} onChange={e=>setEditingTrip({...editingTrip, isOffer:e.target.checked})} /> Oferta</label>
                           <div>
                              <label className="block text-sm font-bold mb-1">Imágenes</label>
                              <div className="flex gap-2 mb-2 overflow-x-auto">{editingTrip.images.map((img,i)=><div key={i} className="relative group min-w-[64px]"><img src={img} className="w-16 h-16 object-cover rounded" /><button type="button" onClick={()=>{const newImages = [...editingTrip.images]; newImages.splice(i,1); setEditingTrip({...editingTrip, images: newImages})}} className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">x</button></div>)}</div>
                              <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded border"><div className="flex gap-2"><input type="text" placeholder="URL Imagen" className="border p-2 rounded flex-1 text-sm" value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} /><button type="button" onClick={()=>handleAddImageUrl('trip')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm whitespace-nowrap">URL</button></div><input type="file" multiple onChange={(e)=>handleFileUpload(e, 'trip')} className="text-sm" /></div>
                           </div>
                           <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="border px-3 py-1 rounded">Cancelar</button><button className="bg-blue-600 text-white px-3 py-1 rounded">Guardar</button></div>
                      </form>
                  )}

                  {editingRental && (
                      <form onSubmit={saveCurrentRental} className="space-y-4">
                           <h3 className="text-xl font-bold mb-4">Editar Alquiler</h3>
                           <input value={editingRental.title} onChange={e=>setEditingRental({...editingRental, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                           <input value={editingRental.location} onChange={e=>setEditingRental({...editingRental, location:e.target.value})} className="border p-2 w-full rounded" placeholder="Ubicación" />
                           <div className="grid grid-cols-4 gap-4">
                                <input type="number" value={editingRental.pricePerNight} onChange={e=>setEditingRental({...editingRental, pricePerNight:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio x Noche" />
                                <input type="number" value={editingRental.bedrooms} onChange={e=>setEditingRental({...editingRental, bedrooms:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Habitaciones" />
                                <input type="number" value={editingRental.maxGuests} onChange={e=>setEditingRental({...editingRental, maxGuests:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Huéspedes" />
                                <input type="number" value={editingRental.discount || 0} onChange={e=>setEditingRental({...editingRental, discount:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Desc %" />
                           </div>
                           <textarea value={editingRental.description} onChange={e=>setEditingRental({...editingRental, description:e.target.value})} className="border p-2 w-full rounded" rows={3} placeholder="Descripción" />
                           <textarea value={rentalAmenitiesInput} onChange={e=>setRentalAmenitiesInput(e.target.value)} className="border p-2 w-full rounded" rows={3} placeholder="Comodidades (una por línea)" />
                           <div>
                              <label className="block text-sm font-bold mb-1">Imágenes</label>
                              <div className="flex gap-2 mb-2 overflow-x-auto">{editingRental.images.map((img,i)=><div key={i} className="relative group min-w-[64px]"><img src={img} className="w-16 h-16 object-cover rounded" /><button type="button" onClick={()=>{const newImages = [...editingRental.images]; newImages.splice(i,1); setEditingRental({...editingRental, images: newImages})}} className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">x</button></div>)}</div>
                              <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded border"><div className="flex gap-2"><input type="text" placeholder="URL Imagen" className="border p-2 rounded flex-1 text-sm" value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} /><button type="button" onClick={()=>handleAddImageUrl('rental')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm whitespace-nowrap">URL</button></div><input type="file" multiple onChange={(e)=>handleFileUpload(e, 'rental')} className="text-sm" /></div>
                           </div>
                           <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="border px-3 py-1 rounded">Cancelar</button><button className="bg-blue-600 text-white px-3 py-1 rounded">Guardar</button></div>
                      </form>
                  )}

                  {editingHotel && (
                      <form onSubmit={saveCurrentHotel} className="space-y-4">
                           <h3 className="text-xl font-bold mb-4">Editar Hotel</h3>
                           <input value={editingHotel.title} onChange={e=>setEditingHotel({...editingHotel, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                           <input value={editingHotel.location} onChange={e=>setEditingHotel({...editingHotel, location:e.target.value})} className="border p-2 w-full rounded" placeholder="Ubicación" />
                           <div className="grid grid-cols-4 gap-4">
                                <input type="number" value={editingHotel.pricePerNight} onChange={e=>setEditingHotel({...editingHotel, pricePerNight:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio x Noche" />
                                <input type="number" value={editingHotel.stars} onChange={e=>setEditingHotel({...editingHotel, stars:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Estrellas (1-5)" />
                                <input type="number" value={editingHotel.discount || 0} onChange={e=>setEditingHotel({...editingHotel, discount:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Desc %" />
                                <input type="text" value={editingHotel.specialLabel || ''} onChange={e=>setEditingHotel({...editingHotel, specialLabel:e.target.value})} className="border p-2 w-full rounded" placeholder="Etiqueta" />
                           </div>
                           <textarea value={editingHotel.description} onChange={e=>setEditingHotel({...editingHotel, description:e.target.value})} className="border p-2 w-full rounded" rows={3} placeholder="Descripción" />
                           <textarea value={hotelAmenitiesInput} onChange={e=>setHotelAmenitiesInput(e.target.value)} className="border p-2 w-full rounded" rows={3} placeholder="Servicios (uno por línea)" />
                           <div>
                              <label className="block text-sm font-bold mb-1">Imágenes</label>
                              <div className="flex gap-2 mb-2 overflow-x-auto">{editingHotel.images.map((img,i)=><div key={i} className="relative group min-w-[64px]"><img src={img} className="w-16 h-16 object-cover rounded" /><button type="button" onClick={()=>{const newImages = [...editingHotel.images]; newImages.splice(i,1); setEditingHotel({...editingHotel, images: newImages})}} className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">x</button></div>)}</div>
                              <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded border"><div className="flex gap-2"><input type="text" placeholder="URL Imagen" className="border p-2 rounded flex-1 text-sm" value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} /><button type="button" onClick={()=>handleAddImageUrl('hotel')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm whitespace-nowrap">URL</button></div><input type="file" multiple onChange={(e)=>handleFileUpload(e, 'hotel')} className="text-sm" /></div>
                           </div>
                           <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="border px-3 py-1 rounded">Cancelar</button><button className="bg-blue-600 text-white px-3 py-1 rounded">Guardar</button></div>
                      </form>
                  )}

                  {editingExcursion && (
                      <form onSubmit={saveCurrentExcursion} className="space-y-4">
                           <h3 className="text-xl font-bold mb-4">Editar Excursión</h3>
                           <input value={editingExcursion.title} onChange={e=>setEditingExcursion({...editingExcursion, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                           <input value={editingExcursion.location} onChange={e=>setEditingExcursion({...editingExcursion, location:e.target.value})} className="border p-2 w-full rounded" placeholder="Ubicación" />
                           <div className="grid grid-cols-3 gap-4">
                                <input type="number" value={editingExcursion.price} onChange={e=>setEditingExcursion({...editingExcursion, price:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio" />
                                <input type="number" value={editingExcursion.discount || 0} onChange={e=>setEditingExcursion({...editingExcursion, discount:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Desc %" />
                                <input value={editingExcursion.duration} onChange={e=>setEditingExcursion({...editingExcursion, duration:e.target.value})} className="border p-2 w-full rounded" placeholder="Duración" />
                           </div>
                           <textarea value={editingExcursion.description} onChange={e=>setEditingExcursion({...editingExcursion, description:e.target.value})} className="border p-2 w-full rounded" rows={3} placeholder="Descripción" />
                           <textarea value={excursionDatesInput} onChange={e=>setExcursionDatesInput(e.target.value)} className="border p-2 w-full rounded" rows={3} placeholder="Días disponibles (uno por línea)" />
                           <div>
                              <label className="block text-sm font-bold mb-1">Imágenes</label>
                              <div className="flex gap-2 mb-2 overflow-x-auto">{editingExcursion.images.map((img,i)=><div key={i} className="relative group min-w-[64px]"><img src={img} className="w-16 h-16 object-cover rounded" /><button type="button" onClick={()=>{const newImages = [...editingExcursion.images]; newImages.splice(i,1); setEditingExcursion({...editingExcursion, images: newImages})}} className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">x</button></div>)}</div>
                              <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded border"><div className="flex gap-2"><input type="text" placeholder="URL Imagen" className="border p-2 rounded flex-1 text-sm" value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} /><button type="button" onClick={()=>handleAddImageUrl('excursion')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm whitespace-nowrap">URL</button></div><input type="file" multiple onChange={(e)=>handleFileUpload(e, 'excursion')} className="text-sm" /></div>
                           </div>
                           <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="border px-3 py-1 rounded">Cancelar</button><button className="bg-blue-600 text-white px-3 py-1 rounded">Guardar</button></div>
                      </form>
                  )}

                  {editingInstallment && (
                      <form onSubmit={saveCurrentInstallment} className="space-y-4">
                           <h3 className="text-xl font-bold mb-4">Editar Plan Cuotas</h3>
                           <input value={editingInstallment.title} onChange={e=>setEditingInstallment({...editingInstallment, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                           <input value={editingInstallment.location} onChange={e=>setEditingInstallment({...editingInstallment, location:e.target.value})} className="border p-2 w-full rounded" placeholder="Ubicación" />
                           <div className="grid grid-cols-2 gap-4">
                                <input type="number" value={editingInstallment.totalPrice} onChange={e=>setEditingInstallment({...editingInstallment, totalPrice:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio Total" />
                                <input type="date" value={editingInstallment.departureDate} onChange={e=>setEditingInstallment({...editingInstallment, departureDate:e.target.value})} className="border p-2 w-full rounded" />
                           </div>
                           <textarea value={editingInstallment.description} onChange={e=>setEditingInstallment({...editingInstallment, description:e.target.value})} className="border p-2 w-full rounded" rows={3} placeholder="Descripción" />
                           <div>
                              <label className="block text-sm font-bold mb-1">Imágenes</label>
                              <div className="flex gap-2 mb-2 overflow-x-auto">{editingInstallment.images.map((img,i)=><div key={i} className="relative group min-w-[64px]"><img src={img} className="w-16 h-16 object-cover rounded" /><button type="button" onClick={()=>{const newImages = [...editingInstallment.images]; newImages.splice(i,1); setEditingInstallment({...editingInstallment, images: newImages})}} className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">x</button></div>)}</div>
                              <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded border"><div className="flex gap-2"><input type="text" placeholder="URL Imagen" className="border p-2 rounded flex-1 text-sm" value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} /><button type="button" onClick={()=>handleAddImageUrl('installment')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm whitespace-nowrap">URL</button></div><input type="file" multiple onChange={(e)=>handleFileUpload(e, 'installment')} className="text-sm" /></div>
                           </div>
                           <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="border px-3 py-1 rounded">Cancelar</button><button className="bg-blue-600 text-white px-3 py-1 rounded">Guardar</button></div>
                      </form>
                  )}

                  {editingWorldCup && (
                      <form onSubmit={saveCurrentWorldCup} className="space-y-4">
                           <h3 className="text-xl font-bold mb-4">Editar Paquete Mundial</h3>
                           <input value={editingWorldCup.title} onChange={e=>setEditingWorldCup({...editingWorldCup, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                           <input value={editingWorldCup.originCountry} onChange={e=>setEditingWorldCup({...editingWorldCup, originCountry:e.target.value})} className="border p-2 w-full rounded" placeholder="País de Origen" />
                           <div className="grid grid-cols-2 gap-4">
                                <input type="number" value={editingWorldCup.totalPrice} onChange={e=>setEditingWorldCup({...editingWorldCup, totalPrice:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio Total" />
                                <input type="date" value={editingWorldCup.departureDate} onChange={e=>setEditingWorldCup({...editingWorldCup, departureDate:e.target.value})} className="border p-2 w-full rounded" />
                           </div>
                           <textarea value={editingWorldCup.description} onChange={e=>setEditingWorldCup({...editingWorldCup, description:e.target.value})} className="border p-2 w-full rounded" rows={3} placeholder="Descripción" />
                           <div>
                              <label className="block text-sm font-bold mb-1">Imágenes</label>
                              <div className="flex gap-2 mb-2 overflow-x-auto">{editingWorldCup.images.map((img,i)=><div key={i} className="relative group min-w-[64px]"><img src={img} className="w-16 h-16 object-cover rounded" /><button type="button" onClick={()=>{const newImages = [...editingWorldCup.images]; newImages.splice(i,1); setEditingWorldCup({...editingWorldCup, images: newImages})}} className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">x</button></div>)}</div>
                              <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded border"><div className="flex gap-2"><input type="text" placeholder="URL Imagen" className="border p-2 rounded flex-1 text-sm" value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} /><button type="button" onClick={()=>handleAddImageUrl('worldcup')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm whitespace-nowrap">URL</button></div><input type="file" multiple onChange={(e)=>handleFileUpload(e, 'worldcup')} className="text-sm" /></div>
                           </div>
                           <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="border px-3 py-1 rounded">Cancelar</button><button className="bg-blue-600 text-white px-3 py-1 rounded">Guardar</button></div>
                      </form>
                  )}

                  {editingSlide && (
                      <form onSubmit={saveCurrentSlide} className="space-y-4">
                           <h3 className="text-xl font-bold mb-4">Editar Diapositiva</h3>
                           <input value={editingSlide.title} onChange={e=>setEditingSlide({...editingSlide, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título Principal" />
                           <input value={editingSlide.subtitle} onChange={e=>setEditingSlide({...editingSlide, subtitle:e.target.value})} className="border p-2 w-full rounded" placeholder="Subtítulo" />
                           <div className="grid grid-cols-2 gap-4">
                                <input value={editingSlide.ctaText} onChange={e=>setEditingSlide({...editingSlide, ctaText:e.target.value})} className="border p-2 w-full rounded" placeholder="Texto Botón" />
                                <input value={editingSlide.ctaLink} onChange={e=>setEditingSlide({...editingSlide, ctaLink:e.target.value})} className="border p-2 w-full rounded" placeholder="Enlace Botón" />
                           </div>
                           <div>
                              <label className="block text-sm font-bold mb-1">Imagen de Fondo</label>
                              <div className="mb-2"><img src={editingSlide.image} className="h-32 w-full object-cover rounded" /></div>
                              <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded border"><div className="flex gap-2"><input type="text" placeholder="URL Imagen" className="border p-2 rounded flex-1 text-sm" value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} /><button type="button" onClick={()=>handleAddImageUrl('hero')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm whitespace-nowrap">URL</button></div><input type="file" onChange={(e)=>handleFileUpload(e, 'hero')} className="text-sm" /></div>
                           </div>
                           <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="border px-3 py-1 rounded">Cancelar</button><button className="bg-blue-600 text-white px-3 py-1 rounded">Guardar</button></div>
                      </form>
                  )}

                  {editingBanner && (
                      <form onSubmit={saveCurrentBanner} className="space-y-4">
                           <h3 className="text-xl font-bold mb-4">Editar Banner</h3>
                           <input value={editingBanner.title} onChange={e=>setEditingBanner({...editingBanner, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                           <input value={editingBanner.subtitle} onChange={e=>setEditingBanner({...editingBanner, subtitle:e.target.value})} className="border p-2 w-full rounded" placeholder="Subtítulo" />
                           <input value={editingBanner.badge} onChange={e=>setEditingBanner({...editingBanner, badge:e.target.value})} className="border p-2 w-full rounded" placeholder="Etiqueta (Badge)" />
                           <div>
                              <label className="block text-sm font-bold mb-1">Imagen de Fondo</label>
                              <div className="mb-2"><img src={editingBanner.image} className="h-32 w-full object-cover rounded" /></div>
                              <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded border"><div className="flex gap-2"><input type="text" placeholder="URL Imagen" className="border p-2 rounded flex-1 text-sm" value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} /><button type="button" onClick={()=>handleAddImageUrl('banner')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm whitespace-nowrap">URL</button></div><input type="file" onChange={(e)=>handleFileUpload(e, 'banner')} className="text-sm" /></div>
                           </div>
                           <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="border px-3 py-1 rounded">Cancelar</button><button className="bg-blue-600 text-white px-3 py-1 rounded">Guardar</button></div>
                      </form>
                  )}

              </div>
          </div>
      )}
    </div>
  );
};

export default Admin;
