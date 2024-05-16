describe('Prompt Library tests', () => {
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
        cy.intercept('GET', '/wp-json/winpl/v1/prompts/', {
            fixture: 'prompts/data.json',
        }).as('getData');

        // get the fixture and put it in a const
        const prompts = require('../fixtures/prompts/data.json');

        cy.visit('/study/prompt-library');
        cy.wait(['@getData']);

        cy.contains('Prompt library');
        cy.contains(
            "Here you'll find a collection of prompts that you can use to easily navigate AI tools. You can filter by tools and sector to find the right prompt you need.",
        );
        cy.contains(prompts[0].title);
        cy.contains(prompts[0].tool);

        cy.contains(prompts[1].title);
        cy.contains(prompts[1].tool);

        cy.contains(prompts[2].title);
        cy.contains(prompts[2].tool);
    });

    it('can display the overview when there are no prompts available', () => {
        cy.intercept('GET', '/wp-json/winpl/v1/prompts/', {
            fixture: 'prompts/empty.json',
        }).as('getData');

        cy.visit('/study/prompt-library');
        cy.wait(['@getData']);

        cy.contains('Prompt library');
        cy.contains('No prompts found!');
    });

    it('can filter the overview', () => {
        cy.intercept('GET', '/wp-json/winpl/v1/prompts/', {
            fixture: 'prompts/data.json',
        }).as('getData');

        // get the fixture and put it in a const
        const prompts = require('../fixtures/prompts/data.json');

        cy.visit('/study/prompt-library');
        cy.wait(['@getData']);

        cy.get('[data-testid="tutorial-skip-button"]').click();

        cy.contains('Prompt library');

        // Filter on tool
        cy.get('[data-testid="chip-Creative Writing Tool-container"]').click();
        cy.contains(prompts[0].title);
        cy.get(prompts[1].title).should('not.exist');
        cy.get(prompts[2].title).should('not.exist');

        // Filter on sector
        cy.reload();
        cy.get('[data-testid="chip-Personal Development-container"]').click();
        cy.contains(prompts[1].title);
        cy.get(prompts[0].title).should('not.exist');
        cy.get(prompts[2].title).should('not.exist');

        // Reset all filters
        cy.get('[data-testid="chip-Personal Development-container"]').click();
        cy.contains(prompts[0].title);
        cy.contains(prompts[1].title);
        cy.contains(prompts[2].title);
    });

    it('can view a prompt', () => {
        cy.intercept('GET', '/wp-json/winpl/v1/prompts/1', {
            fixture: 'prompts/1-prompt.json',
        }).as('getData');

        // get the fixture and put it in a const
        const prompt = require('../fixtures/prompts/1-prompt.json');

        cy.visit('/study/prompt-library/prompt?promptId=1');
        cy.wait(['@getData']);

        cy.contains('Prompt');
        cy.contains(prompt.title);
        cy.contains(prompt.prompt);
        cy.contains(prompt.description);
        cy.contains(prompt.tool);
        cy.contains(prompt.promptPattern);
        cy.contains(prompt.sector);
        cy.contains('Try it yourself!');
    });

    it('can view a non-existing prompt', () => {
        cy.intercept('GET', '/wp-json/winpl/v1/prompts/1', {
            fixture: 'prompts/empty.json',
        }).as('getData');

        cy.visit('/study/prompt-library/prompt?promptId=1');
        cy.wait(['@getData']);

        cy.contains('No prompt found!');
        cy.contains('Prompts');
    });
});
