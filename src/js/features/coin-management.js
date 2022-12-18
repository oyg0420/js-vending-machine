import { $ } from '../utils.js';
import { VENDING_MACHINE } from '../const.js';
import Coin from '../models/coin.js';

class CoinManagement {
  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;
    this.$coinForm = $('#coin-form');
    this.$coinChargeInput = $('#coin-charge-input');
    this.$coinChargeAmount = $('#coin-charge-amount');
    this.$coinInventory = $('#coin-inventory');
    this.initCoinInventory();
    this.initEvent();
  }

  validateCoin() {
    const { value: coin } = this.$coinChargeInput;

    if (coin < VENDING_MACHINE.MIN_PRICE) {
      alert(VENDING_MACHINE.ERROR_MESSAGE.MIN_PRICE);
      return false;
    }

    if (coin % VENDING_MACHINE.UNIT_PRICE !== 0) {
      alert(VENDING_MACHINE.ERROR_MESSAGE.UNIT_PRICE);
      return false;
    }

    return true;
  }

  getTotalCoinAmount() {
    const { coins } = this.vendingMachine;

    const totalCoinAmount = coins.reduce((acc, coin) => {
      return acc + coin.unit * coin.quantity;
    }, 0);

    return totalCoinAmount;
  }

  classifyCoin() {
    const { value } = this.$coinChargeInput;
    const classifiedCoins = [];
    const coins = [500, 100, 50, 10];
    let remain = value;

    coins.forEach((nextCoin) => {
      const quantity = Math.floor(remain / nextCoin);
      remain = remain % nextCoin;
      classifiedCoins.push({
        unit: nextCoin,
        quantity: quantity,
      });
    });

    return classifiedCoins;
  }

  setCoinChargeAmount() {
    this.$coinChargeAmount.innerText = this.getTotalCoinAmount();
  }

  setCoinInventory() {
    const { coins } = this.vendingMachine;

    this.$coinInventory.innerHTML = coins
      .map((coin) => {
        return `<tr>
      <td>${coin.unit}원</td>
      <td id="vending-machine-coin-${coin.unit}-quantity">${coin.quantity}</td>
      </tr>`;
      })
      .join('');
  }

  setCoins() {
    const { coins, setCoins } = this.vendingMachine;
    const nextCoins = [...coins];

    if (this.validateCoin()) {
      const classifiedCoins = this.classifyCoin();

      classifiedCoins.forEach((classifiedCoin) => {
        const { unit, quantity } = classifiedCoin;
        const sameCoinIndex = coins.findIndex((coin) => coin.unit === unit);

        if (sameCoinIndex === -1) {
          nextCoins.push(new Coin(unit, quantity));
        } else {
          nextCoins[sameCoinIndex].setQuantity(
            nextCoins[sameCoinIndex].quantity + classifiedCoin.quantity
          );
        }
      });

      setCoins(nextCoins);
    }
  }

  handleSubmit() {
    this.setCoins();
    this.setCoinChargeAmount();
    this.setCoinInventory();
    this.$coinForm.reset();
  }

  initCoinInventory() {
    this.setCoinChargeAmount();
    this.setCoinInventory();
  }

  initEvent() {
    this.$coinForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleSubmit();
    });
  }
}

export default CoinManagement;
