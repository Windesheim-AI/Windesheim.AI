// Disable uncaught exception handling.
Cypress.on('uncaught:exception', () => {
    // Returning false here prevents Cypress from failing the test.
    return false;
});

describe('Study page tests', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('[data-testid="FirstCollect-skip-button"]').click();
        cy.visit('/settings');
        cy.get('[data-testid="tutorial-skip-button"]').click();
        cy.get('[data-testid="language-switcher"]').click();
        cy.contains('English').click();
        cy.visit('/');
    });

    it('can display the study page', () => {
        cy.intercept('GET', '/wp-json/winpl/v1/prompts/', {
            fixture: 'prompts/data.json',
        }).as('getData');
        cy.intercept('GET', '/wp-json/winai/v1/courses/', {
            fixture: 'courses/data.json',
        }).as('getCourses');

        cy.visit('/study');

        cy.contains('Study');
        cy.contains(
            'Knowing is like turning on a light on the way trying to go.',
        );
        cy.contains('Courses');
        cy.get('[data-testid="course-card"]').should('have.length', 3);

        cy.contains('Prompt Library');
        cy.get('[data-testid="prompt-card"]').should('have.length', 3);
    });
});
