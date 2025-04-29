import { ScoringCard } from "../utils/scoringCards";

interface ScoringCardDisplayProps {
  card: ScoringCard;
  active: boolean;
}

function ScoringCardDisplay({ card, active }: ScoringCardDisplayProps) {
  console.log(card);
  return (
    <div
      className={`relative w-[150px] h-[200px] overflow-hidden rounded-lg border-2 ${
        active ? "border-yellow-400" : "border-gray-300"
      } group`}
      title={card.description} // Tooltip on hover
    >
      {/* Card Image */}
      <img
        src={`/cards/scoring/${card.id}.png`}
        alt={card.description}
        className="w-full h-full object-cover"
        onError={(e) => {
          console.error(`Error loading image for card ID: ${card.id}`);
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />

      {/* Top Center Title Overlay */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 p-1 bg-black bg-opacity-50 text-white text-xs font-bold text-center w-full">
        {card.name}
      </div>
    </div>
  );
}

export default ScoringCardDisplay;
