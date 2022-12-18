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

  setProducts = (nextProducts) => {
    this.#products = nextProducts;
  };

  setCoins(nextCoins) {
    this.#coins = nextCoins;
  }
}

export default VendingMachine;
