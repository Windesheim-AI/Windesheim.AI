describe('Home page tests', () => {
    it('the home page works', () => {
        cy.visit('/');

        cy.contains('Home');
    });
    it('test if element exists', () => {
        cy.visit('/');
    })
});
