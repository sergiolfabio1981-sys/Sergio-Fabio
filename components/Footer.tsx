import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
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
  );
};

export default Footer;