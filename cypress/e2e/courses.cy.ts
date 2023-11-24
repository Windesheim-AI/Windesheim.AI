import { Course } from '../../src/types/Course';

describe('Courses page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:19006/');
        cy.location('pathname', { timeout: 60000 }).should('include', '/');

        cy.visit('/settings');
        cy.get('[data-testid="tutorial-skip-button"]').click();
        cy.get('[data-testid="language-switcher"]').click();
        cy.contains('English').click();
        cy.visit('/');
    });

    it('can show the courses', () => {
        cy.intercept('GET', '/wp-json/wingai/v1/courses/', {
            fixture: 'courses/test-courses.json',
        }).as('getCourses');

        // get the fixture and put it in a const
        const courses = require('../fixtures/courses/test-courses.json');

        cy.visit('/courses');
        cy.wait(['@getCourses']);

        // check if the courses are displayed
        cy.contains('Courses');
        cy.contains(courses[0].title);
    });

    it('can view a course', () => {
        // get the fixture and put it in a const
        const courses: Course[] = require('../fixtures/courses/test-courses.json');
        cy.intercept('GET', '/wp-json/wingai/v1/courses/', {
            fixture: 'courses/test-courses.json',
        }).as('getCourses');

        cy.intercept('GET', `/wp-json/wingai/v1/courses/${courses[0].id}`, {
            fixture: 'courses/test-course.json',
        }).as('getCourse');

        cy.visit('/courses');
        cy.wait(['@getCourses']);

        // check if the courses are displayed
        cy.contains('Courses');
        cy.contains(courses[0].title);

        // click on the course
        cy.get(`[data-testid="course-card-${courses[0].id}"]`).first().click();

        // check if the course is displayed
        cy.contains(courses[0].title);

        // check if contains the stages
        cy.contains(courses[0].stages[0].title);

        // check if the stage item is displayed testId=stage-card-stageid
        cy.get(`[data-testid="stage-card-${courses[0].stages[0].id}"]`).should(
            'exist',
        );
        // click it
        cy.get(`[data-testid="stage-card-${courses[0].stages[0].id}"]`).click();

        // check if the stage is displayed
        cy.contains(courses[0].stages[0].title);
    });

    it('can navigate to overview using navigation', () => {
        // get the fixture and put it in a const
        const courses: Course[] = require('../fixtures/courses/test-courses.json');
        cy.intercept('GET', '/wp-json/wingai/v1/courses/', {
            fixture: 'courses/test-courses.json',
        }).as('getCourses');

        cy.intercept('GET', `/wp-json/wingai/v1/courses/${courses[0].id}`, {
            fixture: 'courses/test-course.json',
        }).as('getCourse');

        cy.visit('/courses');
        cy.wait(['@getCourses']);

        // check if the courses are displayed
        cy.contains('Courses');
        cy.contains(courses[0].title);

        // click on the course
        cy.get(`[data-testid="course-card-${courses[0].id}"]`).first().click();

        // check if the course is displayed
        cy.contains(courses[0].title);

        // check if contains the stages
        cy.contains(courses[0].stages[0].title);

        //click
        cy.get(`[data-testid="stage-card-${courses[0].stages[0].id}"]`).click();

        // navigate to the next stage
        cy.get('[data-testid="course-navigation"]').click();

        // navigate to courseoverview
        cy.get('[data-testid="course-overview-button"]').click();

        // check if the course is displayed
        cy.contains(courses[0].title);
    });
});
