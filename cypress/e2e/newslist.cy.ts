describe('Newslist contains element', () => {
    it('passes', () => {
      cy.visit('/');
  
      cy.get('[data-testid="newslist"]');
      cy.get('[data-testid="newsitem"]').should('contain.text', '1')  }
      )
  })