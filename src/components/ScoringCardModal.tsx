import { ScoringCard } from "../utils/scoringCards";

interface ScoringCardModalProps {
  card: ScoringCard;
  onClose: () => void;
}

function ScoringCardModal({ card, onClose }: ScoringCardModalProps) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-6"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white rounded-lg overflow-hidden flex flex-col md:flex-row w-full max-w-lg md:max-w-3xl max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 z-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Card image with background */}
        <div className="w-full md:w-auto flex justify-center items-center p-4 relative">
          {/* Background */}
          <img
            src="/cards/scoring/background.png"
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover rounded-tl-lg rounded-bl-lg"
          />

          {/* Transparent card */}
          <img
            src={`/cards/scoring/${card.id}.png`}
            alt={card.description}
            className="relative w-full h-auto max-h-[400px] object-contain z-10 rounded-tl-lg rounded-bl-lg"
            onError={(e) => {
              console.error(`Error loading scoring card image: ${card.id}`);
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Description area */}
        <div className="flex-1 flex flex-col justify-start p-6">
          <h2 className="text-3xl font-bold text-black mb-6 mt-4">
            {card.name}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {card.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ScoringCardModal;
