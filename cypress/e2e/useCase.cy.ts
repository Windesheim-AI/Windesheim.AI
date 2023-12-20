describe('Use case page tests', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('[data-testid="FirstCollect-skip-button"]').click();
        cy.visit('/settings');
        cy.get('[data-testid="tutorial-skip-button"]').click();
        cy.get('[data-testid="language-switcher"]').click();
        cy.contains('English').click();
        cy.visit('/');
    });

    it('can show the page', () => {
        cy.visit('/use-cases');
        cy.contains('UseCase');
        cy.contains('Inspiration library: Case studies');
        cy.contains(
            'These case studies or use cases are a collection, inspiration, of projects carried out by Windesheim students, by by the professorships and by the Technology Providers.',
        );
        cy.contains('Case Study');
        cy.contains('Information');
    });
});
