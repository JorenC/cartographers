import { CardData } from "../utils/deckUtils";

interface CardProps {
  card: CardData;
  large?: boolean;
}

function Card({ card, large = false }: CardProps) {
  const isAmbush = card.type === "ambush";
  const isHero = card.type === "hero"; // ✅ Add this

  const height = large ? "h-[80vh]" : "h-[333px]";
  const width = large ? "w-auto max-w-[90vw]" : "w-[200px]";

  const borderClass = isAmbush
    ? "border-red-600 shadow-[0_0_20px_red]"
    : isHero
      ? "border-gray-500 shadow-[0_0_20px_gray]" // ✅ Grey styling for hero
      : "border-black-300";

  return (
    <div
      className={`relative ${width} ${height} overflow-hidden transition-transform duration-300 hover:scale-110 rounded-lg border-2 ${borderClass}`}
    >
      <img
        src={`/cards/${card.id}.png`}
        alt={card.description}
        className="w-full h-full object-cover "
        onError={(e) => {
          (e.target as HTMLImageElement).src = "";
        }}
      />
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
