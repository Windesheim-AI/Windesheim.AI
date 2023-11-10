describe('Home page tests', () => {
    it('can display the home page', () => {
        cy.visit('/');

        cy.contains('Home');

        cy.contains('Tech Providers');
        cy.contains('Apple');
        cy.contains('Amazon');
        cy.contains('Cisco');
        cy.contains('Google');
        cy.contains('HP');
        cy.contains('IBM');
        cy.contains('Intel');
        cy.contains('OpenAI');
        cy.contains('Oracle');
        cy.contains('Meta');
        cy.contains('Microsoft');
        cy.contains('SalesForce');
        cy.contains('SAP');

        cy.contains('Themes');
        cy.contains('Artificial Intelligence');
        cy.contains('Next UI');
        cy.contains('Green IT');
        cy.contains('Transaction to interaction');
        cy.contains('Future of Work');
        cy.contains('Cloud Everywhere');
        cy.contains('Future of programming');
        cy.contains('Building Trust');
        cy.contains('Quantum computing');
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

    it('can view the theme Future of programming', () => {
        cy.intercept('GET', '/wp-json/wp/v2/pages?slug=future-of-programming', {
            fixture: 'wtr-content/future-of-programming-page.json',
        }).as('getPage');

        cy.visit('/wtr-content');

        cy.contains('Windesheim Tech Radar');
        cy.get('[data-testid="theme-future-of-programming-button"]').click();
        cy.wait(['@getPage']);

        cy.contains('Future of Programming');
        cy.contains(
            'De Future of Programming is een onderwerp dat veel mensen interesseert, vooral degenen die betrokken zijn bij softwareontwikkeling. Er is geen eenduidig antwoord op deze vraag, maar er zijn wel enkele trends en ontwikkelingen die een beeld kunnen geven van hoe programmeren er in de toekomst uit zou kunnen zien. Een van de belangrijkste factoren die de Future of Programming zal beïnvloeden, is kunstmatige intelligentie (AI).',
        );
        cy.contains('A.I. (Artificial Intelligence)');
        cy.contains('AI vervangt programmeurs niet');
        cy.contains('Trends');
        cy.contains('Programmeren met ChatGPT');
        cy.contains('Internet of Things');
    });
});
