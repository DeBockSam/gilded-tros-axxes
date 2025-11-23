import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";
import { updateQualityByDays } from "./util";
import {
  SMELLY_ITEMS,
  DEFAULT_DEGRADATION_RATE,
  EXPIRED_ITEM_DEGRADATION_RATE,
  SMELLY_ITEM_DEGRADATION_MULTIPLIER,
} from "../src/configuration";
import { assertItemMinimumQuality } from "./util/assertions";

// TODO these are failing because they are not implemented correctly yet
describe("Smelly items", () => {
  it("should decrease quality twice as fast as normal items", () => {
    const items: Item[] = [new Item(SMELLY_ITEMS[0], 3, 20)];
    const app: GildedTros = new GildedTros(items);
    app.progressDay();
    expect(app.items[0].quality).toEqual(
      20 - DEFAULT_DEGRADATION_RATE * SMELLY_ITEM_DEGRADATION_MULTIPLIER
    );
    updateQualityByDays(app, 2);
    expect(app.items[0].quality).toEqual(
      20 - DEFAULT_DEGRADATION_RATE * SMELLY_ITEM_DEGRADATION_MULTIPLIER * 3
    );
  });

  it("should degrade four times as fast after sellIn date", () => {
    const items: Item[] = [new Item(SMELLY_ITEMS[0], 0, 20)];
    const app: GildedTros = new GildedTros(items);
    app.progressDay();
    expect(app.items[0].quality).toEqual(
      20 - EXPIRED_ITEM_DEGRADATION_RATE * SMELLY_ITEM_DEGRADATION_MULTIPLIER
    );
    updateQualityByDays(app, 2);
    expect(app.items[0].quality).toEqual(
      20 -
        EXPIRED_ITEM_DEGRADATION_RATE * SMELLY_ITEM_DEGRADATION_MULTIPLIER * 3
    );
    updateQualityByDays(app, 2);
    expect(app.items[0].quality).toEqual(
      20 -
        EXPIRED_ITEM_DEGRADATION_RATE * SMELLY_ITEM_DEGRADATION_MULTIPLIER * 5
    );
  });

  it("should not degrade below minimum quality", () => {
    const items: Item[] = [new Item(SMELLY_ITEMS[0], 0, 3)];
    const app: GildedTros = new GildedTros(items);
    app.progressDay();
    assertItemMinimumQuality(app.items[0]);
    updateQualityByDays(app, 2);
    assertItemMinimumQuality(app.items[0]);
  });
});
