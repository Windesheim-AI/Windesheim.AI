describe('Article Library tests', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('[data-testid="FirstCollect-skip-button"]').click();
        cy.visit('/settings');
        cy.get('[data-testid="tutorial-skip-button"]').click();
        cy.get('[data-testid="language-switcher"]').click();
        cy.contains('English').click();
        cy.visit('/');
    });

    it('can display the overview', () => {
        cy.intercept('GET', '/wp-json/winal/v1/articles/', {
            fixture: 'articles/data.json',
        }).as('getData');

        // get the fixture and put it in a const
        const articles = require('../fixtures/articles/data.json');

        cy.visit('/articles');

        cy.contains('Articles');
        cy.contains(
            "Here you'll find a collection of articles that highlight the latest developments, trends, and insights in the field of AI. Each article on the page is also tagged with relevant ELSA categories.",
        );

        cy.wait(['@getData']);

        cy.contains(articles[0].title);
        cy.contains(articles[0].description);
        cy.contains(articles[0].category);

        cy.contains(articles[1].title);

        cy.contains(articles[2].title);
    });
});
