import { availableExpansions, ExpansionCard } from "./expansions";

export interface CardData {
  id: string;
  name: string;
  value: number;
  type: "explore" | "ambush" | "scoring" | "hero";
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
  const normalizedBaseSetId = baseSet === "cartographers" ? "base" : baseSet;
  const base = availableExpansions.find((e) => e.id === normalizedBaseSetId);
  if (!base) {
    console.error(
      `Base set '${baseSet}' (normalized: '${normalizedBaseSetId}') not found`,
    );
    throw new Error(`Base set '${baseSet}' not found`);
  }

  return {
    explore:
      base.cards.explore?.map((c: ExpansionCard) => ({
        id: c.id,
        name: c.name,
        value: c.value || 0,
        type: "explore",
        description: c.description,
        specialEffect: c.specialEffect,
      })) || [],
    ambush:
      base.cards.ambush?.map((c: ExpansionCard) => ({
        id: c.id,
        name: c.name,
        value: c.value || 0,
        type: "ambush",
        description: c.description,
        specialEffect: c.specialEffect,
      })) || [],
    hero:
      base.cards.hero?.map((c: ExpansionCard) => ({
        id: c.id,
        name: c.name,
        value: c.value || 0,
        type: "hero",
        description: c.description,
        specialEffect: c.specialEffect,
      })) || [],
  };
}

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
  newUsedHeroId: string;
  newPreviousUndrawnHeroes: CardData[];
} {
  const {
    explore: baseExploreCards,
    ambush: baseAmbushCards,
    hero: baseHeroCards,
  } = getBaseSetCards(baseSet);

  // --- AMBUSH CARDS ---
  let allAmbushCards: CardData[] = [...baseAmbushCards];
  expansions.forEach((expId) => {
    const exp = availableExpansions.find((e) => e.id === expId);
    const extra =
      exp?.cards.ambush?.map((card: ExpansionCard) => ({
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

  let selectedAmbush: CardData | null = null;
  let newUndrawnAmbushes = [...previousUndrawnAmbushes];

  if (availableAmbushes.length > 0) {
    selectedAmbush = availableAmbushes[0];
    newUndrawnAmbushes = [...newUndrawnAmbushes, selectedAmbush];
  } else {
    console.log("No ambush cards left to add this season.");
  }

  // --- HERO CARDS ---
  let allHeroCards: CardData[] = [...baseHeroCards];
  expansions.forEach((expId) => {
    const exp = availableExpansions.find((e) => e.id === expId);
    const extra =
      exp?.cards.hero?.map((card: ExpansionCard) => ({
        id: card.id,
        name: card.name,
        value: card.value || 0,
        type: "hero" as const,
        description: card.description,
        specialEffect: card.specialEffect,
      })) || [];
    allHeroCards.push(...extra);
  });

  const availableHeroes = shuffle(
    allHeroCards.filter(
      (card) =>
        !usedHeroIds.includes(card.id) &&
        !previousUndrawnHeroes.some((prev) => prev.id === card.id),
    ),
  );

  let selectedHero: CardData | null = null;
  let newUndrawnHeroes = [...previousUndrawnHeroes];

  if (availableHeroes.length > 0) {
    selectedHero = availableHeroes[0];
    newUndrawnHeroes = [...newUndrawnHeroes, selectedHero];
  } else {
    console.log("No hero cards left to add this season.");
  }

  // --- EXPLORE CARDS ---
  let fullExploreDeck: CardData[] = [...baseExploreCards];
  expansions.forEach((expId) => {
    const exp = availableExpansions.find((e) => e.id === expId);
    const extra =
      exp?.cards.explore?.map((card: ExpansionCard) => ({
        id: card.id,
        name: card.name,
        value: card.value || 0,
        type: "explore" as const,
        description: card.description,
        specialEffect: card.specialEffect,
      })) || [];
    fullExploreDeck.push(...extra);
  });

  const fullDeck = [
    ...fullExploreDeck,
    ...newUndrawnAmbushes,
    ...newUndrawnHeroes,
  ];

  const shuffledDeck = shuffle(fullDeck);

  return {
    deck: shuffledDeck,
    newUsedAmbushId: selectedAmbush ? selectedAmbush.id : "",
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
      ...(expansion.cards.hero || []),
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
            : expansion.cards.hero?.some((c) => c.id === found.id)
              ? "hero"
              : "scoring",
      };
    }
  }

  return undefined;
}
