/**
 * PhotoCard Component
 *
 * Displays an individual photo card with:
 * - Photo image
 * - Photographer's name (author)
 * - Heart button to toggle favourite status
 *
 * @param {Object} props
 * @param {Object} props.photo - The photo object from Picsum API ({ id, author, download_url })
 * @param {boolean} props.isFavourite - Whether this photo is in favourites
 * @param {Function} props.onToggleFavourite - Callback to toggle favourite status by ID
 */
function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Photo Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
        <img
          src={photo.download_url}
          alt={`Photograph by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Heart Icon Button to toggle favourite status */}
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={
            isFavourite
              ? `Remove photo by ${photo.author} from favourites`
              : `Add photo by ${photo.author} to favourites`
          }
          title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-xs transition-transform duration-150 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`h-6 w-6 transition-colors duration-200 ${
              isFavourite
                ? 'fill-red-500 text-red-500'
                : 'fill-transparent stroke-gray-600 stroke-2 hover:stroke-red-500'
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>

      {/* Card Details */}
      <div className="flex items-center justify-between p-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Photographer
          </p>
          <p
            className="truncate text-base font-medium text-gray-900"
            title={photo.author}
          >
            {photo.author}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PhotoCard;
