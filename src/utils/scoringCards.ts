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
      "Earn 1 reputation for each Village in the largest Village cluster not adjacent to a Mountain space.",
  },
  {
    id: "A2",
    name: "Borderlands",
    description: "Earn 8 reputation for each cluster of six or more Villages.",
  },
  {
    id: "A3",
    name: "Shieldgate",
    description:
      "Earn 2 reputation for each Village in the second largest Village cluster.",
  },
  {
    id: "A4",
    name: "Greengold Plains",
    description:
      "Earn 3 reputation for each cluster of Villages adjacent to 3 or more different Terrain types.",
  },
];

export const deckB: ScoringCard[] = [
  {
    id: "B1",
    name: "Shoreside Expanse",
    description:
      "Earn 3 reputation for each cluster of Farms not adjacent to Water OR the map edge. Earn 3 reputation for each cluster of Water not adjacent to Farms OR the map edge.",
  },
  {
    id: "B2",
    name: "Mages Valley",
    description:
      "Earn 2 reputation for each Water adjacent to a Mountain and 1 for each Farm adjacent to a Mountain.",
  },
  {
    id: "B3",
    name: "Canal Lake",
    description:
      "Earn 1 reputation for each Water adjacent to at least one Farm and 1 for each Farm adjacent to at least one Water. Any space only scores once.",
  },
  {
    id: "B4",
    name: "Golden Granary",
    description:
      "Earn 1 reputation for each Water adjacent to a Ruin (but not on top). Earn 3 reputation for each Farm on a Ruin (but not adjacent).",
  },
];

export const deckC: ScoringCard[] = [
  {
    id: "C1",
    name: "Stoneside Forest",
    description:
      "Earn 3 reputation for each Mountain connected to another Mountain by a cluster of Forests. One Mountain space can score at most 3 reputation.",
  },
  {
    id: "C2",
    name: "Sentinel Wood",
    description:
      "Earn 1 reputation for each Forest adjacent to the edge of the Map. Corners only score once.",
  },
  {
    id: "C3",
    name: "Greenbough",
    description:
      "Earn 1 reputation for each row and column containing at least one Forest. One Forest may score twice for both a row and a column.",
  },
  {
    id: "C4",
    name: "Treetower",
    description:
      "Earn 1 reputation for each Forest surrounded on all four sides by filled spaces or the map edge.",
  },
];

export const deckD: ScoringCard[] = [
  {
    id: "D1",
    name: "The Cauldrons",
    description:
      "Earn 1 reputation for each empty space surrounded on all four sides by filled spaces or the map edge.",
  },
  {
    id: "D2",
    name: "The Broken Road",
    description:
      "Earn 3 reputation for each complete diagonal line of filled spaces that touches left and bottom map edges. Mountains and Wastelands count as filled spaces.",
  },
  {
    id: "D3",
    name: "Lost Barony",
    description:
      "Earn 3 reputation for each space along one edge of the largest square of filled spaces.",
  },
  {
    id: "D4",
    name: "Borderlands",
    description:
      "Earn 6 reputation for each complete row or column of filled spaces. Mountains and Wastelands counted as filled spaces.",
  },
];
