import { requireAdmin } from '../../../../lib/server/adminAuth';
import { validateCsrf } from '../../../../lib/server/csrf';
import { deleteImageByUrl } from '../../../../lib/server/adminContent';
import { getSupabaseAdmin } from '../../../../lib/server/supabaseAdmin';

export async function POST(Astro) {
  const redirect = await requireAdmin(Astro);
  if (redirect) return redirect;

  const formData = await Astro.request.formData();
  if (!validateCsrf(Astro, formData)) {
    return new Response('Invalid CSRF token', { status: 403 });
  }

  const supabase = getSupabaseAdmin();
  const { id } = Astro.params;

  if (id) {
    const { data } = await supabase.from('blogs').select('image_url').eq('id', id).maybeSingle();
    await supabase.from('blogs').delete().eq('id', id);
    await deleteImageByUrl(supabase, data?.image_url);
  }

  return Astro.redirect('/admin/blogs');
}
