import { defineConfig } from 'cypress';

export default defineConfig({
    fixturesFolder: false,

    e2e: {
        baseUrl: 'http://localhost:19006',

        setupNodeEvents(on, config) {
            // implement node event listeners here
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-var-requires
            require('@cypress/code-coverage/task')(on, config);

            // It's IMPORTANT to return the config object
            // with any changed environment variables
            return config;
        },
    },
});
