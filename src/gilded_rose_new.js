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
    
    increaseQualityItem(itemQuality){
        if (this.checker.checkQualityMax(itemQuality,QUALITY_MAX)) {
            return this.operations.increase(itemQuality,1);
        }
        return itemQuality;
    }

    decreaseQualityItem(item, legendName) {
        if (this.checker.checkQualityMin(item.quality,QUALITY_MIN)) {
            if (!this.checker.checkName(item.name,legendName)) {
                return this.operations.decrease(item.quality,1);
            }
        }
        return item.quality;
    }

    decreaseSellIn(item, legendName) {
        if (!this.checker.checkName(item.name, legendName)) {
            return this.operations.decrease(item.sellIn,1);
        }
        return item.sellIn;
    }

    updateQuality() {
        //Parcours les items

        this.items.forEach((item) => {

                //Vérifie si c'est pas un Brie ET pas un Backstage
                if (!this.checker.checkName(item.name,'Aged Brie') && !this.checker.checkName(item.name,'Backstage passes to a TAFKAL80ETC concert')) {
                    item.quality = this.decreaseQualityItem(item,'Sulfuras, Hand of Ragnaros');
                } else {
                    item.quality = this.increaseQualityItem(item.quality);
                    if (this.checker.checkName(item.name,'Backstage passes to a TAFKAL80ETC concert')) {
                        if (this.checker.checkSellIn(item.sellIn,ELEVEN_DAYS)) {
                            item.quality = this.increaseQualityItem(item.quality);
                        }
                        if (this.checker.checkSellIn(item.sellIn, SIX_DAYS)) {
                            item.quality = this.increaseQualityItem(item.quality);
                        }
                    }
                }
    
                //Si c'est Sulfuras
                item.sellIn = this.decreaseSellIn(item, 'Sulfuras, Hand of Ragnaros');

                if (this.checker.checkSellIn(item.sellIn,SELLIN_MIN)) {
                    if (!this.checker.checkName(item.name,'Aged Brie')) {
                        if (!this.checker.checkName(item.name,'Backstage passes to a TAFKAL80ETC concert')) {
                            item.quality = this.decreaseQualityItem(item,'Sulfuras, Hand of Ragnaros');
                        } else {
                            item.quality = this.operations.decrease(item.quality, item.quality);
                        }
                    } else {
                        item.quality = this.increaseQualityItem(item.quality);
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
