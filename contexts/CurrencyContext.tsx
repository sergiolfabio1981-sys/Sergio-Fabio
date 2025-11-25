import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Currency = 'ARS' | 'USD' | 'BRL';

interface CurrencyContextProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInArs: number) => string;
  convertPrice: (amountInArs: number) => number;
}

// Tasas de cambio simuladas (Base ARS)
// Ejemplo: 1 USD = 1200 ARS
// Ejemplo: 1 BRL = 220 ARS
const EXCHANGE_RATES = {
  ARS: 1,
  USD: 1200,
  BRL: 220
};

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('ARS');

  useEffect(() => {
    const saved = localStorage.getItem('abras_currency');
    if (saved && (saved === 'ARS' || saved === 'USD' || saved === 'BRL')) {
      setCurrencyState(saved as Currency);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('abras_currency', c);
  };

  const convertPrice = (amountInArs: number): number => {
    if (currency === 'ARS') return amountInArs;
    return amountInArs / EXCHANGE_RATES[currency];
  };

  const formatPrice = (amountInArs: number): string => {
    const value = convertPrice(amountInArs);
    
    return new Intl.NumberFormat(currency === 'ARS' ? 'es-AR' : 'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
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