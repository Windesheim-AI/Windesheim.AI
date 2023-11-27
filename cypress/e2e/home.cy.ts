describe('Home page tests', () => {
    beforeEach(() => {
        cy.visit('/settings');
        cy.get('[data-testid="tutorial-skip-button"]').click();
        cy.get('[data-testid="language-switcher"]').click();
        cy.contains('English').click();
        cy.visit('/');
    });

    it('can display the home page', () => {
        cy.visit('/');

        cy.contains('Home');

        cy.contains('Tech Providers');
        //there should be 5 tech providers
        cy.get('[data-testid="tech-provider-text"]').should('have.length', 5);
        cy.get('[data-testid="prompt-card"]').should('have.length', 3);
    });

    it('can view the tech provider Apple', () => {
        cy.intercept('GET', '/wp-json/wp/v2/pages?slug=apple', {
            fixture: 'wtr-content/apple-page.json',
        }).as('getApple');

        cy.visit('/wtr-content');

        cy.contains('Windesheim Tech Radar');
        cy.get('[data-testid="tech-provider-apple-button"]').click();
        cy.wait(['@getApple']);

        cy.contains('Apple');
        cy.contains(
            'Apple, opgericht in 1976 door visionairs als Steve Jobs, Steve Wozniak en Ronald Wayne, is een icoon in de technologiewereld. Hun producten vallen op door het strakke design en de minimalistische esthetiek. Design staat centraal in alles wat Apple doet, wat resulteert in herkenbare, aantrekkelijke producten.',
        );
        cy.contains('Steve Jobs');
        cy.contains('Innovatie');
        cy.contains('A17 Pro & Apple M1 – Kleine chip. Immense vooruitgang.');
        cy.contains('De overgang naar usb-c en draadloos opladen');

        cy.contains('Next UI');
        cy.contains('Green IT');
        cy.contains('Communities');
        cy.contains('Fun facts');

        cy.get('Apple newsroom').should('not.exist');
    });
});
