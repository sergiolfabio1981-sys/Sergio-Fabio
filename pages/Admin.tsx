
import React, { useState, useEffect } from 'react';
import { Trip, Apartment, Excursion, Hotel, InstallmentTrip } from '../types';
import { getTrips, saveTrip, deleteTrip, createEmptyTrip } from '../services/tripService';
import { getRentals, saveRental, deleteRental, createEmptyRental } from '../services/rentalService';
import { getExcursions, saveExcursion, deleteExcursion, createEmptyExcursion } from '../services/excursionService';
import { getHotels, saveHotel, deleteHotel, createEmptyHotel } from '../services/hotelService';
import { getInstallmentTrips, saveInstallmentTrip, deleteInstallmentTrip, createEmptyInstallmentTrip } from '../services/installmentService';
import { ADMIN_EMAIL, ADMIN_PASS } from '../constants';

const Admin: React.FC = () => {
  // Check localStorage for persisted session
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
      return localStorage.getItem('abras_isAdmin') === 'true';
  });
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'trips' | 'rentals' | 'excursions' | 'hotels' | 'installments'>('trips');

  // Trip State
  const [trips, setTrips] = useState<Trip[]>([]);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [tripDatesInput, setTripDatesInput] = useState('');

  // Rental State
  const [rentals, setRentals] = useState<Apartment[]>([]);
  const [editingRental, setEditingRental] = useState<Apartment | null>(null);
  const [rentalAmenitiesInput, setRentalAmenitiesInput] = useState('');

  // Excursion State
  const [excursions, setExcursions] = useState<Excursion[]>([]);
  const [editingExcursion, setEditingExcursion] = useState<Excursion | null>(null);
  const [excursionDatesInput, setExcursionDatesInput] = useState('');

  // Hotel State
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [hotelAmenitiesInput, setHotelAmenitiesInput] = useState('');

  // Installment State
  const [installments, setInstallments] = useState<InstallmentTrip[]>([]);
  const [editingInstallment, setEditingInstallment] = useState<InstallmentTrip | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setTrips(getTrips());
      setRentals(getRentals());
      setExcursions(getExcursions());
      setHotels(getHotels());
      setInstallments(getInstallmentTrips());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setIsAuthenticated(true);
      localStorage.setItem('abras_isAdmin', 'true'); // Persist session
    } else {
      alert('Credenciales inválidas');
    }
  };
  
  const handleLogout = () => {
      setIsAuthenticated(false);
      localStorage.removeItem('abras_isAdmin');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'trip' | 'rental' | 'excursion' | 'hotel' | 'installment') => {
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
  };

  // TRIP Handlers
  const openEditTrip = (t: Trip) => { setEditingTrip({...t}); setTripDatesInput(t.availableDates.join('\n')); setEditingRental(null); setEditingExcursion(null); setEditingHotel(null); setEditingInstallment(null); setIsModalOpen(true); };
  const openCreateTrip = () => { setEditingTrip(createEmptyTrip()); setTripDatesInput(''); setEditingRental(null); setEditingExcursion(null); setEditingHotel(null); setEditingInstallment(null); setIsModalOpen(true); };
  const saveCurrentTrip = (e: any) => { e.preventDefault(); if(!editingTrip) return; saveTrip({...editingTrip, availableDates: tripDatesInput.split('\n').filter(d=>d.trim()!=='')}); setTrips(getTrips()); setIsModalOpen(false); };
  const deleteCurrentTrip = (id: string) => { if(window.confirm("¿Eliminar?")) { deleteTrip(id); setTrips(getTrips()); }};

  // RENTAL Handlers
  const openEditRental = (r: Apartment) => { setEditingRental({...r}); setRentalAmenitiesInput(r.amenities.join('\n')); setEditingTrip(null); setEditingExcursion(null); setEditingHotel(null); setEditingInstallment(null); setIsModalOpen(true); };
  const openCreateRental = () => { setEditingRental(createEmptyRental()); setRentalAmenitiesInput(''); setEditingTrip(null); setEditingExcursion(null); setEditingHotel(null); setEditingInstallment(null); setIsModalOpen(true); };
  const saveCurrentRental = (e: any) => { e.preventDefault(); if(!editingRental) return; saveRental({...editingRental, amenities: rentalAmenitiesInput.split('\n').filter(a=>a.trim()!=='')}); setRentals(getRentals()); setIsModalOpen(false); };
  const deleteCurrentRental = (id: string) => { if(window.confirm("¿Eliminar?")) { deleteRental(id); setRentals(getRentals()); }};

  // HOTEL Handlers
  const openEditHotel = (h: Hotel) => { setEditingHotel({...h}); setHotelAmenitiesInput(h.amenities.join('\n')); setEditingTrip(null); setEditingRental(null); setEditingExcursion(null); setEditingInstallment(null); setIsModalOpen(true); };
  const openCreateHotel = () => { setEditingHotel(createEmptyHotel()); setHotelAmenitiesInput(''); setEditingTrip(null); setEditingRental(null); setEditingExcursion(null); setEditingInstallment(null); setIsModalOpen(true); };
  const saveCurrentHotel = (e: any) => { e.preventDefault(); if(!editingHotel) return; saveHotel({...editingHotel, amenities: hotelAmenitiesInput.split('\n').filter(a=>a.trim()!=='')}); setHotels(getHotels()); setIsModalOpen(false); };
  const deleteCurrentHotel = (id: string) => { if(window.confirm("¿Eliminar?")) { deleteHotel(id); setHotels(getHotels()); }};

  // EXCURSION Handlers
  const openEditExcursion = (exc: Excursion) => { setEditingExcursion({...exc}); setExcursionDatesInput(exc.availableDates.join('\n')); setEditingTrip(null); setEditingRental(null); setEditingHotel(null); setEditingInstallment(null); setIsModalOpen(true); };
  const openCreateExcursion = () => { setEditingExcursion(createEmptyExcursion()); setExcursionDatesInput(''); setEditingTrip(null); setEditingRental(null); setEditingHotel(null); setEditingInstallment(null); setIsModalOpen(true); };
  const saveCurrentExcursion = (e: any) => { e.preventDefault(); if(!editingExcursion) return; saveExcursion({...editingExcursion, availableDates: excursionDatesInput.split('\n').filter(d=>d.trim()!=='')}); setExcursions(getExcursions()); setIsModalOpen(false); };
  const deleteCurrentExcursion = (id: string) => { if(window.confirm("¿Eliminar?")) { deleteExcursion(id); setExcursions(getExcursions()); }};

  // INSTALLMENT Handlers
  const openEditInstallment = (item: InstallmentTrip) => { setEditingInstallment({...item}); setEditingTrip(null); setEditingRental(null); setEditingExcursion(null); setEditingHotel(null); setIsModalOpen(true); };
  const openCreateInstallment = () => { setEditingInstallment(createEmptyInstallmentTrip()); setEditingTrip(null); setEditingRental(null); setEditingExcursion(null); setEditingHotel(null); setIsModalOpen(true); };
  const saveCurrentInstallment = (e: React.FormEvent) => { e.preventDefault(); if (!editingInstallment) return; saveInstallmentTrip(editingInstallment); setInstallments(getInstallmentTrips()); setIsModalOpen(false); };
  const deleteCurrentInstallment = (id: string) => { if(window.confirm("¿Eliminar plan?")) { deleteInstallmentTrip(id); setInstallments(getInstallmentTrips()); }};

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
                    <button onClick={() => setActiveTab('trips')} className={`px-4 py-2 rounded-md ${activeTab === 'trips' ? 'bg-cyan-600 text-white' : 'hover:bg-gray-100'}`}>Viajes</button>
                    <button onClick={() => setActiveTab('rentals')} className={`px-4 py-2 rounded-md ${activeTab === 'rentals' ? 'bg-cyan-600 text-white' : 'hover:bg-gray-100'}`}>Alquileres</button>
                    <button onClick={() => setActiveTab('hotels')} className={`px-4 py-2 rounded-md ${activeTab === 'hotels' ? 'bg-cyan-600 text-white' : 'hover:bg-gray-100'}`}>Hoteles</button>
                    <button onClick={() => setActiveTab('excursions')} className={`px-4 py-2 rounded-md ${activeTab === 'excursions' ? 'bg-cyan-600 text-white' : 'hover:bg-gray-100'}`}>Excursiones</button>
                    <button onClick={() => setActiveTab('installments')} className={`px-4 py-2 rounded-md ${activeTab === 'installments' ? 'bg-cyan-600 text-white' : 'hover:bg-gray-100'}`}>ABRAS Cuotas</button>
                </div>
                <button onClick={handleLogout} className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-200">Salir</button>
            </div>
        </div>

        {activeTab === 'trips' && (
             <div className="bg-white p-6 rounded-xl shadow-sm">
                 <div className="flex justify-between mb-4"><h2 className="font-bold text-xl">Viajes</h2><button onClick={openCreateTrip} className="bg-green-500 text-white px-4 py-2 rounded">+ Nuevo</button></div>
                 {trips.map(t=><div key={t.id} className="flex justify-between border-b py-2 items-center"><span>{t.title}</span><div><button onClick={()=>openEditTrip(t)} className="text-blue-500 mr-4">Editar</button><button onClick={()=>deleteCurrentTrip(t.id)} className="text-red-500">Eliminar</button></div></div>)}
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
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-indigo-800">Gestionar ABRAS Cuotas</h2>
                    <button onClick={openCreateInstallment} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">+ Nuevo</button>
                </div>
                {installments.map(t => (
                    <div key={t.id} className="flex justify-between border-b py-2 items-center">
                        <span>{t.title}</span>
                        <div>
                            <button onClick={() => openEditInstallment(t)} className="text-blue-600 mr-4">Editar</button>
                            <button onClick={() => deleteCurrentInstallment(t.id)} className="text-red-600">Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>

      {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
                  
                  {editingTrip && (
                      <form onSubmit={saveCurrentTrip} className="space-y-4">
                           <h3 className="text-xl font-bold mb-4">Editar Viaje</h3>
                           <input value={editingTrip.title} onChange={e=>setEditingTrip({...editingTrip, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                           <input value={editingTrip.location} onChange={e=>setEditingTrip({...editingTrip, location:e.target.value})} className="border p-2 w-full rounded" placeholder="Ubicación" />
                           <div className="grid grid-cols-2 gap-4">
                                <input type="number" value={editingTrip.price} onChange={e=>setEditingTrip({...editingTrip, price:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio" />
                                <div>
                                    <label className="text-xs font-bold text-red-500">Descuento (%)</label>
                                    <input type="number" value={editingTrip.discount || 0} onChange={e=>setEditingTrip({...editingTrip, discount:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="0" />
                                </div>
                           </div>
                           <textarea value={editingTrip.description} onChange={e=>setEditingTrip({...editingTrip, description:e.target.value})} className="border p-2 w-full rounded" placeholder="Descripción" rows={3}></textarea>
                           <label className="flex items-center gap-2"><input type="checkbox" checked={editingTrip.isOffer} onChange={e=>setEditingTrip({...editingTrip, isOffer:e.target.checked})} /> Es Oferta Destacada</label>
                           <textarea value={tripDatesInput} onChange={e=>setTripDatesInput(e.target.value)} className="border p-2 w-full rounded" placeholder="Fechas disponibles (una por línea)" rows={4}></textarea>
                           
                           <div>
                              <label className="block text-sm font-bold mb-1">Imágenes</label>
                              <div className="flex gap-2 mb-2 overflow-x-auto">{editingTrip.images.map((img,i)=><div key={i} className="relative group min-w-[64px]"><img src={img} className="w-16 h-16 object-cover rounded" /><button type="button" onClick={()=>{const newImages = [...editingTrip.images]; newImages.splice(i,1); setEditingTrip({...editingTrip, images: newImages})}} className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">x</button></div>)}</div>
                              <input type="file" multiple onChange={(e)=>handleFileUpload(e, 'trip')} />
                           </div>
                           <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancelar</button><button type="submit" className="bg-cyan-600 text-white px-4 py-2 rounded">Guardar</button></div>
                      </form>
                  )}

                  {editingRental && (
                      <form onSubmit={saveCurrentRental} className="space-y-4">
                          <h3 className="text-xl font-bold mb-4">Editar Alquiler</h3>
                          <input value={editingRental.title} onChange={e=>setEditingRental({...editingRental, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                          <input value={editingRental.location} onChange={e=>setEditingRental({...editingRental, location:e.target.value})} className="border p-2 w-full rounded" placeholder="Ubicación" />
                          <div className="grid grid-cols-3 gap-4">
                              <input type="number" value={editingRental.pricePerNight} onChange={e=>setEditingRental({...editingRental, pricePerNight:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio x Noche" />
                              <input type="number" value={editingRental.bedrooms} onChange={e=>setEditingRental({...editingRental, bedrooms:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Habitaciones" />
                              <input type="number" value={editingRental.maxGuests} onChange={e=>setEditingRental({...editingRental, maxGuests:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Huéspedes" />
                          </div>
                          <div>
                                <label className="text-xs font-bold text-red-500">Descuento (%)</label>
                                <input type="number" value={editingRental.discount || 0} onChange={e=>setEditingRental({...editingRental, discount:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="0" />
                          </div>
                          <textarea value={editingRental.description} onChange={e=>setEditingRental({...editingRental, description:e.target.value})} className="border p-2 w-full rounded" placeholder="Descripción" rows={3}></textarea>
                          <textarea value={rentalAmenitiesInput} onChange={e=>setRentalAmenitiesInput(e.target.value)} className="border p-2 w-full rounded" placeholder="Comodidades (una por línea)" rows={4}></textarea>
                          <div className="grid grid-cols-2 gap-4">
                              <input type="number" value={editingRental.lat || ''} onChange={e=>setEditingRental({...editingRental, lat:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Latitud" />
                              <input type="number" value={editingRental.lng || ''} onChange={e=>setEditingRental({...editingRental, lng:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Longitud" />
                          </div>
                          <label className="flex items-center gap-2"><input type="checkbox" checked={editingRental.isOffer || false} onChange={e=>setEditingRental({...editingRental, isOffer:e.target.checked})} /> Es Oferta Destacada</label>
                          <div>
                              <label className="block text-sm font-bold mb-1">Imágenes</label>
                              <div className="flex gap-2 mb-2 overflow-x-auto">{editingRental.images.map((img,i)=><div key={i} className="relative group min-w-[64px]"><img src={img} className="w-16 h-16 object-cover rounded" /><button type="button" onClick={()=>{const newImages = [...editingRental.images]; newImages.splice(i,1); setEditingRental({...editingRental, images: newImages})}} className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">x</button></div>)}</div>
                              <input type="file" multiple onChange={(e)=>handleFileUpload(e, 'rental')} />
                          </div>
                          <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancelar</button><button type="submit" className="bg-cyan-600 text-white px-4 py-2 rounded">Guardar</button></div>
                      </form>
                  )}

                  {editingHotel && (
                      <form onSubmit={saveCurrentHotel} className="space-y-4">
                          <h3 className="text-xl font-bold mb-4">Editar Hotel</h3>
                          <input value={editingHotel.title} onChange={e=>setEditingHotel({...editingHotel, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                          <input value={editingHotel.location} onChange={e=>setEditingHotel({...editingHotel, location:e.target.value})} className="border p-2 w-full rounded" placeholder="Ubicación" />
                          <div className="grid grid-cols-2 gap-4">
                              <input type="number" value={editingHotel.pricePerNight} onChange={e=>setEditingHotel({...editingHotel, pricePerNight:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio x Noche" />
                              <input type="number" value={editingHotel.stars} onChange={e=>setEditingHotel({...editingHotel, stars:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Estrellas (1-5)" min={1} max={5} />
                          </div>
                          <div>
                                <label className="text-xs font-bold text-red-500">Descuento (%)</label>
                                <input type="number" value={editingHotel.discount || 0} onChange={e=>setEditingHotel({...editingHotel, discount:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="0" />
                          </div>
                          <textarea value={editingHotel.description} onChange={e=>setEditingHotel({...editingHotel, description:e.target.value})} className="border p-2 w-full rounded" placeholder="Descripción" rows={3}></textarea>
                          <textarea value={hotelAmenitiesInput} onChange={e=>setHotelAmenitiesInput(e.target.value)} className="border p-2 w-full rounded" placeholder="Amenidades (una por línea)" rows={4}></textarea>
                          <div className="grid grid-cols-2 gap-4">
                              <input type="number" value={editingHotel.lat || ''} onChange={e=>setEditingHotel({...editingHotel, lat:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Latitud" />
                              <input type="number" value={editingHotel.lng || ''} onChange={e=>setEditingHotel({...editingHotel, lng:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Longitud" />
                          </div>
                          <label className="flex items-center gap-2"><input type="checkbox" checked={editingHotel.isOffer} onChange={e=>setEditingHotel({...editingHotel, isOffer:e.target.checked})} /> Es Oferta Destacada</label>
                          <div>
                              <label className="block text-sm font-bold mb-1">Imágenes</label>
                              <div className="flex gap-2 mb-2 overflow-x-auto">{editingHotel.images.map((img,i)=><div key={i} className="relative group min-w-[64px]"><img src={img} className="w-16 h-16 object-cover rounded" /><button type="button" onClick={()=>{const newImages = [...editingHotel.images]; newImages.splice(i,1); setEditingHotel({...editingHotel, images: newImages})}} className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">x</button></div>)}</div>
                              <input type="file" multiple onChange={(e)=>handleFileUpload(e, 'hotel')} />
                          </div>
                          <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancelar</button><button type="submit" className="bg-cyan-600 text-white px-4 py-2 rounded">Guardar</button></div>
                      </form>
                  )}

                  {editingExcursion && (
                      <form onSubmit={saveCurrentExcursion} className="space-y-4">
                          <h3 className="text-xl font-bold mb-4">Editar Excursión</h3>
                          <input value={editingExcursion.title} onChange={e=>setEditingExcursion({...editingExcursion, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                          <input value={editingExcursion.location} onChange={e=>setEditingExcursion({...editingExcursion, location:e.target.value})} className="border p-2 w-full rounded" placeholder="Ubicación" />
                          <div className="grid grid-cols-2 gap-4">
                              <input type="number" value={editingExcursion.price} onChange={e=>setEditingExcursion({...editingExcursion, price:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio" />
                              <input value={editingExcursion.duration} onChange={e=>setEditingExcursion({...editingExcursion, duration:e.target.value})} className="border p-2 w-full rounded" placeholder="Duración (ej: Full Day)" />
                          </div>
                          <div>
                                <label className="text-xs font-bold text-red-500">Descuento (%)</label>
                                <input type="number" value={editingExcursion.discount || 0} onChange={e=>setEditingExcursion({...editingExcursion, discount:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="0" />
                          </div>
                          <textarea value={editingExcursion.description} onChange={e=>setEditingExcursion({...editingExcursion, description:e.target.value})} className="border p-2 w-full rounded" placeholder="Descripción" rows={3}></textarea>
                          <textarea value={excursionDatesInput} onChange={e=>setExcursionDatesInput(e.target.value)} className="border p-2 w-full rounded" placeholder="Días disponibles (uno por línea)" rows={4}></textarea>
                          <label className="flex items-center gap-2"><input type="checkbox" checked={editingExcursion.isOffer} onChange={e=>setEditingExcursion({...editingExcursion, isOffer:e.target.checked})} /> Es Oferta Destacada</label>
                          <div>
                              <label className="block text-sm font-bold mb-1">Imágenes</label>
                              <div className="flex gap-2 mb-2 overflow-x-auto">{editingExcursion.images.map((img,i)=><div key={i} className="relative group min-w-[64px]"><img src={img} className="w-16 h-16 object-cover rounded" /><button type="button" onClick={()=>{const newImages = [...editingExcursion.images]; newImages.splice(i,1); setEditingExcursion({...editingExcursion, images: newImages})}} className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">x</button></div>)}</div>
                              <input type="file" multiple onChange={(e)=>handleFileUpload(e, 'excursion')} />
                          </div>
                          <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancelar</button><button type="submit" className="bg-cyan-600 text-white px-4 py-2 rounded">Guardar</button></div>
                      </form>
                  )}

                  {editingInstallment && (
                      <form onSubmit={saveCurrentInstallment} className="space-y-4">
                          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-indigo-700">Editar ABRAS Cuotas</h2>
                          <div className="grid grid-cols-2 gap-4">
                              <input className="border p-2 rounded" placeholder="Título" value={editingInstallment.title} onChange={e=>setEditingInstallment({...editingInstallment, title: e.target.value})} required />
                              <input className="border p-2 rounded" placeholder="Ubicación" value={editingInstallment.location} onChange={e=>setEditingInstallment({...editingInstallment, location: e.target.value})} required />
                          </div>
                          <textarea className="w-full border p-2 rounded" rows={3} placeholder="Descripción" value={editingInstallment.description} onChange={e=>setEditingInstallment({...editingInstallment, description: e.target.value})} required />
                          <div className="grid grid-cols-2 gap-4">
                              <div>
                                  <label className="text-xs font-bold text-gray-500">Precio Total</label>
                                  <input type="number" className="w-full border p-2 rounded" value={editingInstallment.totalPrice} onChange={e=>setEditingInstallment({...editingInstallment, totalPrice: Number(e.target.value)})} required />
                              </div>
                              <div>
                                  <label className="text-xs font-bold text-gray-500">Fecha Salida</label>
                                  <input type="date" className="w-full border p-2 rounded" value={editingInstallment.departureDate} onChange={e=>setEditingInstallment({...editingInstallment, departureDate: e.target.value})} required />
                              </div>
                          </div>
                          <div>
                                <label className="text-xs font-bold text-red-500">Descuento (%)</label>
                                <input type="number" value={editingInstallment.discount || 0} onChange={e=>setEditingInstallment({...editingInstallment, discount:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="0" />
                          </div>
                          <div>
                              <label className="block text-sm font-bold mb-1">Imágenes</label>
                              <div className="flex gap-2 mb-2 overflow-x-auto">{editingInstallment.images.map((img,i)=><div key={i} className="relative group min-w-[64px]"><img src={img} className="w-16 h-16 object-cover rounded" /><button type="button" onClick={()=>{const newImages = [...editingInstallment.images]; newImages.splice(i,1); setEditingInstallment({...editingInstallment, images: newImages})}} className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">x</button></div>)}</div>
                              <input type="file" multiple onChange={(e)=>handleFileUpload(e, 'installment')} />
                          </div>
                          <div className="flex justify-end gap-2 pt-4">
                              <button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancelar</button>
                              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded font-bold">Guardar</button>
                          </div>
                      </form>
                  )}
              </div>
          </div>
      )}
    </div>
  );
};

export default Admin;
