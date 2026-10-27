import { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import {
  favouritesReducer,
  initFavourites,
  TOGGLE_FAVOURITE,
  LOCAL_STORAGE_KEY,
} from '../reducers/favouritesReducer';
import PhotoCard from './PhotoCard';

/**
 * Gallery Component
 *
 * Core component responsible for:
 * - Calling useFetchPhotos hook to retrieve photo list, loading, and error states.
 * - Managing search input state using useState.
 * - Memoizing search input change handler using useCallback.
 * - Memoizing filtered photo list using useMemo.
 * - Managing favourite photo IDs using useReducer.
 * - Persisting favourite IDs to localStorage.
 * - Rendering responsive grid (1 col mobile, 2 col tablet, 4 col desktop).
 */
function Gallery() {
  // Requirement 2 & 6: Custom Hook for fetching photos
  const { photos, loading, error } = useFetchPhotos();

  // Requirement 4: Search input state
  const [searchQuery, setSearchQuery] = useState('');

  // Requirement 5: useReducer with lazy initializer for persistent favourites
  const [favourites, dispatch] = useReducer(favouritesReducer, [], initFavourites);

  // Requirement 5: Persist favourites to localStorage whenever favourites state changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favourites));
    } catch (err) {
      console.error('Failed to save favourites to localStorage:', err);
    }
  }, [favourites]);

  // Requirement 7: useCallback for search filter handler
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Handler to toggle favourite status via reducer dispatch
  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({ type: TOGGLE_FAVOURITE, payload: photoId });
  }, []);

  // Requirement 7: useMemo to compute filtered photos list
  const filteredPhotos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return photos;
    }
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchQuery]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Photo Gallery
        </h1>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Discover beautiful photography. Search by photographer or favourite your top picks.
        </p>
      </div>

      {/* Requirement 4: Search input */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search photos by author..."
            aria-label="Search photos by author"
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-10 text-gray-900 shadow-sm transition-colors duration-150 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          {/* Search Icon */}
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          {/* Clear search button if query is present */}
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search input"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Requirement 2: Visible Loading Spinner */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20" role="status">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="mt-4 text-base font-medium text-gray-600">Loading photos...</p>
        </div>
      )}

      {/* Requirement 2: Clear Error Message */}
      {error && !loading && (
        <div
          role="alert"
          className="mx-auto my-8 max-w-lg rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700"
        >
          <p className="text-lg font-semibold">Failed to load photos</p>
          <p className="mt-2 text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Requirement 4 & 10: Empty search results state */}
      {!loading && !error && filteredPhotos.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg font-medium text-gray-700">
            No photos found matching &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Try searching for a different author name or clear the search input.
          </p>
        </div>
      )}

      {/* Requirement 3: Responsive Photo Grid (1 col mobile, 2 col tablet, 4 col desktop) */}
      {!loading && !error && filteredPhotos.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
