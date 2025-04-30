import { useEffect, useState } from "react";
import { availableExpansions, Expansion } from "../utils/expansions";
import { deckA, deckB, deckC, deckD, ScoringCard } from "../utils/scoringCards";
import { preloadCardImages } from "../utils/preload";

interface HomeScreenProps {
  onStart: (
    scoringCards: Record<string, ScoringCard>,
    selectedExpansions: string[],
  ) => void;
}

function HomeScreen({ onStart }: HomeScreenProps) {
  const [scoringCards, setScoringCards] = useState<Record<
    string,
    ScoringCard
  > | null>(null);
  const [selectedExpansions, setSelectedExpansions] = useState<string[]>([]);

  useEffect(() => {
    const randomFrom = <T,>(deck: T[]): T =>
      deck[Math.floor(Math.random() * deck.length)];
    const selected = {
      A: randomFrom(deckA),
      B: randomFrom(deckB),
      C: randomFrom(deckC),
      D: randomFrom(deckD),
    };
    setScoringCards(selected);
    preloadCardImages(Object.values(selected), "scoring");
  }, []);

  const toggleExpansion = (id: string) => {
    setSelectedExpansions((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id],
    );
  };

  const handleStartClick = () => {
    if (scoringCards) {
      onStart(scoringCards, selectedExpansions);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-left md:bg-center flex flex-col items-center justify-center text-white px-4 relative"
      style={{ backgroundImage: 'url("/splash.png")' }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Foreground */}
      <div className="z-10 flex flex-col items-center gap-6 text-center">
        <h1 className="text-5xl font-bold drop-shadow-lg">Cartographers</h1>
        <p className="max-w-xl text-lg drop-shadow">
          A web implementation of the award-winning flip-and-write game where
          you map the wilderness and defend it from ambushes.
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
          <a
            href="/printmap.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
          >
            Printer Friendly Map
          </a>
        </div>

        {/* Expansions */}
        <div className="mt-6 text-white text-center">
          <h3 className="text-lg font-semibold mb-2">Expansions</h3>
          <div className="flex flex-col items-center gap-2">
            {availableExpansions.map((exp) => (
              <label key={exp.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedExpansions.includes(exp.id)}
                  onChange={() => toggleExpansion(exp.id)}
                />
                {exp.name}
              </label>
            ))}
          </div>
        </div>

        {/* Start Game */}
        <button
          onClick={handleStartClick}
          className="mt-6 px-6 py-3 bg-yellow-800 hover:bg-yellow-700 text-white text-lg rounded-lg shadow-lg"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;
