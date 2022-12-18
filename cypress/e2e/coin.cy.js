import { VENDING_MACHINE } from '../../src/js/const.js';

describe('자판기 미션', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#coin-management').click();
  });

  describe('페이지에서 최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.', () => {
    context('화면이 노출될때', () => {
      it('보유한 금액은 0원이다.', () => {
        cy.get('#coin-charge-amount').should('have.text', '0');
      });
      it('각 동전의 개수는 0개이다.', () => {});
    });
  });

  describe('자판기 동전 충전 버튼을 눌러 자판기가 보유한 금액을 충전할 수 있다', () => {
    context('금액을 입력했을 때', () => {
      it('금액이 공백이라면 에러 알림이 노출된다.', () => {
        cy.get('#coin-form').within(() => {
          cy.get('#coin-charge-button').click();
          cy.get('input').then(($input) => {
            expect($input[0].validationMessage).to.equal(
              '이 입력란을 작성하세요.'
            );
          });
        });
      });

      it('금액이 100원 미만이라면 에러 알림이 노출된다.', () => {
        const stub = cy.stub();
        cy.on('window:alert', stub);
        cy.get('#coin-charge-input').type(10);
        cy.get('#coin-charge-button')
          .click()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith(
              VENDING_MACHINE.ERROR_MESSAGE.MIN_PRICE
            );
          });
      });

      it('금액이 10원 단위가 아니라면 에러 알림이 노출된다.', () => {
        const stub = cy.stub();
        cy.on('window:alert', stub);
        cy.get('#coin-charge-input').type(123);

        cy.get('#coin-charge-button')
          .click()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith(
              VENDING_MACHINE.ERROR_MESSAGE.UNIT_PRICE
            );
          });
      });
    });
  });

  describe('관리자는 잔돈을 누적하여 충전할 수 있다', () => {
    context('금액을 입력했을 때', () => {
      it('기존 보유 금액에서 입력한 금액이 더해진다.', () => {
        cy.get('#coin-charge-input').type(100);
        cy.get('#coin-charge-button').click();
        cy.get('#coin-charge-input').type(200);
        cy.get('#coin-charge-button').click();
        cy.get('#coin-charge-amount').should('have.text', 300);
      });
    });
  });

  describe('자판기가 보유한 금액 만큼의 동전이 무작위로 생성된다', () => {
    context('금액을 입력했을 때', () => {
      it('500원 입력시 5백원 1개가 추가된다.', () => {
        cy.get('#coin-charge-input').type(500);
        cy.get('#coin-charge-button').click();
        cy.get('#vending-machine-coin-500-quantity').should('have.text', 1);
      });
      it('120원 입력시 1백원 1개, 10원 2개가 추가된다.', () => {
        cy.get('#coin-charge-input').type(120);
        cy.get('#coin-charge-button').click();
        cy.get('#vending-machine-coin-100-quantity').should('have.text', 1);
        cy.get('#vending-machine-coin-10-quantity').should('have.text', 2);
      });
    });
  });
});
