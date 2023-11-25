describe('Study page tests', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('[data-testid="FirstCollect-skip-button"]').click();
        cy.get('[data-testid="tutorial-skip-button"]').click();
        cy.get('[data-testid="language-switcher"]').click();
        cy.contains('English').click();
        cy.visit('/');
    });

    it('can display the study page', () => {
        cy.visit('/Study');

        cy.contains('Welcome to study');
        cy.get('[data-testid="courses-button"]');
        cy.get('[data-testid="courses-button"]').should(
            'contain.text',
            'Courses',
        );
    });
});
