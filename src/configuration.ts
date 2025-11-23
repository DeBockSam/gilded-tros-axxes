export const LEGENDARY_ITEMS = ["B-DAWG Keychain"] as const;
export const AGING_ITEMS = ["Good Wine"] as const;
export const BACKSTAGE_PASS_KEYWORDS = ["Backstage passes"] as const;
export const SMELLY_ITEMS = [
  "Duplicate Code",
  "Long Methods",
  "Ugly Variable Names",
] as const;

export const DEFAULT_DEGRADATION_RATE = 1;
export const EXPIRED_ITEM_DEGRADATION_RATE = 2;
export const AGING_ITEM_IMPROVEMENT_RATE = 1;
export const BACKSTAGE_PASS_IMPROVEMENT_RATES = {
  upperThreshold: 10,
  middleThreshold: 5,
  upperRate: 1,
  middleRate: 2,
  lowerRate: 3,
};
export const LEGENDARY_ITEM_QUALITY = 80;
export const EXPIRED_BACKSTAGE_PASS_QUALITY = 0;
export const SMELLY_ITEM_DEGRADATION_MULTIPLIER = 2;
export const MAX_QUALITY = 50;
export const MIN_QUALITY = 0;
