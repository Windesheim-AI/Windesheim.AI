describe('Study page tests', () => {
    it('the study page works', () => {
        cy.visit('/Study');
    });
    it('test if element exists', () => {
        cy.visit('/Study');
        cy.contains('Study');
    });
});
