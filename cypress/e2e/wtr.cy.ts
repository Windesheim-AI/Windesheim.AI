describe('WTR page tests', () => {
    it('can display the WTR page', () => {
        cy.visit('/wtr');

        cy.contains('Windesheim Tech Radar');

        cy.contains('Tech Providers');
        cy.contains('Apple');
        cy.contains('Amazon');
        cy.contains('Cisco');
        cy.contains('Google');
        cy.contains('HP');
        cy.contains('IBM');
        cy.contains('Intel');
        cy.contains('OpenAI');
        cy.contains('Oracle');
        cy.contains('Meta');
        cy.contains('Microsoft');
        cy.contains('SalesForce');
        cy.contains('SAP');

        cy.contains('Themes');
        cy.contains('Artificial Intelligence');
        cy.contains('Next UI');
        cy.contains('Green IT');
        cy.contains('Transaction to interaction');
        cy.contains('Future of Work');
        cy.contains('Cloud Everywhere');
        cy.contains('Future of programming');
        cy.contains('Building Trust');
        cy.contains('Quantum computing');
    });
});
