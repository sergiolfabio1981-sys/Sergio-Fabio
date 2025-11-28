
import React, { useState, useEffect } from 'react';
import { Trip, Apartment, Excursion, Hotel, InstallmentTrip, WorldCupTrip, HeroSlide, PromoBanner } from '../types';
import { getTrips, saveTrip, deleteTrip, createEmptyTrip } from '../services/tripService';
import { getRentals, saveRental, deleteRental, createEmptyRental } from '../services/rentalService';
import { getExcursions, saveExcursion, deleteExcursion, createEmptyExcursion } from '../services/excursionService';
import { getHotels, saveHotel, deleteHotel, createEmptyHotel } from '../services/hotelService';
import { getInstallmentTrips, saveInstallmentTrip, deleteInstallmentTrip, createEmptyInstallmentTrip } from '../services/installmentService';
import { getWorldCupTrips, saveWorldCupTrip, deleteWorldCupTrip, createEmptyWorldCupTrip } from '../services/worldCupService';
import { getHeroSlides, saveHeroSlide, getPromoBanners, savePromoBanner } from '../services/heroService';
import { ADMIN_EMAIL, ADMIN_PASS } from '../constants';

const Admin: React.FC = () => {
  // Check localStorage for persisted session
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
      return localStorage.getItem('abras_isAdmin') === 'true';
  });
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'trips' | 'rentals' | 'excursions' | 'hotels' | 'installments' | 'worldcup'>('trips');
  
  // URL Input State for Images
  const [imageUrlInput, setImageUrlInput] = useState('');

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

  // World Cup State
  const [worldCupTrips, setWorldCupTrips] = useState<WorldCupTrip[]>([]);
  const [editingWorldCup, setEditingWorldCup] = useState<WorldCupTrip | null>(null);

  // Hero Slides & Banners State
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [promoBanners, setPromoBanners] = useState<PromoBanner[]>([]);
  const [editingBanner, setEditingBanner] = useState<PromoBanner | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setTrips(getTrips());
      setRentals(getRentals());
      setExcursions(getExcursions());
      setHotels(getHotels());
      setInstallments(getInstallmentTrips());
      setWorldCupTrips(getWorldCupTrips());
      setHeroSlides(getHeroSlides());
      setPromoBanners(getPromoBanners());
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'trip' | 'rental' | 'excursion' | 'hotel' | 'installment' | 'worldcup' | 'hero' | 'banner') => {
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
    else if (type === 'hero' && editingSlide) {
        if(newImages.length > 0) setEditingSlide(prev => prev ? { ...prev, image: newImages[0] } : null);
    }
    else if (type === 'banner' && editingBanner) {
        if(newImages.length > 0) setEditingBanner(prev => prev ? { ...prev, image: newImages[0] } : null);
    }

    // Reset input value to allow re-uploading same file
    e.target.value = '';
  };

  const handleAddImageUrl = (type: 'trip' | 'rental' | 'excursion' | 'hotel' | 'installment' | 'worldcup' | 'hero' | 'banner') => {
      if (!imageUrlInput.trim()) return;

      if (type === 'rental' && editingRental) setEditingRental(prev => prev ? { ...prev, images: [...prev.images, imageUrlInput] } : null);
      else if (type === 'trip' && editingTrip) setEditingTrip(prev => prev ? { ...prev, images: [...prev.images, imageUrlInput] } : null);
      else if (type === 'excursion' && editingExcursion) setEditingExcursion(prev => prev ? { ...prev, images: [...prev.images, imageUrlInput] } : null);
      else if (type === 'hotel' && editingHotel) setEditingHotel(prev => prev ? { ...prev, images: [...prev.images, imageUrlInput] } : null);
      else if (type === 'installment' && editingInstallment) setEditingInstallment(prev => prev ? { ...prev, images: [...prev.images, imageUrlInput] } : null);
      else if (type === 'worldcup' && editingWorldCup) setEditingWorldCup(prev => prev ? { ...prev, images: [...prev.images, imageUrlInput] } : null);
      else if (type === 'hero' && editingSlide) setEditingSlide(prev => prev ? { ...prev, image: imageUrlInput } : null);
      else if (type === 'banner' && editingBanner) setEditingBanner(prev => prev ? { ...prev, image: imageUrlInput } : null);
      
      setImageUrlInput(''); // Clear input after adding
  };

  // HANDLERS
  const openEditTrip = (t: Trip) => { setEditingTrip({...t}); setTripDatesInput(t.availableDates.join('\n')); setImageUrlInput(''); setEditingRental(null); setEditingExcursion(null); setEditingHotel(null); setEditingInstallment(null); setEditingWorldCup(null); setEditingSlide(null); setEditingBanner(null); setIsModalOpen(true); };
  const openCreateTrip = () => { setEditingTrip(createEmptyTrip()); setTripDatesInput(''); setImageUrlInput(''); setEditingRental(null); setEditingExcursion(null); setEditingHotel(null); setEditingInstallment(null); setEditingWorldCup(null); setEditingSlide(null); setEditingBanner(null); setIsModalOpen(true); };
  const saveCurrentTrip = (e: any) => { e.preventDefault(); if(!editingTrip) return; saveTrip({...editingTrip, availableDates: tripDatesInput.split('\n').filter(d=>d.trim()!=='')}); setTrips(getTrips()); setIsModalOpen(false); };
  const deleteCurrentTrip = (id: string) => { if(window.confirm("¿Eliminar?")) { deleteTrip(id); setTrips(getTrips()); }};

  // RENTAL Handlers
  const openEditRental = (r: Apartment) => { setEditingRental({...r}); setRentalAmenitiesInput(r.amenities.join('\n')); setImageUrlInput(''); setEditingTrip(null); setEditingExcursion(null); setEditingHotel(null); setEditingInstallment(null); setEditingWorldCup(null); setEditingSlide(null); setEditingBanner(null); setIsModalOpen(true); };
  const openCreateRental = () => { setEditingRental(createEmptyRental()); setRentalAmenitiesInput(''); setImageUrlInput(''); setEditingTrip(null); setEditingExcursion(null); setEditingHotel(null); setEditingInstallment(null); setEditingWorldCup(null); setEditingSlide(null); setEditingBanner(null); setIsModalOpen(true); };
  const saveCurrentRental = (e: any) => { e.preventDefault(); if(!editingRental) return; saveRental({...editingRental, amenities: rentalAmenitiesInput.split('\n').filter(a=>a.trim()!=='')}); setRentals(getRentals()); setIsModalOpen(false); };
  const deleteCurrentRental = (id: string) => { if(window.confirm("¿Eliminar?")) { deleteRental(id); setRentals(getRentals()); }};

  // HOTEL Handlers
  const openEditHotel = (h: Hotel) => { setEditingHotel({...h}); setHotelAmenitiesInput(h.amenities.join('\n')); setImageUrlInput(''); setEditingTrip(null); setEditingRental(null); setEditingExcursion(null); setEditingInstallment(null); setEditingWorldCup(null); setEditingSlide(null); setEditingBanner(null); setIsModalOpen(true); };
  const openCreateHotel = () => { setEditingHotel(createEmptyHotel()); setHotelAmenitiesInput(''); setImageUrlInput(''); setEditingTrip(null); setEditingRental(null); setEditingExcursion(null); setEditingInstallment(null); setEditingWorldCup(null); setEditingSlide(null); setEditingBanner(null); setIsModalOpen(true); };
  const saveCurrentHotel = (e: any) => { e.preventDefault(); if(!editingHotel) return; saveHotel({...editingHotel, amenities: hotelAmenitiesInput.split('\n').filter(a=>a.trim()!=='')}); setHotels(getHotels()); setIsModalOpen(false); };
  const deleteCurrentHotel = (id: string) => { if(window.confirm("¿Eliminar?")) { deleteHotel(id); setHotels(getHotels()); }};

  // EXCURSION Handlers
  const openEditExcursion = (exc: Excursion) => { setEditingExcursion({...exc}); setExcursionDatesInput(exc.availableDates.join('\n')); setImageUrlInput(''); setEditingTrip(null); setEditingRental(null); setEditingHotel(null); setEditingInstallment(null); setEditingWorldCup(null); setEditingSlide(null); setEditingBanner(null); setIsModalOpen(true); };
  const openCreateExcursion = () => { setEditingExcursion(createEmptyExcursion()); setExcursionDatesInput(''); setImageUrlInput(''); setEditingTrip(null); setEditingRental(null); setEditingHotel(null); setEditingInstallment(null); setEditingWorldCup(null); setEditingSlide(null); setEditingBanner(null); setIsModalOpen(true); };
  const saveCurrentExcursion = (e: any) => { e.preventDefault(); if(!editingExcursion) return; saveExcursion({...editingExcursion, availableDates: excursionDatesInput.split('\n').filter(d=>d.trim()!=='')}); setExcursions(getExcursions()); setIsModalOpen(false); };
  const deleteCurrentExcursion = (id: string) => { if(window.confirm("¿Eliminar?")) { deleteExcursion(id); setExcursions(getExcursions()); }};

  // INSTALLMENT Handlers
  const openEditInstallment = (item: InstallmentTrip) => { setEditingInstallment({...item}); setImageUrlInput(''); setEditingTrip(null); setEditingRental(null); setEditingExcursion(null); setEditingHotel(null); setEditingWorldCup(null); setEditingSlide(null); setEditingBanner(null); setIsModalOpen(true); };
  const openCreateInstallment = () => { setEditingInstallment(createEmptyInstallmentTrip()); setImageUrlInput(''); setEditingTrip(null); setEditingRental(null); setEditingExcursion(null); setEditingHotel(null); setEditingWorldCup(null); setEditingSlide(null); setEditingBanner(null); setIsModalOpen(true); };
  const saveCurrentInstallment = (e: React.FormEvent) => { e.preventDefault(); if (!editingInstallment) return; saveInstallmentTrip(editingInstallment); setInstallments(getInstallmentTrips()); setIsModalOpen(false); };
  const deleteCurrentInstallment = (id: string) => { if(window.confirm("¿Eliminar plan?")) { deleteInstallmentTrip(id); setInstallments(getInstallmentTrips()); }};

  // WORLD CUP Handlers
  const openEditWorldCup = (item: WorldCupTrip) => { setEditingWorldCup({...item}); setImageUrlInput(''); setEditingTrip(null); setEditingRental(null); setEditingExcursion(null); setEditingHotel(null); setEditingInstallment(null); setEditingSlide(null); setEditingBanner(null); setIsModalOpen(true); };
  const openCreateWorldCup = () => { setEditingWorldCup(createEmptyWorldCupTrip()); setImageUrlInput(''); setEditingTrip(null); setEditingRental(null); setEditingExcursion(null); setEditingHotel(null); setEditingInstallment(null); setEditingSlide(null); setEditingBanner(null); setIsModalOpen(true); };
  const saveCurrentWorldCup = (e: React.FormEvent) => { e.preventDefault(); if (!editingWorldCup) return; saveWorldCupTrip(editingWorldCup); setWorldCupTrips(getWorldCupTrips()); setIsModalOpen(false); };
  const deleteCurrentWorldCup = (id: string) => { if(window.confirm("¿Eliminar Paquete Mundial?")) { deleteWorldCupTrip(id); setWorldCupTrips(getWorldCupTrips()); }};

  // HERO SLIDE Handlers
  const openEditSlide = (slide: HeroSlide) => { setEditingSlide({...slide}); setImageUrlInput(''); setEditingTrip(null); setEditingRental(null); setEditingExcursion(null); setEditingHotel(null); setEditingInstallment(null); setEditingWorldCup(null); setEditingBanner(null); setIsModalOpen(true); };
  const saveCurrentSlide = (e: React.FormEvent) => { e.preventDefault(); if (!editingSlide) return; saveHeroSlide(editingSlide); setHeroSlides(getHeroSlides()); setIsModalOpen(false); };

  // PROMO BANNER Handlers
  const openEditBanner = (banner: PromoBanner) => { setEditingBanner({...banner}); setImageUrlInput(''); setEditingTrip(null); setEditingRental(null); setEditingExcursion(null); setEditingHotel(null); setEditingInstallment(null); setEditingWorldCup(null); setEditingSlide(null); setIsModalOpen(true); };
  const saveCurrentBanner = (e: React.FormEvent) => { e.preventDefault(); if (!editingBanner) return; savePromoBanner(editingBanner); setPromoBanners(getPromoBanners()); setIsModalOpen(false); };

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
                    <button onClick={() => setActiveTab('hero')} className={`px-4 py-2 rounded-md ${activeTab === 'hero' ? 'bg-orange-600 text-white' : 'hover:bg-gray-100'}`}>Portada Home</button>
                    <button onClick={() => setActiveTab('trips')} className={`px-4 py-2 rounded-md ${activeTab === 'trips' ? 'bg-cyan-600 text-white' : 'hover:bg-gray-100'}`}>Viajes</button>
                    <button onClick={() => setActiveTab('rentals')} className={`px-4 py-2 rounded-md ${activeTab === 'rentals' ? 'bg-cyan-600 text-white' : 'hover:bg-gray-100'}`}>Alquileres</button>
                    <button onClick={() => setActiveTab('hotels')} className={`px-4 py-2 rounded-md ${activeTab === 'hotels' ? 'bg-cyan-600 text-white' : 'hover:bg-gray-100'}`}>Hoteles</button>
                    <button onClick={() => setActiveTab('excursions')} className={`px-4 py-2 rounded-md ${activeTab === 'excursions' ? 'bg-cyan-600 text-white' : 'hover:bg-gray-100'}`}>Excursiones</button>
                    <button onClick={() => setActiveTab('installments')} className={`px-4 py-2 rounded-md ${activeTab === 'installments' ? 'bg-cyan-600 text-white' : 'hover:bg-gray-100'}`}>ABRAS Cuotas</button>
                    <button onClick={() => setActiveTab('worldcup')} className={`px-4 py-2 rounded-md ${activeTab === 'worldcup' ? 'bg-blue-800 text-white' : 'hover:bg-gray-100'}`}>Mundial 2026</button>
                </div>
                <button onClick={handleLogout} className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-200">Salir</button>
            </div>
        </div>

        {/* ... (Hero tab code) ... */}
        {activeTab === 'hero' && (
            <div className="space-y-8">
                {/* Hero Slides */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold mb-4 text-orange-600">Editar Carrusel de Inicio</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {heroSlides.map(slide => (
                            <div key={slide.id} className="border rounded-lg overflow-hidden flex flex-col">
                                <div className="h-32 bg-gray-200 relative">
                                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4 flex-1">
                                    <h3 className="font-bold">{slide.title}</h3>
                                    <p className="text-xs text-gray-500 mb-2 truncate">{slide.subtitle}</p>
                                    <button onClick={() => openEditSlide(slide)} className="w-full bg-orange-500 text-white text-sm py-2 rounded hover:bg-orange-600">Editar Imagen/Texto</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Promo Banners */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-600">Editar Banners Promocionales</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {promoBanners.map(banner => (
                            <div key={banner.id} className="border rounded-lg overflow-hidden flex flex-col">
                                <div className="h-40 bg-gray-200 relative">
                                    <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                                    <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 text-xs rounded">{banner.badge}</div>
                                </div>
                                <div className="p-4 flex-1">
                                    <h3 className="font-bold text-lg">{banner.title}</h3>
                                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{banner.subtitle}</p>
                                    <button onClick={() => openEditBanner(banner)} className="w-full bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700">Editar Banner</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* --- LISTS --- */}
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
                <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold text-indigo-800">Gestionar ABRAS Cuotas</h2><button onClick={openCreateInstallment} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">+ Nuevo</button></div>
                {installments.map(t => (<div key={t.id} className="flex justify-between border-b py-2 items-center"><span>{t.title}</span><div><button onClick={() => openEditInstallment(t)} className="text-blue-600 mr-4">Editar</button><button onClick={() => deleteCurrentInstallment(t.id)} className="text-red-600">Eliminar</button></div></div>))}
            </div>
        )}
        {activeTab === 'worldcup' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold text-blue-900">Gestionar Mundial 2026</h2><button onClick={openCreateWorldCup} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">+ Nuevo</button></div>
                {worldCupTrips.map(t => (<div key={t.id} className="flex justify-between border-b py-2 items-center"><span>{t.title}</span><div><button onClick={() => openEditWorldCup(t)} className="text-blue-600 mr-4">Editar</button><button onClick={() => deleteCurrentWorldCup(t.id)} className="text-red-600">Eliminar</button></div></div>))}
            </div>
        )}
      </div>

      {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
                  
                  {/* HERO SLIDE EDIT */}
                  {editingSlide && (<form onSubmit={saveCurrentSlide} className="space-y-4"> 
                          <h2 className="text-xl font-bold mb-4 border-b pb-2">Editar Diapositiva</h2>
                          <input className="w-full border p-2 rounded" value={editingSlide.title} onChange={e=>setEditingSlide({...editingSlide, title: e.target.value})} placeholder="Título" />
                          <textarea rows={2} className="w-full border p-2 rounded" value={editingSlide.subtitle} onChange={e=>setEditingSlide({...editingSlide, subtitle: e.target.value})} placeholder="Subtítulo" />
                          <div className="grid grid-cols-2 gap-4">
                               <input className="w-full border p-2 rounded" value={editingSlide.ctaText} onChange={e=>setEditingSlide({...editingSlide, ctaText: e.target.value})} placeholder="Texto Botón" />
                               <input className="w-full border p-2 rounded" value={editingSlide.ctaLink} onChange={e=>setEditingSlide({...editingSlide, ctaLink: e.target.value})} placeholder="Link Botón" />
                          </div>
                          <div>
                              <label className="block text-sm font-bold mb-1">Imagen Actual</label>
                              {editingSlide.image && <img src={editingSlide.image} alt="Preview" className="h-32 w-full object-cover rounded mb-2 border" />}
                              <div className="bg-orange-50 p-4 rounded border border-orange-100"><input type="text" placeholder="URL Imagen" className="border p-2 rounded w-full mb-2" value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} /><button type="button" onClick={()=>handleAddImageUrl('hero')} className="bg-blue-500 text-white px-3 py-1 rounded">Usar URL</button></div>
                              <input type="file" onChange={(e)=>handleFileUpload(e, 'hero')} className="text-sm mt-2" />
                          </div>
                          <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancelar</button><button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded font-bold">Guardar</button></div>
                  </form>)}

                  {/* BANNER EDIT */}
                  {editingBanner && (<form onSubmit={saveCurrentBanner} className="space-y-4">
                          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-blue-600">Editar Banner</h2>
                          <input className="w-full border p-2 rounded" value={editingBanner.title} onChange={e=>setEditingBanner({...editingBanner, title: e.target.value})} placeholder="Título" />
                          <input className="w-full border p-2 rounded" value={editingBanner.badge} onChange={e=>setEditingBanner({...editingBanner, badge: e.target.value})} placeholder="Badge" />
                          <textarea rows={2} className="w-full border p-2 rounded" value={editingBanner.subtitle} onChange={e=>setEditingBanner({...editingBanner, subtitle: e.target.value})} placeholder="Subtítulo" />
                          <div className="grid grid-cols-2 gap-4">
                               <input className="w-full border p-2 rounded" value={editingBanner.ctaText} onChange={e=>setEditingBanner({...editingBanner, ctaText: e.target.value})} placeholder="Texto Botón" />
                               <input className="w-full border p-2 rounded" value={editingBanner.link} onChange={e=>setEditingBanner({...editingBanner, link: e.target.value})} placeholder="Link" />
                          </div>
                          <div>
                              <label className="block text-sm font-bold mb-1">Imagen Actual</label>
                              {editingBanner.image && <img src={editingBanner.image} alt="Preview" className="h-32 w-full object-cover rounded mb-2 border" />}
                              <div className="bg-blue-50 p-4 rounded border border-blue-100"><input type="text" placeholder="URL Imagen" className="border p-2 rounded w-full mb-2" value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} /><button type="button" onClick={()=>handleAddImageUrl('banner')} className="bg-blue-500 text-white px-3 py-1 rounded">Usar URL</button></div>
                              <input type="file" onChange={(e)=>handleFileUpload(e, 'banner')} className="text-sm mt-2" />
                          </div>
                          <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancelar</button><button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-bold">Guardar</button></div>
                  </form>)}

                  {/* TRIP EDIT */}
                  {editingTrip && (
                      <form onSubmit={saveCurrentTrip} className="space-y-4">
                           <h3 className="text-xl font-bold mb-4">Editar Viaje</h3>
                           <input value={editingTrip.title} onChange={e=>setEditingTrip({...editingTrip, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                           <input value={editingTrip.location} onChange={e=>setEditingTrip({...editingTrip, location:e.target.value})} className="border p-2 w-full rounded" placeholder="Ubicación" />
                           <div className="grid grid-cols-3 gap-4">
                                <input type="number" value={editingTrip.price} onChange={e=>setEditingTrip({...editingTrip, price:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio" />
                                <div>
                                    <label className="text-xs font-bold text-red-500">Descuento (%)</label>
                                    <input type="number" value={editingTrip.discount || 0} onChange={e=>setEditingTrip({...editingTrip, discount:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="0" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500">Etiqueta Especial</label>
                                    <input type="text" value={editingTrip.specialLabel || ''} onChange={e=>setEditingTrip({...editingTrip, specialLabel:e.target.value})} className="border p-2 w-full rounded" placeholder="Ej: Hot Sale" />
                                </div>
                           </div>
                           <textarea value={editingTrip.description} onChange={e=>setEditingTrip({...editingTrip, description:e.target.value})} className="border p-2 w-full rounded" placeholder="Descripción" rows={3}></textarea>
                           <label className="flex items-center gap-2"><input type="checkbox" checked={editingTrip.isOffer} onChange={e=>setEditingTrip({...editingTrip, isOffer:e.target.checked})} /> Es Oferta Destacada</label>
                           <textarea value={tripDatesInput} onChange={e=>setTripDatesInput(e.target.value)} className="border p-2 w-full rounded" placeholder="Fechas disponibles (una por línea)" rows={4}></textarea>
                           <div>
                              <label className="block text-sm font-bold mb-1">Imágenes</label>
                              <div className="flex gap-2 mb-2 overflow-x-auto">{editingTrip.images.map((img,i)=><div key={i} className="relative group min-w-[64px]"><img src={img} className="w-16 h-16 object-cover rounded" /><button type="button" onClick={()=>{const newImages = [...editingTrip.images]; newImages.splice(i,1); setEditingTrip({...editingTrip, images: newImages})}} className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">x</button></div>)}</div>
                              <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded border"><div className="flex gap-2"><input type="text" placeholder="https://ejemplo.com/foto.jpg" className="border p-2 rounded flex-1 text-sm" value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} /><button type="button" onClick={()=>handleAddImageUrl('trip')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm whitespace-nowrap">Agregar URL</button></div><input type="file" multiple onChange={(e)=>handleFileUpload(e, 'trip')} className="text-sm" /></div>
                           </div>
                           <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancelar</button><button type="submit" className="bg-cyan-600 text-white px-4 py-2 rounded">Guardar</button></div>
                      </form>
                  )}

                  {/* RENTAL EDIT */}
                  {editingRental && (
                      <form onSubmit={saveCurrentRental} className="space-y-4">
                          <h3 className="text-xl font-bold mb-4">Editar Alquiler</h3>
                          <input value={editingRental.title} onChange={e=>setEditingRental({...editingRental, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                          <input value={editingRental.location} onChange={e=>setEditingRental({...editingRental, location:e.target.value})} className="border p-2 w-full rounded" placeholder="Ubicación" />
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <input type="number" value={editingRental.pricePerNight} onChange={e=>setEditingRental({...editingRental, pricePerNight:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio x Noche" />
                              <input type="number" value={editingRental.bedrooms} onChange={e=>setEditingRental({...editingRental, bedrooms:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Habitaciones" />
                              <div>
                                <label className="text-xs font-bold text-red-500">Descuento (%)</label>
                                <input type="number" value={editingRental.discount || 0} onChange={e=>setEditingRental({...editingRental, discount:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="0" />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-gray-500">Etiqueta Especial</label>
                                <input type="text" value={editingRental.specialLabel || ''} onChange={e=>setEditingRental({...editingRental, specialLabel:e.target.value})} className="border p-2 w-full rounded" placeholder="Ej: Black Friday" />
                              </div>
                          </div>
                          <textarea value={editingRental.description} onChange={e=>setEditingRental({...editingRental, description:e.target.value})} className="border p-2 w-full rounded" placeholder="Descripción" rows={3}></textarea>
                          <textarea value={rentalAmenitiesInput} onChange={e=>setRentalAmenitiesInput(e.target.value)} className="border p-2 w-full rounded" placeholder="Comodidades (una por línea)" rows={4}></textarea>
                          <label className="flex items-center gap-2"><input type="checkbox" checked={editingRental.isOffer || false} onChange={e=>setEditingRental({...editingRental, isOffer:e.target.checked})} /> Es Oferta Destacada</label>
                          <div>
                              <label className="block text-sm font-bold mb-1">Imágenes</label>
                              <div className="flex gap-2 mb-2 overflow-x-auto">
                                  {editingRental.images.map((img, i) => (
                                      <div key={i} className="relative group min-w-[64px]">
                                          <img src={img} className="w-16 h-16 object-cover rounded" />
                                          <button 
                                              type="button" 
                                              onClick={() => {
                                                  const newImages = [...editingRental.images]; 
                                                  newImages.splice(i, 1); 
                                                  setEditingRental({ ...editingRental, images: newImages });
                                              }} 
                                              className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                                          >
                                              x
                                          </button>
                                      </div>
                                  ))}
                              </div>
                              <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded border"><div className="flex gap-2"><input type="text" placeholder="URL Imagen" className="border p-2 rounded flex-1 text-sm" value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} /><button type="button" onClick={()=>handleAddImageUrl('rental')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">URL</button></div><input type="file" multiple onChange={(e)=>handleFileUpload(e, 'rental')} className="text-sm" /></div>
                          </div>
                          <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancelar</button><button type="submit" className="bg-cyan-600 text-white px-4 py-2 rounded">Guardar</button></div>
                      </form>
                  )}

                  {/* HOTEL EDIT */}
                  {editingHotel && (
                      <form onSubmit={saveCurrentHotel} className="space-y-4">
                          <h3 className="text-xl font-bold mb-4">Editar Hotel</h3>
                          <input value={editingHotel.title} onChange={e=>setEditingHotel({...editingHotel, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                          <div className="grid grid-cols-3 gap-4">
                              <input type="number" value={editingHotel.pricePerNight} onChange={e=>setEditingHotel({...editingHotel, pricePerNight:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio x Noche" />
                              <div>
                                <label className="text-xs font-bold text-red-500">Descuento (%)</label>
                                <input type="number" value={editingHotel.discount || 0} onChange={e=>setEditingHotel({...editingHotel, discount:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="0" />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-gray-500">Etiqueta Especial</label>
                                <input type="text" value={editingHotel.specialLabel || ''} onChange={e=>setEditingHotel({...editingHotel, specialLabel:e.target.value})} className="border p-2 w-full rounded" placeholder="Ej: Hot Sale" />
                              </div>
                          </div>
                          <textarea value={editingHotel.description} onChange={e=>setEditingHotel({...editingHotel, description:e.target.value})} className="border p-2 w-full rounded" placeholder="Descripción" rows={3}></textarea>
                          <textarea value={hotelAmenitiesInput} onChange={e=>setHotelAmenitiesInput(e.target.value)} className="border p-2 w-full rounded" placeholder="Amenidades (una por línea)" rows={4}></textarea>
                          <label className="flex items-center gap-2"><input type="checkbox" checked={editingHotel.isOffer} onChange={e=>setEditingHotel({...editingHotel, isOffer:e.target.checked})} /> Es Oferta Destacada</label>
                          <div>
                              <label className="block text-sm font-bold mb-1">Imágenes</label>
                              <div className="flex gap-2 mb-2 overflow-x-auto">
                                  {editingHotel.images.map((img, i) => (
                                      <div key={i} className="relative group min-w-[64px]">
                                          <img src={img} className="w-16 h-16 object-cover rounded" />
                                          <button 
                                              type="button" 
                                              onClick={() => {
                                                  const newImages = [...editingHotel.images]; 
                                                  newImages.splice(i, 1); 
                                                  setEditingHotel({ ...editingHotel, images: newImages });
                                              }} 
                                              className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                                          >
                                              x
                                          </button>
                                      </div>
                                  ))}
                              </div>
                              <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded border"><div className="flex gap-2"><input type="text" placeholder="URL Imagen" className="border p-2 rounded flex-1 text-sm" value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} /><button type="button" onClick={()=>handleAddImageUrl('hotel')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">URL</button></div><input type="file" multiple onChange={(e)=>handleFileUpload(e, 'hotel')} className="text-sm" /></div>
                          </div>
                          <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancelar</button><button type="submit" className="bg-cyan-600 text-white px-4 py-2 rounded">Guardar</button></div>
                      </form>
                  )}

                  {/* EXCURSION EDIT */}
                  {editingExcursion && (
                      <form onSubmit={saveCurrentExcursion} className="space-y-4">
                          <h3 className="text-xl font-bold mb-4">Editar Excursión</h3>
                          <input value={editingExcursion.title} onChange={e=>setEditingExcursion({...editingExcursion, title:e.target.value})} className="border p-2 w-full rounded" placeholder="Título" />
                          <div className="grid grid-cols-3 gap-4">
                              <input type="number" value={editingExcursion.price} onChange={e=>setEditingExcursion({...editingExcursion, price:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="Precio" />
                              <div>
                                <label className="text-xs font-bold text-red-500">Descuento (%)</label>
                                <input type="number" value={editingExcursion.discount || 0} onChange={e=>setEditingExcursion({...editingExcursion, discount:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="0" />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-gray-500">Etiqueta Especial</label>
                                <input type="text" value={editingExcursion.specialLabel || ''} onChange={e=>setEditingExcursion({...editingExcursion, specialLabel:e.target.value})} className="border p-2 w-full rounded" placeholder="Ej: Promo" />
                              </div>
                          </div>
                          <textarea value={editingExcursion.description} onChange={e=>setEditingExcursion({...editingExcursion, description:e.target.value})} className="border p-2 w-full rounded" placeholder="Descripción" rows={3}></textarea>
                          <div>
                              <label className="block text-sm font-bold mb-1">Imágenes</label>
                              <div className="flex gap-2 mb-2 overflow-x-auto">
                                  {editingExcursion.images.map((img, i) => (
                                      <div key={i} className="relative group min-w-[64px]">
                                          <img src={img} className="w-16 h-16 object-cover rounded" />
                                          <button 
                                              type="button" 
                                              onClick={() => {
                                                  const newImages = [...editingExcursion.images]; 
                                                  newImages.splice(i, 1); 
                                                  setEditingExcursion({ ...editingExcursion, images: newImages });
                                              }} 
                                              className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                                          >
                                              x
                                          </button>
                                      </div>
                                  ))}
                              </div>
                              <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded border"><div className="flex gap-2"><input type="text" placeholder="URL Imagen" className="border p-2 rounded flex-1 text-sm" value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} /><button type="button" onClick={()=>handleAddImageUrl('excursion')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">URL</button></div><input type="file" multiple onChange={(e)=>handleFileUpload(e, 'excursion')} className="text-sm" /></div>
                          </div>
                          <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancelar</button><button type="submit" className="bg-cyan-600 text-white px-4 py-2 rounded">Guardar</button></div>
                      </form>
                  )}

                  {/* INSTALLMENT EDIT */}
                  {editingInstallment && (
                      <form onSubmit={saveCurrentInstallment} className="space-y-4">
                          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-indigo-700">Editar ABRAS Cuotas</h2>
                          <input className="border p-2 rounded w-full" placeholder="Título" value={editingInstallment.title} onChange={e=>setEditingInstallment({...editingInstallment, title: e.target.value})} />
                          <div className="grid grid-cols-3 gap-4">
                              <input type="number" className="w-full border p-2 rounded" value={editingInstallment.totalPrice} onChange={e=>setEditingInstallment({...editingInstallment, totalPrice: Number(e.target.value)})} placeholder="Precio Total" />
                              <div>
                                <label className="text-xs font-bold text-red-500">Descuento (%)</label>
                                <input type="number" value={editingInstallment.discount || 0} onChange={e=>setEditingInstallment({...editingInstallment, discount:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="0" />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-gray-500">Etiqueta Especial</label>
                                <input type="text" value={editingInstallment.specialLabel || ''} onChange={e=>setEditingInstallment({...editingInstallment, specialLabel:e.target.value})} className="border p-2 w-full rounded" placeholder="Ej: Plan 2026" />
                              </div>
                          </div>
                          <textarea className="w-full border p-2 rounded" rows={3} placeholder="Descripción" value={editingInstallment.description} onChange={e=>setEditingInstallment({...editingInstallment, description: e.target.value})} />
                          <div>
                              <label className="block text-sm font-bold mb-1">Imágenes</label>
                              <div className="flex gap-2 mb-2 overflow-x-auto">
                                  {editingInstallment.images.map((img, i) => (
                                      <div key={i} className="relative group min-w-[64px]">
                                          <img src={img} className="w-16 h-16 object-cover rounded" />
                                          <button 
                                              type="button" 
                                              onClick={() => {
                                                  const newImages = [...editingInstallment.images]; 
                                                  newImages.splice(i, 1); 
                                                  setEditingInstallment({ ...editingInstallment, images: newImages });
                                              }} 
                                              className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                                          >
                                              x
                                          </button>
                                      </div>
                                  ))}
                              </div>
                              <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded border"><div className="flex gap-2"><input type="text" placeholder="URL Imagen" className="border p-2 rounded flex-1 text-sm" value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} /><button type="button" onClick={()=>handleAddImageUrl('installment')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">URL</button></div><input type="file" multiple onChange={(e)=>handleFileUpload(e, 'installment')} className="text-sm" /></div>
                          </div>
                          <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancelar</button><button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded font-bold">Guardar</button></div>
                      </form>
                  )}

                  {/* WORLD CUP EDIT */}
                  {editingWorldCup && (
                      <form onSubmit={saveCurrentWorldCup} className="space-y-4">
                          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-blue-800">Editar Paquete Mundial</h2>
                          <input className="border p-2 rounded w-full" placeholder="Título" value={editingWorldCup.title} onChange={e=>setEditingWorldCup({...editingWorldCup, title: e.target.value})} />
                          <div className="grid grid-cols-3 gap-4">
                              <input type="number" className="w-full border p-2 rounded" value={editingWorldCup.totalPrice} onChange={e=>setEditingWorldCup({...editingWorldCup, totalPrice: Number(e.target.value)})} placeholder="Precio Total" />
                              <div>
                                <label className="text-xs font-bold text-red-500">Descuento (%)</label>
                                <input type="number" value={editingWorldCup.discount || 0} onChange={e=>setEditingWorldCup({...editingWorldCup, discount:Number(e.target.value)})} className="border p-2 w-full rounded" placeholder="0" />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-gray-500">Etiqueta Especial</label>
                                <input type="text" value={editingWorldCup.specialLabel || ''} onChange={e=>setEditingWorldCup({...editingWorldCup, specialLabel:e.target.value})} className="border p-2 w-full rounded" placeholder="Ej: Últimos Lugares" />
                              </div>
                          </div>
                          <textarea className="w-full border p-2 rounded" rows={3} placeholder="Descripción" value={editingWorldCup.description} onChange={e=>setEditingWorldCup({...editingWorldCup, description: e.target.value})} />
                          <div>
                              <label className="block text-sm font-bold mb-1">Imágenes</label>
                              <div className="flex gap-2 mb-2 overflow-x-auto">
                                  {editingWorldCup.images.map((img, i) => (
                                      <div key={i} className="relative group min-w-[64px]">
                                          <img src={img} className="w-16 h-16 object-cover rounded" />
                                          <button 
                                              type="button" 
                                              onClick={() => {
                                                  const newImages = [...editingWorldCup.images]; 
                                                  newImages.splice(i, 1); 
                                                  setEditingWorldCup({ ...editingWorldCup, images: newImages });
                                              }} 
                                              className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                                          >
                                              x
                                          </button>
                                      </div>
                                  ))}
                              </div>
                              <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded border"><div className="flex gap-2"><input type="text" placeholder="URL Imagen" className="border p-2 rounded flex-1 text-sm" value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} /><button type="button" onClick={()=>handleAddImageUrl('worldcup')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">URL</button></div><input type="file" multiple onChange={(e)=>handleFileUpload(e, 'worldcup')} className="text-sm" /></div>
                          </div>
                          <div className="flex justify-end gap-2"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancelar</button><button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-bold">Guardar</button></div>
                      </form>
                  )}
              </div>
          </div>
      )}
    </div>
  );
};

export default Admin;
