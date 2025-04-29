interface HomeScreenProps {
  onStart: () => void;
}

function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white px-4 relative"
      style={{ backgroundImage: 'url("/splash.png")' }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Foreground content */}
      <div className="z-10 flex flex-col items-center gap-6 text-center">
        <h1 className="text-5xl font-bold drop-shadow-lg">Cartographers</h1>
        <p className="max-w-xl text-lg drop-shadow">
          A web implementation of the flip-and-write game where you map the
          wilderness and defend it from ambushes.
        </p>

        {/* Resource links */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a
            href="/rules.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
          >
            Read Rules
          </a>
          <a
            href="/map.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
          >
            Printable Maps
          </a>
        </div>

        {/* Start Game Button */}
        <button
          onClick={onStart}
          className="mt-6 px-6 py-3 bg-yellow-800 hover:bg-yellow-700 text-white text-lg rounded-lg shadow-lg"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;
