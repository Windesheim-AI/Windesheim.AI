describe('wait for server', () => {
    it('waits for server', () => {
        // Wait for the server to start up
        cy.wait(30_000);
        cy.visit('/');
    });
});
