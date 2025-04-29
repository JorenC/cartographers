import { ScoringCard } from "../utils/scoringCards";
import ScoringCardDisplay from "./ScoringCardDisplay";

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
