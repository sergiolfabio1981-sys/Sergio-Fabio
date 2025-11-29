
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURACIÓN DE SUPABASE ---
// Por favor, reemplaza estas cadenas con las credenciales de tu proyecto Supabase
// Puedes encontrarlas en: Settings -> API
const SUPABASE_URL = 'https://fywghtsrjjniivzrvvuv.supabase.co'; 
const SUPABASE_ANON_KEY = proceso . env . SUPABASE_KEY; 

// Nota: En un entorno de producción real, esto iría en variables de entorno (.env)
// Al ser una demo, debes pegarlas aquí.

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
