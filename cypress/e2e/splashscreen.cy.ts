describe("Check if Images load", () => {
    it("passes", () => {
        cy.visit("/");
        cy.get('[data-testid="winsight-logo"]');
        cy.get('[data-testid="windesheim-logo"]');
    });
})

describe("Check if Splash Screen dissapears", () => {
    it("passes", () => {
        cy.visit("/");
        cy.wait(5000)

        cy.get('[data-testid="winsight-logo"]').should('not.exist');
        cy.get('[data-testid="windesheim-logo"]').should('not.exist');
    });
})