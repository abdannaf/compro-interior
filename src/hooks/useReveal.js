import { useEffect, useRef, useState } from 'react';

export function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);

    // Elemen sudah di viewport saat mount (mis. setelah client:load)
    requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
      if (inView) setVisible(true);
    });

    return () => observer.disconnect();
  }, [threshold]);

  const revealClass = visible ? 'reveal-on-scroll is-visible' : 'reveal-on-scroll';

  return { ref, visible, revealClass };
}
