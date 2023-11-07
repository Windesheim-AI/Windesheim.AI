import { ExpoConfig } from '@expo/config';

export type AppConfigOptions = {
    wordPressUrl: string;
    splashScreenTime: number;
    localStoragePrefixes: {
        translations: string;
    };
};

export const appConfig: AppConfigOptions = {
    wordPressUrl: 'https://windesheim.tech',
    splashScreenTime: 500,
    localStoragePrefixes: {
        translations: 'translations',
    },
};

export default ({ config }: { config: ExpoConfig }) => {
    return config;
};
