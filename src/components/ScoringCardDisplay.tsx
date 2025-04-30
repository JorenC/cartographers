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
      <div
        onClick={() => setIsOpen(true)}
        className={`relative w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-lg border-2 overflow-hidden transition-shadow cursor-pointer ${
          active
            ? "border-lime-700 shadow-[0_0_16px_4px_rgba(77,124,15,0.6)]"
            : "border-gray-300 hover:shadow-md"
        }`}
        title={card?.description || ""}
      >
        {/* Background frame image */}
        <img
          src="/cards/scoring/background.png"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover rounded-lg z-0"
        />

        {/* Transparent card image */}
        <img
          src={`/cards/scoring/${card.id}.png`}
          alt={card.description}
          className="relative w-full h-full object-contain z-10"
          onError={(e) => {
            console.error(`Error loading image for card ID: ${card.id}`);
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />

        {/* Bottom right: Info icon */}
        <div className="absolute bottom-1 right-1 text-white opacity-80 z-20">
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

      {/* Modal for full card description */}
      {isOpen && (
        <ScoringCardModal card={card} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}

export default ScoringCardDisplay;
