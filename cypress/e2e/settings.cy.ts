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

// check if font-size grows when changing font-size
describe('Font size', () => {
    it('can change the font size', () => {
        cy.visit('/home');
        const defaultFontSizeOfH1 = 24;
        const DefaultSize = 24;
        const StepSize = 1;
        function calculateNewSize(defaultFontSize: number, fontSize: number) {
            const ratio = fontSize / defaultFontSize;
            return defaultFontSizeOfH1 * ratio;
        }
        // check fontsize in css
        cy.get('[data-testid="Home-description"]').then(($el) => {
            const fontSize = window.getComputedStyle($el[0]).getPropertyValue('font-size');
            cy.log(`The font size of #Home-description is ${fontSize}`);
            // check if its
            expect(fontSize).to.equal(`${DefaultSize}px`);
        });
        cy.visit('/settings');
        cy.get('[data-testid="fontSize"]').should(
            'contain.text', DefaultSize);
        cy.get('[data-testid="increaseFont"]').click();
        cy.get('[data-testid="fontSize"]').should(
            'contain.text', DefaultSize + StepSize);

        // go to another page, check fontsize in css
        cy.visit('/home');
        // check fontsize in css
        cy.get('[data-testid="Home-description"]').then(($el) => {
            const fontSize = window.getComputedStyle($el[0]).getPropertyValue('font-size');
            cy.log(`The font size of #Home-description is ${fontSize}`);
            // check if its
            expect(fontSize).to.equal(`${calculateNewSize(defaultFontSizeOfH1, DefaultSize + StepSize)}px`);
        });
    });
});
