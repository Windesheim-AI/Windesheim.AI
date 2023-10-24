describe('Theme Switcher', () => {
    it('can change the theme of the switch', () => {
        cy.visit('/');

        cy.get('[data-testid="Settings-navbar-button"]').click();
        cy.get('[data-testid="Theme switcher"]').click();
        cy.get('[data-testid="Theme switcher input"] > input').click();
    });
});

describe('Language page navigation', () => {
    it('passes', () => {
        cy.visit('/');

        cy.get('[data-testid="Settings-navbar-button"]').click();
        cy.get('[data-testid="Language"]').click();

        cy.get('[data-testid="Settings > Language"]').should(
            'contain.text',
            'Settings > Language',
        );
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
