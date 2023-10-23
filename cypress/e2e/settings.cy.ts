describe('Data page navigation', () => {
  it('passes', () => {
    cy.visit('/');

    cy.get(':nth-child(4) > .css-text-146c3p1').click();
    cy.get('[style="background-color: rgb(242, 242, 242); display: flex;"] > :nth-child(1) > :nth-child(1) > .r-backgroundColor-wmy513 > :nth-child(2)').click();

    cy.get('[style="background-color: rgb(242, 242, 242); display: flex;"] > :nth-child(1) > :nth-child(1) > .r-backgroundColor-wmy513 > .r-fontSize-1x35g6').should('contain.text', 'Settings > Data')
  })
})

describe('Language page navigation', () => {
  it('passes', () => {
    cy.visit('/');

    cy.get(':nth-child(4) > .css-text-146c3p1').click();
    cy.get('[style="background-color: rgb(242, 242, 242); display: flex;"] > :nth-child(1) > :nth-child(1) > .r-backgroundColor-wmy513 > :nth-child(3)').click();

    cy.get('[style="background-color: rgb(242, 242, 242); display: flex;"] > :nth-child(1) > :nth-child(1) > .r-backgroundColor-wmy513 > .r-fontSize-1x35g6').should('contain.text', 'Settings > Language')
  })
})