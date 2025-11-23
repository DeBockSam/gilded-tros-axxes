import { Item } from "./item";
import {
  AGING_ITEMS,
  LEGENDARY_ITEMS,
  BACKSTAGE_PASS_KEYWORDS,
  SMELLY_ITEMS,
} from "./configuration";

type AgingItemName = (typeof AGING_ITEMS)[number];
type LegendaryItemName = (typeof LEGENDARY_ITEMS)[number];
type SmellyItemName = (typeof SMELLY_ITEMS)[number];

/**
 * Type guard to check if an item is an aging item
 * @param item The item to check
 * @returns true if the item is an aging item
 */
export function isAgingItem(
  item: Item
): item is Item & { name: AgingItemName } {
  return (AGING_ITEMS as readonly string[]).includes(item.name);
}

/**
 * Type guard to check if an item is a legendary item
 * @param item The item to check
 * @returns true if the item is a legendary item
 */
export function isLegendaryItem(
  item: Item
): item is Item & { name: LegendaryItemName } {
  return (LEGENDARY_ITEMS as readonly string[]).includes(item.name);
}

/**
 * Type guard to check if an item is a backstage pass
 * @param item The item to check
 * @returns true if the item name contains any of the backstage pass keywords
 */
export function isBackstagePassItem(item: Item): boolean {
  return (BACKSTAGE_PASS_KEYWORDS as readonly string[]).some((keyword) =>
    item.name.includes(keyword)
  );
}

/**
 * Type guard to check if an item is a smelly item
 * @param item The item to check
 * @returns true if the item is a smelly item
 */
export function isSmellyItem(
  item: Item
): item is Item & { name: SmellyItemName } {
  return (SMELLY_ITEMS as readonly string[]).includes(item.name);
}

export type SellInUpdateStrategy = (item: Item) => void;
export type QualityUpdateStrategy = (item: Item) => void;
