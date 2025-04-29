import { ScoringCard } from "../utils/scoringCards";

interface ScoringCardModalProps {
  card: ScoringCard;
  onClose: () => void;
}

function ScoringCardModal({ card, onClose }: ScoringCardModalProps) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close if clicking outside the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-8"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white rounded-lg overflow-hidden flex flex-col md:flex-row max-w-3xl w-full max-h-[90vh]">
        {/* Close X Icon */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          {/* Inline SVG for X Icon */}
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

        {/* Left: Card Image */}
        <div className="w-full md:w-auto flex justify-start items-start">
          <img
            src={`/cards/scoring/${card.id}.png`}
            alt={card.description}
            className="max-h-[400px] w-auto object-contain"
            onError={(e) => {
              console.error(`Error loading image for card ID: ${card.id}`);
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Right: Title + Description */}
        <div className="flex-1 p-4 flex flex-col justify-start">
          <h2 className="text-3xl font-bold mb-4">{card.name}</h2>
          <p className="text-lg text-gray-700">{card.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ScoringCardModal;
