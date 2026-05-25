import { toSlug } from './slug';

export const IMAGE_BUCKET = 'content-images';
const ALLOWED_IMAGE_TYPES = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/gif', 'gif'],
]);

function getExtension(filename) {
  const extension = String(filename || '').split('.').pop();
  return extension && extension !== filename ? extension.toLowerCase() : 'jpg';
}

export async function uploadImageFile(supabase, file, folder) {
  if (!file || typeof file === 'string' || file.size === 0) {
    return '';
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error('File harus berupa gambar JPG, PNG, WEBP, atau GIF.');
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('Ukuran gambar maksimal 5MB.');
  }

  const extension = getExtension(file.name);
  if (![...ALLOWED_IMAGE_TYPES.values()].includes(extension) && !(file.type === 'image/jpeg' && extension === 'jpeg')) {
    throw new Error('Ekstensi file gambar tidak valid.');
  }

  const safeName = toSlug(file.name.replace(/\.[^/.]+$/, '')) || 'image';
  const path = `${folder}/${Date.now()}-${safeName}.${ALLOWED_IMAGE_TYPES.get(file.type)}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(`Upload gambar gagal: ${error.message}`);
  }

  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteImageByUrl(supabase, imageUrl) {
  if (!imageUrl) return;

  let url;
  try {
    url = new URL(imageUrl);
  } catch {
    return;
  }

  const marker = `/storage/v1/object/public/${IMAGE_BUCKET}/`;
  const markerIndex = url.pathname.indexOf(marker);
  if (markerIndex === -1) return;

  const path = decodeURIComponent(url.pathname.slice(markerIndex + marker.length));
  if (!path) return;

  await supabase.storage.from(IMAGE_BUCKET).remove([path]);
}

export function cleanText(value, maxLength = 10000) {
  return String(value || '')
    .replace(/\u0000/g, '')
    .trim()
    .slice(0, maxLength);
}

export function tagsToInput(tags) {
  return Array.isArray(tags) ? tags.join(', ') : '';
}
