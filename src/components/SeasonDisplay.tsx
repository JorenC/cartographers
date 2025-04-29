import { ScoringCard } from "../utils/scoringCards";
import ScoringCardDisplay from "./ScoringCardDisplay";

interface SeasonDisplayProps {
  season: string;
  activeScoring: string[];
  scoringCards: Record<string, ScoringCard>;
  usedPoints: number;
  totalPoints: number;
  onDrawCard: () => void;
  canDraw: boolean;
  onNextSeason: () => void;
  canGoNextSeason: boolean;
}

function SeasonDisplay({
  season,
  activeScoring,
  scoringCards,
  usedPoints,
  totalPoints,
  onDrawCard,
  canDraw,
  onNextSeason,
  canGoNextSeason,
}: SeasonDisplayProps) {
  return (
    <div className="flex justify-between items-start w-full px-8">
      {/* Left side: Season + Points + Draw Button */}
      <div className="flex flex-col gap-2">
        <div className="text-3xl font-bold">
          {season}{" "}
          <span className="text-xl font-normal text-gray-500">
            ({activeScoring.join(" + ")})
          </span>
        </div>

        <div className="text-md text-gray-600">
          Season length: {usedPoints} / {totalPoints}
        </div>

        {/* Draw + Next Season Buttons */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={onDrawCard}
            disabled={!canDraw}
            className={`px-4 py-2 rounded-md text-white text-sm font-semibold ${
              canDraw
                ? "bg-yellow-800 hover:bg-yellow-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Draw Card
          </button>

          {canGoNextSeason && (
            <button
              onClick={onNextSeason}
              className="px-4 py-2 rounded-md text-white text-sm font-semibold bg-yellow-800 hover:bg-yellow-700"
            >
              {season === "Winter" ? "End Game" : "Next Season"}
            </button>
          )}
        </div>
      </div>

      {/* Right side: Scoring cards */}
      <div className="relative p-4 border-4 border-[rgba(191,54,12,0.3)] bg-brown-200/20 rounded-lg">
        {/* Scoring Label */}
        <div className="absolute -top-4 left-4 bg-white text-black text-xs px-2 py-1 rounded-md font-bold uppercase tracking-wide">
          Scoring cards
        </div>

        {/* Scoring Cards */}
        <div className="flex gap-4">
          {["A", "B", "C", "D"].map((letter) => (
            <div key={letter} className="flex flex-col items-center">
              <ScoringCardDisplay
                card={scoringCards[letter]}
                active={activeScoring.includes(letter)}
              />
              <div className="mt-1 text-xs font-semibold">{letter}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SeasonDisplay;
