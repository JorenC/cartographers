export interface ExpansionCard {
  id: string;
  name: string;
  description: string;
  value?: number;
  specialEffect?: string;
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
    id: "base",
    name: "Cartographers",
    cards: {
      explore: [
        {
          id: "e1",
          name: "Farmland",
          value: 1,
          description: "Farmland Explore Card",
        },
        {
          id: "e2",
          name: "Great River",
          value: 1,
          description: "Great River Explore Card",
        },
        {
          id: "e3",
          name: "Rift Lands",
          value: 0,
          description: "Rift Lands Explore Card",
        },
        {
          id: "e4",
          name: "Homestead",
          value: 2,
          description: "A serene lake surrounded by greenery.",
        },
        {
          id: "e5",
          name: "Forgotten Forest",
          value: 1,
          description: "A serene lake surrounded by greenery.",
        },
        {
          id: "e6",
          name: "Hinterland Stream",
          value: 2,
          description: "A serene lake surrounded by greenery.",
        },
        {
          id: "e7",
          name: "Marshlands",
          value: 2,
          description: "A serene lake surrounded by greenery.",
        },
        {
          id: "e8",
          name: "Outpost Ruins",
          value: 0,
          description: "A serene lake surrounded by greenery.",
        },
        {
          id: "e9",
          name: "Hamlet",
          value: 1,
          description: "A serene lake surrounded by greenery.",
        },
        {
          id: "e10",
          name: "Temple Ruins",
          value: 0,
          description: "A serene lake surrounded by greenery.",
        },
        {
          id: "e11",
          name: "Treetop Village",
          value: 2,
          description: "A serene lake surrounded by greenery.",
        },
        {
          id: "e12",
          name: "Orchard",
          value: 2,
          description: "A serene lake surrounded by greenery.",
        },
        {
          id: "e13",
          name: "Fishing Village",
          value: 2,
          description: "A serene lake surrounded by greenery.",
        },
      ],
      ambush: [
        {
          id: "m1",
          name: "Bugbear Assault",
          value: 0,
          description: "Bugbear Assault Monster Card",
        },
        {
          id: "m2",
          name: "Goblin Attack",
          value: 0,
          description: "Goblin Attack Monster Card",
        },
        {
          id: "m3",
          name: "Gnoll Raid",
          value: 0,
          description: "Gnoll Raid Monster Card",
        },
        {
          id: "m4",
          name: "Kobold Onslaught",
          value: 0,
          description: "Kobold Onslaught Monster Card",
        },
      ],
    },
  },
  {
    id: "heroes",
    name: "Heroes",
    cards: {
      explore: [
        {
          id: "he1",
          name: "Timber Grove",
          value: 1,
          description: "Timber Grove Explore Card",
        },
        {
          id: "he2",
          name: "Frontier Dwelling",
          value: 2,
          description: "Frontier Dwelling Explore Card",
        },
        {
          id: "he3",
          name: "Woodland Crossroads",
          value: 2,
          description: "Woodland Crossroads Explore Card",
        },
        {
          id: "he4",
          name: "Mangrove Swamp",
          value: 2,
          description: "Mangrove Swamp Explore Card",
        },
        {
          id: "he5",
          name: "Pasture",
          value: 1,
          description: "Pasture Explore Card.",
        },
        {
          id: "he6",
          name: "Coastal Encampment",
          value: 2,
          description: "Coastal Encampment Explore Card.",
        },
        {
          id: "he7",
          name: "Wildwood Garden",
          value: 2,
          description: "A serene lake surrounded by greenery.",
        },
        {
          id: "he8",
          name: "Settlement",
          value: 1,
          description: "A serene lake surrounded by greenery.",
        },
        {
          id: "he9",
          name: "Kethra's Gates",
          value: 0,
          description: "A serene lake surrounded by greenery.",
        },
        {
          id: "he10",
          name: "Lagoon",
          value: 1,
          description: "A serene lake surrounded by greenery.",
        },
        {
          id: "he11",
          name: "Hillside Terrace",
          value: 2,
          description: "A serene lake surrounded by greenery.",
        },
        {
          id: "he12",
          name: "Mansion Ruins",
          value: 0,
          description: "A serene lake surrounded by greenery.",
        },
        {
          id: "he13",
          name: "Temple Ruins",
          value: 0,
          description: "A serene lake surrounded by greenery.",
        },
      ],
      ambush: [
        {
          id: "hm1",
          name: "Gorgon Gaze",
          description:
            "After drawing the Gorgon, destroy an adjacent non-mountain space",
        },
        {
          id: "hm2",
          name: "Zombie Plague",
          description: "Zombie Plague Explore card",
          specialEffect:
            "After each scoring season, draw a Zombie in each empty space adjacent to a Zombie.",
        },
        {
          id: "hm3",
          name: "Giant Troll Ravage",
          description: "Giant Troll Ravage Explore card",
          specialEffect:
            "After each scoring season, destroy an empty space adjacent to the Giant Troll.",
        },
        {
          id: "hm4",
          name: "Dragon Inferno",
          description: "Dragon Inferno Explore card",
          specialEffect:
            "When all spaces of the Dragon are surrounded or destroyed, gain 3 coins.",
        },
      ],
    },
  },
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
