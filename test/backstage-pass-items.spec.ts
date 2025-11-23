import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";
import {
  BACKSTAGE_PASS_KEYWORDS,
  BACKSTAGE_PASS_IMPROVEMENT_RATES,
  EXPIRED_BACKSTAGE_PASS_QUALITY,
  MAX_QUALITY,
} from "../src/configuration";
import { updateQualityByDays } from "./test-utils";
import { assertItemMaximumQuality } from "./assertions";

const VALID_BACKSTAGE_PASS_NAME = `${BACKSTAGE_PASS_KEYWORDS[0]} for Re:Factor`;

function assertExpiredBackstagePassAsNoQuality(item: Item) {
  if (item.sellIn < 0)
    expect(item.quality).toEqual(EXPIRED_BACKSTAGE_PASS_QUALITY);
}

describe("Backstage pass items", () => {
  it("should increase in quality by 1 when sellIn > 10", () => {
    const items: Item[] = [new Item(VALID_BACKSTAGE_PASS_NAME, 15, 20)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toEqual(
      20 + BACKSTAGE_PASS_IMPROVEMENT_RATES.upperRate
    );
    updateQualityByDays(app, 4);
    expect(app.items[0].quality).toEqual(
      20 + BACKSTAGE_PASS_IMPROVEMENT_RATES.upperRate * 5
    );
  });

  it("should increase in quality by 2 when sellIn <= 10 and > 5", () => {
    const items: Item[] = [new Item(VALID_BACKSTAGE_PASS_NAME, 10, 20)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toEqual(
      20 + BACKSTAGE_PASS_IMPROVEMENT_RATES.middleRate
    );
    updateQualityByDays(app, 4);
    expect(app.items[0].quality).toEqual(
      20 + BACKSTAGE_PASS_IMPROVEMENT_RATES.middleRate * 5
    );
  });

  it("should increase in quality by 3 when sellIn <= 5", () => {
    const items: Item[] = [new Item(VALID_BACKSTAGE_PASS_NAME, 5, 20)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toEqual(
      20 + BACKSTAGE_PASS_IMPROVEMENT_RATES.lowerRate
    );
    updateQualityByDays(app, 4);
    expect(app.items[0].quality).toEqual(
      20 + BACKSTAGE_PASS_IMPROVEMENT_RATES.lowerRate * 5
    );
  });

  it("should not increase quality above maximum quality", () => {
    const items: Item[] = [
      new Item(
        VALID_BACKSTAGE_PASS_NAME,
        5,
        MAX_QUALITY - BACKSTAGE_PASS_IMPROVEMENT_RATES.lowerRate
      ),
    ];
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
    expect(app.items[0].quality).toEqual(
      20 + BACKSTAGE_PASS_IMPROVEMENT_RATES.lowerRate
    );
    app.updateQuality();
    assertExpiredBackstagePassAsNoQuality(app.items[0]);
    updateQualityByDays(app, 4);
    assertExpiredBackstagePassAsNoQuality(app.items[0]);
  });
});
