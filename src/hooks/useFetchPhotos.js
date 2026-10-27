import { useState, useEffect } from 'react';

const API_URL = 'https://picsum.photos/v2/list?limit=30';

/**
 * Custom hook to fetch photos from the Picsum API.
 * Manages photos data, loading state, and error handling.
 *
 * @returns {{ photos: Array, loading: boolean, error: string | null }}
 */
const useFetchPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL, { signal: controller.signal });

        // Validate response status before parsing
        if (!response.ok) {
          throw new Error(`Failed to fetch photos: HTTP status ${response.status}`);
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        // Ignore aborts triggered by component cleanup
        if (err.name === 'AbortError') {
          return;
        }
        setError(err.message || 'An unexpected error occurred while fetching photos.');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPhotos();

    // Cleanup abort controller if component unmounts
    return () => {
      controller.abort();
    };
  }, []);

  return { photos, loading, error };
};

export default useFetchPhotos;
