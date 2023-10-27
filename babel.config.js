module.exports = function (api) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    api.cache(true);
    return {
        plugins: [
            [
                'module:react-native-dotenv',
                {
                    moduleName: '@env',
                    path: '.env',
                    blacklist: null,
                    whitelist: null,
                    safe: false,
                    allowUndefined: true,
                },
            ],
        ],
        env: {
            development: {
                plugins: ['istanbul'],
            },
        },
        presets: ['babel-preset-expo'],
    };
};
