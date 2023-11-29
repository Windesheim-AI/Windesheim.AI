describe('First time user tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it.skip('can display the welcome message and background input buttons', () => {
        cy.contains('Welkom bij Windesheim.AI!');
        cy.get('[data-testid="userLogo"]').should('exist');
        cy.contains('Vertel me je achtergrond!');
        cy.contains('We bieden u op maat gemaakte training.');
        cy.contains('Oke').click();
    });

    it.skip('can skip the background collect form', () => {
        cy.contains('Welkom bij Windesheim.AI!');
        cy.contains('Overslaan').click();
        cy.contains('Overslaan').click();

        cy.contains('Home');
        cy.contains('Handige prompts');
        cy.contains('Tech Providers');
    });

    it.skip('can answer the background questions and progresses through it', () => {
        cy.contains('Oke').click();
        cy.contains('Achtergrondinformatie verzamelen');
        cy.contains('Wat is je positie?');
        cy.get('[data-testid="listButton"]').first().click();
        cy.contains('In welk gebied van AI bent u geïnteresseerd?');
        cy.get('[data-testid="listButton"]').first().click();
        cy.contains('Hoe bekend bent u met AI?');
        cy.get('[data-testid="listButton"]').first().click();
        cy.contains('Overslaan').click();
        cy.contains('Home');
        cy.contains('Handige prompts');
        cy.contains('Tech Providers');
    });
});
