describe('StatusAlert tests', () => {
  beforeEach(() => {
    cy.visit('/'); // Vervang 'jouw-pagina' door de daadwerkelijke URL van je applicatie
  });

  it('Displays the notification when the action is dispatched', () => {
    // Verify that the notification is not present initially
    cy.contains('Message Added!').should('not.exist');
  
    // Dispatch the action that shows the notification
    cy.window().its('store').invoke('dispatch', { type: 'ADD_NOTIFICATION', payload: { message: 'Message Added!' } });
  
    // Verify that the notification appears after dispatching the action
    cy.contains('Message Added!').should('be.visible');
  });

  
  it('Removes the notification after it fades out', () => {
    // Dispatch the action that shows the notification
    cy.window().its('store').invoke('dispatch', { type: 'ADD_NOTIFICATION', payload: { message: 'Message Added!' } });
  
    // Verify that the notification appears after dispatching the action
    cy.contains('Message Added!').should('be.visible');
  
    // Wait for the duration of the fade-out animation
    cy.wait(3000); // Replace 3000 with the actual duration of your animation
  
    // Verify that the notification is no longer visible
    cy.contains('Message Added!').should('not.exist');
  });
});