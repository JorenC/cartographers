import { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import GameScreen from "./components/GameScreen";
import { ScoringCard } from "./utils/scoringCards";

function App() {
  const [screen, setScreen] = useState<"home" | "game">("home");
  const [scoringCards, setScoringCards] = useState<Record<
    string,
    ScoringCard
  > | null>(null);
  const [expansions, setExpansions] = useState<string[]>([]);

  const handleStart = (
    cards: Record<string, ScoringCard>,
    selectedExpansions: string[],
  ) => {
    setScoringCards(cards);
    setExpansions(selectedExpansions);
    setScreen("game");
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {screen === "home" && <HomeScreen onStart={handleStart} />}
      {screen === "game" && scoringCards && (
        <GameScreen
          scoringCards={scoringCards}
          expansions={expansions}
          onReturnToHome={() => setScreen("home")}
        />
      )}
    </div>
  );
}

export default App;
