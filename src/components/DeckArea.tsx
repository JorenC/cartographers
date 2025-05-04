import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { CardData } from "../utils/deckUtils";

interface DeckAreaProps {
  drawnCards: CardData[];
}

function DeckArea({ drawnCards }: DeckAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [drawnCards.length]);

  return (
    <div className="w-full mt-6 pb-4 overflow-visible">
      <div
        className="w-full overflow-x-auto overflow-y-visible py-12"
        ref={scrollRef}
      >
        <div
          className="flex gap-4 items-start overflow-visible px-6"
          style={{ minWidth: "max-content" }}
        >
          {drawnCards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className="cursor-pointer p-1"
            >
              <Card card={card} />
            </div>
          ))}

          {selectedCard && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center"
              onClick={() => setSelectedCard(null)}
            >
              <Card card={selectedCard} large />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeckArea;
