import { useEffect, useState } from 'react';

const iconCache = new Map();

/** Hilangkan fill abu-abu bawaan SVG Iconify */
function normalizeSvg(svgText) {
  return svgText
    .replace(/fill="(?!currentColor)[^"]*"/gi, 'fill="currentColor"')
    .replace(/stroke="(?!currentColor)[^"]*"/gi, 'stroke="currentColor"')
    .replace(/<rect[^>]*\/>/gi, '')
    .replace(/<rect[^>]*>[\s\S]*?<\/rect>/gi, '');
}

export default function Icon({ name, size = 24, className = '', title }) {
  const cacheKey = `${name}:${size}`;
  const [svg, setSvg] = useState(() => {
    const cached = iconCache.get(cacheKey);
    return cached ? normalizeSvg(cached) : null;
  });

  useEffect(() => {
    let cancelled = false;

    if (iconCache.has(cacheKey)) {
      setSvg(normalizeSvg(iconCache.get(cacheKey)));
      return;
    }

    async function loadIcon() {
      try {
        const response = await fetch(
          `https://api.iconify.design/${name}.svg?height=${size}`
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const raw = await response.text();
        const cleaned = normalizeSvg(raw);
        iconCache.set(cacheKey, raw);

        if (!cancelled) setSvg(cleaned);
      } catch (err) {
        console.error(`Failed to load icon: ${name}`, err);
      }
    }

    loadIcon();
    return () => {
      cancelled = true;
    };
  }, [cacheKey, name, size]);

  const baseClass =
    'inline-flex shrink-0 items-center justify-center text-current [&_svg]:h-full [&_svg]:w-full [&_svg]:fill-current';

  if (!svg) {
    return (
      <span
        role="img"
        aria-hidden={title ? undefined : 'true'}
        aria-label={title}
        className={`${baseClass} ${className}`.trim()}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      className={`${baseClass} ${className}`.trim()}
      role="img"
      aria-hidden={title ? undefined : 'true'}
      aria-label={title}
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{ width: size, height: size }}
    />
  );
}
