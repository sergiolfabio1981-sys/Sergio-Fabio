import React, { useState, useEffect } from 'react';
import { Trip, Apartment } from '../types';
import { getTrips, saveTrip, deleteTrip, createEmptyTrip } from '../services/tripService';
import { getRentals, saveRental, deleteRental, createEmptyRental } from '../services/rentalService';
import { ADMIN_EMAIL, ADMIN_PASS } from '../constants';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'trips' | 'rentals'>('trips');

  // Trip State
  const [trips, setTrips] = useState<Trip[]>([]);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [tripDatesInput, setTripDatesInput] = useState('');

  // Rental State
  const [rentals, setRentals] = useState<Apartment[]>([]);
  const [editingRental, setEditingRental] = useState<Apartment | null>(null);
  const [rentalAmenitiesInput, setRentalAmenitiesInput] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setTrips(getTrips());
      setRentals(getRentals());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setIsAuthenticated(true);
    } else {
      alert('Credenciales inválidas');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isRental: boolean) => {
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

    if (isRental && editingRental) {
        setEditingRental(prev => prev ? { ...prev, images: [...prev.images, ...newImages] } : null);
    } else if (!isRental && editingTrip) {
        setEditingTrip(prev => prev ? { ...prev, images: [...prev.images, ...newImages] } : null);
    }
  };

  /* --- Trip Handlers --- */
  const openEditTrip = (trip: Trip) => {
      setEditingTrip({ ...trip });
      setTripDatesInput(trip.availableDates.join('\n'));
      setEditingRental(null);
      setIsModalOpen(true);
  };
  const openCreateTrip = () => {
      setEditingTrip(createEmptyTrip());
      setTripDatesInput('');
      setEditingRental(null);
      setIsModalOpen(true);
  };
  const saveCurrentTrip = (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingTrip) return;
      const processedDates = tripDatesInput.split('\n').map(s => s.trim()).filter(s => s.length > 0);
      const toSave = { ...editingTrip, availableDates: processedDates };
      saveTrip(toSave);
      setTrips(getTrips());
      setIsModalOpen(false);
  };
  const deleteCurrentTrip = (id: string) => {
      if(window.confirm("¿Eliminar viaje?")) { deleteTrip(id); setTrips(getTrips()); }
  };

  /* --- Rental Handlers --- */
  const openEditRental = (rental: Apartment) => {
      setEditingRental({ ...rental });
      setRentalAmenitiesInput(rental.amenities.join('\n'));
      setEditingTrip(null);
      setIsModalOpen(true);
  };
  const openCreateRental = () => {
      setEditingRental(createEmptyRental());
      setRentalAmenitiesInput('');
      setEditingTrip(null);
      setIsModalOpen(true);
  };
  const saveCurrentRental = (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingRental) return;
      const processedAmenities = rentalAmenitiesInput.split('\n').map(s => s.trim()).filter(s => s.length > 0);
      const toSave = { ...editingRental, amenities: processedAmenities };
      saveRental(toSave);
      setRentals(getRentals());
      setIsModalOpen(false);
  };
  const deleteCurrentRental = (id: string) => {
      if(window.confirm("¿Eliminar departamento?")) { deleteRental(id); setRentals(getRentals()); }
  };

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
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
            <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm">
                <button onClick={() => setActiveTab('trips')} className={`px-4 py-2 rounded-md ${activeTab === 'trips' ? 'bg-cyan-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Viajes</button>
                <button onClick={() => setActiveTab('rentals')} className={`px-4 py-2 rounded-md ${activeTab === 'rentals' ? 'bg-cyan-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Alquileres</button>
            </div>
        </div>

        {activeTab === 'trips' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Gestionar Destinos</h2>
                    <button onClick={openCreateTrip} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">+ Nuevo Destino</button>
                </div>
                <table className="min-w-full">
                    <thead><tr className="text-left text-gray-500 border-b"><th>Título</th><th>Precio</th><th>Acciones</th></tr></thead>
                    <tbody>
                        {trips.map(t => (
                            <tr key={t.id} className="border-b">
                                <td className="py-3">{t.title}</td>
                                <td>${t.price}</td>
                                <td>
                                    <button onClick={() => openEditTrip(t)} className="text-blue-600 mr-2">Editar</button>
                                    <button onClick={() => deleteCurrentTrip(t.id)} className="text-red-600">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}

        {activeTab === 'rentals' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Gestionar Alquileres</h2>
                    <button onClick={openCreateRental} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">+ Nuevo Dpto</button>
                </div>
                <table className="min-w-full">
                    <thead><tr className="text-left text-gray-500 border-b"><th>Título</th><th>Precio/Noche</th><th>Hab.</th><th>Acciones</th></tr></thead>
                    <tbody>
                        {rentals.map(r => (
                            <tr key={r.id} className="border-b">
                                <td className="py-3">{r.title}</td>
                                <td>${r.pricePerNight}</td>
                                <td>{r.bedrooms}</td>
                                <td>
                                    <button onClick={() => openEditRental(r)} className="text-blue-600 mr-2">Editar</button>
                                    <button onClick={() => deleteCurrentRental(r.id)} className="text-red-600">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
      </div>

      {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
                  
                  {/* --- TRIP FORM --- */}
                  {editingTrip && (
                      <form onSubmit={saveCurrentTrip} className="space-y-4">
                          <h2 className="text-xl font-bold mb-4">{editingTrip.id ? 'Editar Viaje' : 'Nuevo Viaje'}</h2>
                          <input className="w-full border p-2 rounded" placeholder="Título" value={editingTrip.title} onChange={e=>setEditingTrip({...editingTrip, title: e.target.value})} required />
                          <input className="w-full border p-2 rounded" placeholder="Ubicación" value={editingTrip.location} onChange={e=>setEditingTrip({...editingTrip, location: e.target.value})} required />
                          <textarea className="w-full border p-2 rounded" placeholder="Descripción" value={editingTrip.description} onChange={e=>setEditingTrip({...editingTrip, description: e.target.value})} required />
                          <div className="grid grid-cols-2 gap-4">
                              <input type="number" className="border p-2 rounded" placeholder="Precio Total" value={editingTrip.price} onChange={e=>setEditingTrip({...editingTrip, price: Number(e.target.value)})} required />
                              <label className="flex items-center"><input type="checkbox" checked={editingTrip.isOffer} onChange={e=>setEditingTrip({...editingTrip, isOffer: e.target.checked})} className="mr-2" /> Es Oferta</label>
                          </div>
                          <div>
                              <label className="block text-sm font-bold mb-1">Imágenes</label>
                              <div className="flex gap-2 mb-2">{editingTrip.images.map((img,i)=><img key={i} src={img} className="w-16 h-16 object-cover rounded" />)}</div>
                              <input type="file" multiple onChange={(e)=>handleFileUpload(e, false)} />
                          </div>
                          <textarea className="w-full border p-2 rounded" rows={5} placeholder="Fechas disponibles (una por línea)" value={tripDatesInput} onChange={e=>setTripDatesInput(e.target.value)} />
                          <div className="flex justify-end gap-2">
                              <button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancelar</button>
                              <button type="submit" className="px-4 py-2 bg-cyan-600 text-white rounded">Guardar</button>
                          </div>
                      </form>
                  )}

                  {/* --- RENTAL FORM --- */}
                  {editingRental && (
                      <form onSubmit={saveCurrentRental} className="space-y-4">
                          <h2 className="text-xl font-bold mb-4">{editingRental.id ? 'Editar Alquiler' : 'Nuevo Alquiler'}</h2>
                          <input className="w-full border p-2 rounded" placeholder="Título Propiedad" value={editingRental.title} onChange={e=>setEditingRental({...editingRental, title: e.target.value})} required />
                          <input className="w-full border p-2 rounded" placeholder="Ubicación" value={editingRental.location} onChange={e=>setEditingRental({...editingRental, location: e.target.value})} required />
                          <textarea className="w-full border p-2 rounded" placeholder="Descripción" value={editingRental.description} onChange={e=>setEditingRental({...editingRental, description: e.target.value})} required />
                          <div className="grid grid-cols-3 gap-4">
                              <input type="number" className="border p-2 rounded" placeholder="Precio x Noche" value={editingRental.pricePerNight} onChange={e=>setEditingRental({...editingRental, pricePerNight: Number(e.target.value)})} required />
                              <input type="number" className="border p-2 rounded" placeholder="Habitaciones" value={editingRental.bedrooms} onChange={e=>setEditingRental({...editingRental, bedrooms: Number(e.target.value)})} required />
                              <input type="number" className="border p-2 rounded" placeholder="Max Huéspedes" value={editingRental.maxGuests} onChange={e=>setEditingRental({...editingRental, maxGuests: Number(e.target.value)})} required />
                          </div>
                          <div>
                              <label className="block text-sm font-bold mb-1">Imágenes</label>
                              <div className="flex gap-2 mb-2">{editingRental.images.map((img,i)=><img key={i} src={img} className="w-16 h-16 object-cover rounded" />)}</div>
                              <input type="file" multiple onChange={(e)=>handleFileUpload(e, true)} />
                          </div>
                          <textarea className="w-full border p-2 rounded" rows={5} placeholder="Comodidades (Wifi, Pileta... una por línea)" value={rentalAmenitiesInput} onChange={e=>setRentalAmenitiesInput(e.target.value)} />
                          <div className="flex justify-end gap-2">
                              <button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancelar</button>
                              <button type="submit" className="px-4 py-2 bg-cyan-600 text-white rounded">Guardar</button>
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