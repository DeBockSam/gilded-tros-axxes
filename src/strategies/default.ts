import { Item } from "../item";
import {
  DEFAULT_DEGRADATION_RATE,
  EXPIRED_ITEM_DEGRADATION_RATE,
  MIN_QUALITY,
} from "../configuration";
import { QualityUpdateStrategy, SellInUpdateStrategy } from "../types";

export const getBaseDegradationRate = (item: Item): number => {
  return item.sellIn < 0
    ? EXPIRED_ITEM_DEGRADATION_RATE
    : DEFAULT_DEGRADATION_RATE;
};

export const defaultSellInStrategy: SellInUpdateStrategy = (item: Item) => {
  item.sellIn -= 1;
};

export const defaultQualityStrategy: QualityUpdateStrategy = (item: Item) => {
  const degradationRate = getBaseDegradationRate(item);
  item.quality = Math.max(MIN_QUALITY, item.quality - degradationRate);
};
