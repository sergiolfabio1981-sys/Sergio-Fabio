import React, { useState, useEffect } from 'react';
import { Trip, ItineraryDay } from '../types';
import { getTrips, saveTrip, deleteTrip, createEmptyTrip } from '../services/tripService';
import { ADMIN_EMAIL, ADMIN_PASS } from '../constants';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [trips, setTrips] = useState<Trip[]>([]);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setTrips(getTrips());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Credenciales inválidas.');
    }
  };

  const handleEdit = (trip: Trip) => {
    setEditingTrip({ ...trip });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingTrip(createEmptyTrip());
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este destino?')) {
      deleteTrip(id);
      setTrips(getTrips());
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTrip) {
      saveTrip(editingTrip);
      setTrips(getTrips());
      setIsModalOpen(false);
      setEditingTrip(null);
    }
  };

  const updateItinerary = (index: number, field: keyof ItineraryDay, value: string | number) => {
    if (!editingTrip) return;
    const newItinerary = [...editingTrip.itinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setEditingTrip({ ...editingTrip, itinerary: newItinerary });
  };

  const addItineraryDay = () => {
    if (!editingTrip) return;
    const nextDay = editingTrip.itinerary.length + 1;
    setEditingTrip({
      ...editingTrip,
      itinerary: [...editingTrip.itinerary, { day: nextDay, activity: '' }]
    });
  };

  const removeItineraryDay = (index: number) => {
    if (!editingTrip) return;
    const newItinerary = editingTrip.itinerary.filter((_, i) => i !== index);
    // Re-index days
    const reIndexed = newItinerary.map((item, i) => ({ ...item, day: i + 1 }));
    setEditingTrip({ ...editingTrip, itinerary: reIndexed });
  };

  const handleImageChange = (value: string) => {
      if (!editingTrip) return;
      // Split by new lines and filter empty strings
      const images = value.split('\n').map(s => s.trim()).filter(s => s.length > 0);
      setEditingTrip({ ...editingTrip, images });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Acceso Administrativo</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 border p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 border p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button className="w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700 transition-colors">
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
          <button 
            onClick={handleCreate}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Agregar Destino
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Oferta</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trips.map((trip) => (
                <tr key={trip.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trip.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trip.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${trip.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trip.isOffer ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                            Sí
                        </span>
                    ) : 'No'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEdit(trip)} className="text-cyan-600 hover:text-cyan-900 mr-4">Editar</button>
                    <button onClick={() => handleDelete(trip.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && editingTrip && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-gray-800">{editingTrip.id && trips.find(t => t.id === editingTrip.id) ? 'Editar Destino' : 'Nuevo Destino'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Título</label>
                  <input type="text" required className="mt-1 block w-full border p-2 rounded-md" value={editingTrip.title} onChange={e => setEditingTrip({...editingTrip, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                  <input type="text" required className="mt-1 block w-full border p-2 rounded-md" value={editingTrip.location} onChange={e => setEditingTrip({...editingTrip, location: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Precio</label>
                  <input type="number" required className="mt-1 block w-full border p-2 rounded-md" value={editingTrip.price} onChange={e => setEditingTrip({...editingTrip, price: Number(e.target.value)})} />
                </div>
                
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">URLs de Imágenes (una por línea)</label>
                    <textarea 
                        required 
                        rows={4} 
                        className="mt-1 block w-full border p-2 rounded-md font-mono text-xs" 
                        value={editingTrip.images.join('\n')} 
                        onChange={e => handleImageChange(e.target.value)} 
                        placeholder="https://ejemplo.com/imagen1.jpg&#10;https://ejemplo.com/imagen2.jpg"
                    />
                    <p className="text-xs text-gray-500 mt-1">Ingresa múltiples enlaces de imágenes para el carrusel.</p>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Descripción</label>
                  <textarea required rows={3} className="mt-1 block w-full border p-2 rounded-md" value={editingTrip.description} onChange={e => setEditingTrip({...editingTrip, description: e.target.value})} />
                </div>
                
                <div className="col-span-2 flex items-center gap-4 border p-4 rounded-lg bg-gray-50">
                   <label className="flex items-center gap-2 cursor-pointer">
                     <input 
                       type="checkbox" 
                       checked={editingTrip.isOffer} 
                       onChange={e => setEditingTrip({...editingTrip, isOffer: e.target.checked})} 
                       className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                     />
                     <span className="font-medium text-gray-700">¿Es Oferta Destacada?</span>
                   </label>
                   
                   {editingTrip.isOffer && (
                     <div className="flex-1">
                       <label className="block text-sm font-medium text-gray-700">Expira el:</label>
                       <input 
                        type="datetime-local" 
                        className="mt-1 block w-full border p-2 rounded-md"
                        value={editingTrip.offerExpiresAt ? editingTrip.offerExpiresAt.slice(0, 16) : ''}
                        onChange={e => setEditingTrip({...editingTrip, offerExpiresAt: new Date(e.target.value).toISOString()})}
                       />
                     </div>
                   )}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Itinerario</h3>
                {editingTrip.itinerary.map((item, idx) => (
                  <div key={idx} className="flex gap-4 mb-4 items-start">
                    <div className="w-20 pt-2 font-bold text-gray-600">Día {item.day}</div>
                    <div className="flex-grow">
                      <input 
                        type="text" 
                        className="w-full border p-2 rounded-md" 
                        placeholder="Actividad"
                        value={item.activity}
                        onChange={e => updateItinerary(idx, 'activity', e.target.value)}
                      />
                    </div>
                    <button type="button" onClick={() => removeItineraryDay(idx)} className="text-red-500 hover:text-red-700 p-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addItineraryDay} className="mt-2 text-cyan-600 hover:underline text-sm flex items-center gap-1">
                  + Agregar Día
                </button>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;