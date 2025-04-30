import { useState, useEffect } from "react";
import SeasonDisplay from "./SeasonDisplay";
import DeckArea from "./DeckArea";
import EndGameModal from "./EndGameModal";
import ActiveEffectsBar from "./ActiveEffectsBar";
import { createSeasonDeck, CardData } from "../utils/deckUtils";
import { preloadCardImages } from "../utils/preload";
import { ScoringCard } from "../utils/scoringCards";

const seasons = ["Spring", "Summer", "Autumn", "Winter"];
const seasonPointLimits = [8, 8, 7, 6];

interface GameScreenProps {
  scoringCards: Record<string, ScoringCard>;
  expansions: string[];
}

function GameScreen({ scoringCards, expansions }: GameScreenProps) {
  const [gameOver, setGameOver] = useState(false);
  const [seasonIndex, setSeasonIndex] = useState(0);
  const [usedPoints, setUsedPoints] = useState(0);
  const [drawnCards, setDrawnCards] = useState<CardData[]>([]);
  const [deck, setDeck] = useState<CardData[]>([]);
  const [usedAmbushIds, setUsedAmbushIds] = useState<string[]>([]);
  const [previousUndrawnAmbushes, setPreviousUndrawnAmbushes] = useState<
    CardData[]
  >([]);
  const [activeEffectCards, setActiveEffectCards] = useState<CardData[]>([]); // ✅ NEW

  useEffect(() => {
    startNewSeason();
  }, []);

  const startNewSeason = () => {
    const {
      deck: newDeck,
      newUsedAmbushId,
      newPreviousUndrawnAmbushes,
    } = createSeasonDeck(usedAmbushIds, previousUndrawnAmbushes, expansions);

    preloadCardImages(newDeck, "explore");

    setDeck(newDeck);
    setPreviousUndrawnAmbushes(newPreviousUndrawnAmbushes);
    setDrawnCards([]);
    setUsedPoints(0);
  };

  const season = seasons[seasonIndex];
  const totalPoints = seasonPointLimits[seasonIndex];

  const activeScoring = (() => {
    if (season === "Spring") return ["A", "B"];
    if (season === "Summer") return ["B", "C"];
    if (season === "Autumn") return ["C", "D"];
    if (season === "Winter") return ["D", "A"];
    return [];
  })();

  const handleDrawCard = () => {
    if (deck.length === 0) return;
    const nextCard = deck[0];
    setDeck(deck.slice(1));
    setDrawnCards([...drawnCards, nextCard]);
    setUsedPoints(usedPoints + nextCard.value);

    if (nextCard.type === "ambush") {
      setPreviousUndrawnAmbushes((prev) =>
        prev.filter((card) => card.id !== nextCard.id),
      );
      setUsedAmbushIds((prev) => [...prev, nextCard.id]);
    }

    // ✅ Handle persistent effects
    if (nextCard.specialEffect) {
      setActiveEffectCards((prev) => [...prev, nextCard]);
    }
  };

  const handleNextSeason = () => {
    if (seasonIndex < 3) {
      setSeasonIndex(seasonIndex + 1);
      startNewSeason();
    } else {
      setGameOver(true);
    }
  };

  return (
    <>
      {gameOver && (
        <EndGameModal
          scoringCards={scoringCards}
          onEndGame={() => window.location.reload()}
        />
      )}

      {!gameOver && (
        <div className="flex flex-col items-center min-h-screen p-8">
          <SeasonDisplay
            season={season}
            activeScoring={activeScoring}
            scoringCards={scoringCards}
            usedPoints={usedPoints}
            totalPoints={totalPoints}
            onDrawCard={handleDrawCard}
            canDraw={usedPoints < totalPoints}
            onNextSeason={handleNextSeason}
            canGoNextSeason={usedPoints >= totalPoints}
            activeEffectCards={activeEffectCards}
          />
          <DeckArea drawnCards={drawnCards} />
        </div>
      )}
    </>
  );
}

export default GameScreen;
