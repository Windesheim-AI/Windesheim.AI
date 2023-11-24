import { ExpoConfig } from '@expo/config';

export type AppConfigOptions = {
    backendUrl: string;
    splashScreenTime: number;
    localStoragePrefixes: {
        translations: string;
    };
};

export const appConfig: AppConfigOptions = {
    backendUrl: 'https://www.windesheim.tech',
    splashScreenTime: 500,
    localStoragePrefixes: {
        translations: 'translations',
    },
};

export default ({ config }: { config: ExpoConfig }) => {
    return config;
};
