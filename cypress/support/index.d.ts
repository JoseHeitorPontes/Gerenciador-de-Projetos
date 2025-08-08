// cypress/support/index.d.ts

/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select elements by data-cy attribute.
     * @example cy.getDataCy('submit-button')
     */
    getDataCy(value: string): Chainable<JQuery<HTMLElement>>;
  }
}