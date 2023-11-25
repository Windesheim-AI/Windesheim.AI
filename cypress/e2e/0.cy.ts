describe('wait for server', () => {
    it('waits for server', () => {
        cy.visit('/');
    }).retries(3);
});
