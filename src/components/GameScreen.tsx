import { useState, useEffect } from "react";
import SeasonDisplay from "./SeasonDisplay";
import TurnIndicator from "./TurnIndicator";
import DeckArea from "./DeckArea";
import EndGameModal from "./EndGameModal";
import { createSeasonDeck, CardData, shuffle } from "../utils/deckUtils";
import { deckA, deckB, deckC, deckD, ScoringCard } from "../utils/scoringCards";

const seasons = ["Spring", "Summer", "Autumn", "Winter"];
const seasonPointLimits = [8, 8, 7, 6];

function GameScreen() {
  const [gameOver, setGameOver] = useState(false);
  const [seasonIndex, setSeasonIndex] = useState(0);
  const [usedPoints, setUsedPoints] = useState(0);
  const [drawnCards, setDrawnCards] = useState<CardData[]>([]);
  const [deck, setDeck] = useState<CardData[]>([]);
  const [usedAmbushIds, setUsedAmbushIds] = useState<string[]>([]);
  const [previousUndrawnAmbushes, setPreviousUndrawnAmbushes] = useState<
    CardData[]
  >([]);

  const [scoringCards, setScoringCards] = useState<Record<string, ScoringCard>>(
    {
      A: { id: "", name: "" },
      B: { id: "", name: "" },
      C: { id: "", name: "" },
      D: { id: "", name: "" },
    },
  );

  useEffect(() => {
    // Create the scoring cards once at the start
    setScoringCards({
      A: shuffle(deckA)[0],
      B: shuffle(deckB)[0],
      C: shuffle(deckC)[0],
      D: shuffle(deckD)[0],
    });

    // Start the first season
    startNewSeason();
  }, []);

  const startNewSeason = () => {
    const {
      deck: newDeck,
      newUsedAmbushId,
      newPreviousUndrawnAmbushes,
    } = createSeasonDeck(usedAmbushIds, previousUndrawnAmbushes);

    console.log("New deck for season:", seasons[seasonIndex]);
    console.table(newDeck);

    setDeck(newDeck);
    setUsedAmbushIds([...usedAmbushIds, newUsedAmbushId]);
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

    // If ambush drawn, remove it from previousUndrawnAmbushes
    if (nextCard.type === "ambush") {
      setPreviousUndrawnAmbushes((prev) =>
        prev.filter((card) => card.id !== nextCard.id),
      );
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
          />
          <DeckArea drawnCards={drawnCards} />
        </div>
      )}
    </>
  );
}

export default GameScreen;
