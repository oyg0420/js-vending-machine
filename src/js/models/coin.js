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

  setUnit(nextUnit) {
    this.#unit = nextUnit;
  }

  setQuantity(nextQuantity) {
    this.#quantity = nextQuantity;
  }
}

export default Coin;
