import { availableExpansions } from "./expansions";

export interface CardData {
  id: string;
  name: string;
  value: number;
  type: "explore" | "ambush" | "scoring" | "hero"; // ⬅️ Add "hero"
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
  hero: CardData[];
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
    hero:
      base.cards.hero?.map((c) => ({
        id: c.id,
        name: c.name,
        value: c.value || 0,
        type: "hero",
        description: c.description,
        specialEffect: c.specialEffect,
      })) || [],
  };
}

// Create the full deck for a season
export function createSeasonDeck(
  usedAmbushIds: string[],
  previousUndrawnAmbushes: CardData[],
  usedHeroIds: string[],
  previousUndrawnHeroes: CardData[],
  expansions: string[],
  baseSet: string,
): {
  deck: CardData[];
  newUsedAmbushId: string;
  newPreviousUndrawnAmbushes: CardData[];
  newUsedHeroId: string; // may be ""
  newPreviousUndrawnHeroes: CardData[];
} {
  const {
    explore: baseExploreCards,
    ambush: baseAmbushCards,
    hero: baseHeroCards,
  } = getBaseSetCards(baseSet);

  // Ambush cards
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

  // Hero cards
  let allHeroCards: CardData[] = [...baseHeroCards];
  expansions.forEach((expId) => {
    const exp = availableExpansions.find((e) => e.id === expId);
    const extra =
      exp?.cards.hero?.map((card) => ({
        id: card.id,
        name: card.name,
        value: card.value || 0,
        type: "hero" as const,
        description: card.description,
        specialEffect: card.specialEffect,
      })) || [];
    allHeroCards.push(...extra);
  });

  let selectedHero: CardData | null = null;
  let newUndrawnHeroes = [...previousUndrawnHeroes];

  const availableHeroes = shuffle(
    allHeroCards.filter(
      (card) =>
        !usedHeroIds.includes(card.id) &&
        !previousUndrawnHeroes.some((prev) => prev.id === card.id),
    ),
  );

  if (availableHeroes.length > 0) {
    selectedHero = availableHeroes[0];
    newUndrawnHeroes = [...newUndrawnHeroes, selectedHero];
  } else {
    console.log("No hero cards left to add this season.");
  }

  // Explore cards
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

  // Final deck
  const shuffledDeck = shuffle([
    ...shuffle(fullExploreDeck),
    ...newUndrawnAmbushes,
    ...newUndrawnHeroes,
  ]);

  return {
    deck: shuffledDeck,
    newUsedAmbushId: selectedAmbush.id,
    newPreviousUndrawnAmbushes: newUndrawnAmbushes,
    newUsedHeroId: selectedHero ? selectedHero.id : "",
    newPreviousUndrawnHeroes: newUndrawnHeroes,
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
