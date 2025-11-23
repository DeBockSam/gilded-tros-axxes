import { Item } from "@/item";
import {
  defaultSellInStrategy,
  defaultQualityStrategy,
} from "@/strategies/default";
import { agingQualityStrategy } from "@/strategies/aging";
import {
  legendarySellInStrategy,
  legendaryQualityStrategy,
} from "@/strategies/legendary";
import { backstagePassQualityStrategy } from "@/strategies/backstage-pass";
import { smellyQualityStrategy } from "@/strategies/smelly";

export interface StockItem extends Item {
  progressDay(): void;
  progressSellIn(): void;
  progressQuality(): void;
}

import { SellInUpdateStrategy, QualityUpdateStrategy } from "@/types";

interface ItemUpdateStrategy {
  updateSellIn: SellInUpdateStrategy;
  updateQuality: QualityUpdateStrategy;
}

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
  legendary: {
    updateSellIn: legendarySellInStrategy,
    updateQuality: legendaryQualityStrategy,
  },
  backstagePass: {
    updateSellIn: defaultSellInStrategy,
    updateQuality: backstagePassQualityStrategy,
  },
  smelly: {
    updateSellIn: defaultSellInStrategy,
    updateQuality: smellyQualityStrategy,
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
