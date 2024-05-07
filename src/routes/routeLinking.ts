import * as Linking from 'expo-linking';

import { Routes } from './routes';

export const RouteLinking = {
    prefixes: [Linking.createURL('/')],
    config: {
        screens: {
            [Routes.Home]: 'home',
            [Routes.WindesheimTechRadar]: 'wtr-content',
            [Routes.WindesheimTechRadarContent]: {
                path: 'wtr-content/:page',
                parse: {
                    page: (page: string) => page,
                },
            },
            [Routes.Study]: 'study',
            [Routes.Settings]: 'settings',
            [Routes.Usecase]: 'use-cases',
            [Routes.CaseStudyInfo]: 'case-studies',
            [Routes.CourseFinished]: {
                path: 'study/courses/:courseId/finished',
                parse: {
                    courseId: (courseId: string) => courseId,
                },
            },
            [Routes.StageOverview]: {
                path: 'study/courses/:courseId/overview',
                parse: {
                    courseId: (courseId: string) => courseId,
                },
            },
            [Routes.CourseStage]: {
                path: 'study/courses/:courseId/:stageId',
                parse: {
                    courseId: (courseId: string) => courseId,
                    stageId: (stageId: string) => stageId,
                },
            },
            [Routes.Courses]: 'study/courses',
            [Routes.LoadingScreen]: 'app/loading-screen',
            [Routes.FirstTimeUser]: 'app/first-time-user',
            [Routes.EditBackgroundInformation]:
                'settings/edit-background-information',
            [Routes.PromptLibrary]: 'study/prompt-library',
            [Routes.PromptView]: 'study/prompt-library/prompt',
            [Routes.Quizzes]: 'quizzes',
            [Routes.Articles]: 'articles',
            [Routes.PodcastsEpisodePage]: 'podcasts/episode',
        },
    },
};
