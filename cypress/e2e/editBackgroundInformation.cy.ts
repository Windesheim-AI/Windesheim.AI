describe('Edit background information page tests', () => {
    beforeEach(() => {
        cy.visit('/settings');
        cy.get('[data-testid="FirstCollect-skip-button"]').click();
        cy.visit('/settings');
        cy.get('[data-testid="tutorial-skip-button"]').click();
        cy.get('[data-testid="language-switcher"]').click();
        cy.contains('English').click();
        cy.visit('/');
    });

    it.skip('can update the position option', () => {
        cy.visit('/settings/edit-background-information');

        cy.contains('Position');
        cy.get('[data-testid="position-select"]').click();
        cy.contains('Teacher').click();
        cy.contains('Teacher');
        cy.reload();
        cy.contains('Teacher');
    });

    it.skip('can update the interest in option', () => {
        cy.visit('/settings/edit-background-information');

        cy.contains('Interest in');
        cy.contains('AI interest');
        cy.get('[data-testid="edit-interested-keyword-select"]').click();
        cy.contains('Deep Learning').click();
        cy.contains('Deep Learning');
        cy.reload();
        cy.contains('Deep Learning');
    });

    it.skip('can update the Familiarity with AI option', () => {
        cy.visit('/settings/edit-background-information');

        cy.contains('Familiarity with AI');
        cy.contains('AI familiarity');
        cy.get('[data-testid="ai-familiarity-select"]').click();
        cy.contains('Very Familiar').click();
        cy.contains('Very Familiar');
        cy.reload();
        cy.contains('Very Familiar');
    });
});
