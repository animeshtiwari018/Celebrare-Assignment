import Gallery from './components/Gallery';

/**
 * App Component
 *
 * Root component that provides the main page layout and renders the Gallery.
 */
function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      <main>
        <Gallery />
      </main>
    </div>
  );
}

export default App;
