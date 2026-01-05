
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
import { getTermsAndConditions, saveTermsAndConditions } from '../services/settingsService';
import { generateDestinationGuide } from '../services/geminiService';
import { generateQuotePDF } from '../services/quotePdfService';
import { ADMIN_EMAIL, ADMIN_PASS } from '../constants';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
      return localStorage.getItem('abras_isAdmin') === 'true';
  });
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'trips' | 'rentals' | 'excursions' | 'hotels' | 'installments' | 'worldcup' | 'groups' | 'legales' | 'quote'>('trips');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  
  // List Search
  const [listSearchTerm, setListSearchTerm] = useState('');

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
  const [termsText, setTermsText] = useState('');

  // Quote State
  const [quoteData, setQuoteData] = useState({
      clientName: '',
      origin: 'Buenos Aires',
      destination: '',
      dates: '',
      passengers: 2,
      price: 0,
      description: '',
      guideText: '',
      imageUrl: ''
  });
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

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

  useEffect(() => {
      // Reset search on tab change
      setListSearchTerm('');
      
      if (activeTab === 'legales') {
          getTermsAndConditions().then(setTermsText);
      }
  }, [activeTab]);

  const loadAllData = async () => {
      try {
          // Load each independently so one failure doesn't block the UI
          getTrips().then(setTrips);
          getRentals().then(setRentals);
          getExcursions().then(setExcursions);
          getHotels().then(setHotels);
          getInstallmentTrips().then(setInstallments);
          getWorldCupTrips().then(setWorldCupTrips);
          getGroupTrips().then(setGroupTrips);
          getHeroSlides().then(setHeroSlides);
          getPromoBanners().then(setPromoBanners);
      } catch (error) {
          console.error("Error loading data", error);
      }
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
      try {
          if (type === 'trip') await deleteTrip(id);
          if (type === 'rental') await deleteRental(id);
          if (type === 'hotel') await deleteHotel(id);
          if (type === 'excursion') await deleteExcursion(id);
          if (type === 'group') await deleteGroupTrip(id);
          if (type === 'installment') await deleteInstallmentTrip(id);
          if (type === 'worldcup') await deleteWorldCupTrip(id);
          if (type === 'hero_slide') await deleteHeroSlide(id);
          await loadAllData();
      } catch (e) {
          alert('Error al eliminar');
      }
  };

  const handleDuplicate = async (item: any, type: string) => {
      if(!window.confirm("¿Duplicar esta publicación?")) return;
      
      const newId = crypto.randomUUID();
      const newItem = { ...item, id: newId, title: `${item.title} (COPIA)` };
      
      // Remove Supabase metadata if exists
      delete newItem.created_at;

      resetEditState();

      if (type === 'trip') {
          await saveTrip(newItem);
          setEditingTrip(newItem);
          setTripDatesInput((newItem.availableDates || []).join('\n'));
      } else if (type === 'rental') {
          await saveRental(newItem);
          setEditingRental(newItem);
          setRentalAmenitiesInput((newItem.amenities || []).join('\n'));
      } else if (type === 'hotel') {
          await saveHotel(newItem);
          setEditingHotel(newItem);
          setHotelAmenitiesInput((newItem.amenities || []).join('\n'));
      } else if (type === 'excursion') {
          await saveExcursion(newItem);
          setEditingExcursion(newItem);
          setExcursionDatesInput((newItem.availableDates || []).join('\n'));
      } else if (type === 'group') {
          await saveGroupTrip(newItem);
          setEditingGroup(newItem);
          setGroupDatesInput((newItem.availableDates || []).join('\n'));
      } else if (type === 'installment') {
          await saveInstallmentTrip(newItem);
          setEditingInstallment(newItem);
      } else if (type === 'worldcup') {
          await saveWorldCupTrip(newItem);
          setEditingWorldCup(newItem);
      }

      await loadAllData();
      setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSaving(true);
      try {
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
          setIsModalOpen(false);
      } catch (error: any) {
          console.error("Error saving:", error);
          alert(`Hubo un error al guardar. Detalle: ${error.message || 'Error de conexión o base de datos'}`);
      } finally {
          setIsSaving(false);
      }
  };

  const handleSaveLegales = async () => {
      setIsSaving(true);
      try {
          await saveTermsAndConditions(termsText);
          alert('Bases y Condiciones guardadas correctamente.');
      } catch (e) {
          alert('Error al guardar.');
      } finally {
          setIsSaving(false);
      }
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

  const autoGeocode = async (address: string, setter: any, currentObj: any) => {
      if(!address) return alert("Ingrese una ubicación o dirección primero.");
      setIsGeocoding(true);
      try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`);
          const data = await response.json();
          if (data && data.length > 0) {
              const lat = parseFloat(data[0].lat);
              const lon = parseFloat(data[0].lon);
              setter({ ...currentObj, lat: lat, lng: lon });
              alert(`Coordenadas encontradas: ${lat}, ${lon}`);
          } else {
              alert("No se encontraron coordenadas para esa ubicación.");
          }
      } catch (error) {
          console.error("Geocoding error:", error);
          alert("Error al buscar coordenadas.");
      } finally {
          setIsGeocoding(false);
      }
  };

  const handleGenerateGuide = async () => {
      if (!quoteData.destination) return alert("Ingrese un destino primero.");
      setIsGeneratingAI(true);
      const text = await generateDestinationGuide(quoteData.destination);
      setQuoteData(prev => ({ ...prev, guideText: text }));
      setIsGeneratingAI(false);
  };

  const handleDownloadPDF = () => {
      generateQuotePDF(quoteData);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Acceso Admin</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" />
            </div>
            <div className="mb-6 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-9 text-gray-500 text-xs">{showPassword ? 'Ocultar' : 'Mostrar'}</button>
            </div>
            <button type="submit" className="w-full bg-cyan-600 text-white font-bold py-2 rounded hover:bg-cyan-700">Ingresar</button>
          </form>
        </div>
      </div>
    );
  }

  const renderList = (items: any[], type: string, editSetter: any, dateSetter?: any, amenitySetter?: any) => {
      const filtered = (items || []).filter(i => 
          (i.title || '').toLowerCase().includes(listSearchTerm.toLowerCase()) || 
          (i.location && i.location.toLowerCase().includes(listSearchTerm.toLowerCase()))
      );

      return (
          <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                  <input type="text" placeholder="Buscar..." className="border rounded px-3 py-1 text-sm w-64" value={listSearchTerm} onChange={(e) => setListSearchTerm(e.target.value)} />
                  <div className="text-sm text-gray-500">{filtered.length} elementos</div>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                      <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                      </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                      {filtered.map((item: any) => (
                          <tr key={item.id}>
                              <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{item.title}</div>{item.isOffer && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Oferta</span>}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.baseCurrency} {item.price || item.pricePerNight || item.totalPrice} {type === 'rental' && item.priceFrequency === 'monthly' ? '/ mes' : ''}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button onClick={() => {
                                      resetEditState();
                                      editSetter(item);
                                      if(dateSetter) dateSetter((item.availableDates || []).join('\n'));
                                      if(amenitySetter) amenitySetter((item.amenities || []).join('\n'));
                                      setIsModalOpen(true);
                                  }} className="text-indigo-600 hover:text-indigo-900 mr-4">Editar</button>
                                  <button onClick={() => handleDuplicate(item, type)} className="text-blue-600 hover:text-blue-900 mr-4">Duplicar</button>
                                  <button onClick={() => handleDelete(item.id, type)} className="text-red-600 hover:text-red-900">Eliminar</button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      );
  };

  const CommonImageUploader = ({ obj, setter }: {obj: any, setter: any}) => (
      <div>
          <label className="block text-sm font-bold mb-2">Imágenes</label>
          <div className="flex gap-2 overflow-x-auto mb-2">
              {obj.images?.map((img: string, idx: number) => (
                  <div key={idx} className="relative w-24 h-24 flex-shrink-0 group"><img src={img} className="w-full h-full object-cover rounded" /><button type="button" onClick={()=>{if(window.confirm("¿Eliminar imagen?")){const newImgs = [...obj.images]; newImgs.splice(idx,1); setter({...obj, images: newImgs});}}} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100">x</button></div>
              ))}
          </div>
          <div className="flex gap-2">
              <input type="text" placeholder="URL de imagen" className="border p-2 rounded flex-grow" value={imageUrlInput} onChange={e=>setImageUrlInput(e.target.value)} />
              <button type="button" onClick={()=>{if(imageUrlInput){setter({...obj, images: [...(obj.images||[]), imageUrlInput]}); setImageUrlInput('');}}} className="bg-gray-200 px-4 rounded">Agregar</button>
              <label className="bg-gray-200 px-4 py-2 rounded cursor-pointer">Subir <input type="file" hidden multiple onChange={(e)=>handleFileUpload(e, setter)} /></label>
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <nav className="bg-white shadow mb-8">
          <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between h-16">
                  <div className="flex items-center">
                      <h1 className="text-xl font-bold text-gray-800 mr-8">Panel de Control</h1>
                      <div className="hidden md:flex space-x-2 overflow-x-auto">
                          {['trips','rentals','groups','hotels','excursions','installments','worldcup','hero','legales','quote'].map((t: any) => (
                              <button key={t} onClick={() => setActiveTab(t as any)} className={`px-3 py-2 rounded-md text-sm font-medium capitalize ${activeTab === t ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-200'}`}>{t}</button>
                          ))}
                      </div>
                  </div>
                  <div className="flex items-center"><button onClick={handleLogout} className="text-red-600 hover:text-red-800 font-medium text-sm">Cerrar Sesión</button></div>
              </div>
              <div className="md:hidden flex overflow-x-auto pb-2 space-x-2">
                  <button onClick={() => setActiveTab('trips')} className="whitespace-nowrap px-3 py-1 bg-gray-200 rounded text-xs">Paquetes</button>
                  <button onClick={() => setActiveTab('rentals')} className="whitespace-nowrap px-3 py-1 bg-gray-200 rounded text-xs">Alquileres</button>
                  <button onClick={() => setActiveTab('quote')} className="whitespace-nowrap px-3 py-1 bg-gray-200 rounded text-xs">Cotizador</button>
              </div>
          </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4">
          
          {activeTab === 'rentals' && (
              <div>
                  <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-800">Alquileres</h2><button onClick={() => { resetEditState(); setEditingRental(createEmptyRental()); setIsModalOpen(true); }} className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700">Nuevo</button></div>
                  {renderList(rentals, 'rental', setEditingRental, null, setRentalAmenitiesInput)}
              </div>
          )}

          {activeTab === 'trips' && (
              <div>
                  <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-800">Paquetes</h2><button onClick={() => { resetEditState(); setEditingTrip(createEmptyTrip()); setIsModalOpen(true); }} className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700">Nuevo</button></div>
                  {renderList(trips, 'trip', setEditingTrip, setTripDatesInput)}
              </div>
          )}

          {activeTab === 'groups' && (
              <div>
                  <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-800">Grupales</h2><button onClick={() => { resetEditState(); setEditingGroup(createEmptyGroupTrip()); setIsModalOpen(true); }} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Nuevo</button></div>
                  {renderList(groupTrips, 'group', setEditingGroup, setGroupDatesInput)}
              </div>
          )}

          {activeTab === 'hotels' && (
              <div>
                  <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-800">Hoteles</h2><button onClick={() => { resetEditState(); setEditingHotel(createEmptyHotel()); setIsModalOpen(true); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Nuevo</button></div>
                  {renderList(hotels, 'hotel', setEditingHotel, null, setHotelAmenitiesInput)}
              </div>
          )}

          {activeTab === 'excursions' && (
              <div>
                  <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-800">Excursiones</h2><button onClick={() => { resetEditState(); setEditingExcursion(createEmptyExcursion()); setIsModalOpen(true); }} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Nueva</button></div>
                  {renderList(excursions, 'excursion', setEditingExcursion, setExcursionDatesInput)}
              </div>
          )}

          {activeTab === 'installments' && (
              <div>
                  <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-800">Planes Cuotas</h2><button onClick={() => { resetEditState(); setEditingInstallment(createEmptyInstallmentTrip()); setIsModalOpen(true); }} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Nuevo</button></div>
                  {renderList(installments, 'installment', setEditingInstallment)}
              </div>
          )}

          {activeTab === 'worldcup' && (
              <div>
                  <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-800">Mundial 2026</h2><button onClick={() => { resetEditState(); setEditingWorldCup(createEmptyWorldCupTrip()); setIsModalOpen(true); }} className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">Nuevo</button></div>
                  {renderList(worldCupTrips, 'worldcup', setEditingWorldCup)}
              </div>
          )}

          {/* Hero & Banners */}
          {activeTab === 'hero' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                      <h3 className="font-bold text-xl mb-4">Slides Principales</h3>
                      {heroSlides.map(slide => (
                          <div key={slide.id} className="border p-4 mb-4 rounded bg-white flex gap-4">
                              <img src={slide.image} className="w-24 h-16 object-cover rounded" />
                              <div className="flex-grow">
                                  <div className="font-bold">{slide.title}</div>
                                  <div className="text-xs text-gray-500">{slide.subtitle}</div>
                              </div>
                              <button onClick={()=>{setEditingSlide(slide); setIsModalOpen(true);}} className="text-blue-500">Editar</button>
                          </div>
                      ))}
                  </div>
                  <div>
                      <h3 className="font-bold text-xl mb-4">Banners Promo</h3>
                      {promoBanners.map(banner => (
                          <div key={banner.id} className="border p-4 mb-4 rounded bg-white flex gap-4">
                              <img src={banner.image} className="w-24 h-16 object-cover rounded" />
                              <div className="flex-grow">
                                  <div className="font-bold">{banner.title}</div>
                                  <div className="text-xs text-gray-500">{banner.badge}</div>
                              </div>
                              <button onClick={()=>{setEditingBanner(banner); setIsModalOpen(true);}} className="text-blue-500">Editar</button>
                          </div>
                      ))}
                  </div>
              </div>
          )}

          {activeTab === 'quote' && (
              <div className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
                  <h2 className="text-2xl font-bold mb-6">Generador de Presupuesto PDF</h2>
                  <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                          <input className="w-full border p-2 rounded" placeholder="Nombre del Cliente" value={quoteData.clientName} onChange={e=>setQuoteData({...quoteData, clientName:e.target.value})} />
                          <input className="w-full border p-2 rounded" placeholder="Origen" value={quoteData.origin} onChange={e=>setQuoteData({...quoteData, origin:e.target.value})} />
                          <input className="w-full border p-2 rounded" placeholder="Destino" value={quoteData.destination} onChange={e=>setQuoteData({...quoteData, destination:e.target.value})} />
                          <input className="w-full border p-2 rounded" placeholder="Fechas" value={quoteData.dates} onChange={e=>setQuoteData({...quoteData, dates:e.target.value})} />
                          <div className="grid grid-cols-2 gap-4">
                              <input type="number" className="w-full border p-2 rounded" placeholder="Pasajeros" value={quoteData.passengers} onChange={e=>setQuoteData({...quoteData, passengers:parseInt(e.target.value)})} />
                              <input type="number" className="w-full border p-2 rounded" placeholder="Precio Total USD" value={quoteData.price} onChange={e=>setQuoteData({...quoteData, price:parseFloat(e.target.value)})} />
                          </div>
                          <textarea className="w-full border p-2 rounded h-32" placeholder="Descripción del servicio" value={quoteData.description} onChange={e=>setQuoteData({...quoteData, description:e.target.value})} />
                      </div>
                      <div className="space-y-4">
                          <input className="w-full border p-2 rounded" placeholder="URL Imagen Destino" value={quoteData.imageUrl} onChange={e=>setQuoteData({...quoteData, imageUrl:e.target.value})} />
                          <textarea className="w-full border p-2 rounded h-40" placeholder="Guía Turística (Tips, Lugares...)" value={quoteData.guideText} onChange={e=>setQuoteData({...quoteData, guideText:e.target.value})} />
                          <button onClick={handleGenerateGuide} disabled={isGeneratingAI} className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 disabled:opacity-50">{isGeneratingAI ? 'Generando con IA...' : '✨ Generar Guía con IA'}</button>
                          <button onClick={handleDownloadPDF} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 font-bold">Descargar PDF</button>
                      </div>
                  </div>
              </div>
          )}

          {activeTab === 'legales' && (
              <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-bold mb-4">Editar Términos y Condiciones</h2>
                  <textarea className="w-full border p-4 rounded h-96 font-mono text-sm" value={termsText} onChange={e=>setTermsText(e.target.value)} />
                  <button onClick={handleSaveLegales} className="mt-4 bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700">Guardar Cambios</button>
              </div>
          )}
          
          {/* MODALS */}
          {isModalOpen && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
                  <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
                      
                      {/* RENTAL FORM */}
                      {editingRental && (
                          <form onSubmit={handleSave} className="space-y-4">
                              <h3 className="text-xl font-bold mb-4">Editar Alquiler</h3>
                              <div className="grid grid-cols-2 gap-4">
                                  <div><label className="block text-sm font-bold">Título</label><input className="w-full border p-2 rounded" value={editingRental.title} onChange={e=>setEditingRental({...editingRental, title: e.target.value})} required /></div>
                                  <div><label className="block text-sm font-bold">Ubicación</label><input className="w-full border p-2 rounded" value={editingRental.location} onChange={e=>setEditingRental({...editingRental, location: e.target.value})} required /></div>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                  <div><label className="block text-sm font-bold">Precio</label><input type="number" className="w-full border p-2 rounded" value={editingRental.pricePerNight} onChange={e=>setEditingRental({...editingRental, pricePerNight: parseFloat(e.target.value)})} required /></div>
                                  {/* Fix: Casting e.target.value to ensure it matches the specific union type 'nightly' | 'monthly' */}
                                  <div><label className="block text-sm font-bold">Frecuencia</label><select className="w-full border p-2 rounded" value={editingRental.priceFrequency || 'nightly'} onChange={e=>setEditingRental({...editingRental, priceFrequency: e.target.value as 'nightly' | 'monthly'})}><option value="nightly">Noche</option><option value="monthly">Mes</option></select></div>
                                  <div><label className="block text-sm font-bold">Moneda</label><select className="w-full border p-2 rounded" value={editingRental.baseCurrency} onChange={e=>setEditingRental({...editingRental, baseCurrency: e.target.value as any})}><option value="USD">USD</option><option value="ARS">ARS</option></select></div>
                              </div>
                              <div><label className="block text-sm font-bold">Descripción</label><textarea className="w-full border p-2 rounded h-24" value={editingRental.description} onChange={e=>setEditingRental({...editingRental, description: e.target.value})} required /></div>
                              <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-bold">Habitaciones</label><input type="number" className="w-full border p-2 rounded" value={editingRental.bedrooms} onChange={e=>setEditingRental({...editingRental, bedrooms: parseInt(e.target.value)})} /></div><div><label className="block text-sm font-bold">Huéspedes Máx</label><input type="number" className="w-full border p-2 rounded" value={editingRental.maxGuests} onChange={e=>setEditingRental({...editingRental, maxGuests: parseInt(e.target.value)})} /></div></div>
                              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded border"><div><label className="block text-sm font-bold">Latitud</label><input type="number" step="any" className="w-full border p-2 rounded" value={editingRental.lat || ''} onChange={e=>setEditingRental({...editingRental, lat: parseFloat(e.target.value)})} /></div><div><label className="block text-sm font-bold">Longitud</label><input type="number" step="any" className="w-full border p-2 rounded" value={editingRental.lng || ''} onChange={e=>setEditingRental({...editingRental, lng: parseFloat(e.target.value)})} /></div><div className="col-span-2"><button type="button" onClick={()=>autoGeocode(editingRental.location, setEditingRental, editingRental)} disabled={isGeocoding} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50">{isGeocoding ? 'Buscando...' : 'Autodetectar Coordenadas'}</button></div></div>
                              <div><label className="block text-sm font-bold">Comodidades (una por línea)</label><textarea className="w-full border p-2 rounded h-24" value={rentalAmenitiesInput} onChange={e=>setRentalAmenitiesInput(e.target.value)} /></div>
                              <CommonImageUploader obj={editingRental} setter={setEditingRental} />
                              <div className="flex gap-4 items-center border-t pt-4"><label className="flex items-center gap-2"><input type="checkbox" checked={editingRental.isOffer} onChange={e=>setEditingRental({...editingRental, isOffer: e.target.checked})} /> Es Oferta Destacada</label><input type="number" placeholder="% Descuento" className="border p-2 rounded w-32" value={editingRental.discount || ''} onChange={e=>setEditingRental({...editingRental, discount: parseFloat(e.target.value)})} /></div>
                              <div className="flex justify-end gap-2 border-t pt-4"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 text-gray-600">Cancelar</button><button type="submit" disabled={isSaving} className="bg-cyan-600 text-white px-6 py-2 rounded font-bold hover:bg-cyan-700 disabled:opacity-50">{isSaving ? 'Guardando...' : 'Guardar Cambios'}</button></div>
                          </form>
                      )}

                      {/* TRIP FORM */}
                      {editingTrip && (
                          <form onSubmit={handleSave} className="space-y-4">
                              <h3 className="text-xl font-bold mb-4">Editar Paquete</h3>
                              <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-bold">Título</label><input className="w-full border p-2 rounded" value={editingTrip.title} onChange={e=>setEditingTrip({...editingTrip, title: e.target.value})} required /></div><div><label className="block text-sm font-bold">Ubicación</label><input className="w-full border p-2 rounded" value={editingTrip.location} onChange={e=>setEditingTrip({...editingTrip, location: e.target.value})} required /></div></div>
                              <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-bold">Precio</label><input type="number" className="w-full border p-2 rounded" value={editingTrip.price} onChange={e=>setEditingTrip({...editingTrip, price: parseFloat(e.target.value)})} required /></div><div><label className="block text-sm font-bold">Moneda</label><select className="w-full border p-2 rounded" value={editingTrip.baseCurrency} onChange={e=>setEditingTrip({...editingTrip, baseCurrency: e.target.value as any})}><option value="USD">USD</option><option value="ARS">ARS</option></select></div></div>
                              <div><label className="block text-sm font-bold">Descripción</label><textarea className="w-full border p-2 rounded h-32" value={editingTrip.description} onChange={e=>setEditingTrip({...editingTrip, description: e.target.value})} required /></div>
                              <div><label className="block text-sm font-bold">Fechas Disponibles (una por línea)</label><textarea className="w-full border p-2 rounded h-24" value={tripDatesInput} onChange={e=>setTripDatesInput(e.target.value)} /></div>
                              <CommonImageUploader obj={editingTrip} setter={setEditingTrip} />
                              <div className="flex gap-4 items-center border-t pt-4"><label className="flex items-center gap-2"><input type="checkbox" checked={editingTrip.isOffer} onChange={e=>setEditingTrip({...editingTrip, isOffer: e.target.checked})} /> Es Oferta</label><label className="flex items-center gap-2"><input type="checkbox" checked={editingTrip.includesFlight} onChange={e=>setEditingTrip({...editingTrip, includesFlight: e.target.checked})} /> Incluye Vuelo</label><input type="text" placeholder="Etiqueta (ej: HOT SALE)" className="border p-2 rounded" value={editingTrip.specialLabel || ''} onChange={e=>setEditingTrip({...editingTrip, specialLabel: e.target.value})} /><input type="text" placeholder="Duración (ej: 7 Días)" className="border p-2 rounded" value={editingTrip.durationLabel || ''} onChange={e=>setEditingTrip({...editingTrip, durationLabel: e.target.value})} /></div>
                              <div className="flex justify-end gap-2 border-t pt-4"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 text-gray-600">Cancelar</button><button type="submit" disabled={isSaving} className="bg-cyan-600 text-white px-6 py-2 rounded font-bold hover:bg-cyan-700 disabled:opacity-50">{isSaving ? 'Guardando...' : 'Guardar Cambios'}</button></div>
                          </form>
                      )}

                      {/* GROUP FORM */}
                      {editingGroup && (
                          <form onSubmit={handleSave} className="space-y-4">
                              <h3 className="text-xl font-bold mb-4">Editar Salida Grupal</h3>
                              <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-bold">Título</label><input className="w-full border p-2 rounded" value={editingGroup.title} onChange={e=>setEditingGroup({...editingGroup, title: e.target.value})} required /></div><div><label className="block text-sm font-bold">Ubicación</label><input className="w-full border p-2 rounded" value={editingGroup.location} onChange={e=>setEditingGroup({...editingGroup, location: e.target.value})} required /></div></div>
                              <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-bold">Precio</label><input type="number" className="w-full border p-2 rounded" value={editingGroup.price} onChange={e=>setEditingGroup({...editingGroup, price: parseFloat(e.target.value)})} required /></div><div><label className="block text-sm font-bold">Moneda</label><select className="w-full border p-2 rounded" value={editingGroup.baseCurrency} onChange={e=>setEditingGroup({...editingGroup, baseCurrency: e.target.value as any})}><option value="USD">USD</option><option value="ARS">ARS</option></select></div></div>
                              <div><label className="block text-sm font-bold">Descripción</label><textarea className="w-full border p-2 rounded h-32" value={editingGroup.description} onChange={e=>setEditingGroup({...editingGroup, description: e.target.value})} required /></div>
                              <div><label className="block text-sm font-bold">Fechas Salida (una por línea)</label><textarea className="w-full border p-2 rounded h-24" value={groupDatesInput} onChange={e=>setGroupDatesInput(e.target.value)} /></div>
                              <CommonImageUploader obj={editingGroup} setter={setEditingGroup} />
                              <div className="flex gap-4 items-center border-t pt-4"><label className="flex items-center gap-2"><input type="checkbox" checked={editingGroup.includesFlight} onChange={e=>setEditingGroup({...editingGroup, includesFlight: e.target.checked})} /> Incluye Vuelo</label></div>
                              <div className="flex justify-end gap-2 border-t pt-4"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 text-gray-600">Cancelar</button><button type="submit" disabled={isSaving} className="bg-cyan-600 text-white px-6 py-2 rounded font-bold hover:bg-cyan-700 disabled:opacity-50">{isSaving ? 'Guardando...' : 'Guardar Cambios'}</button></div>
                          </form>
                      )}

                      {/* HOTEL FORM */}
                      {editingHotel && (
                          <form onSubmit={handleSave} className="space-y-4">
                              <h3 className="text-xl font-bold mb-4">Editar Hotel</h3>
                              <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-bold">Título</label><input className="w-full border p-2 rounded" value={editingHotel.title} onChange={e=>setEditingHotel({...editingHotel, title: e.target.value})} required /></div><div><label className="block text-sm font-bold">Ubicación</label><input className="w-full border p-2 rounded" value={editingHotel.location} onChange={e=>setEditingHotel({...editingHotel, location: e.target.value})} required /></div></div>
                              <div className="grid grid-cols-3 gap-4"><div><label className="block text-sm font-bold">Precio Noche</label><input type="number" className="w-full border p-2 rounded" value={editingHotel.pricePerNight} onChange={e=>setEditingHotel({...editingHotel, pricePerNight: parseFloat(e.target.value)})} required /></div><div><label className="block text-sm font-bold">Estrellas</label><input type="number" min="1" max="5" className="w-full border p-2 rounded" value={editingHotel.stars} onChange={e=>setEditingHotel({...editingHotel, stars: parseInt(e.target.value)})} /></div><div><label className="block text-sm font-bold">Moneda</label><select className="w-full border p-2 rounded" value={editingHotel.baseCurrency} onChange={e=>setEditingHotel({...editingHotel, baseCurrency: e.target.value as any})}><option value="USD">USD</option><option value="ARS">ARS</option></select></div></div>
                              <div><label className="block text-sm font-bold">Descripción</label><textarea className="w-full border p-2 rounded h-32" value={editingHotel.description} onChange={e=>setEditingHotel({...editingHotel, description: e.target.value})} required /></div>
                              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded border"><div><label className="block text-sm font-bold">Latitud</label><input type="number" step="any" className="w-full border p-2 rounded" value={editingHotel.lat || ''} onChange={e=>setEditingHotel({...editingHotel, lat: parseFloat(e.target.value)})} /></div><div><label className="block text-sm font-bold">Longitud</label><input type="number" step="any" className="w-full border p-2 rounded" value={editingHotel.lng || ''} onChange={e=>setEditingHotel({...editingHotel, lng: parseFloat(e.target.value)})} /></div><div className="col-span-2"><button type="button" onClick={()=>autoGeocode(editingHotel.location, setEditingHotel, editingHotel)} disabled={isGeocoding} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50">{isGeocoding ? 'Buscando...' : 'Autodetectar Coordenadas'}</button></div></div>
                              <div><label className="block text-sm font-bold">Comodidades (una por línea)</label><textarea className="w-full border p-2 rounded h-24" value={hotelAmenitiesInput} onChange={e=>setHotelAmenitiesInput(e.target.value)} /></div>
                              <CommonImageUploader obj={editingHotel} setter={setEditingHotel} />
                              <div className="flex justify-end gap-2 border-t pt-4"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 text-gray-600">Cancelar</button><button type="submit" disabled={isSaving} className="bg-cyan-600 text-white px-6 py-2 rounded font-bold hover:bg-cyan-700 disabled:opacity-50">{isSaving ? 'Guardando...' : 'Guardar Cambios'}</button></div>
                          </form>
                      )}

                      {/* EXCURSION FORM */}
                      {editingExcursion && (
                          <form onSubmit={handleSave} className="space-y-4">
                              <h3 className="text-xl font-bold mb-4">Editar Excursión</h3>
                              <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-bold">Título</label><input className="w-full border p-2 rounded" value={editingExcursion.title} onChange={e=>setEditingExcursion({...editingExcursion, title: e.target.value})} required /></div><div><label className="block text-sm font-bold">Ubicación</label><input className="w-full border p-2 rounded" value={editingExcursion.location} onChange={e=>setEditingExcursion({...editingExcursion, location: e.target.value})} required /></div></div>
                              <div className="grid grid-cols-3 gap-4"><div><label className="block text-sm font-bold">Precio</label><input type="number" className="w-full border p-2 rounded" value={editingExcursion.price} onChange={e=>setEditingExcursion({...editingExcursion, price: parseFloat(e.target.value)})} required /></div><div><label className="block text-sm font-bold">Duración</label><input className="w-full border p-2 rounded" value={editingExcursion.duration} onChange={e=>setEditingExcursion({...editingExcursion, duration: e.target.value})} /></div><div><label className="block text-sm font-bold">Moneda</label><select className="w-full border p-2 rounded" value={editingExcursion.baseCurrency} onChange={e=>setEditingExcursion({...editingExcursion, baseCurrency: e.target.value as any})}><option value="USD">USD</option><option value="ARS">ARS</option></select></div></div>
                              <div><label className="block text-sm font-bold">Descripción</label><textarea className="w-full border p-2 rounded h-32" value={editingExcursion.description} onChange={e=>setEditingExcursion({...editingExcursion, description: e.target.value})} required /></div>
                              <div><label className="block text-sm font-bold">Días Disponibles (uno por línea)</label><textarea className="w-full border p-2 rounded h-24" value={excursionDatesInput} onChange={e=>setExcursionDatesInput(e.target.value)} /></div>
                              <CommonImageUploader obj={editingExcursion} setter={setEditingExcursion} />
                              <div className="flex justify-end gap-2 border-t pt-4"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 text-gray-600">Cancelar</button><button type="submit" disabled={isSaving} className="bg-cyan-600 text-white px-6 py-2 rounded font-bold hover:bg-cyan-700 disabled:opacity-50">{isSaving ? 'Guardando...' : 'Guardar Cambios'}</button></div>
                          </form>
                      )}

                      {/* INSTALLMENT FORM */}
                      {editingInstallment && (
                          <form onSubmit={handleSave} className="space-y-4">
                              <h3 className="text-xl font-bold mb-4">Editar Plan Cuotas</h3>
                              <div className="grid grid-cols-2 gap-4">
                                  <div><label className="block text-sm font-bold">Título</label><input className="w-full border p-2 rounded" value={editingInstallment.title} onChange={e=>setEditingInstallment({...editingInstallment, title: e.target.value})} required /></div>
                                  <div><label className="block text-sm font-bold">Ubicación</label><input className="w-full border p-2 rounded" value={editingInstallment.location} onChange={e=>setEditingInstallment({...editingInstallment, location: e.target.value})} required /></div>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                  <div><label className="block text-sm font-bold">Precio Total (por persona)</label><input type="number" className="w-full border p-2 rounded" value={editingInstallment.totalPrice} onChange={e=>setEditingInstallment({...editingInstallment, totalPrice: parseFloat(e.target.value)})} required /></div>
                                  <div><label className="block text-sm font-bold">Entrega Inicial (por persona)</label><input type="number" className="w-full border p-2 rounded" value={editingInstallment.firstPaymentAmount || 0} onChange={e=>setEditingInstallment({...editingInstallment, firstPaymentAmount: parseFloat(e.target.value)})} required /></div>
                                  <div><label className="block text-sm font-bold">Fecha Salida (YYYY-MM-DD)</label><input type="date" className="w-full border p-2 rounded" value={editingInstallment.departureDate} onChange={e=>setEditingInstallment({...editingInstallment, departureDate: e.target.value})} /></div>
                              </div>
                              <div><label className="block text-sm font-bold">Descripción</label><textarea className="w-full border p-2 rounded h-32" value={editingInstallment.description} onChange={e=>setEditingInstallment({...editingInstallment, description: e.target.value})} required /></div>
                              <CommonImageUploader obj={editingInstallment} setter={setEditingInstallment} />
                              <div className="flex justify-end gap-2 border-t pt-4"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 text-gray-600">Cancelar</button><button type="submit" disabled={isSaving} className="bg-cyan-600 text-white px-6 py-2 rounded font-bold hover:bg-cyan-700 disabled:opacity-50">{isSaving ? 'Guardando...' : 'Guardar Cambios'}</button></div>
                          </form>
                      )}

                      {/* WORLDCUP FORM */}
                      {editingWorldCup && (
                          <form onSubmit={handleSave} className="space-y-4">
                              <h3 className="text-xl font-bold mb-4">Editar Paquete Mundial</h3>
                              <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-bold">Título</label><input className="w-full border p-2 rounded" value={editingWorldCup.title} onChange={e=>setEditingWorldCup({...editingWorldCup, title: e.target.value})} required /></div><div><label className="block text-sm font-bold">Ubicación</label><input className="w-full border p-2 rounded" value={editingWorldCup.location} onChange={e=>setEditingWorldCup({...editingWorldCup, location: e.target.value})} required /></div></div>
                              <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-bold">Precio Total</label><input type="number" className="w-full border p-2 rounded" value={editingWorldCup.totalPrice} onChange={e=>setEditingWorldCup({...editingWorldCup, totalPrice: parseFloat(e.target.value)})} required /></div><div><label className="block text-sm font-bold">Origen</label><input className="w-full border p-2 rounded" value={editingWorldCup.originCountry} onChange={e=>setEditingWorldCup({...editingWorldCup, originCountry: e.target.value})} /></div></div>
                              <div><label className="block text-sm font-bold">Descripción</label><textarea className="w-full border p-2 rounded h-32" value={editingWorldCup.description} onChange={e=>setEditingWorldCup({...editingWorldCup, description: e.target.value})} required /></div>
                              <CommonImageUploader obj={editingWorldCup} setter={setEditingWorldCup} />
                              <div className="flex justify-end gap-2 border-t pt-4"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 text-gray-600">Cancelar</button><button type="submit" disabled={isSaving} className="bg-cyan-600 text-white px-6 py-2 rounded font-bold hover:bg-cyan-700 disabled:opacity-50">{isSaving ? 'Guardando...' : 'Guardar Cambios'}</button></div>
                          </form>
                      )}

                      {/* HERO SLIDE FORM */}
                      {editingSlide && (
                          <form onSubmit={handleSave} className="space-y-4">
                              <h3 className="text-xl font-bold mb-4">Editar Slide Portada</h3>
                              <div><label className="block text-sm font-bold">Título</label><input className="w-full border p-2 rounded" value={editingSlide.title} onChange={e=>setEditingSlide({...editingSlide, title: e.target.value})} required /></div>
                              <div><label className="block text-sm font-bold">Subtítulo</label><input className="w-full border p-2 rounded" value={editingSlide.subtitle} onChange={e=>setEditingSlide({...editingSlide, subtitle: e.target.value})} /></div>
                              <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-bold">Texto Botón</label><input className="w-full border p-2 rounded" value={editingSlide.ctaText} onChange={e=>setEditingSlide({...editingSlide, ctaText: e.target.value})} /></div><div><label className="block text-sm font-bold">Enlace</label><input className="w-full border p-2 rounded" value={editingSlide.ctaLink} onChange={e=>setEditingSlide({...editingSlide, ctaLink: e.target.value})} /></div></div>
                              <div><label className="block text-sm font-bold mb-1">Imagen de Fondo</label><input type="file" onChange={handleSlideImageUpload} className="mb-2" /><img src={editingSlide.image} className="h-40 w-full object-cover rounded" /></div>
                              <div className="flex justify-end gap-2 border-t pt-4"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 text-gray-600">Cancelar</button><button type="submit" disabled={isSaving} className="bg-cyan-600 text-white px-6 py-2 rounded font-bold hover:bg-cyan-700 disabled:opacity-50">{isSaving ? 'Guardando...' : 'Guardar Cambios'}</button></div>
                          </form>
                      )}

                      {/* BANNER FORM */}
                      {editingBanner && (
                          <form onSubmit={handleSave} className="space-y-4">
                              <h3 className="text-xl font-bold mb-4">Editar Banner Promo</h3>
                              <div><label className="block text-sm font-bold">Título</label><input className="w-full border p-2 rounded" value={editingBanner.title} onChange={e=>setEditingBanner({...editingBanner, title: e.target.value})} required /></div>
                              <div><label className="block text-sm font-bold">Subtítulo</label><input className="w-full border p-2 rounded" value={editingBanner.subtitle} onChange={e=>setEditingBanner({...editingBanner, subtitle: e.target.value})} /></div>
                              <div><label className="block text-sm font-bold">Badge (Etiqueta)</label><input className="w-full border p-2 rounded" value={editingBanner.badge} onChange={e=>setEditingBanner({...editingBanner, badge: e.target.value})} /></div>
                              <div><label className="block text-sm font-bold mb-1">Imagen</label><input type="file" onChange={handleBannerImageUpload} className="mb-2" /><img src={editingBanner.image} className="h-40 w-full object-cover rounded" /></div>
                              <div className="flex justify-end gap-2 border-t pt-4"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 text-gray-600">Cancelar</button><button type="submit" disabled={isSaving} className="bg-cyan-600 text-white px-6 py-2 rounded font-bold hover:bg-cyan-700 disabled:opacity-50">{isSaving ? 'Guardando...' : 'Guardar Cambios'}</button></div>
                          </form>
                      )}
                      
                  </div>
              </div>
          )}
      </div>
    </div>
  );
};

export default Admin;
