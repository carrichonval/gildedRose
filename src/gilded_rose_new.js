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
        return itemSellIn < verifySellIn;
    }

    checkQuality(itemQuality,verifyQuality){

    }
}


const QUALITY_MIN = 0;
const QUALITY_MAX = 50;
const SIX_DAYS = 6;
const ELEVEN_DAYS = 11;
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
                            if (checker.checkSellIn(item.sellIn,ELEVEN_DAYS)) {
                                if (item.quality < QUALITY_MAX) { //checkQuality
                                    item.quality = operations.increaseQuality(item.quality,1);
                                }
                            }
                            if (checker.checkSellIn(item.sellIn, SIX_DAYS)) {
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
                    item.sellIn = item.sellIn - 1; //decreaseSellIn
                }
                /*-------------------------------------------------------------*/
                if (checker.checkSellIn(item.sellIn,SELLIN_MIN)) {
                    if (!checker.checkName(item.name,'Aged Brie')) {
                        if (!checker.checkName(item.name,'Backstage passes to a TAFKAL80ETC concert')) {
                            if (item.quality > QUALITY_MIN) {//CheckQuality
                                if (!checker.checkName(item.name,'Sulfuras, Hand of Ragnaros')) {
                                    item.quality =  operations.decreaseQuality(item.quality,1);
                                }
                            }
                        } else {
                            item.quality = operations.decreaseQuality(item.quality, item.quality);
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
