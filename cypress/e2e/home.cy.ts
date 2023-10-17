describe('Home page tests', () => {
    it('the home page works', () => {
        cy.visit('/');

        cy.contains('Home');
    });
});
