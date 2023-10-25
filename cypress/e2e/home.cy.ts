describe('Home page tests', () => {
    it('the home page works', () => {
        cy.visit('/');

        cy.contains('Home');
    });
    it('test if element exists', () => {
        cy.visit('/');
        cy.get('.r-WebkitOverflowScrolling-150rngu > .r-flexDirection-18u37iz > :nth-child(1) > .css-view-175oi2r').contains('News1');
    })
});
