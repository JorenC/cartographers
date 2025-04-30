export interface ExpansionCard {
  id: string;
  name: string;
  description: string;
}

export interface Expansion {
  id: string;
  name: string;
  cards: {
    ambush?: ExpansionCard[];
    explore?: ExpansionCard[];
    scoring?: ExpansionCard[];
  };
}

export const availableExpansions: Expansion[] = [
  {
    id: "ambush1",
    name: "Ambush Expansion",
    cards: {
      ambush: [
        {
          id: "ambushm1",
          name: "Insectoid Invasion",
          description: "Insectoid Invasion Ambush Card",
        },
        {
          id: "ambushm2",
          name: "Orge Charge",
          description: "Ogre Charge Ambush Card",
        },
        {
          id: "ambushm3",
          name: "Ratman Strike",
          description: "Ratman Strike Ambush Card",
        },
        {
          id: "ambushm4",
          name: "Flayer Incursion",
          description: "Flayer Incursion Ambush Card",
        },
      ],
      explore: [],
      scoring: [],
    },
  },
  {
    id: "ambush2",
    name: "Ambush 2 Expansion",
    cards: {
      ambush: [
        {
          id: "ambush2m1",
          name: "Treefolk Torment",
          description: "Treefolk Torment Ambush Card",
          specialEffect:
            "When all spaces of the Treefolk are surrounded or destroyed, draw two 1x1 forest shapes in any unfilled spaces.",
        },
        {
          id: "ambush2m2",
          name: "Basilisk Stare",
          description: "Basilisk Stare Ambush Card",
          specialEffect:
            "During scoring, lose two reputation stars for each empty space adjacent to the Basilisk, instead of one.",
        },
        {
          id: "ambush2m3",
          name: "Naga Shock",
          description:
            "After drawing the Naga Shock, destroy two water spaces (draw an X - these spaces count as occupied).",
        },
        {
          id: "ambush2m4",
          name: "Fungoid Outbreak",
          description:
            "After drawing Fungoid Outbreak, a card from the ambush deck is shuffled into the explore deck.",
        },
      ],
      explore: [],
      scoring: [],
    },
  },
];

/*  {
    id: "ambush1",
    name: "Ambush Expansion",
    cards: {
      ambush: [
        {
          id: "ambushm1",
          name: "Shadow Wolves",
          description: "Shadow Wolves ambush from the treeline.",
        },
        {
          id: "ambushm2",
          name: "Fire Imps",
          description: "Fire Imps erupt in chaos.",
        },
        {
          id: "ambushm3",
          name: "Feral Ghouls",
          description: "Feral Ghouls swarm from ruins.",
        },
        {
          id: "ambushm4",
          name: "Cursed Revenants",
          description: "Cursed Revenants rise from the ground.",
        },
      ],
      explore: [
        {
          id: "e17",
          name: "Icy Ravine",
          description: "Treacherous terrain that freezes time.",
        },
      ],
      scoring: [
        {
          id: "s2",
          name: "Frostfront",
          description: "Score for clusters surrounded by snow.",
        },
      ],
    },

    */
