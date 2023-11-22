// cypress/integration/tutorial.spec.ts

describe('Tutorial', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should display the tutorial prompt', () => {
        cy.get('[data-testid="tutorial-next-button"]').contains('Next 1 /');
    });

    it('should navigate to the next step when clicking the "Next" button', () => {
        cy.get('[data-testid="tutorial-next-button"]').click();
        cy.get('[data-testid="tutorial-next-button"]').contains('Next 2 /');
    });

    it('should finish the tutorial if the user clicks on skip', () => {
        cy.get('[data-testid="tutorial-skip-button"]').click();
        cy.get('[data-testid="tutorial-next-button"]').should('not.exist');
    });

    it('should reset the tutorial if the tutorial is finished', () => {
        cy.get('[data-testid="tutorial-skip-button"]').click();
        cy.visit('/Settings');
    });
});
