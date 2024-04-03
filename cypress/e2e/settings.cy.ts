// Disable uncaught exception handling.
Cypress.on('uncaught:exception', () => {
    // Returning false here prevents Cypress from failing the test.
    return false;
});

describe('App settings test', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('[data-testid="FirstCollect-skip-button"]').click();
        cy.visit('/settings');
        cy.get('[data-testid="tutorial-skip-button"]').click();
        cy.get('[data-testid="language-switcher"]').click();
        cy.contains('English').click();
        cy.visit('/');
    });

    it('can change the theme', () => {
        cy.visit('/settings');

        cy.get('[data-testid="Theme switcher"]').click();
        cy.get('[data-testid="Theme switcher input"] > input').click();
    });

    it('can change the language', () => {
        cy.visit('/settings');
        cy.contains('English');
        cy.contains('Settings');
        cy.contains('Enable dark mode');
        cy.contains('Language');

        cy.get('[data-testid="language-switcher"]').click();
        cy.contains('Nederlands').click();
        cy.contains('Instellingen');
        cy.contains('Activeer donkere modus');
        cy.contains('Taal');
        cy.contains('Nederlands');

        cy.reload();
        cy.contains('Instellingen');
        cy.contains('Nederlands');
        cy.contains('Activeer donkere modus');
        cy.contains('Taal');
    });

    it('can change the font size', () => {
        cy.visit('/home');
        const defaultFontSizeOfH1 = 24;
        const defaultSize = 24;
        const StepSize = 1;
        function calculateNewSize(defaultFontSize: number, fontSize: number) {
            const ratio = fontSize / defaultFontSize;
            return defaultFontSizeOfH1 * ratio;
        }
        // check fontsize in css
        cy.get('[data-testid="disclaimerText"]').then(($el) => {
            const fontSize = window
                .getComputedStyle($el[0])
                .getPropertyValue('font-size');
            cy.log(`The font size of #disclaimerText is ${fontSize}`);
            // check if its
            expect(fontSize).to.equal(`${defaultSize}px`);
        });
        cy.visit('/settings');
        cy.get('[data-testid="fontSize"]').should('contain.text', defaultSize);
        cy.get('[data-testid="increaseFont"]').click();
        cy.get('[data-testid="fontSize"]').should(
            'contain.text',
            defaultSize + StepSize,
        );

        // go to another page, check fontsize in css
        cy.visit('/home');
        // check fontsize in css
        cy.get('[data-testid="Home-description"]').then(($el) => {
            const fontSize = window
                .getComputedStyle($el[0])
                .getPropertyValue('font-size');
            cy.log(`The font size of #Home-description is ${fontSize}`);
            // check if its
            expect(fontSize).to.equal(
                `${calculateNewSize(
                    defaultFontSizeOfH1,
                    defaultSize + StepSize,
                )}px`,
            );
        });
    });
});
