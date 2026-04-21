export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const MAX_QUALITY = 50;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      if (item.name.startsWith('Aged Brie')) {
        this.updateAgedBrie(item);
      } else if (item.name.startsWith('Backstage passes')) {
        this.updateBackstagePass(item);
      } else if (item.name.startsWith('Sulfuras')) {
        this.updateSulfuras(item);
      } else if (item.name.startsWith('Conjured')) {
        this.updateConjured(item);
      } else {
        this.updateGeneric(item);
      }
    })
  }

  updateAgedBrie(item: Item) {
    let decrement = 1;
    if (item.sellIn <= 0) {
      decrement = 2;
    }
    item.quality = Math.min(item.quality + decrement, MAX_QUALITY);
    item.sellIn -= 1;
  }

  updateBackstagePass(item: Item) {
    if (item.sellIn <= 0) {
      item.quality = 0;
    } else {
      let decrement = 1;
      if (item.sellIn <= 5) {
        decrement = 3;
      } else if (item.sellIn <= 10) {
        decrement = 2;
      }
      item.quality = Math.min(MAX_QUALITY, item.quality + decrement);
    }
    item.sellIn -= 1;
  }

  updateSulfuras(item: Item) {
    // no change in sellIn or quality
  }

  updateConjured(item: Item) {
    let decrement = -2;
    if (item.sellIn <= 0) {
      decrement = -4;
    }
    item.quality = Math.max(0, item.quality + decrement);
    item.sellIn -= 1;
  }

  updateGeneric(item: Item) {
    let decrement = -1;
    if (item.sellIn <= 0) {
      decrement = -2;
    }
    item.quality = Math.max(0, item.quality + decrement);
    item.sellIn -= 1;
  }

  updateQualityLegacy() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        // sulfuras, conjured, regular
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          // if aged brie or pass quality < 50
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              // increment again
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            // do it again
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }
      // decrement all sellIn except for sulfuras
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          // sulfuras, passes, regular
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            // sulfuras, regular
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                // regular
                this.items[i].quality = this.items[i].quality - 1
              }
            }
          } else {
            // passes with a sellIn <0 
            this.items[i].quality = this.items[i].quality - this.items[i].quality
            // weird way to set to 0
          }
        } else {
          // if agedBrie
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items;
  }
}
