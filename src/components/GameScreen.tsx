import { useState, useEffect } from "react";
import SeasonDisplay from "./SeasonDisplay";
import DeckArea from "./DeckArea";
import EndGameModal from "./EndGameModal";
import ActiveEffectsBar from "./ActiveEffectsBar";
import { createSeasonDeck, CardData } from "../utils/deckUtils";
import { preloadCardImages } from "../utils/preload";
import { ScoringCard } from "../utils/scoringCards";
import {
  specialCardEffects,
  specialEffectHandlers,
} from "../utils/specialEffects";

const seasons = ["Spring", "Summer", "Autumn", "Winter"];
const seasonPointLimits = [8, 8, 7, 6];

interface GameScreenProps {
  scoringCards: Record<string, ScoringCard>;
  expansions: string[];
  onReturnToHome: () => void;
}

function GameScreen({
  scoringCards,
  expansions,
  onReturnToHome,
}: GameScreenProps) {
  const [showRecap, setShowRecap] = useState(false);
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
    const remainingDeck = deck.slice(1);

    console.log(remainingDeck);

    setDeck(remainingDeck);
    setDrawnCards((prev) => [...prev, nextCard]);
    setUsedPoints((prev) => prev + nextCard.value);

    if (nextCard.type === "ambush") {
      setPreviousUndrawnAmbushes((prev) =>
        prev.filter((card) => card.id !== nextCard.id),
      );
      setUsedAmbushIds((prev) => [...prev, nextCard.id]);
    }

    if (nextCard.specialEffect) {
      setActiveEffectCards((prev) => [...prev, nextCard]);
    }

    // ✅ Check for and run any special card effects
    const effectId = specialCardEffects[nextCard.id];
    if (effectId) {
      const effectHandler = specialEffectHandlers[effectId];
      if (effectHandler) {
        effectHandler({
          currentDeck: remainingDeck,
          usedAmbushIds,
          previousUndrawnAmbushes,
          expansions,
          addCardsToDeck: (newDeck) => {
            setDeck(newDeck);

            // ✅ Log the change
            const added = newDeck.find(
              (card) => !deck.includes(card) && card.type === "ambush",
            );
            if (added) {
              console.log(
                `Special effect '${effectId}' triggered by ${nextCard.id} — inserted ambush card: ${added.id} (${added.name})`,
              );
            } else {
              console.log(
                `Special effect '${effectId}' triggered by ${nextCard.id}, but no ambush card was added.`,
              );
            }
          },
        });
      }
    }
  };

  const handleNextSeason = () => {
    setShowRecap(true); // Show modal first
  };

  const handleEndSeasonRecap = () => {
    if (seasonIndex < 3) {
      setSeasonIndex(seasonIndex + 1);
      startNewSeason();
      setShowRecap(false);
    } else {
      onReturnToHome();
    }
  };

  return (
    <>
      {showRecap && (
        <EndGameModal
          scoringCards={scoringCards}
          activeScoring={activeScoring}
          activeEffectCards={activeEffectCards}
          isFinalSeason={seasonIndex === 3}
          onContinue={handleEndSeasonRecap}
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
