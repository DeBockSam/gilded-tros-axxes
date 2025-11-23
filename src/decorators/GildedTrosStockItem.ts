import { Item } from "../item";
import {
  DEFAULT_DEGRADATION_RATE,
  EXPIRED_ITEM_DEGRADATION_RATE,
  MIN_QUALITY,
  MAX_QUALITY,
  AGING_ITEM_IMPROVEMENT_RATE,
  BACKSTAGE_PASS_IMPROVEMENT_RATES,
  EXPIRED_BACKSTAGE_PASS_QUALITY,
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

const legendarySellInStrategy: SellInUpdateStrategy = (item: Item) => {
  // Legendary items don't need to be sold
};

const legendaryQualityStrategy: QualityUpdateStrategy = (item: Item) => {
  // Legendary items never change quality
};

const backstagePassQualityStrategy: QualityUpdateStrategy = (item: Item) => {
  if (item.sellIn < 0) {
    item.quality = EXPIRED_BACKSTAGE_PASS_QUALITY;
    return;
  }
  let improvementRate: number;
  if (item.sellIn < BACKSTAGE_PASS_IMPROVEMENT_RATES.middleThreshold) {
    improvementRate = BACKSTAGE_PASS_IMPROVEMENT_RATES.lowerRate;
  } else if (item.sellIn < BACKSTAGE_PASS_IMPROVEMENT_RATES.upperThreshold) {
    improvementRate = BACKSTAGE_PASS_IMPROVEMENT_RATES.middleRate;
  } else {
    improvementRate = BACKSTAGE_PASS_IMPROVEMENT_RATES.upperRate;
  }

  item.quality = Math.min(MAX_QUALITY, item.quality + improvementRate);
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
  legendary: {
    updateSellIn: legendarySellInStrategy,
    updateQuality: legendaryQualityStrategy,
  },
  backstagePass: {
    updateSellIn: defaultSellInStrategy,
    updateQuality: backstagePassQualityStrategy,
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
