export interface ScoringCard {
  id: string;
  name: string;
  description: string; // NEW
}

// Dummy scoring cards for each set
export const deckA: ScoringCard[] = [
  {
    id: "A1",
    name: "Great City",
    description:
      "Earn one reputation for each Village space in the largest cluster of Village spaces that is not adjacent to a Mountain space.",
  },
  {
    id: "A2",
    name: "Borderlands",
    description:
      "Earn six reputation for each complete row or complete column of filled spaces (Mountains and Wasteland spaces are counted as filled spaces and help to score this Scoring card).",
  },
  {
    id: "A3",
    name: "Shieldgate",
    description:
      "Earn two reputation for each Village space in the second largest cluster of Village spaces.",
  },
  {
    id: "A4",
    name: "Greengold Plains",
    description:
      "Earn 3 reputation for each cluster of Village spaces that are adjacent to three or more different Terrain types (Reputation is scored for the whole cluster and not for individual spaces in a cluster).",
  },
];

export const deckB: ScoringCard[] = [
  { id: "B1", name: "Wildholds", description: "." },
  { id: "B2", name: "Canal Lake", description: "." },
  { id: "B3", name: "Riftlands", description: "." },
  { id: "B4", name: "Spires", description: "." },
];

export const deckC: ScoringCard[] = [
  { id: "C1", name: "Greenbough", description: "." },
  { id: "C2", name: "Sentinel Wood", description: "." },
  { id: "C3", name: "Blossom Heights", description: "." },
  { id: "C4", name: "Skybridge", description: "." },
];

export const deckD: ScoringCard[] = [
  { id: "D1", name: "Sundew Marsh", description: "." },
  { id: "D2", name: "Highmoor", description: "." },
  { id: "D3", name: "Twin Lakes", description: "." },
  { id: "D4", name: "Crag's End", description: "." },
];
