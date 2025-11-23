import { Item } from "@/item";
import {
  StockItem,
  GildedTrosStockItem,
} from "@/decorators/GildedTrosStockItem";
import { getItemType, isLegendaryItem } from "@/types";
import {
  MIN_QUALITY,
  MAX_QUALITY,
  LEGENDARY_ITEM_QUALITY,
} from "@/configuration";

export class GildedTros {
  public items: Array<StockItem>;

  constructor(items: Array<Item>, shouldSanitizeInitialData: boolean = false) {
    if (shouldSanitizeInitialData) {
      items = this.sanitizeItems(items);
    }

    this.items = items.map((item) => {
      const itemType = getItemType(item);
      return GildedTrosStockItem(item, itemType);
    });
  }

  private sanitizeItems(items: Array<Item>): Array<Item> {
    return items.map((item) => {
      if (isLegendaryItem(item)) {
        item.sellIn = 0;
        item.quality = LEGENDARY_ITEM_QUALITY;
      } else {
        item.quality = Math.max(
          MIN_QUALITY,
          Math.min(MAX_QUALITY, item.quality)
        );
      }
      return item;
    });
  }

  public progressDay(): void {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].progressDay();
    }
  }
}
