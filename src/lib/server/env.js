import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

let fileEnvCache = null;

function readFileEnv() {
  if (fileEnvCache) return fileEnvCache;

  fileEnvCache = {};
  const envPath = join(process.cwd(), '.env');

  if (!existsSync(envPath)) return fileEnvCache;

  const lines = readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    fileEnvCache[key] = value;
  }

  return fileEnvCache;
}

export function getServerEnv(name) {
  return import.meta.env[name] || process.env[name] || readFileEnv()[name] || '';
}
