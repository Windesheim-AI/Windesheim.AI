import * as Linking from 'expo-linking';

import { Routes } from './routes';

export const RouteLinking = {
    // eslint-disable-next-line,@typescript-eslint/no-unsafe-member-access
    prefixes: [Linking.createURL('/')], // Use your custom URL scheme here
    config: {
        screens: {
            [Routes.Home]: 'home',
            [Routes.Test]: 'test',
            [Routes.WindesheimTechRadar]: 'wtr',
            [Routes.Settings]: 'settings',
            [Routes.LanguageSettings]: 'settings/language',
        },
    },
};
