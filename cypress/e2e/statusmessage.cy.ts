describe('StatusAlert component', () => {
  beforeEach(() => {
    cy.visit('/home'); 
  });

  it('displays and disappears the alert after a button click', () => {
    cy.contains('add message').click();
    cy.get('.status-alert').should('be.visible'); // Check if the alert is visible

    cy.wait(3000); // Wait for 3 seconds
    cy.get('.status-alert').should('not.exist'); // Check if the alert is no longer visible
  });
});