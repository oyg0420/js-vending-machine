import { VENDING_MACHINE } from '../../src/js/const.js';

describe('자판기 미션', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('최초 상품 목록은 비워진 상태이다.', () => {
    context('화면이 노출될때', () => {
      it('상품 목록이 비어있다.', () => {
        cy.get('#product-inventory-container').should('be.empty');
      });
    });
  });

  describe('상품명, 금액, 수량을 추가할 수 있다', () => {
    context('상품명, 금액, 수량을 입력했을 때', () => {
      it('상품명 공백이라면 에러 알림이 노출된다.', () => {
        cy.get('#product-form').within(() => {
          cy.get('#product-price-input').type(1000);
          cy.get('#product-quantity-input').type(10);
          cy.get('#product-add-button').click();
          cy.get('input').then(($input) => {
            expect($input[0].validationMessage).to.equal(
              '이 입력란을 작성하세요.'
            );
          });
        });
      });

      it('금액이 공백이라면 에러 알림이 노출된다.', () => {
        cy.get('#product-form').within(() => {
          cy.get('#product-name-input').type('콜라');
          cy.get('#product-quantity-input').type(10);
          cy.get('#product-add-button').click();
          cy.get('input').then(($input) => {
            expect($input[1].validationMessage).to.equal(
              '이 입력란을 작성하세요.'
            );
          });
        });
      });

      it('금액이 100원 미만이라면 에러 알림이 노출된다.', () => {
        const stub = cy.stub();
        cy.on('window:alert', stub);
        cy.get('#product-name-input').type('콜라');
        cy.get('#product-price-input').type(-1000);
        cy.get('#product-quantity-input').type(10);

        cy.get('#product-add-button')
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
        cy.get('#product-name-input').type('콜라');
        cy.get('#product-price-input').type(1112);
        cy.get('#product-quantity-input').type(10);

        cy.get('#product-add-button')
          .click()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith(
              VENDING_MACHINE.ERROR_MESSAGE.UNIT_PRICE
            );
          });
      });

      it('수량이 공백이라면 에러 알림이 노출된다.', () => {
        cy.get('#product-form').within(() => {
          cy.get('#product-name-input').type('콜라');
          cy.get('#product-price-input').type(1000);
          cy.get('#product-add-button').click();
          cy.get('input').then(($input) => {
            expect($input[2].validationMessage).to.equal(
              '이 입력란을 작성하세요.'
            );
          });
        });
      });

      it('수량이 1개 미만이라면 에러 알림이 노출된다.', () => {
        const stub = cy.stub();
        cy.on('window:alert', stub);
        cy.get('#product-name-input').type('콜라');
        cy.get('#product-price-input').type(1000);
        cy.get('#product-quantity-input').type(-10);

        cy.get('#product-add-button')
          .click()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith(
              VENDING_MACHINE.ERROR_MESSAGE.MIN_QUANTITY
            );
          });
      });
    });
  });

  describe('같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다.', () => {
    context('상품명, 금액, 수량을 입력했을 때', () => {
      it('같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다.', () => {
        cy.get('#product-name-input').type('콜라');
        cy.get('#product-price-input').type(1000);
        cy.get('#product-quantity-input').type(10);
        cy.get('#product-add-button').click();

        cy.get('#product-name-input').type('콜라');
        cy.get('#product-price-input').type(2000);
        cy.get('#product-quantity-input').type(20);
        cy.get('#product-add-button').click();

        cy.get('#product-inventory-container').within(() => {
          cy.get('tr').should('have.length', 1);
          cy.get('tr').should('contain', '콜라');
          cy.get('tr').should('contain', '2000');
          cy.get('tr').should('contain', '20');
        });
      });
    });
  });
});
