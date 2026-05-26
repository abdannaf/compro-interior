import { logoutAdmin } from '../../lib/server/adminAuth';

export function GET(Astro) {
  logoutAdmin(Astro);
  return Astro.redirect('/admin/login');
}
