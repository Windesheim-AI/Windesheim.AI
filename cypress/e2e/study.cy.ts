describe('Study page tests', () => {
    it('can display the study page', () => {
        cy.visit('/Study');

        cy.contains('Study');
        cy.get('[data-testid="Study-button"]');
        cy.get('[data-testid="Study-button"]').should('contain.text', 'Study');
    });
});
