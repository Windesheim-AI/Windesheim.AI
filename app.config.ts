import { ExpoConfig } from '@expo/config';

export type AppConfigOptions = {
    splashScreenTime: number;
};

export const appConfig: AppConfigOptions = {
    splashScreenTime: 500,
};

export default ({ config }: { config: ExpoConfig }) => {
    return config;
};
