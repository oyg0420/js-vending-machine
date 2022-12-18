import VendingMachine from './models/vending-machine.js';
import ProductManagement from './pages/product-management.js';

const vendingMachine = new VendingMachine();

new ProductManagement(vendingMachine);
