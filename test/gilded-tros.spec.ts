import { Item } from "@/item";
import { GildedTros } from "@/gilded-tros";
import {
  MIN_QUALITY,
  MAX_QUALITY,
  LEGENDARY_ITEM_QUALITY,
  AGING_ITEMS,
  LEGENDARY_ITEMS,
  BACKSTAGE_PASS_KEYWORDS,
  SMELLY_ITEMS,
} from "@/configuration";

describe("GildedTros Sanitization", () => {
  describe("when shouldSanitizeInitialData is true", () => {
    it("should sanitize quality below minimum to MIN_QUALITY", () => {
      const items: Item[] = [
        new Item("Ring of Cleansening Code", 10, -5),
        new Item(AGING_ITEMS[0], 5, -10),
      ];
      const app: GildedTros = new GildedTros(items, true);

      expect(app.items[0].quality).toEqual(MIN_QUALITY);
      expect(app.items[1].quality).toEqual(MIN_QUALITY);
    });

    it("should sanitize quality above maximum to MAX_QUALITY for non-legendary items", () => {
      const items: Item[] = [
        new Item("Ring of Cleansening Code", 10, 60),
        new Item(AGING_ITEMS[0], 5, 100),
        new Item(`${BACKSTAGE_PASS_KEYWORDS[0]} for Re:Factor`, 10, 75),
      ];
      const app: GildedTros = new GildedTros(items, true);

      expect(app.items[0].quality).toEqual(MAX_QUALITY);
      expect(app.items[1].quality).toEqual(MAX_QUALITY);
      expect(app.items[2].quality).toEqual(MAX_QUALITY);
    });

    it("should set legendary items to correct sellIn (0) and quality (80)", () => {
      const items: Item[] = [
        new Item(LEGENDARY_ITEMS[0], 10, 50),
        new Item(LEGENDARY_ITEMS[0], -5, 100),
      ];
      const app: GildedTros = new GildedTros(items, true);

      // All legendary items should have sellIn of 0 and quality of 80
      expect(app.items[0].sellIn).toEqual(0);
      expect(app.items[0].quality).toEqual(LEGENDARY_ITEM_QUALITY);
      expect(app.items[1].sellIn).toEqual(0);
      expect(app.items[1].quality).toEqual(LEGENDARY_ITEM_QUALITY);
    });

    it("should keep valid quality values unchanged for non-legendary items", () => {
      const items: Item[] = [
        new Item("Ring of Cleansening Code", 10, 20),
        new Item(AGING_ITEMS[0], 5, 0),
        new Item("Elixir of the SOLID", 5, 50),
        new Item(`${BACKSTAGE_PASS_KEYWORDS[0]} for Re:Factor`, 10, 25),
      ];
      const app: GildedTros = new GildedTros(items, true);

      expect(app.items[0].quality).toEqual(20);
      expect(app.items[1].quality).toEqual(0);
      expect(app.items[2].quality).toEqual(50);
      expect(app.items[3].quality).toEqual(25);
    });
  });

  describe("when shouldSanitizeInitialData is false or undefined", () => {
    it("should not sanitize items when parameter is false", () => {
      const items: Item[] = [
        new Item("Ring of Cleansening Code", 10, -10),
        new Item(AGING_ITEMS[0], 5, 100),
        new Item(LEGENDARY_ITEMS[0], 15, 60),
      ];
      const app: GildedTros = new GildedTros(items, false);

      // Values should remain as-is (though they may be constrained by strategy logic)
      expect(app.items[0].quality).toEqual(-10);
      expect(app.items[1].quality).toEqual(100);
      expect(app.items[2].sellIn).toEqual(15);
      expect(app.items[2].quality).toEqual(60);
    });

    it("should not sanitize items when parameter is omitted", () => {
      const items: Item[] = [
        new Item("Ring of Cleansening Code", 10, -10),
        new Item(AGING_ITEMS[0], 5, 100),
      ];
      const app: GildedTros = new GildedTros(items);

      expect(app.items[0].quality).toEqual(-10);
      expect(app.items[1].quality).toEqual(100);
    });
  });
});

describe("GildedTros progressDay functionality", () => {
  it("should progress day for one all types of items", () => {
    const items: Item[] = [
      new Item("Ring of Cleansening Code", 10, 20), // Default item
      new Item(AGING_ITEMS[0], 10, 20), // Aging item
      new Item(`${BACKSTAGE_PASS_KEYWORDS[0]} for Re:Factor`, 11, 20), // Backstage pass
      new Item(LEGENDARY_ITEMS[0], 0, 80), // Legendary item
      new Item(SMELLY_ITEMS[0], 10, 20), // Smelly item
    ];
    const app: GildedTros = new GildedTros(items);

    app.progressDay();

    // Default item: quality decreases by 1, sellIn decreases by 1
    expect(app.items[0].sellIn).toEqual(9);
    expect(app.items[0].quality).toEqual(19);

    // Aging item: quality increases by 1, sellIn decreases by 1
    expect(app.items[1].sellIn).toEqual(9);
    expect(app.items[1].quality).toEqual(21);

    // Backstage pass: quality increases by 1 (>10 days), sellIn decreases by 1
    expect(app.items[2].sellIn).toEqual(10);
    expect(app.items[2].quality).toEqual(21);

    // Legendary item: no changes
    expect(app.items[3].sellIn).toEqual(0);
    expect(app.items[3].quality).toEqual(80);

    // Smelly item: quality decreases by 2 (double degradation), sellIn decreases by 1
    expect(app.items[4].sellIn).toEqual(9);
    expect(app.items[4].quality).toEqual(18);
  });
});
