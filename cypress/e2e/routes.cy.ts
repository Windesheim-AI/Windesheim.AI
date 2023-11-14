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

        if (cy.get('[data-testid="tutorial-skip-button"]')) {
            cy.get('[data-testid="tutorial-skip-button"]').click();
        }
        cy.get('[data-testid="Settings-navbar-button"]').click();
        cy.contains('Settings');

        cy.reload();
        cy.contains('Settings');
    });

    it('will redirect back to the home page when a unknown page is visited', () => {
        cy.visit('/fdafdsadfdaf');
        cy.contains('Home');

        cy.reload();
        cy.contains('Home');
    });
});
