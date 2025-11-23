import { GildedTros } from "../src/gilded-tros";

export function updateQualityByDays(app: GildedTros, days: number): void {
  for (let i = 0; i < days; i++) {
    app.progressDay();
  }
}
