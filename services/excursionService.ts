
import { Excursion } from '../types';
import { INITIAL_EXCURSIONS } from '../constants';

const CURRENT_KEY = 'abras_travel_excursions_main';
const LEGACY_KEYS = ['abras_travel_excursions_v9', 'abras_travel_excursions_v8'];

export const getExcursions = (): Excursion[] => {
  const stored = localStorage.getItem(CURRENT_KEY);
  if (stored) return JSON.parse(stored);

  for (const key of LEGACY_KEYS) {
      const legacyData = localStorage.getItem(key);
      if (legacyData) {
          localStorage.setItem(CURRENT_KEY, legacyData);
          return JSON.parse(legacyData);
      }
  }

  localStorage.setItem(CURRENT_KEY, JSON.stringify(INITIAL_EXCURSIONS));
  return INITIAL_EXCURSIONS;
};

export const getExcursionById = (id: string): Excursion | undefined => {
  const excursions = getExcursions();
  return excursions.find((e) => e.id === id);
};

export const saveExcursion = (excursion: Excursion): void => {
  const excursions = getExcursions();
  const existingIndex = excursions.findIndex((e) => e.id === excursion.id);
  
  if (existingIndex >= 0) {
    excursions[existingIndex] = excursion;
  } else {
    excursions.push(excursion);
  }
  
  localStorage.setItem(CURRENT_KEY, JSON.stringify(excursions));
};

export const deleteExcursion = (id: string): void => {
  const excursions = getExcursions();
  const filtered = excursions.filter((e) => e.id !== id);
  localStorage.setItem(CURRENT_KEY, JSON.stringify(filtered));
};

export const createEmptyExcursion = (): Excursion => ({
  id: Date.now().toString(),
  title: '',
  location: '',
  price: 0,
  description: '',
  images: [`https://picsum.photos/seed/${Date.now()}/800/600`],
  isOffer: false,
  duration: '',
  availableDates: [],
  type: 'excursion',
  discount: 0,
  specialLabel: '',
  baseCurrency: 'USD'
});
