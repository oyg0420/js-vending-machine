class Coin {
  #unit;
  #quantity;
  constructor(unit, quantity) {
    this.#unit = unit;
    this.#quantity = quantity;
  }

  get unit() {
    return this.#unit;
  }

  get quantity() {
    return this.#quantity;
  }

  set unit(nextUnit) {
    this.#unit = nextUnit;
  }

  set quantity(nextQuantity) {
    this.#quantity = nextQuantity;
  }
}

export default Coin;
