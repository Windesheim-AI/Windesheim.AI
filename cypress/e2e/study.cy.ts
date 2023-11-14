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

        cy.contains('Welcome to WIN game');
        cy.get('[data-testid="courses-button"]');
        cy.get('[data-testid="courses-button"]').should(
            'contain.text',
            'Courses',
        );
    });
});
