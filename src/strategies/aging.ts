import { Item } from "../item";
import { MAX_QUALITY, AGING_ITEM_IMPROVEMENT_RATE } from "../configuration";
import { QualityUpdateStrategy } from "../types";

export const agingQualityStrategy: QualityUpdateStrategy = (item: Item) => {
  item.quality = Math.min(
    MAX_QUALITY,
    item.quality + AGING_ITEM_IMPROVEMENT_RATE
  );
};
