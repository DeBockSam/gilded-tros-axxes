import { Item } from "../item";
import { QualityUpdateStrategy, SellInUpdateStrategy } from "../types";

export const legendarySellInStrategy: SellInUpdateStrategy = (item: Item) => {
  // Legendary items don't need to be sold
};

export const legendaryQualityStrategy: QualityUpdateStrategy = (item: Item) => {
  // Legendary items never change quality
};
