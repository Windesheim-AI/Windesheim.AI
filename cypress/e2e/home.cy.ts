describe('Home page tests', () => {
    it('the home page works', () => {
        cy.visit('/');
        cy.get('.windesheim-tech-radar-frame').should('exist');
    });
});
