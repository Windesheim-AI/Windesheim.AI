/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        assetExts: assetExts.filter((ext) => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg'],
    },
};

// eslint-disable-next-line no-shadow
const mergeConfig = (defaultConfig, config) => {
    const merged = { ...defaultConfig };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    for (const key of Object.keys(config)) {
        const value = config[key];
        if (Array.isArray(value)) {
            merged[key] = [...defaultConfig[key], ...value];
        } else if (typeof value === 'object' && value !== null) {
            merged[key] = { ...defaultConfig[key], ...value };
        } else {
            merged[key] = value;
        }
    }
    return merged;
};

module.exports = mergeConfig(defaultConfig, config);
