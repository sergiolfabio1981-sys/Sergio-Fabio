import React, { useState, useEffect } from 'react';
import { Trip } from '../types';
import { getTrips, saveTrip, deleteTrip, createEmptyTrip } from '../services/tripService';
import { ADMIN_EMAIL, ADMIN_PASS } from '../constants';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [trips, setTrips] = useState<Trip[]>([]);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Local state for handling the textarea raw input to prevent cursor jumping/trimming issues
  const [datesInput, setDatesInput] = useState('');

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
    setDatesInput(trip.availableDates.join('\n'));
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    const newTrip = createEmptyTrip();
    setEditingTrip(newTrip);
    setDatesInput('');
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
      // Process dates from the raw input
      const processedDates = datesInput.split('\n').map(s => s.trim()).filter(s => s.length > 0);
      
      const tripToSave = {
        ...editingTrip,
        availableDates: processedDates
      };

      saveTrip(tripToSave);
      setTrips(getTrips());
      setIsModalOpen(false);
      setEditingTrip(null);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingTrip || !e.target.files) return;
    
    const files = Array.from(e.target.files);
    const newImages: string[] = [];

    for (const file of files) {
      const reader = new FileReader();
      const result = await new Promise<string>((resolve) => {
        reader.onload = (event) => {
          resolve(event.target?.result as string);
        };
        // Fix: Cast file to Blob to resolve "Argument of type 'unknown' is not assignable to parameter of type 'Blob'" error
        reader.readAsDataURL(file as Blob);
      });
      newImages.push(result);
    }

    setEditingTrip(prev => prev ? {
      ...prev,
      images: [...prev.images, ...newImages]
    } : null);
  };

  const removeImage = (indexToRemove: number) => {
    if (!editingTrip) return;
    setEditingTrip({
      ...editingTrip,
      images: editingTrip.images.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleUrlInput = (value: string) => {
      // Allow adding image by URL manually if needed
      if (!editingTrip) return;
      // This is a bit tricky with the file upload mix, so we just append if it looks like a URL
      if (value) {
           setEditingTrip({ ...editingTrip, images: [...editingTrip.images, value] });
      }
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
              <div className="relative mt-1">
                <input
                    type={showPassword ? "text" : "password"}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 border p-2 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                    {showPassword ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                    ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    )}
                </button>
              </div>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio (ARS)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Oferta</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trips.map((trip) => (
                <tr key={trip.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trip.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trip.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(trip.price)}
                  </td>
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
                  <label className="block text-sm font-medium text-gray-700">Precio (Pesos Argentinos)</label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input 
                        type="number" 
                        required 
                        className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-cyan-500 focus:ring-cyan-500 border p-2" 
                        placeholder="0.00"
                        value={editingTrip.price} 
                        onChange={e => setEditingTrip({...editingTrip, price: Number(e.target.value)})} 
                    />
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm">ARS</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Imágenes del Destino</label>
                    
                    {/* Image Preview List */}
                    {editingTrip.images.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {editingTrip.images.map((img, idx) => (
                                <div key={idx} className="relative w-20 h-20 group border rounded-lg overflow-hidden">
                                    <img src={img} alt="preview" className="w-full h-full object-cover" />
                                    <button 
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* File Upload Input */}
                    <div className="flex items-center gap-4">
                        <label className="cursor-pointer bg-cyan-50 hover:bg-cyan-100 text-cyan-700 px-4 py-2 rounded-lg border border-cyan-200 flex items-center transition-colors">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            Subir desde PC
                            <input 
                                type="file" 
                                multiple 
                                accept="image/*" 
                                className="hidden" 
                                onChange={handleFileUpload}
                            />
                        </label>
                        <span className="text-xs text-gray-400">O puedes pegar URL abajo</span>
                    </div>
                    
                    <input 
                        type="text"
                        className="mt-2 block w-full border p-2 rounded-md text-xs" 
                        placeholder="O pega URL de imagen y presiona enter..."
                        onKeyDown={(e) => {
                             if (e.key === 'Enter') {
                                 e.preventDefault();
                                 handleUrlInput(e.currentTarget.value);
                                 e.currentTarget.value = '';
                             }
                        }}
                    />
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
                <h3 className="text-lg font-bold text-gray-800 mb-2">Fechas de Salida Disponibles</h3>
                <p className="text-xs text-gray-500 mb-2">Ingresa cada fecha disponible en una línea nueva. (Presiona Enter para nueva línea)</p>
                <textarea
                    rows={6}
                    className="w-full border p-2 rounded-md font-sans"
                    placeholder="Ej: 02 de Enero, 2026&#10;15 de Enero, 2026"
                    value={datesInput}
                    onChange={e => setDatesInput(e.target.value)}
                />
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