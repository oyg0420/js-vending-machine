class Product {
  #name;
  #price;
  #quantity;
  constructor(name, price, quantity) {
    this.#name = name;
    this.#price = price;
    this.#quantity = quantity;
  }

  get name() {
    return this.#name;
  }

  get price() {
    return this.#price;
  }

  get quantity() {
    return this.#quantity;
  }

  set price(nextPrice) {
    this.#price = nextPrice;
  }

  set quantity(nextQuantity) {
    this.#quantity = nextQuantity;
  }
}

export default Product;
