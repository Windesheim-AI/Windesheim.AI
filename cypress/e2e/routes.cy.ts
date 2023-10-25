describe('Routes', () => {
    it('can directly visit a route via the url', () => {
        cy.visit('/settings');
        cy.contains('Settings');

        cy.reload();
        cy.contains('Settings');
    });

    it('can save the route to the url', () => {
        cy.visit('/');
        cy.contains('Home');

        cy.get('[data-testid="Settings-navbar-button"]').click();
        cy.contains('Settings');

        cy.reload();
        cy.contains('Settings');
    });
});
