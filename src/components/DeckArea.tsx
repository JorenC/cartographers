import Card from "./Card";

import { CardData } from "../utils/deckUtils";

interface DeckAreaProps {
  onDrawCard: () => void;
  canDraw: boolean;
  drawnCards: CardData[];
  onNextSeason: () => void;
}

function DeckArea({
  onDrawCard,
  canDraw,
  drawnCards,
  onNextSeason,
}: DeckAreaProps) {
  return (
    <div className="mt-8 flex flex-col items-center gap-6">
      <div>
        <button
          onClick={onDrawCard}
          className={`p-4 border-2 rounded-lg ${
            canDraw
              ? "bg-white hover:bg-gray-100"
              : "opacity-50 pointer-events-none"
          }`}
        >
          📦 Click to Draw Card
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mt-6">
        {drawnCards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>

      {!canDraw && (
        <button
          onClick={onNextSeason}
          className="mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
        >
          Next Season
        </button>
      )}
    </div>
  );
}

export default DeckArea;
