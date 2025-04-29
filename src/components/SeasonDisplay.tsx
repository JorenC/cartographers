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
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Draw Card
          </button>

          {canGoNextSeason && (
            <button
              onClick={onNextSeason}
              className="px-4 py-2 rounded-md text-white text-sm font-semibold bg-green-600 hover:bg-green-700"
            >
              Next Season
            </button>
          )}
        </div>
      </div>

      {/* Right side: Scoring cards */}
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
  );
}

export default SeasonDisplay;
