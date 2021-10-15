class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

class Shop {
    constructor(items = []) {
        this.items = items;
    }
    updateQuality() {
        //Parcours les items
        for (let i = 0; i < this.items.length; i++) {
            //Vérifie si c'est pas un Brie ET pas un Backstage
            if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') { // Checkname x2

                if (this.items[i].quality > 0) { //CheckQuality
                    if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') { //checkName
                        this.items[i].quality = this.items[i].quality - 1; //increase
                    }
                }

            } else {
                if (this.items[i].quality < 50) { // checkQuality
                    this.items[i].quality = this.items[i].quality + 1; //increaseQaulity
                    if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') { //checkname
                        if (this.items[i].sellIn < 11) { //checkSellIn
                            if (this.items[i].quality < 50) { //checkQuality
                                this.items[i].quality = this.items[i].quality + 1; //increaseQuality
                            }
                        }
                        if (this.items[i].sellIn < 6) { //checkSellIn
                            if (this.items[i].quality < 50) { //checkQuality
                                this.items[i].quality = this.items[i].quality + 1; //increaseQuality
                            }
                        }
                    }
                }
            }

            /*-------------------------------------------------------------*/

            //Si c'est Sulfuras
            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') { // CheckLegend
                this.items[i].sellIn = this.items[i].sellIn - 1; //increaseQuality
            }
            /*-------------------------------------------------------------*/
            if (this.items[i].sellIn < 0) { //checkSellIn
                if (this.items[i].name != 'Aged Brie') {//CheckName
                    if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {//CheckName
                        if (this.items[i].quality > 0) {//CheckQuality
                            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {//CheckName
                                this.items[i].quality = this.items[i].quality - 1;//increaseQality
                            }
                        }
                    } else {
                        this.items[i].quality = this.items[i].quality - this.items[i].quality;//mettre a zero
                    }
                } else {
                    if (this.items[i].quality < 50) {//checkQuality
                        this.items[i].quality = this.items[i].quality + 1; // increaseQuality
                    }
                }
            }

        }

        return this.items;
    }
}
module.exports = {
    Item,
    Shop
}
