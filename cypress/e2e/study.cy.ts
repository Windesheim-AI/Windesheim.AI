describe('Study page tests', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.window()
            .its('store')
            .invoke('dispatch', {
                type: 'tutorial/setCompleted',
                payload: { completed: true },
            });
    });

    it('can display the study page', () => {
        cy.visit('/Study');

        cy.contains('Study');
        cy.get('[data-testid="Study-button"]');
        cy.get('[data-testid="Study-button"]').should('contain.text', 'Study');
    });
});
