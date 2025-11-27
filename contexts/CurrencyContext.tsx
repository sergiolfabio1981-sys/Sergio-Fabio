
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Currency = 'ARS' | 'USD' | 'BRL' | 'UYU' | 'CLP' | 'COP' | 'MXN';

interface CurrencyContextProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInArs: number) => string;
  convertPrice: (amountInArs: number) => number;
}

// Tasas de cambio aproximadas (Base ARS - Pesos Argentinos)
// Se calcula: Cuántos ARS vale 1 unidad de la moneda destino.
// O en la lógica inversa usada aquí: Por cuánto dividir el ARS para obtener la moneda destino.
const EXCHANGE_RATES = {
  ARS: 1,
  USD: 1220, // Dólar Blue/Turista aprox
  BRL: 215,  // Real
  UYU: 31,   // Peso Uruguayo (1 USD ~ 42 UYU -> 1220/42 approx)
  CLP: 1.30, // Peso Chileno (1 USD ~ 940 CLP -> 1220/940 approx)
  COP: 0.28, // Peso Colombiano (1 USD ~ 4300 COP)
  MXN: 60    // Peso Mexicano (1 USD ~ 20 MXN)
};

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Configuración por defecto: USD
  const [currency, setCurrencyState] = useState<Currency>('USD');

  useEffect(() => {
    const saved = localStorage.getItem('abras_currency');
    const supportedCurrencies = ['ARS', 'USD', 'BRL', 'UYU', 'CLP', 'COP', 'MXN'];
    if (saved && supportedCurrencies.includes(saved)) {
      setCurrencyState(saved as Currency);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('abras_currency', c);
  };

  const convertPrice = (amountInArs: number): number => {
    // Si el valor no es numérico, devolvemos 0
    if (isNaN(amountInArs) || amountInArs === undefined) return 0;
    
    if (currency === 'ARS') return amountInArs;
    return amountInArs / EXCHANGE_RATES[currency];
  };

  const formatPrice = (amountInArs: number): string => {
    const value = convertPrice(amountInArs);
    
    // Configuraciones regionales para formato de números
    let locale = 'en-US'; // Default para USD
    if (currency === 'ARS') locale = 'es-AR';
    if (currency === 'BRL') locale = 'pt-BR';
    if (currency === 'UYU') locale = 'es-UY';
    if (currency === 'CLP') locale = 'es-CL';
    if (currency === 'COP') locale = 'es-CO';
    if (currency === 'MXN') locale = 'es-MX';

    // Monedas que generalmente no usan centavos
    const noFraction = ['CLP', 'COP', 'ARS']; 
    const maxDigits = noFraction.includes(currency) ? 0 : 2;

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: maxDigits,
      maximumFractionDigits: maxDigits
    }).format(value);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
