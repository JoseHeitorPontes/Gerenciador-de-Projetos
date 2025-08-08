Cypress.Commands.add("getDataCy", (selector) => {
    cy.get(`[data-cy=${selector}]`);
});
