import { Item } from "../../src/item";
import { MIN_QUALITY, MAX_QUALITY } from "../../src/configuration";

export function assertItemMinimumQuality(item: Item): void {
  expect(item.quality).toBeGreaterThanOrEqual(MIN_QUALITY);
}

export function assertItemMaximumQuality(item: Item): void {
  expect(item.quality).toBeLessThanOrEqual(MAX_QUALITY);
}
