import { appConfig } from '../../app.config';

describe('Tests the splashscreen', () => {
    it('can see the logos on the splashscreen', () => {
        cy.visit('/');
        cy.get('[data-testid="LogoBlack"]');
        cy.get('[data-testid="LogoWin"]');
    });

    it('can hide the splashscreen after a configured time', () => {
        cy.visit('/');
        cy.wait(appConfig.splashScreenTime + 100);

        cy.get('[data-testid="LogoBlack"]').should('not.exist');
        cy.get('[data-testid="LogoWin"]').should('not.exist');
    });
});
