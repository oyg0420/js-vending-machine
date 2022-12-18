import { PAGE } from './const.js';
import VendingMachine from './models/vending-machine.js';
import pages from './pages/index.js';
import { $ } from './utils.js';

class App {
  constructor() {
    this.menu = $('#menu');
    this.currentPage = PAGE.PRODUCT_MANAGEMENT;
    this.model = new VendingMachine();
    this.initEvent();
    this.loadPage();
  }

  loadPage() {
    const page = pages[this.currentPage];

    if (page) {
      page.load(this.model);
    }
  }

  handleMenuClick(nextPage) {
    if (this.currentPage === nextPage) {
      return;
    }

    this.currentPage = nextPage;
    this.loadPage();
  }

  initEvent() {
    this.menu.addEventListener('click', ({ target }) => {
      if (target.classList.contains('menu-item')) {
        this.handleMenuClick(target.id);
      }
    });
  }
}

export default App;