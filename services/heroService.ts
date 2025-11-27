
import { HeroSlide } from '../types';
import { INITIAL_HERO_SLIDES } from '../constants';

const HERO_STORAGE_KEY = 'abras_travel_hero_v1';

export const getHeroSlides = (): HeroSlide[] => {
  const stored = localStorage.getItem(HERO_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(INITIAL_HERO_SLIDES));
    return INITIAL_HERO_SLIDES;
  }
  return JSON.parse(stored);
};

export const saveHeroSlide = (slide: HeroSlide): void => {
  const slides = getHeroSlides();
  const existingIndex = slides.findIndex((s) => s.id === slide.id);
  
  if (existingIndex >= 0) {
    slides[existingIndex] = slide;
  } else {
    // Usually we don't add new slides for the main layout, but we can allow it
    slides.push(slide);
  }
  
  localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(slides));
};

export const resetHeroSlides = (): void => {
    localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(INITIAL_HERO_SLIDES));
};
