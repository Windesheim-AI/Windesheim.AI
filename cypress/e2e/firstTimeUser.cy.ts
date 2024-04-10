describe('First time user tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('can display the welcome message and background input buttons', () => {
        cy.contains('Welkom bij Windesheim.AI!');
        cy.get('[data-testid="userLogo"]').should('exist');
        cy.contains('Vertel me uw achtergrond!');
        cy.contains('We bieden u op maat gemaakte training.');
        cy.contains('Oke').click();
    });

    it('can skip the background collect form', () => {
        cy.contains('Welkom bij Windesheim.AI!');
        cy.contains('Overslaan').click();
        cy.contains('Overslaan').click();

        cy.contains('Windesheim AI');
        cy.contains('Disclaimer');
    });

    it('can answer the background questions and progresses through it', () => {
        cy.contains('Oke').click();
        cy.contains('Achtergrondinformatie verzamelen');
        cy.contains('Wat is uw positie?');
        cy.get('[data-testid="listButton"]').first().click();
        cy.contains('In welk gebied van AI bent u geïnteresseerd?');
        cy.get('[data-testid="listButton"]').first().click();
        cy.contains('Hoe bekend bent u met AI?');
        cy.get('[data-testid="listButton"]').first().click();
        cy.contains('Overslaan').click();
        cy.contains('Windesheim AI');
        cy.contains('Disclaimer');
    });
});
