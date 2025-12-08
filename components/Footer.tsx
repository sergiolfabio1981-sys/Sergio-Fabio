
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getTermsAndConditions } from '../services/settingsService';

const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termsContent, setTermsContent] = useState('');
  const [loadingTerms, setLoadingTerms] = useState(false);

  const openTerms = async (e: React.MouseEvent) => {
      e.preventDefault();
      setIsModalOpen(true);
      setLoadingTerms(true);
      try {
          const text = await getTermsAndConditions();
          setTermsContent(text);
      } catch (err) {
          setTermsContent("Error al cargar los términos.");
      } finally {
          setLoadingTerms(false);
      }
  };

  return (
    <>
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div>
            <h3 className="text-2xl font-bold text-cyan-500 mb-4">ABRAS <span className="text-orange-500">Travel</span></h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Expertos en hacer realidad tus sueños tropicales. 
              Especialistas en Brasil y destinos de playa.
            </p>
            <div className="flex gap-4">
                {/* Social Icons Placeholder */}
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-cyan-600 hover:text-white transition cursor-pointer">IG</div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition cursor-pointer">FB</div>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gray-200 border-b border-gray-700 pb-2 inline-block">Enlaces Rápidos</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-cyan-400 transition flex items-center gap-2"><span>›</span> Inicio</Link></li>
              <li><Link to="/trips" className="hover:text-cyan-400 transition flex items-center gap-2"><span>›</span> Paquetes</Link></li>
              <li><Link to="/accommodations" className="hover:text-cyan-400 transition flex items-center gap-2"><span>›</span> Alojamientos</Link></li>
              <li><a href="#" onClick={openTerms} className="hover:text-cyan-400 transition flex items-center gap-2"><span>›</span> Bases y Condiciones</a></li>
              <li><Link to="/admin" className="hover:text-cyan-400 transition flex items-center gap-2"><span>›</span> Administración</Link></li>
            </ul>
          </div>

          {/* Contact & Addresses Column */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gray-200 border-b border-gray-700 pb-2 inline-block">Contacto y Oficinas</h4>
            <div className="space-y-6 text-sm text-gray-400">
                
                {/* Contact Data */}
                <div className="space-y-2">
                    <p className="flex items-center gap-3"><span className="text-xl">📞</span> +54 9 11 4063 2644</p>
                    <p className="flex items-center gap-3"><span className="text-xl">✉️</span> info@abrastravel.com</p>
                </div>

                {/* Argentina Address */}
                <div>
                    <p className="text-cyan-400 font-bold mb-1 flex items-center gap-2">🇦🇷 Oficina Argentina</p>
                    <p>Virrey del Pino 2166</p>
                    <p>C1426 Cdad. Autónoma de Buenos Aires</p>
                </div>

                {/* Brazil Address */}
                <div>
                    <p className="text-green-400 font-bold mb-1 flex items-center gap-2">🇧🇷 Oficina Brasil</p>
                    <p>R. Felipe Schmidt, 835 - Centro</p>
                    <p>Florianópolis - SC, 88010-001, Brasil</p>
                </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ABRAS Travel. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>

    {isModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[80vh]">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-2xl">
                    <h3 className="font-bold text-lg text-gray-800">Bases y Condiciones</h3>
                    <button onClick={()=>setIsModalOpen(false)} className="text-gray-500 hover:text-red-500 text-2xl leading-none">&times;</button>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                    {loadingTerms ? (
                        <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-600"></div></div>
                    ) : (
                        <p className="whitespace-pre-wrap text-sm text-gray-600 leading-relaxed font-sans">{termsContent}</p>
                    )}
                </div>
                <div className="p-4 border-t bg-gray-50 rounded-b-2xl text-right">
                    <button onClick={()=>setIsModalOpen(false)} className="px-6 py-2 bg-cyan-600 text-white rounded-lg font-bold hover:bg-cyan-700">Cerrar</button>
                </div>
            </div>
        </div>
    )}
    </>
  );
};

export default Footer;
