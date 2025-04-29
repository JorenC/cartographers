import { ScoringCard } from "../utils/scoringCards";
import ScoringCardDisplay from "./ScoringCardDisplay";

interface EndGameModalProps {
  scoringCards: Record<string, ScoringCard>;
  onEndGame: () => void;
}

function EndGameModal({ scoringCards, onEndGame }: EndGameModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50 p-8">
      <h1 className="text-5xl text-white font-bold mb-8">Game Over</h1>

      <div className="flex gap-8 mb-8">
        {["A", "B", "C", "D"].map((letter) => (
          <div key={letter} className="flex flex-col items-center">
            <ScoringCardDisplay
              card={scoringCards[letter]}
              active={false} // no highlight needed at end
            />
            <div className="mt-2 text-lg font-semibold text-white">
              {letter}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onEndGame}
        className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xl font-bold"
      >
        End Game
      </button>
    </div>
  );
}

export default EndGameModal;
