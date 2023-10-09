import { defineConfig } from 'cypress';

export default defineConfig({
    fixturesFolder: false,

    component: {
        supportFile: false,
        devServer: {
            framework: 'react',
            bundler: 'webpack',
        },
    },

    e2e: {
        supportFile: false,
        baseUrl: 'http://localhost:19006',

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
