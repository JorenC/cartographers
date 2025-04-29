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
      <div className="flex flex-wrap gap-4">
        {drawnCards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default DeckArea;
