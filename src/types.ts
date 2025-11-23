import { Item } from "./item";
import { AGING_ITEMS } from "./configuration";

type AgingItemName = (typeof AGING_ITEMS)[number];

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
