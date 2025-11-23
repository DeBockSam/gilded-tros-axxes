import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";
import { updateQualityByDays } from "./test-utils";

const DEFAULT_ITEM_TEST_NAME = "foo";

describe("Default items", () => {
  it("should decrease in quality", () => {
    const items: Item[] = [new Item(DEFAULT_ITEM_TEST_NAME, 1, 10)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toEqual(9);
  });

  it("should degrade twice as fast after sellIn date", () => {
    const items: Item[] = [new Item(DEFAULT_ITEM_TEST_NAME, 0, 10)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toEqual(8);
    updateQualityByDays(app, 3);
    expect(app.items[0].quality).toEqual(2);
    updateQualityByDays(app, 3);
    expect(app.items[0].quality).toEqual(0);
  });

  it("should not degrade below 0 quality", () => {
    const items: Item[] = [new Item(DEFAULT_ITEM_TEST_NAME, 0, 1)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toEqual(0);
    updateQualityByDays(app, 2);
    expect(app.items[0].quality).toEqual(0);
  });

  it("should decrease sellIn by 1", () => {
    const items: Item[] = [new Item(DEFAULT_ITEM_TEST_NAME, 5, 10)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].sellIn).toEqual(4);
    updateQualityByDays(app, 3);
    expect(app.items[0].sellIn).toEqual(1);
    updateQualityByDays(app, 2);
    expect(app.items[0].sellIn).toEqual(-1);
    updateQualityByDays(app, 3);
    expect(app.items[0].sellIn).toEqual(-4);
  });
});
