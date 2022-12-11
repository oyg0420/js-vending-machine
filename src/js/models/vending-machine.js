class VendingMachine {
  #products;
  #coins;
  constructor() {
    this.#products = [];
    this.#coins = [];
  }

  get products() {
    return this.#products;
  }

  get coins() {
    return this.#coins;
  }

  set products(nextProduct) {
    this.#products.push(nextProduct);
  }

  set coins(nextCoin) {
    this.#coins.push(nextCoin);
  }
}
