describe('First time user tests', () => {
    it('can skip the background collect form', () => {
        cy.visit('/');

        // Check if the disclaimer pop-up is displayed and close it if it is
        cy.get('body').then(($body) => {
            if ($body.find('.disclaimer-popup').length > 0) {
                cy.contains('Disclaimer').should('be.visible');
                cy.get('.disclaimer-popup .close-button').click();
            }
        });

        // After the disclaimer (if present) is closed,
        // check if the homepage is displayed correctly
        cy.contains('Welkom bij Windesheim.AI!').should('be.visible');
        cy.contains('We bieden u op maat gemaakte training.').should(
            'be.visible',
        );

        // Now skip the background form process
        cy.contains('Overslaan').click();
        cy.contains('Overslaan').click();

        // Check if you land at the expected place after skipping
        cy.contains('Windesheim AI').should('be.visible');
        // Since the disclaimer only appears at the beginning and does not appear again afterwards,
        // no further check for "Disclaimer" at the end is necessary.
    });
});
