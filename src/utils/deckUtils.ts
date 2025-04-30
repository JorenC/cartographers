import { availableExpansions } from "./expansions";

export interface CardData {
  id: string;
  name: string;
  value: number;
  type: "explore" | "ambush" | "scoring";
  description: string;
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

// Core explore cards
const exploreCards: CardData[] = [
  {
    id: "e1",
    name: "Farmland",
    value: 1,
    type: "explore",
    description: "Farmland Explore Card",
  },
  {
    id: "e2",
    name: "Great River",
    value: 1,
    type: "explore",
    description: "Great River Explore Card",
  },
  {
    id: "e3",
    name: "Rift Lands",
    value: 0,
    type: "explore",
    description: "Rift Lands Explore Card",
  },
  {
    id: "e4",
    name: "Homestead",
    value: 2,
    type: "explore",
    description: "A serene lake surrounded by greenery.",
  },
  {
    id: "e5",
    name: "Forgotten Forest",
    value: 1,
    type: "explore",
    description: "A serene lake surrounded by greenery.",
  },
  {
    id: "e6",
    name: "Hinterland Stream",
    value: 2,
    type: "explore",
    description: "A serene lake surrounded by greenery.",
  },
  {
    id: "e7",
    name: "Marshlands",
    value: 2,
    type: "explore",
    description: "A serene lake surrounded by greenery.",
  },
  {
    id: "e8",
    name: "Outpost Ruins",
    value: 0,
    type: "explore",
    description: "A serene lake surrounded by greenery.",
  },
  {
    id: "e9",
    name: "Hamlet",
    value: 1,
    type: "explore",
    description: "A serene lake surrounded by greenery.",
  },
  {
    id: "e10",
    name: "Temple Ruins",
    value: 0,
    type: "explore",
    description: "A serene lake surrounded by greenery.",
  },
  {
    id: "e11",
    name: "Treetop Village",
    value: 2,
    type: "explore",
    description: "A serene lake surrounded by greenery.",
  },
  {
    id: "e12",
    name: "Orchard",
    value: 2,
    type: "explore",
    description: "A serene lake surrounded by greenery.",
  },
  {
    id: "e13",
    name: "Fishing Village",
    value: 2,
    type: "explore",
    description: "A serene lake surrounded by greenery.",
  },
];

// Core ambush cards
const coreAmbushCards: CardData[] = [
  {
    id: "m1",
    name: "Bugbear Assault",
    value: 0,
    type: "ambush",
    description: "Bugbear Assault Monster Card",
  },
  {
    id: "m2",
    name: "Goblin Attack",
    value: 0,
    type: "ambush",
    description: "Goblin Attack Monster Card",
  },
  {
    id: "m3",
    name: "Gnoll Raid",
    value: 0,
    type: "ambush",
    description: "Gnoll Raid Monster Card",
  },
  {
    id: "m4",
    name: "Kobold Onslaught",
    value: 0,
    type: "ambush",
    description: "Kobold Onslaught Monster Card",
  },
];

// Helper: all cards from core + expansions (auto-generated placeholders for expansion card IDs)
const allCards: CardData[] = [
  ...exploreCards,
  ...coreAmbushCards,
  ...availableExpansions.flatMap((exp) =>
    Object.entries(exp.cards).flatMap(([type, cardList]) =>
      (cardList || []).map((entry) => {
        const card =
          typeof entry === "string"
            ? {
                id: entry,
                name: `${exp.name} Card`,
                description: `${exp.name} card added via expansion`,
              }
            : entry;

        return {
          id: card.id,
          name: card.name,
          value: 0,
          type: type as CardData["type"],
          description: card.description,
        };
      }),
    ),
  ),
];

// Lookup helper
export function getCardById(id: string): CardData {
  const found = allCards.find((card) => card.id === id);
  if (!found) {
    throw new Error(`Card not found by ID: ${id}`);
  }
  return found;
}

// Main deck generator
export function createSeasonDeck(
  usedAmbushIds: string[],
  previousUndrawnAmbushes: CardData[],
  expansions: string[],
): {
  deck: CardData[];
  newUsedAmbushId: string;
  newPreviousUndrawnAmbushes: CardData[];
} {
  // Build ambush deck
  let allAmbushCards: CardData[] = [...coreAmbushCards];
  expansions.forEach((expId) => {
    const exp = availableExpansions.find((e) => e.id === expId);
    const extra =
      exp?.cards.ambush?.map((card) =>
        typeof card === "string"
          ? getCardById(card)
          : { ...card, value: 0, type: "ambush" },
      ) || [];
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

  // Build explore deck
  let fullExploreDeck: CardData[] = [...exploreCards];
  expansions.forEach((expId) => {
    const exp = availableExpansions.find((e) => e.id === expId);
    const extra =
      exp?.cards.explore?.map((card) =>
        typeof card === "string"
          ? getCardById(card)
          : { ...card, value: 0, type: "explore" },
      ) || [];
    fullExploreDeck.push(...extra);
  });

  // Shuffle and merge
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
