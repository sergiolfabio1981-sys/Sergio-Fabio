
import { HeroSlide, PromoBanner } from '../types';
import { INITIAL_HERO_SLIDES, INITIAL_PROMO_BANNERS } from '../constants';

const HERO_KEY = 'abras_travel_hero_main';
const BANNER_KEY = 'abras_travel_banners_main';

const LEGACY_HERO_KEYS = ['abras_travel_hero_v3'];
const LEGACY_BANNER_KEYS = ['abras_travel_banners_v1'];

export const getHeroSlides = (): HeroSlide[] => {
  const stored = localStorage.getItem(HERO_KEY);
  if (stored) return JSON.parse(stored);

  for (const key of LEGACY_HERO_KEYS) {
      const legacy = localStorage.getItem(key);
      if (legacy) {
          localStorage.setItem(HERO_KEY, legacy);
          return JSON.parse(legacy);
      }
  }

  localStorage.setItem(HERO_KEY, JSON.stringify(INITIAL_HERO_SLIDES));
  return INITIAL_HERO_SLIDES;
};

export const saveHeroSlide = (slide: HeroSlide): void => {
  const slides = getHeroSlides();
  const existingIndex = slides.findIndex((s) => s.id === slide.id);
  
  if (existingIndex >= 0) {
    slides[existingIndex] = slide;
  } else {
    slides.push(slide);
  }
  
  localStorage.setItem(HERO_KEY, JSON.stringify(slides));
};

// --- PROMO BANNERS ---

export const getPromoBanners = (): PromoBanner[] => {
  const stored = localStorage.getItem(BANNER_KEY);
  if (stored) return JSON.parse(stored);

  for (const key of LEGACY_BANNER_KEYS) {
      const legacy = localStorage.getItem(key);
      if (legacy) {
          localStorage.setItem(BANNER_KEY, legacy);
          return JSON.parse(legacy);
      }
  }

  localStorage.setItem(BANNER_KEY, JSON.stringify(INITIAL_PROMO_BANNERS));
  return INITIAL_PROMO_BANNERS;
};

export const savePromoBanner = (banner: PromoBanner): void => {
  const banners = getPromoBanners();
  const existingIndex = banners.findIndex((b) => b.id === banner.id);
  
  if (existingIndex >= 0) {
    banners[existingIndex] = banner;
  } else {
    banners.push(banner);
  }
  
  localStorage.setItem(BANNER_KEY, JSON.stringify(banners));
};

export const resetHeroData = (): void => {
    localStorage.setItem(HERO_KEY, JSON.stringify(INITIAL_HERO_SLIDES));
    localStorage.setItem(BANNER_KEY, JSON.stringify(INITIAL_PROMO_BANNERS));
};
