import { Item } from "@/item";
import { GildedTros } from "@/gilded-tros";
import { updateQualityByDays } from "@/test/util";
import { LEGENDARY_ITEMS, LEGENDARY_ITEM_QUALITY } from "@/configuration";

describe("Legendary items", () => {
  it("should not update quality", () => {
    const items: Item[] = [
      new Item(LEGENDARY_ITEMS[0], 1, LEGENDARY_ITEM_QUALITY),
    ];
    const app: GildedTros = new GildedTros(items);
    app.progressDay();
    expect(app.items[0].quality).toEqual(LEGENDARY_ITEM_QUALITY);
    updateQualityByDays(app, 10);
    expect(app.items[0].quality).toEqual(LEGENDARY_ITEM_QUALITY);
  });

  it("should not update sellIn", () => {
    const items: Item[] = [
      new Item(LEGENDARY_ITEMS[0], 10, LEGENDARY_ITEM_QUALITY),
    ];
    const app: GildedTros = new GildedTros(items);
    app.progressDay();
    expect(app.items[0].sellIn).toEqual(10);
    updateQualityByDays(app, 5);
    expect(app.items[0].sellIn).toEqual(10);
  });
});
