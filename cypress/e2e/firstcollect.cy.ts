describe('FirstCollect page tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('displays welcome message and background input buttons', () => {
        cy.contains('Welcome to WingAI!');
        cy.get('[data-testid="winglogo"]').should('exist');
        cy.contains('Tell me your background!');
        cy.contains('We provide you with customized training.');
        cy.contains('Okay').click();
    });

    it('skip buttons', () => {
        cy.contains('Welcome to WingAI!');
        cy.get('[data-testid="winglogo"]').should('exist');
        cy.contains('Tell me your background!');
        cy.contains('We provide you with customized training.');
        cy.contains('Skip').click();
    });

    it('allows answering background questions and progresses through', () => {
        cy.contains('Okay').click();
        cy.get('[data-testid="winglogo"]').should('exist');
        cy.contains('What is your position?');
        cy.get('[data-testid="listButton"]').first().click();
        cy.contains('What is your interested keyword?');
        cy.get('[data-testid="listButton"]').first().click();
        cy.contains('How much do you familiar for AI?');
        cy.get('[data-testid="listButton"]').first().click();
        cy.contains('Start').click();
    });
});
