import { useEffect, useRef } from "react";
import Card from "./Card";
import { CardData } from "../utils/deckUtils";

interface DeckAreaProps {
  drawnCards: CardData[];
}

function DeckArea({ drawnCards }: DeckAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

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
            style={{
              flexShrink: 0,
              marginTop: "12px", // for glow breathing room
              marginBottom: "12px",
            }}
          >
            <Card card={card} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeckArea;
