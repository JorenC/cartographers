import { CardData } from "./deckUtils";

export function preloadCardImages(
  deck: (CardData | ScoringCard)[],
  type: "explore" | "scoring",
) {
  deck.forEach((card) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href =
      type === "scoring"
        ? `/cards/scoring/${card.id}.png`
        : `/cards/${card.id}.png`;
    document.head.appendChild(link);
  });
}
