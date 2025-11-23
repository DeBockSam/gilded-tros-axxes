import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";
import { updateQualityByDays } from "./test-utils";
import { AGING_ITEMS } from "../src/configuration";
import { assertItemMaximumQuality } from "./assertions";

describe("Aging items", () => {
  it("should increase in quality", () => {
    const items: Item[] = [new Item(AGING_ITEMS[0], 1, 10)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toEqual(11);
  });

  it("should not increase above maximum quality", () => {
    const items: Item[] = [new Item(AGING_ITEMS[0], 0, 49)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    assertItemMaximumQuality(app.items[0]);
    updateQualityByDays(app, 2);
    assertItemMaximumQuality(app.items[0]);
  });
});
