class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

class Operations{

    increaseQuality(itemQuality,number){
        return itemQuality + number;
    }

    decreaseQuality(itemQuality,number){
        return itemQuality - number;
    }
}

class Checker{

    checkName(itemName,verifyName){
        return itemName === verifyName;
    }

    checkSellIn(itemSellIn,verifySellIn){

    }

    checkQuality(itemQuality,verifyQuality){

    }
}


const QUALITY_MIN = 0;
const QUALITY_MAX = 50;
const FIVE_DAYS = 5;
const TEN_DAYS = 10;
const SELLIN_MIN = 0;

class Shop {

    constructor(items = []) {
        this.items = items;
    }
    updateQuality() {
        //Parcours les items
        const operations = new Operations();
        const checker = new Checker();

        this.items.forEach((item) => {

                //Vérifie si c'est pas un Brie ET pas un Backstage
                if (!checker.checkName(item.name,'Aged Brie') && !checker.checkName(item.name,'Backstage passes to a TAFKAL80ETC concert')) {
    
                    if (item.quality > QUALITY_MIN) { //CheckQuality
                        if (!checker.checkName(item.name,'Sulfuras, Hand of Ragnaros')) {
                            item.quality = operations.decreaseQuality(item.quality,1);
                        }
                    }
    
                } else {
                    if (item.quality < QUALITY_MAX) { // checkQuality
                        item.quality = operations.increaseQuality(item.quality,1);
                        if (checker.checkName(item.name,'Backstage passes to a TAFKAL80ETC concert')) {
                            if (item.sellIn <= TEN_DAYS) { //checkSellIn
                                if (item.quality < QUALITY_MAX) { //checkQuality
                                    item.quality = operations.increaseQuality(item.quality,1);
                                }
                            }
                            if (item.sellIn <= FIVE_DAYS) { //checkSellIn
                                if (item.quality < QUALITY_MAX) { //checkQuality
                                    item.quality = operations.increaseQuality(item.quality,1);
                                }
                            }
                        }
                    }
                }
    
                /*-------------------------------------------------------------*/
    
                //Si c'est Sulfuras
                if (!checker.checkName(item.name, 'Sulfuras, Hand of Ragnaros')) {
                    item.sellIn = item.sellIn - 1; //increaseQuality
                }
                /*-------------------------------------------------------------*/
                if (item.sellIn < SELLIN_MIN) { //checkSellIn
                    if (!checker.checkName(item.name,'Aged Brie')) {
                        if (!checker.checkName(item.name,'Backstage passes to a TAFKAL80ETC concert')) {
                            if (item.quality > QUALITY_MIN) {//CheckQuality
                                if (!checker.checkName(item.name,'Sulfuras, Hand of Ragnaros')) {
                                    item.quality =  operations.decreaseQuality(item.quality,1);
                                }
                            }
                        } else {
                            item.quality = item.quality - item.quality;//mettre a zero
                        }
                    } else {
                        if (item.quality < QUALITY_MAX) {//checkQuality
                            item.quality = operations.increaseQuality(item.quality,1);
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
