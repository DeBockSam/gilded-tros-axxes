import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";
import { updateQualityByDays } from "./util";
import {
  AGING_ITEMS,
  AGING_ITEM_IMPROVEMENT_RATE,
  MAX_QUALITY,
} from "../src/configuration";
import { assertItemMaximumQuality } from "./util/assertions";

describe("Aging items", () => {
  it("should increase in quality", () => {
    const items: Item[] = [new Item(AGING_ITEMS[0], 1, 10)];
    const app: GildedTros = new GildedTros(items);
    app.progressDay();
    expect(app.items[0].quality).toEqual(10 + AGING_ITEM_IMPROVEMENT_RATE);
  });

  it("should not increase above maximum quality", () => {
    const items: Item[] = [
      new Item(AGING_ITEMS[0], 0, MAX_QUALITY - AGING_ITEM_IMPROVEMENT_RATE),
    ];
    const app: GildedTros = new GildedTros(items);
    app.progressDay();
    assertItemMaximumQuality(app.items[0]);
    updateQualityByDays(app, 2);
    assertItemMaximumQuality(app.items[0]);
  });
});
