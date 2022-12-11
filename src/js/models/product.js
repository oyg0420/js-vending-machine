class Product {
  #name;
  #price;
  #count;
  constructor(name, price, count) {
    this.#name = name;
    this.#price = price;
    this.#count = count;
  }

  get name() {
    return this.#name;
  }

  get price() {
    return this.#price;
  }

  get count() {
    return this.#count;
  }

  set price(nextPrice) {
    this.#price = nextPrice;
  }

  set count(nextCount) {
    this.#count = nextCount;
  }
}
