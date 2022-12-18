import Product from '../models/product.js';
import { $ } from '../utils.js';
import { VENDING_MACHINE } from '../const.js';

class ProductManagement {
  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;
    this.$productForm = $('#product-form');
    this.$productInventory = $('#product-inventory-container');
    this.initEvent();
  }

  getSameProductNameIndex(name) {
    const { products } = this.vendingMachine;

    return products.findIndex((product) => product.name === name);
  }

  replaceProduct(product) {
    const { products } = this.vendingMachine;
    const nextProducts = [...products];

    nextProducts.splice(this.getSameProductNameIndex(product.name), 1, product);

    return nextProducts;
  }

  validateProduct({ price, quantity }) {
    if (price < VENDING_MACHINE.MIN_PRICE) {
      alert(VENDING_MACHINE.ERROR_MESSAGE.MIN_PRICE);
      return false;
    }

    if (price % VENDING_MACHINE.UNIT_PRICE !== 0) {
      alert(VENDING_MACHINE.ERROR_MESSAGE.UNIT_PRICE);
      return false;
    }

    if (quantity < VENDING_MACHINE.MIN_QUANTITY) {
      alert(VENDING_MACHINE.ERROR_MESSAGE.MIN_QUANTITY);
      return false;
    }

    return true;
  }

  setProductInventory() {
    const { products } = this.vendingMachine;

    this.$productInventory.innerHTML = products
      .map(
        (product) =>
          `<tr><th>${product.name}</th><th>${product.price}</th><th>${product.quantity}</th></tr>`
      )
      .join('');
  }

  setProducts(controller) {
    const { products, setProducts } = this.vendingMachine;
    const name = controller['name'].value;
    const price = controller['price'].value;
    const quantity = controller['quantity'].value;

    if (this.validateProduct({ price, quantity })) {
      let nextProducts = [...products];
      const nextProduct = new Product(name, price, quantity);

      const hasSameProductName =
        this.getSameProductNameIndex(nextProduct.name) > -1;

      if (hasSameProductName) {
        nextProducts = this.replaceProduct(nextProduct);
      } else {
        nextProducts.push(nextProduct);
      }

      setProducts(nextProducts);
    }
  }

  handleSubmit(target) {
    this.setProducts(target);
    this.setProductInventory();
    this.$productForm.reset();
  }

  initEvent() {
    this.$productForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleSubmit(event.target);
    });
  }
}

export default ProductManagement;
