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

export const heroDeckA: ScoringCard[] = [
  {
    id: "HA1",
    name: "Deepwood",
    description:
      "Earn six reputation for each cluster of five or more forests not adjacent to any village.",
  },
  {
    id: "HA2",
    name: "Heart of the Forest",
    description:
      "Earn two reputation for each forest surrounded on all four sides by forests or the edge of the map.",
  },
  {
    id: "HA3",
    name: "Faunlost Thicket",
    description:
      "Earn two reputation for each forest in the longest unbroken column of forests.",
  },
  {
    id: "HA4",
    name: "Sleepy Valley",
    description:
      "Earn four reputation for each row that contains three or more forests.",
  },
];

export const heroDeckB: ScoringCard[] = [
  {
    id: "HB1",
    name: "Caravansary",
    description:
      "Choose a cluster of villages and earn one reputation for each row and column that contain a village from that cluster.",
  },
  {
    id: "HB2",
    name: "Traylo Monastery",
    description:
      "Earn seven reputation for each cluster of villages that contains four spaces in a 4x1 or 1x4 rectangle.",
  },
  {
    id: "HB3",
    name: "Gnomish Colony",
    description:
      "Earn six reputation for each cluster of villages that contains four spaces in a 2x2 square.",
  },
  {
    id: "HB4",
    name: "Outer Enclave",
    description:
      "Choose a cluster of villages and earn one reputation for each empty space adjacent to that cluster.",
  },
];

export const heroDeckC: ScoringCard[] = [
  {
    id: "HC1",
    name: "Jorekburg",
    description:
      "Earn four reputation for each column that contains and equal number of farms and waters, with at least one of each.",
  },
  {
    id: "HC2",
    name: "Ulem's Wallow",
    description:
      "Earn four reputation for each water adjacent to two or more farms.",
  },
  {
    id: "HC3",
    name: "Craylund",
    description:
      "Earn seven reputation for each cluster of farms adjacent to three or more waters.",
  },
  {
    id: "HC4",
    name: "Clawsgrave peak",
    description:
      "Earn five reputation for each mountain connected to a farm by a cluster of waters.",
  },
];

export const heroDeckD: ScoringCard[] = [
  {
    id: "HD1",
    name: "Dwarvenholds",
    description:
      "Earn seven reputation for each completely filled row or column that contains a mountain space.",
  },
  {
    id: "HD2",
    name: "Banded Hills",
    description:
      "Earn four reputation for each row that contains five or more different terrains.",
  },
  {
    id: "HD3",
    name: "Starlit Sigil",
    description:
      "Earn four reputation for each cluster of exactly three empty spaces surrounded on all sides by filled spaces or the edge of the map.",
  },
  {
    id: "HD4",
    name: "Silos",
    description:
      "Earn ten reputation for each complete odd-numbered column of filled spaces.",
  },
];
