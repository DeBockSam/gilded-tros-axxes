import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";
import { updateQualityByDays } from "./test-utils";
import { LEGENDARY_ITEMS } from "../src/configuration";

describe("Legendary items", () => {
  it("should not update quality", () => {
    const items: Item[] = [new Item(LEGENDARY_ITEMS[0], 1, 80)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].quality).toEqual(80);
    updateQualityByDays(app, 10);
    expect(app.items[0].quality).toEqual(80);
  });
});
