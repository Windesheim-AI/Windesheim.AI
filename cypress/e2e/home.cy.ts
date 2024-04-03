describe('Home page tests', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('[data-testid="FirstCollect-skip-button"]').click();
        cy.visit('/settings');
        cy.get('[data-testid="tutorial-skip-button"]').click();
        cy.get('[data-testid="language-switcher"]').click();
        cy.contains('English').click();
        cy.visit('/');
    });

    it('can display the home page', () => {
        cy.intercept('GET', '/wp-json/winpl/v1/prompts/', {
            fixture: 'prompts/data.json',
        }).as('getData');

        cy.visit('/');

        cy.contains('Home');
        cy.contains('Useful Prompts');
        cy.contains('Tech Providers');
        cy.contains('Themes');
        cy.contains('See All');

        // There should be 3 Tech Providers.
        cy.get('[data-testid="tech-provider-card"]').should('have.length', 3);

        // There should be 3 themes.
        cy.get('[data-testid="theme-card"]').should('have.length', 3);

        // There should be 3 prompts.
        cy.get('[data-testid="prompt-card"]').should('have.length', 3);
    });
});
