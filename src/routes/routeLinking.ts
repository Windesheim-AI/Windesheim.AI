import * as Linking from 'expo-linking';

import { Routes } from './routes';

export const RouteLinking = {
    // eslint-disable-next-line,@typescript-eslint/no-unsafe-member-access
    prefixes: [Linking.createURL('/')], // Use your custom URL scheme here
    config: {
        screens: {
            [Routes.Home]: 'home',
            [Routes.Test]: 'test',
            [Routes.WindesheimTechRadar]: {
                path: 'wtr/:page?',
                parse: {
                    page: (page: string) => page,
                },
            },
            [Routes.WindesheimTechRadarContent]: {
                path: 'wtr/view/:page',
                parse: {
                    page: (page: string) => page,
                },
            },
            [Routes.Study]: 'Study',
            [Routes.Settings]: 'settings',
            [Routes.Usecase]: 'Usecase',
            [Routes.CaseStudyInfo]: 'CaseStudyInfo',
            [Routes.Course]: {
                path: 'course/:courseId/:stageId',
                parse: {
                    courseId: (courseId: string) => courseId,
                    stageId: (stageId: string) => stageId,
                },
            },
        },
    },
};
