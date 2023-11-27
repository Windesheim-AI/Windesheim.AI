describe('wait for server', () => {
    it('waits for server', { retries: 3 }, () => {
        cy.visit('/');
    });
});
