import { randomBytes, timingSafeEqual } from 'node:crypto';

const CSRF_COOKIE = 'buildpro_csrf';

function safeEqual(a, b) {
  const left = Buffer.from(a || '');
  const right = Buffer.from(b || '');
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function getCsrfToken(Astro) {
  const existing = Astro.cookies.get(CSRF_COOKIE)?.value;
  if (existing) return existing;

  const token = randomBytes(32).toString('hex');
  Astro.cookies.set(CSRF_COOKIE, token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: import.meta.env.PROD,
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return token;
}

export function validateCsrf(Astro, formData) {
  const cookieToken = Astro.cookies.get(CSRF_COOKIE)?.value;
  const formToken = String(formData.get('_csrf') || '');
  return Boolean(cookieToken && formToken && safeEqual(cookieToken, formToken));
}
