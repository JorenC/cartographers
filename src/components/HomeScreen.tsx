import { useEffect, useState } from "react";
import { availableExpansions } from "../utils/expansions";
import {
  deckA,
  deckB,
  deckC,
  deckD,
  heroDeckA,
  heroDeckB,
  heroDeckC,
  heroDeckD,
} from "../utils/scoringCards";

import { preloadCardImages } from "../utils/preload";

interface HomeScreenProps {
  onStart: (
    scoringCards: Record<string, ScoringCard>,
    selectedExpansions: string[],
    baseSet: "cartographers" | "heroes",
  ) => void;
}

function HomeScreen({ onStart }: HomeScreenProps) {
  const [scoringCards, setScoringCards] = useState<Record<
    string,
    ScoringCard
  > | null>(null);
  const [selectedExpansions, setSelectedExpansions] = useState<string[]>([]);
  const [baseSet, setBaseSet] = useState<"cartographers" | "heroes">(
    "cartographers",
  );

  const shuffle = <T,>(array: T[]): T[] => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  useEffect(() => {
    const randomFrom = <T,>(deck: T[]): T =>
      deck[Math.floor(Math.random() * deck.length)];

    const baseDecks = {
      A: baseSet === "heroes" ? heroDeckA : deckA,
      B: baseSet === "heroes" ? heroDeckB : deckB,
      C: baseSet === "heroes" ? heroDeckC : deckC,
      D: baseSet === "heroes" ? heroDeckD : deckD,
    };

    const shuffledLetters = shuffle(["A", "B", "C", "D"]);

    const selected: Record<string, ScoringCard> = {};
    shuffledLetters.forEach((letter) => {
      selected[letter] = randomFrom(baseDecks[letter]);
    });

    setScoringCards(selected);
    preloadCardImages(Object.values(selected), "scoring");
  }, [baseSet]);

  const toggleExpansion = (id: string) => {
    setSelectedExpansions((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id],
    );
  };

  const handleStartClick = () => {
    if (scoringCards) {
      onStart(scoringCards, selectedExpansions, baseSet); // ✅ pass baseSet
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
          A web implementation of the flip-and-write game where you map the
          wilderness and defend it from ambushes.
        </p>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Base Set</h3>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="baseSet"
              value="cartographers"
              checked={baseSet === "cartographers"}
              onChange={() => setBaseSet("cartographers")}
            />
            Cartographers
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="baseSet"
              value="heroes"
              checked={baseSet === "heroes"}
              onChange={() => setBaseSet("heroes")}
            />
            Heroes
          </label>
        </div>

        {/* Expansions */}
        <div className="mt-6 text-white text-center">
          <h3 className="text-lg font-semibold mb-2">Expansions</h3>
          <div className="flex flex-col items-center gap-2">
            {availableExpansions
              .filter((exp) => exp.id !== "base" && exp.id !== "heroes") // ✅ hide base sets //Here we hide the base sets, but we need to changes this later into mix-and-match of monsters
              .map((exp) => (
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
            Maps
          </a>
          <a
            href="/printmap.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
          >
            Maps (Printer Friendly)
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
