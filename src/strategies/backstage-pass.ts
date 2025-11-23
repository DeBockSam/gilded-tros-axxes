import { Item } from "@/item";
import {
  MAX_QUALITY,
  BACKSTAGE_PASS_IMPROVEMENT_RATES,
  EXPIRED_BACKSTAGE_PASS_QUALITY,
} from "@/configuration";
import { QualityUpdateStrategy } from "@/types";

export const backstagePassQualityStrategy: QualityUpdateStrategy = (
  item: Item
) => {
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
