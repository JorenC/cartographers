import { useEffect, useState } from "react";
import SeasonDisplay from "./SeasonDisplay";
import DeckArea from "./DeckArea";
import EndGameModal from "./EndGameModal";
import { createSeasonDeck, CardData } from "../utils/deckUtils";
import { preloadCardImages } from "../utils/preload";
import { ScoringCard } from "../utils/scoringCards";
import {
  specialCardEffects,
  specialEffectHandlers,
} from "../utils/specialEffects";

const seasons = ["Spring", "Summer", "Autumn", "Winter"];
const seasonPointLimits = [8, 8, 7, 6];

const seasonBackgrounds: Record<string, string> = {
  Spring: "/backgroundspring.png",
  Summer: "/backgroundsummer.png",
  Autumn: "/backgroundautumn.png",
  Winter: "/backgroundwinter.png",
};

interface GameScreenProps {
  scoringCards: Record<string, ScoringCard>;
  expansions: string[];
  baseSet: "cartographers" | "heroes";
  onReturnToHome: () => void;
}

function GameScreen({
  scoringCards,
  expansions,
  baseSet,
  onReturnToHome,
}: GameScreenProps) {
  const [seasonIndex, setSeasonIndex] = useState(0);
  const [usedPoints, setUsedPoints] = useState(0);
  const [drawnCards, setDrawnCards] = useState<CardData[]>([]);
  const [deck, setDeck] = useState<CardData[]>([]);
  const [usedAmbushIds, setUsedAmbushIds] = useState<string[]>([]);
  const [previousUndrawnAmbushes, setPreviousUndrawnAmbushes] = useState<
    CardData[]
  >([]);
  const [usedHeroIds, setUsedHeroIds] = useState<string[]>([]);
  const [previousUndrawnHeroes, setPreviousUndrawnHeroes] = useState<
    CardData[]
  >([]);

  const [activeEffectCards, setActiveEffectCards] = useState<CardData[]>([]);
  const [showRecap, setShowRecap] = useState(false);

  useEffect(() => {
    startNewSeason();
  }, []);

  const startNewSeason = () => {
    const {
      deck: newDeck,
      newPreviousUndrawnAmbushes,
      newUsedAmbushId,
      newUsedHeroId,
      newPreviousUndrawnHeroes,
    } = createSeasonDeck(
      usedAmbushIds,
      previousUndrawnAmbushes,
      usedHeroIds,
      previousUndrawnHeroes,
      expansions,
      baseSet,
    );

    preloadCardImages(newDeck, "explore");

    setDeck(newDeck);
    setPreviousUndrawnAmbushes(newPreviousUndrawnAmbushes);
    setPreviousUndrawnHeroes(newPreviousUndrawnHeroes);
    setUsedAmbushIds((prev) => [...prev, newUsedAmbushId]);
    if (newUsedHeroId) {
      setUsedHeroIds((prev) => [...prev, newUsedHeroId]);
    }
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

    setDeck(remainingDeck);
    setDrawnCards((prev) => [...prev, nextCard]);
    setUsedPoints((prev) => prev + nextCard.value);

    if (nextCard.type === "ambush") {
      setPreviousUndrawnAmbushes((prev) =>
        prev.filter((card) => card.id !== nextCard.id),
      );
      setUsedAmbushIds((prev) => [...prev, nextCard.id]);
    }

    if (nextCard.type === "hero") {
      setPreviousUndrawnHeroes((prev) =>
        prev.filter((card) => card.id !== nextCard.id),
      );
      setUsedHeroIds((prev) => [...prev, nextCard.id]);
    }

    if (nextCard.specialEffect) {
      setActiveEffectCards((prev) => [...prev, nextCard]);
    }

    // Handle special effects (e.g., Fungoid Outbreak)
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
    setShowRecap(true); // show recap modal at end of each season
  };

  const handleEndSeasonRecap = () => {
    if (seasonIndex < 3) {
      setSeasonIndex((prev) => prev + 1);
      startNewSeason();
      setShowRecap(false);
    } else {
      onReturnToHome(); // go back to home screen after winter
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
          season={season} // ✅ Pass season
          onContinue={handleEndSeasonRecap}
        />
      )}

      {!showRecap && (
        <div className="relative w-full min-h-screen overflow-visible">
          {/* Spring background image */}
          {seasonBackgrounds[season] && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 z-0 pointer-events-none"
              style={{ backgroundImage: `url(${seasonBackgrounds[season]})` }}
            />
          )}

          {/* Foreground app content */}
          <div className="relative z-10 flex flex-col items-stretch p-8 min-h-screen overflow-visible">
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
        </div>
      )}
    </>
  );
}

export default GameScreen;
