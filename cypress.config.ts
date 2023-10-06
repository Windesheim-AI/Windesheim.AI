import { defineConfig } from 'cypress';

export default defineConfig({
    fixturesFolder: false,

    component: {
        devServer: {
            framework: 'react',
            bundler: 'webpack',
        },
    },
});
