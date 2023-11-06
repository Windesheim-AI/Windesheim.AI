describe('Loading Screen shows', () => {
  it('passes', () => {
    cy.visit('/settings')
    cy.get('[data-testid="WingAI-logo"]');
  })
})

describe('Loading Screen Dissapears', () => {
  it('passes', () => {
    cy.visit('/settings')
    cy.get('[data-testid="WingAI-logo"]').should('not.exist');
  })
})