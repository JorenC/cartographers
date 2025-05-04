import { availableExpansions } from "./expansions";

export interface CardData {
  id: string;
  name: string;
  value: number;
  type: "explore" | "ambush" | "scoring";
  description: string;
  specialEffect?: string;
}

// Fisher-Yates shuffle
export function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Get cards from base set (e.g., "base" or "heroes")
function getBaseSetCards(baseSet: string): {
  explore: CardData[];
  ambush: CardData[];
} {
  const base = availableExpansions.find((e) => e.id === baseSet);
  if (!base) throw new Error(`Base set '${baseSet}' not found`);
  return {
    explore:
      base.cards.explore?.map((c) => ({
        id: c.id,
        name: c.name,
        value: c.value || 0,
        type: "explore",
        description: c.description,
        specialEffect: c.specialEffect,
      })) || [],
    ambush:
      base.cards.ambush?.map((c) => ({
        id: c.id,
        name: c.name,
        value: c.value || 0,
        type: "ambush",
        description: c.description,
        specialEffect: c.specialEffect,
      })) || [],
  };
}

// Create the full deck for a season
export function createSeasonDeck(
  usedAmbushIds: string[],
  previousUndrawnAmbushes: CardData[],
  expansions: string[],
  baseSet: string,
): {
  deck: CardData[];
  newUsedAmbushId: string;
  newPreviousUndrawnAmbushes: CardData[];
} {
  const { explore: baseExploreCards, ambush: baseAmbushCards } =
    getBaseSetCards(baseSet);

  // Combine base + expansion ambush cards
  let allAmbushCards: CardData[] = [...baseAmbushCards];
  expansions.forEach((expId) => {
    const exp = availableExpansions.find((e) => e.id === expId);
    const extra =
      exp?.cards.ambush?.map((card) => ({
        id: card.id,
        name: card.name,
        value: card.value || 0,
        type: "ambush" as const,
        description: card.description,
        specialEffect: card.specialEffect,
      })) || [];
    allAmbushCards.push(...extra);
  });

  // Choose next ambush
  const availableAmbushes = shuffle(
    allAmbushCards.filter(
      (card) =>
        !usedAmbushIds.includes(card.id) &&
        !previousUndrawnAmbushes.some((prev) => prev.id === card.id),
    ),
  );

  if (availableAmbushes.length === 0) {
    throw new Error("No ambush cards left to add!");
  }

  const selectedAmbush = availableAmbushes[0];
  const newUndrawnAmbushes = [...previousUndrawnAmbushes, selectedAmbush];

  // Combine base + expansion explore cards
  let fullExploreDeck: CardData[] = [...baseExploreCards];
  expansions.forEach((expId) => {
    const exp = availableExpansions.find((e) => e.id === expId);
    const extra =
      exp?.cards.explore?.map((card) => ({
        id: card.id,
        name: card.name,
        value: card.value || 0,
        type: "explore" as const,
        description: card.description,
        specialEffect: card.specialEffect,
      })) || [];
    fullExploreDeck.push(...extra);
  });

  // Final deck = shuffled explore + current ambush
  const shuffledDeck = shuffle([
    ...shuffle(fullExploreDeck),
    ...newUndrawnAmbushes,
  ]);

  return {
    deck: shuffledDeck,
    newUsedAmbushId: selectedAmbush.id,
    newPreviousUndrawnAmbushes: newUndrawnAmbushes,
  };
}

export function getCardById(id: string): CardData | undefined {
  for (const expansion of availableExpansions) {
    const cards = [
      ...(expansion.cards.explore || []),
      ...(expansion.cards.ambush || []),
      ...(expansion.cards.scoring || []),
    ];

    const found = cards.find((card) => card.id === id);
    if (found) {
      return {
        id: found.id,
        name: found.name,
        value: found.value || 0,
        description: found.description,
        specialEffect: found.specialEffect,
        type: expansion.cards.ambush?.some((c) => c.id === found.id)
          ? "ambush"
          : expansion.cards.explore?.some((c) => c.id === found.id)
            ? "explore"
            : "scoring",
      };
    }
  }

  return undefined;
}
