
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
          <div>
            <h3 className="text-2xl font-bold text-cyan-500 mb-4">ABRAS <span className="text-orange-500">Travel</span></h3>
            <p className="text-gray-400 text-sm">
              Expertos en hacer realidad tus sueños tropicales. 
              Especialistas en Brasil y destinos de playa.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-gray-200">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-cyan-400 transition">Inicio</Link></li>
              <li><a href="#" onClick={openTerms} className="hover:text-cyan-400 transition">Bases y Condiciones</a></li>
              <li><Link to="/admin" className="hover:text-cyan-400 transition">Administración</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-gray-200">Contacto</h4>
            <p className="text-gray-400 text-sm mb-2">📞 +54 9 11 4063 2644</p>
            <p className="text-gray-400 text-sm">✉️ info@abrastravel.com</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} ABRAS Travel. Todos los derechos reservados.
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
