export interface CardData {
  id: string;
  name: string;
  value: number;
  type: "explore" | "ambush";
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

// Dummy explore cards (you can later replace names and values)
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
    description: "Rift Lands Explore Card.",
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

const ambushCards: CardData[] = [
  {
    id: "a1",
    name: "Bugbear Assault",
    value: 0,
    type: "ambush",
    description: "Bubear Assault Monster Card",
  },
  {
    id: "a2",
    name: "Goblin Attack",
    value: 0,
    type: "ambush",
    description: "Goblin Attack Monster Card",
  },
  {
    id: "a3",
    name: "Gnoll Raid",
    value: 0,
    type: "ambush",
    description: "Gnoll Raid Monster Card",
  },
  {
    id: "a4",
    name: "Kobold Onslaught",
    value: 0,
    type: "ambush",
    description: "Kobold Onslaught Monster Card",
  },
];

export function createSeasonDeck(usedAmbushIds: string[]): {
  deck: CardData[];
  newUsedAmbushId: string;
} {
  const availableAmbushes = ambushCards.filter(
    (card) => !usedAmbushIds.includes(card.id),
  );

  if (availableAmbushes.length === 0) {
    throw new Error("No ambush cards left to add!");
  }

  const selectedAmbush = availableAmbushes[0]; // pick first available
  const deckWithoutAmbush = shuffle(exploreCards);
  const deck = shuffle([...deckWithoutAmbush, selectedAmbush]);

  return {
    deck,
    newUsedAmbushId: selectedAmbush.id,
  };
}
