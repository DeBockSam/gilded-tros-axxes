import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";
import { updateQualityByDays } from "./test-utils";
import { assertItemMinimumQuality } from "./assertions";
import {
  DEFAULT_DEGRADATION_RATE,
  EXPIRED_ITEM_DEGRADATION_RATE,
} from "../src/configuration";

const DEFAULT_ITEM_TEST_NAME = "foo";

describe("Default items", () => {
  it("should decrease in quality", () => {
    const items: Item[] = [new Item(DEFAULT_ITEM_TEST_NAME, 1, 10)];
    const app: GildedTros = new GildedTros(items);
    app.progressDay();
    expect(app.items[0].quality).toEqual(10 - DEFAULT_DEGRADATION_RATE);
  });

  it("should degrade twice as fast after sellIn date", () => {
    const items: Item[] = [new Item(DEFAULT_ITEM_TEST_NAME, 0, 10)];
    const app: GildedTros = new GildedTros(items);
    app.progressDay();
    expect(app.items[0].quality).toEqual(10 - EXPIRED_ITEM_DEGRADATION_RATE);
    updateQualityByDays(app, 3);
    expect(app.items[0].quality).toEqual(
      10 - EXPIRED_ITEM_DEGRADATION_RATE * 4
    );
    updateQualityByDays(app, 3);
    expect(app.items[0].quality).toEqual(0);
  });

  it("should not degrade below minimum quality", () => {
    const items: Item[] = [new Item(DEFAULT_ITEM_TEST_NAME, 0, 1)];
    const app: GildedTros = new GildedTros(items);
    app.progressDay();
    assertItemMinimumQuality(app.items[0]);
    updateQualityByDays(app, 4);
    assertItemMinimumQuality(app.items[0]);
  });

  it("should decrease sellIn by 1", () => {
    const items: Item[] = [new Item(DEFAULT_ITEM_TEST_NAME, 5, 10)];
    const app: GildedTros = new GildedTros(items);
    app.progressDay();
    expect(app.items[0].sellIn).toEqual(4);
    updateQualityByDays(app, 3);
    expect(app.items[0].sellIn).toEqual(1);
    updateQualityByDays(app, 2);
    expect(app.items[0].sellIn).toEqual(-1);
    updateQualityByDays(app, 3);
    expect(app.items[0].sellIn).toEqual(-4);
  });
});
