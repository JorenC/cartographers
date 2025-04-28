export interface ScoringCard {
  id: string;
  name: string;
}

// Dummy scoring cards for each set
export const deckA: ScoringCard[] = [
  { id: "A1", name: "Great City" },
  { id: "A2", name: "Borderlands" },
  { id: "A3", name: "Shieldgate" },
  { id: "A4", name: "Greengold Plains" },
];

export const deckB: ScoringCard[] = [
  { id: "B1", name: "Wildholds" },
  { id: "B2", name: "Canal Lake" },
  { id: "B3", name: "Riftlands" },
  { id: "B4", name: "Spires" },
];

export const deckC: ScoringCard[] = [
  { id: "C1", name: "Greenbough" },
  { id: "C2", name: "Sentinel Wood" },
  { id: "C3", name: "Blossom Heights" },
  { id: "C4", name: "Skybridge" },
];

export const deckD: ScoringCard[] = [
  { id: "D1", name: "Sundew Marsh" },
  { id: "D2", name: "Highmoor" },
  { id: "D3", name: "Twin Lakes" },
  { id: "D4", name: "Crag's End" },
];
