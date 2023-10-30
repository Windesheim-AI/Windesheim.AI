describe('Theme Switcher', () => {
    it('can change the theme', () => {
        cy.visit('/settings');

        cy.get('[data-testid="Theme switcher"]').click();
        cy.get('[data-testid="Theme switcher input"] > input').click();
    });
});

describe('Language setting', () => {
    it('can change the language', () => {
        cy.visit('/settings');
        cy.contains('English');
        cy.contains('Settings');
        cy.contains('Enable dark mode');
        cy.contains('Language');

        cy.get('[data-testid="language-switcher"]').click();
        cy.contains('Nederlands').click();
        cy.contains('Instellingen');
        cy.contains('Schakel de donkere modus in');
        cy.contains('Taal');
        cy.contains('Nederlands');

        cy.reload();
        cy.contains('Instellingen');
        cy.contains('Nederlands');
        cy.contains('Schakel de donkere modus in');
        cy.contains('Taal');
    });
});

describe('GoBack Button Test', () => {
    it('passes', () => {
        cy.visit('/');
        cy.get('[data-testid="Settings-navbar-button"]').click();
        cy.get('[data-testid="Settings"]').should('contain.text', 'Settings');
        cy.get('[data-testid="Test"]').click();
        cy.get('[data-testid="Settings > Test"]').should(
            'contain.text',
            'Settings > Test',
        );
        cy.get('[data-testid="GoBackButton"]').click();
        cy.get('[data-testid="Settings"]').should('contain.text', 'Settings');
    });
});
