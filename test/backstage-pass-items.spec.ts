import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";
import { BACKSTAGE_PASS_KEYWORDS } from "../src/configuration";
import { updateQualityByDays } from "./test-utils";
import { assertItemMaximumQuality } from "./assertions";

const VALID_BACKSTAGE_PASS_NAME = `${BACKSTAGE_PASS_KEYWORDS[0]} for Re:Factor`;

function assertExpiredBackstagePassAsNoQuality(item: Item) {
  if (item.sellIn < 0) expect(item.quality).toEqual(0);
}

describe("Backstage pass items", () => {
  it("should increase in quality by 1 when sellIn > 10", () => {
    const items: Item[] = [new Item(VALID_BACKSTAGE_PASS_NAME, 15, 20)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toEqual(21);
    updateQualityByDays(app, 4);
    expect(app.items[0].quality).toEqual(25);
  });

  it("should increase in quality by 2 when sellIn <= 10 and > 5", () => {
    const items: Item[] = [new Item(VALID_BACKSTAGE_PASS_NAME, 10, 20)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toEqual(22);
    updateQualityByDays(app, 4);
    expect(app.items[0].quality).toEqual(30);
  });

  it("should increase in quality by 3 when sellIn <= 5", () => {
    const items: Item[] = [new Item(VALID_BACKSTAGE_PASS_NAME, 5, 20)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toEqual(23);
    updateQualityByDays(app, 4);
    expect(app.items[0].quality).toEqual(35);
  });

  it("should not increase quality above maximum quality", () => {
    const items: Item[] = [new Item(VALID_BACKSTAGE_PASS_NAME, 5, 48)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    assertItemMaximumQuality(app.items[0]);
    updateQualityByDays(app, 4);
    assertItemMaximumQuality(app.items[0]);
  });

  // TODO failing because not implemented correctly?
  it("should drop quality to 0 after the event", () => {
    const items: Item[] = [new Item(VALID_BACKSTAGE_PASS_NAME, 1, 20)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toEqual(23);
    app.updateQuality();
    assertExpiredBackstagePassAsNoQuality(app.items[0]);
    updateQualityByDays(app, 4);
    assertExpiredBackstagePassAsNoQuality(app.items[0]);
  });
});
