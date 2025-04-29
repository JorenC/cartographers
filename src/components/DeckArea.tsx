import { useEffect, useRef } from "react";
import Card from "./Card";
import { CardData } from "../utils/deckUtils";

interface DeckAreaProps {
  drawnCards: CardData[];
}

function DeckArea({ drawnCards }: DeckAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to right when a new card is drawn
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
      className="w-full overflow-x-auto mt-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
    >
      <div className="flex flex-nowrap items-start gap-4">
        {drawnCards.map((card) => (
          <div key={card.id} className="flex-shrink-0">
            <Card card={card} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeckArea;
