module.exports = function (api) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    api.cache(true);
    return {
        env: {
            development: {
                plugins: ['istanbul'],
            },
        },
        presets: ['babel-preset-expo'],
    };
};
