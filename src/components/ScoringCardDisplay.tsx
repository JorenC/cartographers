import { useState } from "react";
import { ScoringCard } from "../utils/scoringCards";
import ScoringCardModal from "./ScoringCardModal";

interface ScoringCardDisplayProps {
  card: ScoringCard;
  active: boolean;
  letter: string;
}

function ScoringCardDisplay({ card, active, letter }: ScoringCardDisplayProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={`relative w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-lg border-2 overflow-hidden transition-shadow cursor-pointer ${
          active
            ? "border-white shadow-[0_0_12px_2px_rgba(255,255,255,0.9)]"
            : "border-black"
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
      </div>

      {/* Title (Letter + Name) */}
      <div className="text-xs md:text-sm mt-1 text-white text-center max-w-[150px]">
        {letter} {card.name}
        {/* Description only if height ≥ 900px */}
        <div className="hidden [@media(min-height:900px)]:block text-[10px] text-gray-300 mt-1 leading-tight">
          {card.description}
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
