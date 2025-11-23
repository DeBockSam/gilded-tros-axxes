import { Item } from "../item";
import {
  DEFAULT_DEGRADATION_RATE,
  EXPIRED_ITEM_DEGRADATION_RATE,
  MIN_QUALITY,
} from "../configuration";

export interface StockItem extends Item {
  progressDay(): void;
  progressSellIn(): void;
  progressQuality(): void;
}

/**
 * Decorator function that adds daily progression methods to an Item
 * @param item The item to decorate
 * @returns The decorated item with progressDay, progressSellIn, and progressQuality methods
 */
export function GildedTrosStockItem(item: Item): StockItem {
  const stockItem = Object.create(item) as StockItem;

  stockItem.progressSellIn = function () {
    item.sellIn -= 1;
  };

  stockItem.progressQuality = function () {
    const degradationRate =
      item.sellIn < 0
        ? EXPIRED_ITEM_DEGRADATION_RATE
        : DEFAULT_DEGRADATION_RATE;
    item.quality = Math.max(MIN_QUALITY, item.quality - degradationRate);
  };

  stockItem.progressDay = function () {
    this.progressSellIn();
    this.progressQuality();
  };

  return stockItem;
}
