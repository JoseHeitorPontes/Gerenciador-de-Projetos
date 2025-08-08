describe("Register project", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.getDataCy("new-project-button").click();
  });

  it("Should check if there are any empty fields", () => {
   cy.getDataCy("form-register-project").submit();
  });

  it("Should check if the budget is a negative number", () => {
    cy.getDataCy("name-input").type("Construção de Novo Shopping");
    cy.getDataCy("category-select").select("Infra").should("have.value", "Infra");
    cy.getDataCy("budget-input").clear().type("-1");
    cy.getDataCy("form-register-project").submit();
    cy.getDataCy("budget-error").should("exist").should("have.text", "O orçamento do projeto deve ser maior que 0!");
  });

  it("Should check if registration is working", () => {
    cy.getDataCy("name-input").type("Construção do Novo Shopping");
    cy.getDataCy("category-select").select("Infra").should("have.value", "Infra");
    cy.getDataCy("budget-input").clear().type("5000000");
    cy.getDataCy("form-register-project").submit();
  });
});
