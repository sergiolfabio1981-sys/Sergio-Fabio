
import React, { useState } from 'react';

interface PassengerData {
  firstName: string;
  lastName: string;
  dni: string;
  age: string;
  address: string;
  city: string;
  province: string;
  country: string;
  email: string;
  phone: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  priceInfo: string; // e.g. "USD 1200 total"
  onConfirmWhatsApp: (data: PassengerData) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, title, priceInfo, onConfirmWhatsApp }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedMethod, setSelectedMethod] = useState<'whatsapp' | 'transfer' | 'mercadopago' | 'western'>('whatsapp');
  const [formData, setFormData] = useState<PassengerData>({
    firstName: '', lastName: '', dni: '', age: '',
    address: '', city: '', province: '', country: '',
    email: '', phone: ''
  });

  // Calculator State for Mercado Pago
  const [calcUsd, setCalcUsd] = useState<number>(0);
  const EXCHANGE_RATE = 1410; // Fixed rate as requested

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalAction = () => {
      if (selectedMethod === 'mercadopago') {
          window.open("http://link.mercadopago.com.ar/lumat2", "_blank");
      } else {
          // Both Transfer, WU and WhatsApp use the same base callback to WA
          onConfirmWhatsApp(formData);
      }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-cyan-700 p-4 rounded-t-2xl flex justify-between items-center text-white shrink-0">
          <div>
            <h3 className="font-bold text-lg">Reservar: {title}</h3>
            <p className="text-cyan-100 text-sm font-bold">{priceInfo}</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white text-2xl">&times;</button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {step === 1 ? (
            <form id="passenger-form" onSubmit={handleNext} className="space-y-4">
              <h4 className="text-gray-800 font-bold text-lg border-b pb-2 mb-4">Datos del Pasajero Principal</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombres</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Apellido</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">DNI / Pasaporte</label>
                  <input required name="dni" value={formData.dni} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Edad</label>
                  <input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Dirección</label>
                <input required name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 outline-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Localidad</label>
                  <input required name="city" value={formData.city} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Provincia</label>
                  <input required name="province" value={formData.province} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">País</label>
                  <input required name="country" value={formData.country} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Correo Electrónico</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Teléfono / WhatsApp</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <h4 className="text-gray-800 font-bold text-lg text-center mb-4">Seleccione Método de Pago</h4>
              
              {/* Opción 1: Transferencia USD */}
              <div 
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedMethod === 'transfer' ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-gray-100 bg-white hover:border-blue-300'}`}
                onClick={() => setSelectedMethod('transfer')}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-blue-600 text-white p-2 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-blue-900">Transferencia Bancaria (USD)</h5>
                    <p className="text-xs text-blue-700">Abonar en dólares estadounidenses.</p>
                  </div>
                </div>
                
                {selectedMethod === 'transfer' && (
                    <div className="bg-white p-4 rounded-lg border border-blue-200 text-sm space-y-1 font-mono text-gray-700 animate-fade-in">
                        <p><strong>Banco:</strong> Galicia</p>
                        <p><strong>DU:</strong> 28922777</p>
                        <p><strong>CTA:</strong> 4005568-9 707-0</p>
                        <p><strong>CBU:</strong> 0070707931004005568901</p>
                        <p><strong>CUIL:</strong> 20289227777</p>
                        <p><strong>ALIAS:</strong> ABRAS.TRAVEL</p>
                    </div>
                )}
              </div>

              {/* Opción 2: Mercado Pago (Pesos) */}
              <div 
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedMethod === 'mercadopago' ? 'border-sky-500 bg-sky-50 shadow-md' : 'border-gray-100 bg-white hover:border-sky-200'}`}
                onClick={() => setSelectedMethod('mercadopago')}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-sky-500 text-white p-2 rounded-lg">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06zM6.5 13h3a.5.5 0 010 1h-3a.5.5 0 010-1z" /></svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-sky-900">Pagar en Pesos Argentinos (ARS)</h5>
                    <p className="text-xs text-sky-700">Link directo de Mercado Pago.</p>
                  </div>
                </div>

                {selectedMethod === 'mercadopago' && (
                    <div className="mt-4 bg-white p-4 rounded-lg border border-sky-100 animate-fade-in">
                        <p className="text-xs font-bold text-gray-500 uppercase mb-2 text-center">Convertidor a ARS (Tasa Fija: $1.410)</p>
                        <div className="flex items-center gap-2 mb-2">
                            <input 
                                type="number" 
                                placeholder="Monto USD" 
                                className="w-full border p-2 rounded text-center font-bold" 
                                value={calcUsd || ''}
                                onChange={(e) => setCalcUsd(parseFloat(e.target.value))}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <span className="text-gray-400 font-bold">=</span>
                            <div className="w-full bg-sky-100 p-2 rounded text-center font-bold text-sky-700 border border-sky-200">
                                $ {(calcUsd * EXCHANGE_RATE).toLocaleString('es-AR')}
                            </div>
                        </div>
                    </div>
                )}
              </div>

              {/* Opción 3: Western Union */}
              <div 
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedMethod === 'western' ? 'border-yellow-500 bg-yellow-50 shadow-md' : 'border-gray-100 bg-white hover:border-yellow-300'}`}
                onClick={() => setSelectedMethod('western')}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-yellow-500 text-white p-2 rounded-lg">
                    <span className="font-black text-xs">WU</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-yellow-900">Western Union (Efectivo)</h5>
                    <p className="text-xs text-yellow-700">Para pagos desde fuera de Argentina.</p>
                  </div>
                </div>
                
                {selectedMethod === 'western' && (
                    <div className="bg-white p-4 rounded-lg border border-yellow-200 text-sm space-y-1 font-mono text-gray-700 animate-fade-in">
                        <p><strong>Destinatario:</strong> ABRAS TRAVEL</p>
                        <p><strong>Nombre:</strong> SERGIO LEONARDO FABIO</p>
                        <p><strong>DNI:</strong> 28922777</p>
                        <p><strong>CUIT/CUIL:</strong> 20289227777</p>
                    </div>
                )}
              </div>

              {/* Opción 4: WhatsApp */}
              <div 
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedMethod === 'whatsapp' ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-100 bg-white hover:border-green-300'}`}
                onClick={() => setSelectedMethod('whatsapp')}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-green-500 text-white p-2 rounded-lg">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-green-900">Coordinar Otros Métodos</h5>
                    <p className="text-xs text-green-700">Consultar por efectivo o planes personalizados.</p>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t flex justify-between shrink-0 rounded-b-2xl">
          {step === 2 && (
            <button onClick={() => setStep(1)} className="text-gray-500 font-bold hover:text-gray-700 flex items-center gap-1">
              &larr; Volver
            </button>
          )}
          {step === 1 && (
            <button type="button" onClick={onClose} className="text-gray-500 font-bold hover:text-gray-700 mr-auto">
              Cancelar
            </button>
          )}
          
          <button 
              form={step === 1 ? "passenger-form" : ""}
              onClick={step === 2 ? handleFinalAction : undefined}
              type={step === 1 ? "submit" : "button"}
              className={`px-8 py-3 rounded-xl font-bold shadow-lg transition-all transform active:scale-95 ml-auto ${
                  step === 1 ? 'bg-cyan-600 text-white hover:bg-cyan-700' : 
                  selectedMethod === 'mercadopago' ? 'bg-sky-500 text-white hover:bg-sky-600' :
                  selectedMethod === 'transfer' ? 'bg-blue-600 text-white hover:bg-blue-700' :
                  selectedMethod === 'western' ? 'bg-yellow-500 text-white hover:bg-yellow-600' :
                  'bg-green-600 text-white hover:bg-green-700'
              }`}
          >
            {step === 1 ? 'Continuar a Pagos →' : 
             selectedMethod === 'mercadopago' ? 'Ir a Mercado Pago' :
             selectedMethod === 'transfer' ? 'Confirmar Transferencia' :
             selectedMethod === 'western' ? 'Confirmar Pago Efectivo' :
             'Enviar a WhatsApp'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookingModal;
