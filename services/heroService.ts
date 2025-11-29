
import { HeroSlide, PromoBanner } from '../types';
import { INITIAL_HERO_SLIDES, INITIAL_PROMO_BANNERS } from '../constants';
import { supabase } from './supabase';

export const getHeroSlides = async (): Promise<HeroSlide[]> => {
  try {
    const { data, error } = await supabase.from('hero_slides').select('*').order('id', { ascending: true });
    if (error || !data || data.length === 0) return INITIAL_HERO_SLIDES;
    return data as HeroSlide[];
  } catch {
    return INITIAL_HERO_SLIDES;
  }
};

export const saveHeroSlide = async (slide: HeroSlide): Promise<void> => {
  const { error } = await supabase.from('hero_slides').upsert(slide);
  if (error) console.error('Error saving slide:', error);
};

export const getPromoBanners = async (): Promise<PromoBanner[]> => {
  try {
    const { data, error } = await supabase.from('promo_banners').select('*');
    if (error || !data || data.length === 0) return INITIAL_PROMO_BANNERS;
    return data as PromoBanner[];
  } catch {
    return INITIAL_PROMO_BANNERS;
  }
};

export const savePromoBanner = async (banner: PromoBanner): Promise<void> => {
  const { error } = await supabase.from('promo_banners').upsert(banner);
  if (error) console.error('Error saving banner:', error);
};
