interface HomeScreenProps {
  onStart: () => void;
}

function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-5xl font-bold">Cartographers</h1>
      <button
        onClick={onStart}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg"
      >
        Start Game
      </button>
    </div>
  );
}

export default HomeScreen;
