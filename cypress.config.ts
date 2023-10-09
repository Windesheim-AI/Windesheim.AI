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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
