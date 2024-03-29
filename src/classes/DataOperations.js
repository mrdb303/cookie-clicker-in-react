/*
* Class to handle data operations.
* Contains the default values for the main array of objects used in the 
* game (this.manufactureDataAll).
* Writes data required to local storage.
* If data is already stored in local storage on page load, the class will load 
* it into the manufacture type data objects (this.manufactureDataAll).
*/


export default class DataOperations {

  constructor() {
    this.manufactureDataAll = [
      {id: 0, resource: "Grandma", price: 10, bonus: 1, image: "/granny.png", imaget: "/grannyt.png", buttonLabel: "Employ Grandma", selectable: false, number: 0},
      {id: 1, resource: "Oven", price: 300, bonus: 30, image: "/oven.png", imaget: "/ovent.png", buttonLabel: "Buy Oven", selectable: false, number: 0},
      {id: 2, resource: "Factory", price: 5000, bonus: 500, image: "/factory.png", imaget: "/factoryt.png", buttonLabel: "Buy Factory", selectable: false, number: 0},
      {id: 3, resource: "Mine", price: 40000, bonus: 4000, image: "/mine.png", imaget: "/minet.png", buttonLabel: "Buy Mine", selectable: false, number: 0},
      {id: 4, resource: "Bank", price: 250000, bonus: 25000, image: "/bank.png", imaget: "/bankt.png", buttonLabel: "Buy Bank", selectable: false, number: 0},
      {id: 5, resource: "Big Factory", price: 500000, bonus: 50000, image: "/bigfactory.png", imaget: "/bigfactoryt.png", buttonLabel: "Buy Big Factory", selectable: false, number: 0}
    ];
    // image: image of the manufacture type
    // imaget: the image that is switched to when the user has enough cookies to 
    // purchase the item.
    // Selectable: True/False - indicates whether the user can afford to
    // purchase the item.


     this.cookiesEarned = 1;
     this.cookieIncValue = 1;

     this.getStoredItemsIfPresent('inventory');
     this.numberOfObjects = this.objectLength(this.manufactureDataAll);
  }


  getAllInventoryData(){
    return this.manufactureDataAll;
  }


  doesStorageItemExist(itemVal){
    if(localStorage.getItem(itemVal) !== null){
      return true;
    }
    return false;
  }


  getStoredItemsIfPresent(storeName){
    let storageItemExists = this.doesStorageItemExist(storeName);
    
    if((storageItemExists)){
      let inv = localStorage.getItem(storeName);
      const parsed = JSON.parse(inv);
      this.getLocallyStoredObject(parsed);
      
    } 
  }


  // The locally stored object only needs the totals for manufacture type, 
  // cookiesEarned and cookieIncValue. It is not necessary to store the rest 
  // of the data in manufactureDataAll as this won't change.
  setLocallyStoredObject(){
    const totals = [];
    for(let counter = 0;counter < (this.numberOfObjects);counter++){
      totals.push(this.manufactureDataAll[counter].number);
    }

    let obj = {manufTotal: totals, cookiesEarned: this.cookiesEarned, 
      cookieIncValue: this.cookieIncValue
    };

    localStorage.setItem("inventory", JSON.stringify(obj));
  }


  getLocallyStoredObject(obj){
    this.numberOfObjects = this.objectLength(this.manufactureDataAll);

    for(let counter = 0;counter < (this.numberOfObjects);counter++){
      this.manufactureDataAll[counter].number = Number(obj.manufTotal[counter]);
    }

    this.cookiesEarned = Number(obj.cookiesEarned);
    this.cookieIncValue = Number(obj.cookieIncValue);
  }


  pushCookiesEarned(cookiesEarned){
    this.cookiesEarned = cookiesEarned;
  }


  pushCookieIncValue(cookieIncValue){
    this.cookieIncValue = cookieIncValue;
  }


  pushManufData(obj){
    this.manufactureDataAll = obj;
  }


  getCookiesEarned(){
    return this.cookiesEarned;
  }


  getCookieIncVal(){
    return this.cookieIncValue;
  }


  resetPurchases(){
    this.numberOfObjects = this.objectLength(this.manufactureDataAll);

    for(let counter = 0;counter < (this.numberOfObjects);counter++){
      this.manufactureDataAll[counter].number = 0;
    }
  }


  objectLength(obj) {
    let total = 0;
    for(let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        total++;
      }
    }
    return total;
  }

}