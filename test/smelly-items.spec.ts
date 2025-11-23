import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";
import { updateQualityByDays } from "./test-utils";
import { SMELLY_ITEMS } from "../src/configuration";
import { assertItemMinimumQuality } from "./assertions";

// TODO these are failing because they are not implemented correctly yet
describe("Smelly items", () => {
  it("should decrease quality twice as fast as normal items", () => {
    const items: Item[] = [new Item(SMELLY_ITEMS[0], 2, 20)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toEqual(18);
    updateQualityByDays(app, 2);
    expect(app.items[0].quality).toEqual(14);
  });

  it("should degrade four times as fast after sellIn date", () => {
    const items: Item[] = [new Item(SMELLY_ITEMS[0], 0, 20)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toEqual(16);
    updateQualityByDays(app, 2);
    expect(app.items[0].quality).toEqual(12);
    updateQualityByDays(app, 2);
    expect(app.items[0].quality).toEqual(8);
  });

  it("should not degrade below minimum quality", () => {
    const items: Item[] = [new Item(SMELLY_ITEMS[0], 0, 3)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    assertItemMinimumQuality(app.items[0]);
    updateQualityByDays(app, 2);
    assertItemMinimumQuality(app.items[0]);
  });
});
