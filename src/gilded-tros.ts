import { Item } from "@/item";
import {
  StockItem,
  GildedTrosStockItem,
} from "@/decorators/GildedTrosStockItem";
import { getItemType } from "@/types";

export class GildedTros {
  public items: Array<StockItem>;

  constructor(items: Array<Item>) {
    this.items = items.map((item) => {
      const itemType = getItemType(item);
      return GildedTrosStockItem(item, itemType);
    });
  }

  public progressDay(): void {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].progressDay();
    }
  }
}
