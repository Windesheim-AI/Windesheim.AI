// Disable uncaught exception handling.
Cypress.on('uncaught:exception', () => {
    // Returning false here prevents Cypress from failing the test.
    return false;
});

describe('WTR page tests', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('[data-testid="FirstCollect-skip-button"]').click();
        cy.visit('/settings');
        cy.get('[data-testid="tutorial-skip-button"]').click();
        cy.get('[data-testid="language-switcher"]').click();
        cy.contains('English').click();
        cy.visit('/');
    });

    it('can display the WTR page', () => {
        cy.visit('/wtr-content');

        cy.contains('Windesheim Tech Radar');

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
        cy.contains('Transaction to Interaction');
        cy.contains('Future of Work');
        cy.contains('Cloud Everywhere');
        cy.contains('Future of Programming');
        cy.contains('Building Trust');
        cy.contains('Quantum Computing');
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

    it('can view the tech provider Google', () => {
        cy.intercept('GET', '/wp-json/wp/v2/pages?slug=google', {
            fixture: 'wtr-content/google-page.json',
        }).as('getPage');

        cy.visit('/wtr-content');

        cy.contains('Windesheim Tech Radar');
        cy.get('[data-testid="tech-provider-google-button"]').click();
        cy.wait(['@getPage']);

        cy.contains('Google');
        cy.contains(
            'Alphabet is het bedrijf achter de welbekende Google zoekmachine. Google is snel gegroeid in de ICT branche en heeft al vele bedrijven overgenomen zoals YouTube.',
        );
        cy.contains('Innovatie');
        cy.contains('Future of Programming');
        cy.contains('Future of Work');
        cy.contains('Quantum Computing');
        cy.contains('Cloud Everywhere');
        cy.contains('Fun Facts');

        cy.get('Google Cloud Nieuws').should('not.exist');
    });

    it('can view the theme Building Trust', () => {
        cy.intercept('GET', '/wp-json/wp/v2/pages?slug=building-trust', {
            fixture: 'wtr-content/building-trust-page.json',
        }).as('getPage');

        cy.visit('/wtr-content');

        cy.contains('Windesheim Tech Radar');
        cy.get('[data-testid="theme-building-trust-button"]').click();
        cy.wait(['@getPage']);

        cy.contains('Building Trust');
        cy.contains(
            'Je kunt geen gezonde relatie hebben zonder vertrouwen. En: vertrouwen komt te voet en gaat te paard! “Building Trust” is het creëren en vergroten van vertrouwen tussen de organisatie en de bezoeker of klant. Deloitte onderscheidt deze vier aspecten:',
        );
        cy.contains('Trends');
        cy.contains('Impact');
        cy.contains('Privacy');

        cy.get('Artikelen en Blogs').should('not.exist');
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

    it('can view an empty page', () => {
        cy.intercept('GET', '/wp-json/wp/v2/pages?slug=empty-page', {
            fixture: 'wtr-content/empty-page.json',
        }).as('getPage');

        cy.visit('/wtr-content/empty-page');
        cy.wait(['@getPage']);

        cy.contains('Page not found');
        cy.contains(
            "We're sorry, but we couldn't find the page you were looking for.",
        );
    });
});
