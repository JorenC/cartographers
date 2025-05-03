interface CardProps {
  card: CardData;
  large?: boolean; // <-- Add this
}

function Card({ card, large = false }: CardProps) {
  const isAmbush = card.type === "ambush";
  const height = large ? "h-[80vh]" : "h-[333px]";
  const width = large ? "w-auto max-w-[90vw]" : "w-[200px]";

  return (
    <div
      className={`relative ${width} ${height} overflow-hidden rounded-lg border-2 ${
        isAmbush ? "border-red-600 shadow-[0_0_20px_red]" : "border-gray-300"
      }`}
    >
      <img
        src={`/cards/${card.id}.png`}
        alt={card.description}
        className="w-full h-full object-cover"
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
