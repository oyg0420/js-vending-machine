import productManagementPage from './product-management-page.js';
import { PAGE } from '../const.js';
import ProductManagement from '../features/product-management.js';
import { $ } from '../utils.js';
import coinManagementPage from './coin-management-page.js';
import CoinManagement from '../features/coin-management.js';

function render(content) {
  $('#app').innerHTML = content;
}

const pages = {
  [PAGE.PRODUCT_MANAGEMENT]: {
    load: (model) => {
      render(productManagementPage);
      new ProductManagement(model);
    },
  },
  [PAGE.COIN_MANAGEMENT]: {
    load: (model) => {
      render(coinManagementPage);
      new CoinManagement(model);
    },
  },
};

export default pages;
