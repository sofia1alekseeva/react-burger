// import cypress from 'cypress';
import {sendRegistrationData} from '../../../src/utils/api/auth'

describe("Make order", function () {

  this.beforeAll(() => {
    sendRegistrationData({  email: "mock@email.com",
      password: "12345",
      name: "mock"
    }).catch(err=> {})
  })
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("http://localhost:3000");
    cy.get("main>section>h1").should("have.text", "Соберите бургер");
  });
  it("should open burger constructor page by default and test modal", function () {
    cy.contains("Краторная булка N-200i").click();
    cy.get("[class^=ingredient-details_name__]").contains(
      "Краторная булка N-200i"
    );
    cy.get("body").type("{esc}");
    cy.contains("Сыр с астероидной плесенью").click();
    cy.get("[class^=ingredient-details_name__]").contains(
      "Сыр с астероидной плесенью"
    );
    cy.get("body").type("{esc}");
    cy.contains("Соус традиционный галактический").click();
    cy.get("[class^=ingredient-details_name__]").contains(
      "Соус традиционный галактический"
    );
    cy.get("body").type("{esc}");
  });

  it("should drag and drop ingredients, login and place an order", function () {
    cy.get('img[alt*="Краторная булка N-200i"]')
      .trigger("dragstart")
      .trigger("dragleave");
    cy.get("[class^=burger-constructor_burgerConstructor__]")
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend");

    cy.get('img[alt*="Мини-салат Экзо-Плантаго"]')
      .trigger("dragstart")
      .trigger("dragleave");
    cy.get("[class^=burger-constructor_burgerConstructor__]")
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend");

    cy.get('img[alt*="Сыр с астероидной плесенью"]')
      .trigger("dragstart")
      .trigger("dragleave");
    cy.get("[class^=burger-constructor_burgerConstructor__]")
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend");

    cy.get('img[alt*="Флюоресцентная булка R2-D3"]')
      .trigger("dragstart")
      .trigger("dragleave");
    cy.get("[class^=burger-constructor_burgerConstructor__]")
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend");
    cy.get("button").contains("Оформить заказ").click();

    cy.get('input[type*="email"]').click().type("mock@email.com");
    cy.get('input[type*="password"]').click().type("12345");
    cy.get("button").contains("Войти").click();
    cy.get("button").contains("Оформить заказ").should("be.visible").click();
    cy.get("[class^=order-details_orderIdText__]").contains("идентификатор заказа").should("be.visible")
  });
});
