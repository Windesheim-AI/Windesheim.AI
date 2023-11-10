import { appConfig } from '../../app.config';

describe('Check if Images load', () => {
    it('can see the logos on the splashscreen', () => {
        cy.visit('/');
        cy.get('[data-testid="LogoBlack"]');
        cy.get('[data-testid="LogoWin"]');
    });
});

describe('Check if Splash Screen disappears', () => {
    it('can hide the splashscreen after a configured time', () => {
        cy.visit('/');
        cy.wait(appConfig.splashScreenTime + 100);

        cy.get('[data-testid="LogoBlack"]').should('not.exist');
        cy.get('[data-testid="LogoWin"]').should('not.exist');
    });
});
