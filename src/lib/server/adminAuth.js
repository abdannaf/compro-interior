import { createHmac, timingSafeEqual } from 'node:crypto';
import { getServerEnv } from './env';
import { getSupabaseAdmin, getSupabaseAuthClient, hasSupabaseConfig, hasSupabaseAuthConfig } from './supabaseAdmin';

const COOKIE_NAME = 'buildpro_admin';
const SESSION_MAX_AGE = 60 * 60 * 8;

function getSecret() {
  return getServerEnv('ADMIN_SESSION_SECRET') || 'dev-session-secret';
}

function sign(value) {
  return createHmac('sha256', getSecret()).update(value).digest('hex');
}

function constantTimeEqual(a, b) {
  const left = Buffer.from(a || '');
  const right = Buffer.from(b || '');
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function encodePayload(payload) {
  return Buffer.from(JSON.stringify(payload)).toString('base64url');
}

function decodePayload(value) {
  try {
    return JSON.parse(Buffer.from(value, 'base64url').toString('utf8'));
  } catch {
    return null;
  }
}

function setAdminCookie(Astro, payload) {
  const encodedPayload = encodePayload(payload);
  Astro.cookies.set(COOKIE_NAME, `${encodedPayload}.${sign(encodedPayload)}`, {
    httpOnly: true,
    sameSite: 'strict',
    secure: import.meta.env.PROD,
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
}

function getSession(Astro) {
  const cookie = Astro.cookies.get(COOKIE_NAME)?.value;
  if (!cookie) return null;

  const [encodedPayload, signature] = cookie.split('.');
  if (!encodedPayload || !signature) return null;
  if (!constantTimeEqual(signature, sign(encodedPayload))) return null;

  const payload = decodePayload(encodedPayload);
  if (!payload?.email || !payload?.expiresAt) return null;
  if (Date.now() > payload.expiresAt) return null;

  return payload;
}

export async function isAdmin(Astro) {
  const adminEmail = getServerEnv('ADMIN_EMAIL');
  const session = getSession(Astro);
  if (!session) return false;
  if (adminEmail && session.email !== adminEmail) return false;

  if (session.provider === 'supabase' && hasSupabaseConfig()) {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.auth.admin.getUserById(session.userId);
    if (error || !data.user) return false;
    if (data.user.email !== session.email) return false;
    if (adminEmail && data.user.email !== adminEmail) return false;
  }

  return true;
}

export async function requireAdmin(Astro) {
  if (!(await isAdmin(Astro))) {
    return Astro.redirect('/admin/login');
  }

  return null;
}

export async function loginAdmin(Astro, email, password) {
  const adminEmail = getServerEnv('ADMIN_EMAIL');
  const adminPassword = getServerEnv('ADMIN_PASSWORD');

  if (!adminEmail) {
    return { ok: false, message: 'ADMIN_EMAIL belum diatur di .env.' };
  }

  if (email !== adminEmail) {
    return { ok: false, message: 'Email atau password admin salah.' };
  }

  if (hasSupabaseAuthConfig()) {
    const supabase = getSupabaseAuthClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.user) {
      return { ok: false, message: 'Email atau password admin salah.' };
    }

    if (data.user.email !== adminEmail) {
      return { ok: false, message: 'Akun ini bukan admin yang diizinkan.' };
    }

    setAdminCookie(Astro, {
      provider: 'supabase',
      userId: data.user.id,
      email: data.user.email,
      expiresAt: Date.now() + SESSION_MAX_AGE * 1000,
    });

    return { ok: true };
  }

  if (getServerEnv('ALLOW_ENV_ADMIN_LOGIN') !== 'true') {
    return { ok: false, message: 'Supabase Auth belum dikonfigurasi. Buat user admin di Supabase Auth dan isi PUBLIC_SUPABASE_URL serta PUBLIC_SUPABASE_ANON_KEY.' };
  }

  if (!adminPassword || password !== adminPassword) {
    return { ok: false, message: 'Email atau password admin salah.' };
  }

  setAdminCookie(Astro, {
    provider: 'env',
    email: adminEmail,
    expiresAt: Date.now() + SESSION_MAX_AGE * 1000,
  });

  return { ok: true };
}

export function logoutAdmin(Astro) {
  Astro.cookies.delete(COOKIE_NAME, { path: '/' });
}
