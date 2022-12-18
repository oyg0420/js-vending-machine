import Product from '../models/product.js';
import { $ } from '../utils.js';

class ProductManagement {
  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;
    this.productForm = $('#product-form');
    this.productInventory = $('#product-inventory-container');
    this.productNameInput = $('#product-name-input');
    this.productPriceInput = $('#product-price-input');
    this.productQuantityInput = $('#product-quantity-input');
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

  validateProduct() {
    const { value: price } = this.productPriceInput;
    const { value: quantity } = this.productQuantityInput;

    if (price < 100) {
      alert('상품 가격은 100원 이상으로 입력해주세요.');
      return false;
    }

    if (price % 10 !== 0) {
      alert('상품 가격은 10원 단위로 입력해주세요.');
      return false;
    }

    if (quantity < 0) {
      alert('상품 수량은 1개 이상으로 입력해주세요.');
      return false;
    }

    return true;
  }

  setProductInventory() {
    const { products } = this.vendingMachine;

    this.productInventory.innerHTML = products
      .map(
        (product) =>
          `<tr><th>${product.name}</th><th>${product.price}</th><th>${product.quantity}</th></tr>`
      )
      .join('');
  }

  setProducts() {
    const { products, setProducts } = this.vendingMachine;

    if (this.validateProduct()) {
      let nextProducts = [...products];
      const nextProduct = new Product(
        this.productNameInput.value,
        this.productPriceInput.value,
        this.productQuantityInput.value
      );

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

  handleSubmit() {
    this.setProducts();
    this.setProductInventory();
    this.productForm.reset();
  }

  initEvent() {
    this.productForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleSubmit();
    });
  }
}

export default ProductManagement;
