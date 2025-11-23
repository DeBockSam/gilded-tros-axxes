import { Item } from "./item";
import {
  StockItem,
  GildedTrosStockItem,
} from "./decorators/GildedTrosStockItem";
import { isAgingItem, isLegendaryItem, isBackstagePassItem } from "./types";

export class GildedTros {
  public items: Array<StockItem>;

  constructor(items: Array<Item>) {
    this.items = items.map((item) => {
      if (isBackstagePassItem(item)) {
        return GildedTrosStockItem(item, "backstagePass");
      }
      if (isLegendaryItem(item)) {
        return GildedTrosStockItem(item, "legendary");
      }
      if (isAgingItem(item)) {
        return GildedTrosStockItem(item, "aging");
      }
      return GildedTrosStockItem(item, "default");
    });
  }

  public progressDay(): void {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].progressDay();
    }
  }

  // Old implementation - kept for reference
  /*
  public updateQuality(): void {
    for (let i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name != "Good Wine" &&
        this.items[i].name != "Backstage passes for Re:Factor" &&
        this.items[i].name != "Backstage passes for HAXX"
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "B-DAWG Keychain") {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;

          if (this.items[i].name == "Backstage passes for Re:Factor") {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }

            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }

      if (this.items[i].name != "B-DAWG Keychain") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Good Wine") {
          if (
            this.items[i].name != "Backstage passes for Re:Factor" ||
            this.items[i].name != "Backstage passes for HAXX"
          ) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != "B-DAWG Keychain") {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }
  }
  */
}
