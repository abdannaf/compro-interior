import { env as cfEnv } from 'cloudflare:workers';

export function getServerEnv(name) {
  const runtime = cfEnv[name];
  if (runtime !== undefined && runtime !== '') {
    return typeof runtime === 'string' ? runtime : String(runtime);
  }

  const fromMeta = import.meta.env[name];
  if (fromMeta) return String(fromMeta);

  if (typeof process !== 'undefined' && process.env?.[name]) {
    return process.env[name];
  }

  return '';
}
