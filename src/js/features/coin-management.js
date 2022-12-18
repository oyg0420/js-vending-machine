import { $ } from '../utils.js';
import { COIN, VENDING_MACHINE } from '../const.js';
import Coin from '../models/coin.js';

class CoinManagement {
  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;
    this.$coinForm = $('#coin-form');
    this.$coinChargeAmount = $('#coin-charge-amount');
    this.$coinInventory = $('#coin-inventory');
    this.initCoinInventory();
    this.initEvent();
  }

  validateCoin(coin) {
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

  classifyCoin(coin) {
    const classifiedCoins = [];
    const coins = [
      COIN.UNIT.FIVE_HUNDRED,
      COIN.UNIT.ONE_HUNDRED,
      COIN.UNIT.FIFTY,
      COIN.UNIT.TEN,
    ];
    let remained = coin;

    coins.forEach((nextCoin) => {
      const quantity = Math.floor(remained / nextCoin);
      remained = remained % nextCoin;
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

  setCoins(controller) {
    const { coins, setCoins } = this.vendingMachine;
    const nextCoins = [...coins];
    const nextCoin = controller['coin'].value;

    if (this.validateCoin(nextCoin)) {
      const classifiedCoins = this.classifyCoin(nextCoin);

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

  handleSubmit(target) {
    this.setCoins(target);
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
      this.handleSubmit(event.target);
    });
  }
}

export default CoinManagement;
