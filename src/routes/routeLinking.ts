import * as Linking from 'expo-linking';

import { Routes } from './routes';

export const RouteLinking = {
    // eslint-disable-next-line,@typescript-eslint/no-unsafe-member-access
    prefixes: [Linking.createURL('/')], // Use your custom URL scheme here
    config: {
        screens: {
            [Routes.Home]: 'home',
            [Routes.WindesheimTechRadar]: {
                path: 'wtr-content/:page?',
                parse: {
                    page: (page: string) => page,
                },
            },
            [Routes.WindesheimTechRadarContent]: {
                path: 'wtr-content-content/:page',
                parse: {
                    page: (page: string) => page,
                },
            },
            [Routes.Study]: 'Study',
            [Routes.Settings]: 'settings',
            [Routes.LoadingScreen]: 'LoadingScreen',
        },
    },
};
