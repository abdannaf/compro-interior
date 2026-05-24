import { useEffect, useState } from 'react';

// Icon component for React using Iconify
export default function Icon({ name, size = 24, className = "" }) {
  const [svg, setSvg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load icon from Iconify API
    const fetchIcon = async () => {
      try {
        const response = await fetch(
          `https://api.iconify.design/${name}.svg?height=${size}`
        );
        const svgText = await response.text();
        setSvg(svgText);
      } catch (error) {
        console.error(`Failed to load icon: ${name}`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchIcon();
  }, [name, size]);

  if (loading || !svg) return <span style={{ display: 'inline-block', width: size, height: size }} />;

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    />
  );
}
