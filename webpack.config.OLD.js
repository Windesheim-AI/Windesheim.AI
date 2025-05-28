const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);

    // Ensure that config.plugins is initialized
    config.plugins = config.plugins || [];
    config.plugins.push(
        new ReactRefreshWebpackPlugin({
            forceEnable: true,
        }),
    );

    // Ensure that config.module.rules is initialized
    config.module.rules = config.module.rules || [];

    config.module.rules.push({
        test: /postMock.html$/,
        use: {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
            },
        },
    });

    return config;
};
