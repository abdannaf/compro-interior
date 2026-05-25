import { useEffect, useState } from 'react';

/** Ambil daftar dari API JSON — dipakai preview blog & projects */
export function useFetchedList(apiUrl) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (!cancelled) {
          setItems(Array.isArray(data) ? data : []);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(`Failed to load ${apiUrl}:`, err);
          setError(err);
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [apiUrl]);

  return { items, loading, error };
}
