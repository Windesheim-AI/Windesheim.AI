import { ExpoConfig } from '@expo/config';

export type AppConfigOptions = {
    backendUrl: string;
    splashScreenTime: number;
    localStoragePrefixes: {
        translations: string;
    };
    debug: boolean;
};

export const appConfig: AppConfigOptions = {
    backendUrl: 'https://windesheim.tech',
    splashScreenTime: 500,
    localStoragePrefixes: {
        translations: 'translations',
    },
    debug: true,
};

export default ({ config }: { config: ExpoConfig }) => {
    return config;
};
