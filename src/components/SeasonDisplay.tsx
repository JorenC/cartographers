import { ScoringCard } from "../utils/scoringCards";

interface SeasonDisplayProps {
  season: string;
  activeScoring: string[];
  scoringCards: Record<string, ScoringCard>;
}

function SeasonDisplay({
  season,
  activeScoring,
  scoringCards,
}: SeasonDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-2xl font-bold">{season}</h2>
      <div className="flex gap-4">
        {["A", "B", "C", "D"].map((letter) => (
          <div
            key={letter}
            className={`p-2 border rounded text-center w-28 ${
              activeScoring.includes(letter) ? "bg-yellow-300" : ""
            }`}
          >
            <div className="font-bold">{letter}</div>
            <div className="text-sm">{scoringCards[letter]?.name || ""}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeasonDisplay;
