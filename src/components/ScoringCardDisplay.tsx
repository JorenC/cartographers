import { useState } from "react";
import { ScoringCard } from "../utils/scoringCards";
import ScoringCardModal from "./ScoringCardModal";

interface ScoringCardDisplayProps {
  card: ScoringCard;
  active: boolean;
}

function ScoringCardDisplay({ card, active }: ScoringCardDisplayProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Card clickable box */}
      <div
        onClick={() => setIsOpen(true)}
        className={`relative w-[120px] h-[160px] overflow-hidden rounded-lg border-2 cursor-pointer ${
          active ? "border-yellow-400" : "border-gray-300"
        } group`}
        title={card.description}
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

        {/* Full-width dark title overlay at top */}
        <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs font-bold p-1 text-center">
          {card.name}
        </div>

        {/* Bottom left: Question icon */}
        <div className="absolute bottom-1 right-1 text-white opacity-80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10c0-1.104.896-2 2-2h2c1.104 0 2 .896 2 2 0 1-1 2-2 2s-2 1-2 2m0 4h.01M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
            />
          </svg>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <ScoringCardModal card={card} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}

export default ScoringCardDisplay;
