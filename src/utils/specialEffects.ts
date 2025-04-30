import { CardData, getCardById, shuffle } from "./deckUtils";
import { availableExpansions } from "./expansions";

export interface SpecialEffectContext {
  currentDeck: CardData[];
  usedAmbushIds: string[];
  previousUndrawnAmbushes: CardData[];
  expansions: string[];
  addCardsToDeck: (newDeck: CardData[]) => void;
}

/**
 * Human-readable registry of all defined special effects
 */
export const specialEffectsMeta: Record<
  string,
  { name: string; description: string }
> = {
  fungoidAmbushInsert: {
    name: "Fungoid Outbreak",
    description:
      "When drawn, insert another unused ambush card into the current deck.",
  },
  // You can add more here later
};

/**
 * Actual effect logic implementations
 */
export const specialEffectHandlers: Record<
  string,
  (context: SpecialEffectContext) => void
> = {
  fungoidAmbushInsert: ({
    currentDeck,
    usedAmbushIds,
    previousUndrawnAmbushes,
    expansions,
    addCardsToDeck,
  }) => {
    // Build all ambush cards from active expansions
    let allAmbushCards: CardData[] = [];

    for (const expId of expansions) {
      const expansion = availableExpansions.find((e) => e.id === expId);
      if (expansion?.cards.ambush) {
        const cards = expansion.cards.ambush.map((card) =>
          typeof card === "string"
            ? getCardById(card)
            : {
                ...card,
                value: 0,
                type: "ambush",
              },
        );
        allAmbushCards.push(...cards);
      }
    }

    // Add core ambushes
    const coreAmbushIds = ["m1", "m2", "m3", "m4"];
    allAmbushCards.push(...coreAmbushIds.map(getCardById));

    // Remove any already used or queued ambushes
    const alreadyUsedIds = new Set([
      ...usedAmbushIds,
      ...previousUndrawnAmbushes.map((c) => c.id),
      ...currentDeck.filter((c) => c.type === "ambush").map((c) => c.id),
    ]);

    const available = shuffle(
      allAmbushCards.filter((c) => !alreadyUsedIds.has(c.id)),
    );

    if (available.length === 0) {
      console.warn("No ambushes available for Fungoid Outbreak");
      return;
    }

    const chosen = available[0];
    const insertIndex = Math.floor(Math.random() * currentDeck.length);
    const newDeck = [
      ...currentDeck.slice(0, insertIndex),
      chosen,
      ...currentDeck.slice(insertIndex),
    ];

    console.log("Inserted ambush via Fungoid Outbreak:", chosen.id);
    addCardsToDeck(newDeck);
  },
};

/**
 * Maps card IDs to the special effect logic they should trigger.
 * This is the only place you need to register new special cards.
 */
export const specialCardEffects: Record<
  string, // card ID
  keyof typeof specialEffectHandlers
> = {
  ambush2m4: "fungoidAmbushInsert",
  // Add more special cards like:
  // blight4: "someOtherEffectId"
};
