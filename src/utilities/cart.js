class CartClass {
  constructor() {
    this.items = [];
  }

  addToCart(itemID) {
    const itemCount = 1;
    const price = 19.78;

    if (this.cartHasItem(itemID)) {
      this.addItemCount(itemID);
    } else {
      const item = {
        itemID: itemID,
        itemCount: itemCount,
        orgPrice: price,
        totPrice: price
      };

      this.items.push(item);
    }
  }

  getItem(itemID) {
    return this.items.find(item => item.itemID === itemID);
  }

  cartHasItem(itemID) {
    return this.getItem(itemID) === undefined ? false : true;
  }

  addItemCount(itemID) {
    let item = this.getItem(itemID);
    item.itemCount += 1;
    item.totPrice = item.itemCount * item.orgPrice;
  }

  reduceItemCount(itemID) {
    let item = this.getItem(itemID);
    if (item.itemCount === 1){
        this.deleteItem(itemID)
    } else {
        item.itemCount -= 1;
        item.totPrice = item.itemCount * item.orgPrice;
    }

  }

  deleteItem(itemID) {
    const items = this.items.filter(item => {
      return item.itemID !== itemID;
    });

    this.items = items
  }

  getItemCount() {
    let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      total += this.items[i].itemCount;
    }

    return total;
  }

  getCartTotal() {
    let total = 0;

    for (let i = 0; i < this.items.length; i++) {
      total += this.items[i].totPrice;
    }

    return total;
  }
}

export default CartClass;
