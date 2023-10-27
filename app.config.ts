export type AppConfigOptions = {
    splashScreenTime: number;
    localStoragePrefixes: {
        translations: string;
    };
};

export const appConfig: AppConfigOptions = {
    splashScreenTime: 500,
    localStoragePrefixes: {
        translations: 'translations',
    },
};
