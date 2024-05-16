describe('Podcast tests', () => {
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
        cy.intercept('GET', '/wp-json/winp/v1/episodes/', {
            fixture: 'podcasts/data.json',
        }).as('getData');

        // get the fixture and put it in a const
        const episodes = require('../fixtures/podcasts/data.json');

        cy.visit('/articles');

        cy.contains('Podcasts');
        cy.contains(
            'Here you can find the newest episodes of the official Windesheim.AI podcast.',
        );

        cy.wait(['@getData']);

        cy.contains(episodes[0].title);
        cy.contains(episodes[0].description);
        cy.contains(episodes[0].duration);

        cy.contains(episodes[1].title);

        cy.contains(episodes[2].title);
    });

    it('can display the overview when there are no podcasts available', () => {
        cy.intercept('GET', '/wp-json/winp/v1/episodes/', {
            fixture: 'prompts/empty.json',
        }).as('getData');

        cy.visit('/articles');

        cy.wait(['@getData']);

        cy.contains('Podcasts');
        cy.contains('No podcasts where found!');
    });

    it('can view an episode', () => {
        cy.intercept('GET', '/wp-json/winp/v1/episodes/1', {
            fixture: 'podcasts/1-episode.json',
        }).as('getData');

        // get the fixture and put it in a const
        const episode = require('../fixtures/podcasts/1-episode.json');

        cy.visit('/podcasts/episode?episodeId=1');
        cy.wait(['@getData']);

        cy.contains(episode.title);
        cy.contains(episode.description);
    });
});
