import { GildedTros } from "@/gilded-tros";

export function updateQualityByDays(app: GildedTros, days: number): void {
  for (let i = 0; i < days; i++) {
    app.progressDay();
  }
}
