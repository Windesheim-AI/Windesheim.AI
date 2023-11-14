describe('Routes', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.window()
            .its('store')
            .invoke('dispatch', {
                type: 'tutorial/setCompleted',
                payload: { completed: true },
            });
    });

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

    it('will redirect back to the home page when a unknown page is visited', () => {
        cy.visit('/fdafdsadfdaf');
        cy.contains('Home');

        cy.reload();
        cy.contains('Home');
    });
});
