import { Item } from "@/item";
import { MIN_QUALITY, MAX_QUALITY } from "@/configuration";

export function assertItemMinimumQuality(item: Item): void {
  expect(item.quality).toBeGreaterThanOrEqual(MIN_QUALITY);
}

export function assertItemMaximumQuality(item: Item): void {
  expect(item.quality).toBeLessThanOrEqual(MAX_QUALITY);
}
