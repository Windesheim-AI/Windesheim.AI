import { appConfig } from '../../app.config';


describe("Check if Images load", () => {
    it("passes", () => {
        cy.visit("/");
        cy.get('[data-testid="WingAI-logo"]');
        cy.get('[data-testid="windesheim-logo"]');
    });
})

describe("Check if Splash Screen dissapears", () => {
    it("passes", () => {
        cy.visit("/");
        cy.wait(appConfig.splashScreenTime + 100);

        cy.get('[data-testid="WingAI-logo"]').should('not.exist');
        cy.get('[data-testid="windesheim-logo"]').should('not.exist');
    });
})