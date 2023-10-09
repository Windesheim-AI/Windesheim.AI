import { defineConfig } from 'cypress';

export default defineConfig({
    fixturesFolder: false,

    component: {
        devServer: {
            framework: 'react',
            bundler: 'webpack',
        },
    },

    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
