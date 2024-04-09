// Disable uncaught exception handling.
Cypress.on('uncaught:exception', () => {
    // Returning false here prevents Cypress from failing the test.
    return false;
});

describe('WTR page tests', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('[data-testid="FirstCollect-skip-button"]').click();
        cy.visit('/settings');
        cy.get('[data-testid="tutorial-skip-button"]').click();
        cy.get('[data-testid="language-switcher"]').click();
        cy.contains('English').click();
        cy.visit('/');
    });

    it('can display the WTR page', () => {
        cy.visit('/wtr-content');

        cy.contains('Windesheim Tech Radar');

        cy.contains('Tech Providers');
        cy.contains('Apple');
        cy.contains('Amazon');
        cy.contains('Cisco');
        cy.contains('Google');
        cy.contains('HP');
        cy.contains('IBM');
        cy.contains('Intel');
        cy.contains('OpenAI');
        cy.contains('Oracle');
        cy.contains('Meta');
        cy.contains('Microsoft');
        cy.contains('SalesForce');
        cy.contains('SAP');

        cy.contains('Artificial Intelligence');
        cy.contains('Next UI');
        cy.contains('Green IT');
        cy.contains('Transaction to Interaction');
        cy.contains('Future of Work');
        cy.contains('Cloud Everywhere');
        cy.contains('Future of Programming');
        cy.contains('Building Trust');
        cy.contains('Quantum Computing');
    });

    it('can view an empty page', () => {
        cy.intercept('GET', '/wp-json/wp/v2/pages?slug=empty-page', {
            fixture: 'wtr-content/empty-page.json',
        }).as('getPage');

        cy.visit('/wtr-content/empty-page');
        cy.wait(['@getPage']);

        cy.contains('Page not found');
        cy.contains(
            "We're sorry, but we couldn't find the page you were looking for.",
        );
    });
});
