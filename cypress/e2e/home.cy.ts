describe('Home page tests', () => {
    beforeEach(() => {
        cy.visit('/');

        // Handle the disclaimer pop-up if present at the beginning
        cy.get('body').then(($body) => {
            if ($body.find('.disclaimer-popup').length > 0) {
                cy.contains('Disclaimer').should('be.visible');
                cy.get('.disclaimer-popup .close-button').click();
            }
        });

        // Proceed with initial setup steps
        cy.get('[data-testid="FirstCollect-skip-button"]').click();
        cy.visit('/settings');
        cy.get('[data-testid="tutorial-skip-button"]').click();
        cy.get('[data-testid="language-switcher"]').click();
        cy.contains('English').click();
        cy.visit('/');
    });

    it('can display the home page', () => {
        cy.visit('/');

        // Handle the disclaimer pop-up if present after re-visiting the home page
        cy.get('body').then(($body) => {
            if ($body.find('.disclaimer-popup').length > 0) {
                // If the disclaimer pop-up is present, close it
                cy.contains('Disclaimer').should('be.visible');
                cy.get('.disclaimer-popup .close-button').click();
            }
        });

        // Verify that the home page content is visible
        // Replace 'Why Windesheim AI' with the actual content you expect
        cy.contains('Why Windesheim AI').should('be.visible');

        // If the disclaimer is not expected anymore, remove this check
        // If a disclaimer link or label is always part of the home page (not as a pop-up), adjust accordingly
        // cy.contains('Disclaimer').should('be.visible'); // Only if needed
    });
});
