describe('StatusAlert tests', () => {
  beforeEach(() => {
    cy.visit('/'); // Vervang 'jouw-pagina' door de daadwerkelijke URL van je applicatie
  });

  it('Toont de StatusAlert wanneer de knop wordt ingedrukt', () => {
    // Verifieer dat de StatusAlert niet aanwezig is voor het indrukken van de knop
    cy.contains('Message Added!').should('not.exist');

    // Klik op de knop die de StatusAlert toont
    cy.contains('add message').click();

    // Verifieer dat de StatusAlert verschijnt na het klikken op de knop
    cy.contains('Message Added!').should('be.visible');
  });
});