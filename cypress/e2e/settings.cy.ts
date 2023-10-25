describe('Theme Switcher', () => {
    it('can change the theme', () => {
        cy.visit('/settings');

        cy.get('[data-testid="Theme switcher"]').click();
        cy.get('[data-testid="Theme switcher input"] > input').click();
    });
});

describe('Language setting', () => {
    it.only('can change the language', () => {
        cy.visit('/settings');
        cy.contains('English');
        cy.get('[data-testid="language-switcher"]').click();
        cy.contains('Nederlands').click();
        cy.contains('Nederlands');
        cy.reload();
        cy.contains('Nederlands');
    });
});

describe('GoBack Button Test', () => {
    it('passes', () => {
        cy.visit('/');
        cy.get('[data-testid="Settings-navbar-button"]').click();
        cy.get('[data-testid="Settings"]').should('contain.text', 'Settings');
        cy.get('[data-testid="Language"]').click();
        cy.get('[data-testid="Settings > Language"]').should(
            'contain.text',
            'Settings > Language',
        );
        cy.get('[data-testid="GoBackButton"]').click();
        cy.get('[data-testid="Settings"]').should('contain.text', 'Settings');
    });
});
