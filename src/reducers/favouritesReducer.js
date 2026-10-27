export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';

export const LOCAL_STORAGE_KEY = 'celebrare_favourite_photos';

/**
 * Lazy initializer for useReducer.
 * Reads saved favourite IDs from localStorage safely.
 * Handles missing or malformed JSON without crashing the application.
 *
 * @returns {Array<string|number>} Initial list of favourite photo IDs
 */
export const initFavourites = () => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) {
      return [];
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to parse favourites from localStorage:', error);
    return [];
  }
};

/**
 * Reducer function to manage favourite photo IDs.
 * Ensures state is never directly mutated.
 *
 * @param {Array<string|number>} state - Array of favourite photo IDs
 * @param {{ type: string, payload: string|number }} action - Dispatched action
 * @returns {Array<string|number>} Updated array of favourite photo IDs
 */
export const favouritesReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_FAVOURITE: {
      const photoId = action.payload;
      const isFavourite = state.includes(photoId);

      if (isFavourite) {
        // Remove photo ID without mutating state
        return state.filter((id) => id !== photoId);
      } else {
        // Add photo ID without mutating state
        return [...state, photoId];
      }
    }
    default:
      return state;
  }
};
