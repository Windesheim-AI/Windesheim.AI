describe('Routes', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('[data-testid="FirstCollect-skip-button"]').click();
        cy.visit('/settings');
        cy.get('[data-testid="tutorial-skip-button"]').click();
        cy.get('[data-testid="language-switcher"]').click();
        cy.contains('English').click();
        cy.visit('/');
    });

    it('can directly visit a route via the url', () => {
        cy.visit('/settings');
        cy.contains('SETTINGS');

        cy.reload();
        cy.contains('SETTINGS');
    });

    it('can redirect back to the home page when a unknown page is visited', () => {
        cy.visit('/fdafdsadfdaf');
        cy.contains('Why Windesheim AI');

        cy.reload();
        cy.contains('Why Windesheim AI');
    });
});
