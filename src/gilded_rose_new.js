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
        this.items.forEach((item) => {
            
                //Vérifie si c'est pas un Brie ET pas un Backstage
                if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') { // Checkname x2
    
                    if (item.quality > 0) { //CheckQuality
                        if (item.name != 'Sulfuras, Hand of Ragnaros') { //checkName
                            item.quality = item.quality - 1; //increase
                        }
                    }
    
                } else {
                    if (item.quality < 50) { // checkQuality
                        item.quality = item.quality + 1; //increaseQaulity
                        if (item.name == 'Backstage passes to a TAFKAL80ETC concert') { //checkname
                            if (item.sellIn < 11) { //checkSellIn
                                if (item.quality < 50) { //checkQuality
                                    item.quality = item.quality + 1; //increaseQuality
                                }
                            }
                            if (item.sellIn < 6) { //checkSellIn
                                if (item.quality < 50) { //checkQuality
                                    item.quality = item.quality + 1; //increaseQuality
                                }
                            }
                        }
                    }
                }
    
                /*-------------------------------------------------------------*/
    
                //Si c'est Sulfuras
                if (item.name != 'Sulfuras, Hand of Ragnaros') { // CheckLegend
                    item.sellIn = item.sellIn - 1; //increaseQuality
                }
                /*-------------------------------------------------------------*/
                if (item.sellIn < 0) { //checkSellIn
                    if (item.name != 'Aged Brie') {//CheckName
                        if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {//CheckName
                            if (item.quality > 0) {//CheckQuality
                                if (item.name != 'Sulfuras, Hand of Ragnaros') {//CheckName
                                    item.quality = item.quality - 1;//increaseQality
                                }
                            }
                        } else {
                            item.quality = item.quality - item.quality;//mettre a zero
                        }
                    } else {
                        if (item.quality < 50) {//checkQuality
                            item.quality = item.quality + 1; // increaseQuality
                        }
                    }
                }
    
        });

        return this.items;
    }
}
module.exports = {
    Item,
    Shop
}
