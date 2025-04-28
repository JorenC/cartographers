import { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import GameScreen from "./components/GameScreen";

function App() {
  const [screen, setScreen] = useState<"home" | "game">("home");

  return (
    <>
      {screen === "home" && <HomeScreen onStart={() => setScreen("game")} />}
      {screen === "game" && <GameScreen />}
    </>
  );
}

export default App;
