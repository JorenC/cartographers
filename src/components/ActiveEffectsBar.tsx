import { useState } from "react";
import { CardData } from "../utils/deckUtils";
import Card from "./Card";

interface Props {
  cards: CardData[];
}

export default function ActiveEffectsBar({ cards }: Props) {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  return (
    <>
      {cards.length > 0 && (
        <div className="mt-4 w-full flex flex-wrap gap-3 items-center">
          <h2 className="text-black font-semibold text-md w-full">
            Active Effects:
          </h2>
          {cards.map((card) => (
            <div
              key={card.id}
              className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-600 cursor-pointer hover:scale-110 transition-transform"
              title={card.specialEffect}
              onClick={() => setSelectedCard(card)}
            >
              <img
                src={`/cards/${card.id}.png`}
                alt={card.name}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: "center top", // Focus on top center
                  transform: "scale(1.4)", // Zoom in without affecting outer size
                }}
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = "none")
                }
              />
            </div>
          ))}
        </div>
      )}

      {selectedCard && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center"
          onClick={() => setSelectedCard(null)}
        >
          <Card card={selectedCard} large />
        </div>
      )}
    </>
  );
}
