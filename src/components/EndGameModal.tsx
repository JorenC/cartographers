import { ScoringCard } from "../utils/scoringCards";
import { CardData } from "../utils/deckUtils";
import ScoringCardDisplay from "./ScoringCardDisplay";

interface EndGameModalProps {
  scoringCards: Record<string, ScoringCard>;
  activeScoring: string[];
  activeEffectCards: CardData[];
  isFinalSeason: boolean;
  onContinue: () => void;
}

function EndGameModal({
  scoringCards,
  activeScoring,
  activeEffectCards,
  isFinalSeason,
  onContinue,
}: EndGameModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-8 overflow-y-auto">
      <div className="bg-zinc-900 rounded-lg shadow-lg p-6 w-full max-w-6xl flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-white text-center">
          {isFinalSeason ? "Game Over" : "Season Scoring"}
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* LEFT: Active Effects */}
          <div className="w-full md:w-1/2 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <h2 className="text-xl text-white font-semibold mb-3">
              Active Effects
            </h2>
            <div className="flex flex-col gap-3 pr-2">
              {activeEffectCards.length === 0 && (
                <div className="text-gray-400 italic">No active effects</div>
              )}
              {activeEffectCards.map((card) => (
                <div
                  key={card.id}
                  className="flex items-center bg-zinc-800 p-3 rounded-md gap-3"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-600 flex-shrink-0">
                    <img
                      src={`/cards/${card.id}.png`}
                      alt={card.name}
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: "center top",
                        transform: "scale(1.4)",
                      }}
                      onError={(e) =>
                        ((e.target as HTMLImageElement).style.display = "none")
                      }
                    />
                  </div>
                  <div className="text-white text-sm">
                    <div className="font-bold">{card.name}</div>
                    <div className="text-xs text-gray-300">
                      {card.specialEffect}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Scoring Cards */}
          <div className="w-full md:w-1/2">
            <h2 className="text-xl text-white font-semibold mb-3">
              Scoring Cards
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeScoring.map((letter) => {
                const card = scoringCards[letter];
                return (
                  <div
                    key={letter}
                    className="flex flex-col items-center bg-zinc-800 rounded-lg p-2"
                  >
                    {/* Frame background */}
                    <div className="relative w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-lg overflow-hidden mb-2">
                      <img
                        src="/cards/scoring/background.png"
                        alt=""
                        aria-hidden
                        className="absolute inset-0 w-full h-full object-cover rounded-lg z-0"
                      />
                      <img
                        src={`/cards/scoring/${card.id}.png`}
                        alt={card.description}
                        className="relative w-full h-full object-contain z-10"
                        onError={(e) =>
                          ((e.target as HTMLImageElement).style.display =
                            "none")
                        }
                      />
                    </div>
                    <div className="text-white text-center px-2">
                      <div className="font-bold text-sm">{card.name}</div>
                      <div className="text-xs text-gray-300 mt-1">
                        {card.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={onContinue}
            className="px-6 py-3 bg-yellow-800 hover:bg-yellow-700 text-white text-lg rounded-lg shadow"
          >
            {isFinalSeason ? "End Game" : "Next Season"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EndGameModal;
