
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Dropdown states
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();

  const navLinks = [
    { 
      name: t('nav.home'), 
      path: '/', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      name: t('nav.trips'), 
      path: '/trips',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      name: t('nav.rentals'), 
      path: '/rentals',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11.5 14.5a9.999 9.999 0 00-6.755 3.745l-.708.707 1.414 1.414.707-.707a8.001 8.001 0 0111.314 0l.707-.707 1.414 1.414-.707.707a9.999 9.999 0 00-3.745 6.755 6 6 0 015.743-7.743 2 2 0 012 2v2a2 2 0 01-2 2H15a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    { 
      name: t('nav.hotels'), 
      path: '/hotels',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      name: t('nav.excursions'), 
      path: '/excursions',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    { 
      name: 'ABRAS Cuotas', 
      path: '/installments',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    { 
      name: 'Mundial 2026', 
      path: '/worldcup',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      name: 'Usuario', 
      path: '/admin',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  const languages = [
    { code: 'es', label: 'Español', flag: '🇦🇷' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' }
  ];

  const currencies = [
    { code: 'USD', label: 'Dólar', symbol: 'US$', flag: '🇺🇸' },
    { code: 'ARS', label: 'Argentina', symbol: '$', flag: '🇦🇷' },
    { code: 'BRL', label: 'Brasil', symbol: 'R$', flag: '🇧🇷' },
    { code: 'UYU', label: 'Uruguay', symbol: '$', flag: '🇺🇾' },
    { code: 'CLP', label: 'Chile', symbol: '$', flag: '🇨🇱' },
    { code: 'COP', label: 'Colombia', symbol: '$', flag: '🇨🇴' },
    { code: 'MXN', label: 'México', symbol: '$', flag: '🇲🇽' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const currentLang = languages.find(l => l.code === language) || languages[0];
  const currentCurr = currencies.find(c => c.code === currency) || currencies[0];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        
        {/* Top Section: Logo (Center) + Config (Right) */}
        <div className="flex flex-col md:flex-row justify-center items-center py-2 relative">
          
          {/* Mobile Menu Button (Absolute Left on small screens) */}
          <div className="absolute left-0 top-4 md:hidden z-20">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-orange-500 focus:outline-none p-2"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Logo (Always Centered) */}
          <div className="z-10 mb-2 md:mb-0">
            <Link to="/" className="flex flex-col items-center group">
              <div className="flex items-center gap-2 mb-1">
                 <svg className="w-10 h-10 text-orange-500 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="font-bold text-3xl tracking-tighter text-cyan-700 whitespace-nowrap">
                  ABRAS <span className="text-orange-500">Travel</span>
                </span>
              </div>
              <div className="h-1 w-16 bg-gradient-to-r from-orange-400 to-cyan-400 rounded-full"></div>
            </Link>
          </div>

          {/* Config: Language & Currency (Absolute Right on Desktop) */}
          <div className="hidden md:flex items-center gap-4 absolute right-0 top-1/2 -translate-y-1/2">
             
             {/* Currency Dropdown */}
             <div className="relative">
                <button 
                  onClick={() => { setCurrencyDropdownOpen(!currencyDropdownOpen); setLanguageDropdownOpen(false); }}
                  className="flex items-center gap-1 text-sm font-bold text-gray-600 hover:text-cyan-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 hover:border-cyan-200 transition-all min-w-[80px]"
                >
                  <span className="text-xs text-gray-400 font-normal uppercase mr-1">Moneda:</span> 
                  <span className="mr-1">{(currentCurr as any).flag}</span>
                  {currentCurr.code} 
                  <svg className={`w-3 h-3 ml-1 transition-transform ${currencyDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                
                {currencyDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in max-h-80 overflow-y-auto z-50">
                    {currencies.map(c => (
                      <button 
                        key={c.code}
                        onClick={() => { setCurrency(c.code as any); setCurrencyDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-cyan-50 transition-colors ${currency === c.code ? 'text-cyan-700 font-bold bg-cyan-50' : 'text-gray-600'}`}
                      >
                        <div className="flex items-center">
                            <span className="mr-2 text-lg">{(c as any).flag}</span>
                            <span>{c.label}</span>
                        </div>
                        <span className="text-xs text-gray-400 font-mono">{c.code}</span>
                      </button>
                    ))}
                  </div>
                )}
             </div>

             {/* Language Dropdown */}
             <div className="relative">
                <button 
                  onClick={() => { setLanguageDropdownOpen(!languageDropdownOpen); setCurrencyDropdownOpen(false); }}
                  className="flex items-center gap-1 text-sm font-bold text-gray-600 hover:text-cyan-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 hover:border-cyan-200 transition-all"
                >
                   <span className="text-xs text-gray-400 font-normal uppercase mr-1">Idioma:</span> 
                   {currentLang.flag}
                   <svg className={`w-3 h-3 ml-1 transition-transform ${languageDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>

                {languageDropdownOpen && (
                   <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in z-50">
                      {languages.map(l => (
                         <button 
                           key={l.code}
                           onClick={() => { setLanguage(l.code as any); setLanguageDropdownOpen(false); }}
                           className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-cyan-50 transition-colors ${language === l.code ? 'text-cyan-700 font-bold bg-cyan-50' : 'text-gray-600'}`}
                         >
                            <span className="text-lg">{l.flag}</span>
                            <span>{l.label}</span>
                         </button>
                      ))}
                   </div>
                )}
             </div>

             {/* Invisible backdrop to close dropdowns when clicking outside */}
             {(currencyDropdownOpen || languageDropdownOpen) && (
               <div className="fixed inset-0 z-[-1]" onClick={() => { setCurrencyDropdownOpen(false); setLanguageDropdownOpen(false); }}></div>
             )}
          </div>
        </div>

        {/* Bottom Section: Centered Navigation Links (Visible on Medium+ screens) */}
        <div className="hidden md:flex justify-center mt-2 border-t border-gray-100 pt-2">
          <div className="flex space-x-1 lg:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center px-2 lg:px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 group ${
                  isActive(link.path)
                    ? 'text-cyan-700 bg-cyan-50'
                    : 'text-gray-500 hover:text-orange-500 hover:bg-orange-50'
                }`}
              >
                <span className={`mb-1 transition-transform group-hover:-translate-y-1 ${isActive(link.path) ? 'text-cyan-600' : 'text-gray-400 group-hover:text-orange-500'}`}>
                  {link.icon}
                </span>
                <span className="whitespace-nowrap">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile menu (Drawer style) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-inner animate-fade-in max-h-[80vh] overflow-y-auto">
          
          {/* Config Section for Mobile */}
          <div className="p-4 bg-gray-50 border-b border-gray-200">
             <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Configuración</h4>
             <div className="grid grid-cols-1 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Moneda</label>
                    <div className="flex flex-wrap gap-2">
                        {currencies.map(c => (
                            <button 
                                key={c.code}
                                onClick={() => setCurrency(c.code as any)}
                                className={`flex items-center gap-1 px-2 py-1 text-sm rounded border ${currency === c.code ? 'bg-cyan-600 text-white border-cyan-600' : 'bg-white border-gray-200 text-gray-600'}`}
                            >
                                <span>{(c as any).flag}</span>
                                {c.code}
                            </button>
                        ))}
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Idioma</label>
                    <div className="flex flex-wrap gap-2">
                        {languages.map(l => (
                            <button 
                                key={l.code}
                                onClick={() => setLanguage(l.code as any)}
                                className={`px-2 py-1 text-sm rounded flex items-center gap-2 border ${language === l.code ? 'bg-cyan-600 text-white border-cyan-600' : 'bg-white border-gray-200 text-gray-600'}`}
                            >
                                <span>{l.flag}</span> {l.code.toUpperCase()}
                            </button>
                        ))}
                    </div>
                 </div>
             </div>
          </div>

          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium border ${
                  isActive(link.path)
                    ? 'text-cyan-700 bg-cyan-50 border-cyan-100'
                    : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50 border-transparent hover:border-orange-100'
                }`}
              >
                <span className="mr-3">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
