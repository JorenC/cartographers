import { CardData } from "../utils/deckUtils";

interface CardProps {
  card: CardData;
}

function Card({ card }: CardProps) {
  const isAmbush = card.type === "ambush";

  return (
    <div
      className={`relative w-[200px] h-[350px] overflow-hidden rounded-lg border-2 ${
        isAmbush ? "border-red-600 shadow-[0_0_20px_red]" : "border-gray-300"
      }`}
    >
      {/* Card Image */}
      <img
        src={`/cards/${card.id}.png`}
        alt={card.description}
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = ""; // Hide broken image
        }}
      />

      {/* Top overlay (title and points) */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-2 bg-black bg-opacity-50">
        <span className="text-white text-sm font-bold">{card.name}</span>
        <span className="text-white text-sm font-bold">
          {card.value > 0 ? `+${card.value}` : ""}
        </span>
      </div>
    </div>
  );
}

export default Card;
