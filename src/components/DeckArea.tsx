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
    <div
      ref={scrollRef}
      className="mt-6 overflow-x-auto overflow-y-visible"
      style={{
        width: "100%",
        paddingBottom: "16px", // ensures scrollbar has space
      }}
    >
      <div
        className="flex gap-4 items-start"
        style={{
          minWidth: "max-content", // content defines width
          overflow: "visible", // allows blur
          paddingLeft: "24px", // allow glow on first card
          paddingRight: "24px", // allow glow on last card
        }}
      >
        {drawnCards.map((card) => (
          <div
            key={card.id}
            onClick={() => setSelectedCard(card)}
            className="cursor-pointer hover:scale-105 transition-transform"
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
  );
}

export default DeckArea;
