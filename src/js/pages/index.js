import { default as ProductManagementPage } from './product-management.js';
import { PAGE } from '../const.js';
import ProductManagement from '../features/product-management.js';
import { $ } from '../utils.js';

const pages = {
  [PAGE.PRODUCT_MANAGEMENT]: {
    load: (model) => {
      $('#app').innerHTML = ProductManagementPage;
      new ProductManagement(model);
    },
  },
};

export default pages;
