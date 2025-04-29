export interface ScoringCard {
  id: string;
  name: string;
  description: string; // NEW
}

// Dummy scoring cards for each set
export const deckA: ScoringCard[] = [
  { id: "A1", name: "Great City", description: "." },
  { id: "A2", name: "Borderlands", description: "." },
  { id: "A3", name: "Shieldgate", description: "." },
  { id: "A4", name: "Greengold Plains", description: "." },
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
