describe('Loading Screen shows', () => {
  it('passes', () => {
    cy.visit('/settings')
    cy.get('[data-testid="LogoBlack"]');
    cy.get('[data-testid="LogoWin"]');
  })
})

describe('Loading Screen Dissapears', () => {
  it('passes', () => {
    cy.visit('/settings')
    cy.get('[data-testid="LogoBlack"]').should('not.exist');
    cy.get('[data-testid="LogoWin"]').should('not.exist');
  })
})