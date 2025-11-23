import { Item } from "@/item";
import {
  StockItem,
  GildedTrosStockItem,
} from "@/decorators/GildedTrosStockItem";
import {
  isAgingItem,
  isLegendaryItem,
  isBackstagePassItem,
  isSmellyItem,
} from "@/types";

export class GildedTros {
  public items: Array<StockItem>;

  constructor(items: Array<Item>) {
    this.items = items.map((item) => {
      if (isBackstagePassItem(item)) {
        return GildedTrosStockItem(item, "backstagePass");
      }
      if (isLegendaryItem(item)) {
        return GildedTrosStockItem(item, "legendary");
      }
      if (isAgingItem(item)) {
        return GildedTrosStockItem(item, "aging");
      }
      if (isSmellyItem(item)) {
        return GildedTrosStockItem(item, "smelly");
      }
      return GildedTrosStockItem(item, "default");
    });
  }

  public progressDay(): void {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].progressDay();
    }
  }
}
