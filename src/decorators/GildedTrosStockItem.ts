import { Item } from "../item";
import {
  DEFAULT_DEGRADATION_RATE,
  EXPIRED_ITEM_DEGRADATION_RATE,
  MIN_QUALITY,
  MAX_QUALITY,
  AGING_ITEM_IMPROVEMENT_RATE,
} from "../configuration";

export interface StockItem extends Item {
  progressDay(): void;
  progressSellIn(): void;
  progressQuality(): void;
}

type SellInUpdateStrategy = (item: Item) => void;

type QualityUpdateStrategy = (item: Item) => void;

interface ItemUpdateStrategy {
  updateSellIn: SellInUpdateStrategy;
  updateQuality: QualityUpdateStrategy;
}

const defaultSellInStrategy: SellInUpdateStrategy = (item: Item) => {
  item.sellIn -= 1;
};

const defaultQualityStrategy: QualityUpdateStrategy = (item: Item) => {
  const degradationRate =
    item.sellIn < 0 ? EXPIRED_ITEM_DEGRADATION_RATE : DEFAULT_DEGRADATION_RATE;
  item.quality = Math.max(MIN_QUALITY, item.quality - degradationRate);
};

const agingQualityStrategy: QualityUpdateStrategy = (item: Item) => {
  item.quality = Math.min(
    MAX_QUALITY,
    item.quality + AGING_ITEM_IMPROVEMENT_RATE
  );
};

/**
 * Map of item types to their update strategies
 * This makes it easy to add new item types with their own logic
 */
const updateStrategies: Record<string, ItemUpdateStrategy> = {
  default: {
    updateSellIn: defaultSellInStrategy,
    updateQuality: defaultQualityStrategy,
  },
  aging: {
    updateSellIn: defaultSellInStrategy,
    updateQuality: agingQualityStrategy,
  },
};

/**
 * Decorator function that adds daily progression methods to an Item
 * @param item The item to decorate
 * @param type The type of item (default: "default")
 * @returns The decorated item with progressDay, progressSellIn, and progressQuality methods
 */
export function GildedTrosStockItem(
  item: Item,
  type: string = "default"
): StockItem {
  const strategy = updateStrategies[type] || updateStrategies.default;

  const stockItem = Object.create(item) as StockItem;

  stockItem.progressSellIn = function () {
    strategy.updateSellIn(item);
  };

  stockItem.progressQuality = function () {
    strategy.updateQuality(item);
  };

  stockItem.progressDay = function () {
    this.progressSellIn();
    this.progressQuality();
  };

  return stockItem;
}
