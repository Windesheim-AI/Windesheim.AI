describe('Usecase page tests', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.window()
            .its('store')
            .invoke('dispatch', {
                type: 'tutorial/setCompleted',
                payload: { completed: true },
            });
    });

    it('Usecase page works', () => {
        cy.visit('/Usecase');
        cy.contains('UseCase');
        cy.contains('Inspiration library: Case studies');
        cy.contains(
            'These case studies or use cases are a collection, inspiration, of projects carried out by Windesheim students, by by the professorships and by the Technology Providers.',
        );
        cy.contains('Case Study');
        cy.contains('Information');
    });
});
