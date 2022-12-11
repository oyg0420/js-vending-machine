class Coin {
  #unit;
  #count;
  constructor(unit, count) {
    this.#unit = unit;
    this.#count = count;
  }

  get unit() {
    return this.#unit;
  }

  get count() {
    return this.#count;
  }

  set unit(nextUnit) {
    this.#unit = nextUnit;
  }

  set count(nextCount) {
    this.#count = nextCount;
  }
}
