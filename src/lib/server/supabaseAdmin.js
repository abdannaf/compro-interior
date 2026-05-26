import { createClient } from '@supabase/supabase-js';
import { getServerEnv } from './env';

export function hasSupabaseConfig() {
  return Boolean(getServerEnv('PUBLIC_SUPABASE_URL') && getServerEnv('SUPABASE_SERVICE_ROLE_KEY'));
}

export function hasSupabaseAuthConfig() {
  return Boolean(getServerEnv('PUBLIC_SUPABASE_URL') && getServerEnv('PUBLIC_SUPABASE_ANON_KEY'));
}

export function getSupabaseAdmin() {
  if (!hasSupabaseConfig()) {
    throw new Error('Supabase belum dikonfigurasi. Isi PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di .env.');
  }

  return createClient(
    getServerEnv('PUBLIC_SUPABASE_URL'),
    getServerEnv('SUPABASE_SERVICE_ROLE_KEY'),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

export function getSupabaseAuthClient() {
  if (!hasSupabaseAuthConfig()) {
    throw new Error('Supabase Auth belum dikonfigurasi. Isi PUBLIC_SUPABASE_URL dan PUBLIC_SUPABASE_ANON_KEY di .env.');
  }

  return createClient(
    getServerEnv('PUBLIC_SUPABASE_URL'),
    getServerEnv('PUBLIC_SUPABASE_ANON_KEY'),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
