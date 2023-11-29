// cypress/integration/tutorial.spec.ts

describe('Tutorial', () => {
    beforeEach(() => {
        cy.visit('/settings');
        cy.get('[data-testid="FirstCollect-skip-button"]').click();
        cy.visit('/settings');
        cy.get('[data-testid="tutorial-skip-button"]').click();
        cy.get('[data-testid="language-switcher"]').click();
        cy.contains('English').click();
        cy.get('[data-testid="redo-tutorial-button"]').click();
        cy.visit('/');
    });

    it.skip('can display the tutorial prompt', () => {
        cy.get('[data-testid="tutorial-next-button"]').contains('Next 1 /');
    });

    it.skip('can navigate to the next step when clicking the "Next" button', () => {
        cy.get('[data-testid="tutorial-next-button"]').click();
        cy.get('[data-testid="tutorial-next-button"]').contains('Next 2 /');
    });

    it.skip('can finish the tutorial if the user clicks on skip', () => {
        cy.get('[data-testid="tutorial-skip-button"]').click();
        cy.get('[data-testid="tutorial-next-button"]').should('not.exist');
    });

    it.skip('can reset the tutorial if the tutorial is finished', () => {
        cy.get('[data-testid="tutorial-skip-button"]').click();
        cy.visit('/Settings');
    });
});
