import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://placeholder.supabase.co';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'placeholder-anon-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not set — newsletter and contact forms will not work until configured in Netlify env vars.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Subscriber = {
  id: string;
  email: string;
  created_at: string;
};
