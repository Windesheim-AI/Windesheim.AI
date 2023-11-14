describe('Study courses tests', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.window()
            .its('store')
            .invoke('dispatch', {
                type: 'tutorial/setCompleted',
                payload: { completed: true },
            });
    });

    it('can display the courses overview page', () => {
        // cy.intercept('GET', '/wp-json/wp/v2/pages?slug=google', {
        //     fixture: 'courses/test-courses.json',
        // }).as('getPage');

        cy.visit('/courses');
        // cy.wait(['@getPage']);

        cy.contains('Courses');
        cy.contains('The basics of Generative AI');
        cy.contains('A brief introduction to generative AI and how it works.');
    });

    it('can display the course overview page', () => {
        cy.visit('/course/the-basics-of-generative-ai/overview');

        cy.contains('Course Overview');
        cy.contains('Back to Courses');
        cy.contains('Learn, understand, verify');
        cy.contains('The basics of generative AI');
        cy.contains('Advanced generative AI');
        cy.contains('Generative AI in practice');
    });

    it('can display the course lesson page', () => {
        cy.visit('/course/the-basics-of-generative-ai/learn-understand-verify');
        cy.contains('The basics of generative AI');
        cy.contains(
            'Generative AI is one of the most exciting developments in artificial intelligence technology because of its ability to create something new. It opens the door to an entire world of possibilities for human and computer creativity, with practical applications emerging across industries, from turning sketches into images for accelerated product development, to improving computer-aided design of complex objects. It takes two neural networks against each other to produce new and original digital works based on sample inputs. The generator network creates new data instances, while the discriminator network evaluates them for authenticity; i.e. the discriminator determines whether each instance of data it reviews belongs to the actual training dataset or not.',
        );
        cy.contains('AI Generated Output');
        cy.contains('(See Prompt)');
        cy.get('Next').should('be.visible');
    });

    it.only('can complete a course', () => {
        cy.visit('/course/the-basics-of-generative-ai/learn-understand-verify');
        cy.contains('The basics of generative AI');
        cy.get(
            '[data-testid="next-stage-learn-understand-verify-button"]',
        ).click();
        cy.contains('The basics of generative AI');
        cy.get(
            '[data-testid="next-stage-the-basics-of-generative-ai-2-button"]',
        ).click();
        cy.contains('Advanced generative AI');
        cy.get(
            '[data-testid="next-stage-advanced-generative-ai-button"]',
        ).click();
        cy.contains('Generative AI in practice');
        cy.get(
            '[data-testid="next-stage-generative-ai-in-practice-1-button"]',
        ).click();
        cy.contains('Generative AI in practice');
        cy.get(
            '[data-testid="next-stage-generative-ai-in-practice-2-button"]',
        ).click();
        cy.contains('Generative AI in practice');
        cy.get(
            '[data-testid="next-stage-generative-ai-in-practice-3-button"]',
        ).click();

        cy.contains('Course finished!');
        cy.contains('The basics of generative AI');
        cy.contains('Go back to courses');
        cy.get('[data-testid="go-back-to-courses-button"]').click();
        cy.contains('Courses');
    });
});
