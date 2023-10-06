describe('Home page tests', () => {
    it('the home page works', () => {
        cy.visit('http://localhost:19006');
        cy.get('.windesheim-tech-radar-frame').should('exist');
    });
});
