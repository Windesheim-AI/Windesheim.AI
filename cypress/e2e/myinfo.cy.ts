describe('Home page tests', () => {
  beforeEach(() => {
      cy.visit('/');

      cy.get('[data-testid="FirstCollect-skip-button"]').click();
      cy.get('[data-testid="tutorial-skip-button"]').click();
  });
  
    it('opens and closes modal', () => {
      cy.visit('/MyInfo');

      cy.get('[data-testid="editbutton"]').click();

      cy.get('[data-testid="positionPressable"]').click(); 
      cy.get('[data-testid="modalContent"]').should('be.visible');

      cy.contains('Close').click(); 
      cy.get('[data-testid="modalContent"]').should('not.exist'); 
  });
});
  
  