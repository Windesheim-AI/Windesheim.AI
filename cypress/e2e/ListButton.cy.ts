describe('ListButton contains element', () => {
    it('passes', () => {
      cy.visit('/Study');
  
      cy.get('[data-testid="Study-button"]');
      cy.get('[data-testid="Study-button"]').should('contain.text', 'Study')  }
      )
  })