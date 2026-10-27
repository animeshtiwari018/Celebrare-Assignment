# Photo Gallery Web App — Celebrare React Internship Assignment

A responsive, high-performance photo gallery web application built using **React (Functional Components)**, **Vite**, and **Tailwind CSS**.

This project fulfills all requirements of the **Celebrare Frontend React Internship Pre-Screening Assignment**.

---

## 🚀 Features & Highlights

- **Photo Fetching**: Fetches 30 high-resolution photos from the Unsplash/Picsum API (`https://picsum.photos/v2/list?limit=30`) on initial load.
- **Custom Hook (`useFetchPhotos`)**: Encapsulates API request lifecycle, loading state, and error handling.
- **Responsive Grid**:
  - **Desktop**: 4 columns (`lg:grid-cols-4`)
  - **Tablet**: 2 columns (`md:grid-cols-2`)
  - **Mobile**: 1 column (`grid-cols-1`)
- **Real-time Search Filter**: Instant case-insensitive filtering by photographer name.
- **Performance Optimizations**:
  - `useCallback` memoizes the search input handler.
  - `useMemo` calculates filtered photos only when `photos` or `searchQuery` change.
- **Persistent Favourites with `useReducer`**:
  - State management powered by React's `useReducer`.
  - Toggles photo IDs in/out of favourites list without state mutation.
  - Persistent across browser refreshes via `localStorage` with a safe lazy initializer.
- **Strict Compliance**:
  - ❌ No class components.
  - ❌ No third-party UI component libraries (Bootstrap, MUI, AntD, etc.).
  - ❌ No external state management (Redux, Zustand).
  - ❌ No `useState` for favourites.

---

## 📁 Project Structure

```text
photo-gallery/
├── src/
│   ├── components/
│   │   ├── Gallery.jsx          # Main gallery view with search, grid, loading/error states
│   │   └── PhotoCard.jsx        # Individual photo card with author and heart toggle button
│   ├── hooks/
│   │   └── useFetchPhotos.js    # Custom hook returning { photos, loading, error }
│   ├── reducers/
│   │   └── favouritesReducer.js # Reducer, action types, and safe localStorage initializer
│   ├── App.jsx                  # Main application container
│   ├── index.css                # Tailwind CSS import
│   └── main.jsx                 # React root render
├── index.html                   # HTML entry point with meta tags
├── package.json                 # Dependencies and npm scripts
├── vite.config.js               # Vite configuration with Tailwind CSS plugin
└── README.md                    # Documentation & screen recording guide
```

---

## 🛠️ Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### 2. Installation

Navigate into the project directory and install dependencies:

```bash
cd photo-gallery
npm install
```

### 3. Running the Development Server

Start the local Vite dev server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 4. Building for Production

To create an optimized production build:

```bash
npm run build
```

---

## 📋 Requirements Compliance Checklist

| # | Requirement | Implementation Details | Status |
|---|-------------|------------------------|:------:|
| **1** | Project Setup | Vite + React + Tailwind CSS v4. No component libraries. | ✅ Verified |
| **2** | Fetch API Data | Calls `https://picsum.photos/v2/list?limit=30` once on mount. Handles loading, error, and HTTP status codes (`response.ok`). | ✅ Verified |
| **3** | Responsive Grid | 4 cols (desktop `lg`), 2 cols (tablet `md`), 1 col (mobile). Renders photo, author, and heart button with stable keys (`photo.id`). | ✅ Verified |
| **4** | Search Filter | Real-time case-insensitive filter by `author`. In-memory filtering without extra API requests. Empty search restores all photos. | ✅ Verified |
| **5** | Favourites (`useReducer`) | Managed via `useReducer` with `TOGGLE_FAVOURITE` action. Persisted to `localStorage` with lazy initializer (`initFavourites`) to safely handle corrupt/missing JSON. | ✅ Verified |
| **6** | Custom Hook (`useFetchPhotos`) | File: `src/hooks/useFetchPhotos.js`. Returns exact `{ photos, loading, error }` signature. Includes `AbortController` cleanup. | ✅ Verified |
| **7** | `useCallback` & `useMemo` | `useCallback` wraps search input handler. `useMemo` calculates filtered photo list from `[photos, searchQuery]`. | ✅ Verified |

---

## 🎥 5-Minute Screen Recording Guide

Use this outline during your mandatory five-minute video:

### 1. Show the Working App (0:00 - 1:15)
- Open the application in your browser.
- **Initial Load**: Point out the loading spinner while fetching photos, then show all 30 photos rendered.
- **Search Filtering**: Type a photographer's name (e.g., "Alejandro") into the search box. Notice real-time filtering without page reloads or API calls. Clear the search to show all 30 photos return.
- **Favourites Toggle**: Click the heart icon on 2 or 3 photos to turn them red.
- **Persistence**: Refresh the browser page (`Ctrl+R` / `F5`). Point out that the selected photos remain marked as favourites.
- **Responsive Layout**: Resize the browser window to show the layout changing from 4 columns (desktop) to 2 columns (tablet) and 1 column (mobile).

### 2. Explain `useFetchPhotos` (1:15 - 2:15)
- Open `src/hooks/useFetchPhotos.js`.
- Explain the 3 state variables: `photos`, `loading`, and `error`.
- Explain how `useEffect` executes the fetch request on component mount with dependency array `[]`.
- Highlight `if (!response.ok)` check for handling non-200 HTTP statuses.
- Explain the `AbortController` cleanup function: prevents memory leaks and ensures component unmounts do not trigger state updates on aborted requests.

### 3. Explain `useReducer` & `localStorage` (2:15 - 3:15)
- Open `src/reducers/favouritesReducer.js` and `src/components/Gallery.jsx`.
- **Why `useReducer`?**: Explain that favourites involve discrete action transitions (`TOGGLE_FAVOURITE`), separating state logic from UI rendering and ensuring immutable updates.
- Show the reducer logic: if photo ID exists, `state.filter(...)` removes it; otherwise `[...state, photoId]` appends it.
- **Safe Persistence**: Show `initFavourites()` using `JSON.parse` wrapped in `try/catch` as a lazy initializer for `useReducer`, and `useEffect` synchronizing changes to `localStorage`.

### 4. Explain `useCallback` and `useMemo` (3:15 - 4:15)
- In `src/components/Gallery.jsx`:
- **`useCallback`**: Memoizes `handleSearchChange`. Explain that because React's state setter `setSearchQuery` has a stable reference, the dependency array is empty `[]`.
- **`useMemo`**: Computes `filteredPhotos` based on `[photos, searchQuery]`.
- **Why it matters**: When the user clicks the heart icon to toggle favourites, the component re-renders, but `useMemo` prevents re-calculating the search filter because neither `photos` nor `searchQuery` changed.

### 5. Explain a Real Challenge Faced (4:15 - 5:00)
- **Challenge**: In React 18/19 StrictMode, effects run twice on mount in development. An initial fetch might be aborted by the cleanup function, which can mistakenly trigger an error state if not handled.
- **Solution**: Handled `err.name === 'AbortError'` in `catch` and verified `!controller.signal.aborted` before setting `loading` to false, ensuring seamless mounting without false error alerts.
