import { Item } from "../item";
import {
  MIN_QUALITY,
  SMELLY_ITEM_DEGRADATION_MULTIPLIER,
} from "../configuration";
import { QualityUpdateStrategy } from "../types";
import { getBaseDegradationRate } from "./default";

export const smellyQualityStrategy: QualityUpdateStrategy = (item: Item) => {
  const baseDegradationRate = getBaseDegradationRate(item);
  const degradationRate =
    baseDegradationRate * SMELLY_ITEM_DEGRADATION_MULTIPLIER;
  item.quality = Math.max(MIN_QUALITY, item.quality - degradationRate);
};
