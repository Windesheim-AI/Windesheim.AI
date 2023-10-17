module.exports = {
    preset: '@testing-library/react-native',
    roots: ['<rootDir>/__tests__'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    setupFilesAfterEnv: ['./jest-setup.ts'],
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation)',
    ],
};
