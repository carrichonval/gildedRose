class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

class Operations{

    increase(itemQuality,number){
        return itemQuality + number;
    }

    decrease(itemQuality,number){
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

    checkQualityMin(itemQuality,verifyQualityMin){
        return itemQuality > verifyQualityMin;
    }

    checkQualityMax(itemQuality,verifyQualityMax){
        return itemQuality < verifyQualityMax;
    }
}


const QUALITY_MIN = 0;
const QUALITY_MAX = 50;
const SIX_DAYS = 6;
const ELEVEN_DAYS = 11;
const SELLIN_MIN = 0;

class Shop {

    constructor(items = [], checker, operations) {
        this.items = items;
        this.checker = checker;
        this.operations = operations;
    }
    
    updateQualityItem(itemQuality){
        if (this.checker.checkQualityMax(itemQuality,QUALITY_MAX)) {
            return this.operations.increase(itemQuality,1);
        }
    }

    updateQuality() {
        //Parcours les items

        this.items.forEach((item) => {

                //Vérifie si c'est pas un Brie ET pas un Backstage
                if (!this.checker.checkName(item.name,'Aged Brie') && !this.checker.checkName(item.name,'Backstage passes to a TAFKAL80ETC concert')) {
    
                    if (this.checker.checkQualityMin(item.quality,QUALITY_MIN)) {
                        if (!this.checker.checkName(item.name,'Sulfuras, Hand of Ragnaros')) {
                            item.quality = this.operations.decrease(item.quality,1);
                        }
                    }
    
                } else {
                    if (this.checker.checkQualityMax(item.quality,QUALITY_MAX)) {
                        item.quality = this.operations.increase(item.quality,1);
                        if (this.checker.checkName(item.name,'Backstage passes to a TAFKAL80ETC concert')) {
                            if (this.checker.checkSellIn(item.sellIn,ELEVEN_DAYS)) {
                                if (this.checker.checkQualityMax(item.quality,QUALITY_MAX)) {
                                    item.quality = this.operations.increase(item.quality,1);
                                }
                            }
                            if (this.checker.checkSellIn(item.sellIn, SIX_DAYS)) {
                                if (this.checker.checkQualityMax(item.quality,QUALITY_MAX)) {
                                    item.quality = this.operations.increase(item.quality,1);
                                }
                            }
                        }
                    }
                }
    
                /*-------------------------------------------------------------*/
    
                //Si c'est Sulfuras
                if (!this.checker.checkName(item.name, 'Sulfuras, Hand of Ragnaros')) {
                    item.sellIn =this.operations.decrease(item.sellIn,1);
                }
                /*-------------------------------------------------------------*/
                if (this.checker.checkSellIn(item.sellIn,SELLIN_MIN)) {
                    if (!this.checker.checkName(item.name,'Aged Brie')) {
                        if (!this.checker.checkName(item.name,'Backstage passes to a TAFKAL80ETC concert')) {
                            if (this.checker.checkQualityMin(item.quality,QUALITY_MIN)) {
                                if (!this.checker.checkName(item.name,'Sulfuras, Hand of Ragnaros')) {
                                    item.quality =  this.operations.decrease(item.quality,1);
                                }
                            }
                        } else {
                            item.quality = this.operations.decrease(item.quality, item.quality);
                        }
                    } else {
                        item.quality = this.updateQualityItem(item.quality);
                    }
                }
    
        });

        return this.items;
    }
}
module.exports = {
    Item,
    Shop,
    Checker,
    Operations
}
