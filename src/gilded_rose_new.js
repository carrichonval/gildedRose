class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

class Operations{

    increaseQuality(itemQuality,number){
        return itemQuality += number;
    }

    decreaseQuality(itemQuality,number){
        
    }
}

class Checker{

    checkName(itemName,verifyName){

    }

    checkLegend(itemName,verifyName){

    }

    checkSellIn(itemSellIn,verifySellIn){

    }

    checkQuality(itemQuality,verifyQuality){

    }
}

class Shop {
    static QUALITY_MIN = 0;
    static QUALITY_MAX = 50;
    static FIVE_DAYS = 5;
    static TEN_DAYS = 10;
    static SELLIN_MIN = 0;

    constructor(items = []) {
        this.items = items;
    }
    updateQuality() {
        //Parcours les items
        this.items.forEach((item) => {
            
                //Vérifie si c'est pas un Brie ET pas un Backstage
                if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') { // Checkname x2
    
                    if (item.quality > QUALITY_MIN) { //CheckQuality
                        if (item.name != 'Sulfuras, Hand of Ragnaros') { //checkName
                            item.quality = item.quality - 1; //decrease
                        }
                    }
    
                } else {
                    if (item.quality < QUALITY_MAX) { // checkQuality
                        item.quality = Operations.increaseQuality(item.quality,1);
                        if (item.name == 'Backstage passes to a TAFKAL80ETC concert') { //checkname
                            if (item.sellIn <= TEN_DAYS) { //checkSellIn
                                if (item.quality < QUALITY_MAX) { //checkQuality
                                    item.quality = Operations.increaseQuality(item.quality,1);
                                }
                            }
                            if (item.sellIn <= FIVE_DAYS) { //checkSellIn
                                if (item.quality < QUALITY_MAX) { //checkQuality
                                    item.quality = Operations.increaseQuality(item.quality,1);
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
                if (item.sellIn < SELLIN_MIN) { //checkSellIn
                    if (item.name != 'Aged Brie') {//CheckName
                        if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {//CheckName
                            if (item.quality > QUALITY_MIN) {//CheckQuality
                                if (item.name != 'Sulfuras, Hand of Ragnaros') {//CheckName
                                    item.quality = item.quality - 1;//decreaseQality
                                }
                            }
                        } else {
                            item.quality = item.quality - item.quality;//mettre a zero
                        }
                    } else {
                        if (item.quality < QUALITY_MAX) {//checkQuality
                            item.quality = Operations.increaseQuality(item.quality,1);
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
