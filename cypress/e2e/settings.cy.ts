// Disable uncaught exception handling.
Cypress.on('uncaught:exception', () => {
    // Returning false here prevents Cypress from failing the test.
    return false;
});

describe('App settings test', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('[data-testid="FirstCollect-skip-button"]').click();
        cy.visit('/settings');
        cy.get('[data-testid="tutorial-skip-button"]').click();
        cy.get('[data-testid="language-switcher"]').click();
        cy.contains('English').click();
        cy.visit('/');
    });

    it('can change the theme', () => {
        cy.visit('/settings');

        cy.get('[data-testid="Theme switcher"]').click();
        cy.get('[data-testid="Theme switcher input"] > input').click();
    });

    it('can change the language', () => {
        cy.visit('/settings');
        cy.contains('English');
        cy.contains('Settings');
        cy.contains('Enable dark mode');
        cy.contains('Language');

        cy.get('[data-testid="language-switcher"]').click();
        cy.contains('Nederlands').click();
        cy.contains('Instellingen');
        cy.contains('Activeer donkere modus');
        cy.contains('Taal');
        cy.contains('Nederlands');

        cy.reload();
        cy.contains('Instellingen');
        cy.contains('Nederlands');
        cy.contains('Activeer donkere modus');
        cy.contains('Taal');
    });
});
