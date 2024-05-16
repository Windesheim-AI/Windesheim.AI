import { Routes } from '../../routes/routes';

interface TutorialStep {
    Title: string;
    Subtext: string;
    NextPage: Routes | string;
    PreviousPage: Routes | string;
}

export const tutorialSteps: TutorialStep[] = [
    {
        Title: 'Welcome!',
        Subtext:
            "Welcome to the Windesheim.AI app! This tutorial will explain all of the features in the app and where you can find certain elements. You can also skip this tutorial if you don't find it necessary.",
        NextPage: '',
        PreviousPage: '',
    },
    {
        Title: 'Home Screen',
        Subtext:
            'On the home screen you can find general information, pinned activities and settings button on the right top of the screen.',
        NextPage: Routes.Articles,
        PreviousPage: '',
    },
    {
        Title: 'Podcasts & Articles',
        Subtext:
            'On this screen you can listen  to podcasts and read the articles about Generative AI. They are also divided into different categories: Ethical, Legal, Social, and Technical.',
        NextPage: Routes.Quizzes,
        PreviousPage: Routes.Home,
    },
    {
        Title: 'Courses & Quizzes',
        Subtext:
            'On this screen you can watch the courses about Generative AI. Also you can practice and test yourself with quizzes.',
        NextPage: Routes.PromptLibrary,
        PreviousPage: Routes.Articles,
    },
    {
        Title: 'Prompts',
        Subtext:
            'On this screen you can find prompts to help you with your creative process. You can find a tutorial about how to use them in the settings page.',
        NextPage: Routes.WindesheimTechRadar,
        PreviousPage: Routes.Quizzes,
    },
    {
        Title: 'Windesheim Tech Radar',
        Subtext:
            'On this screen you can browse the Windesheim Tech Radar, which is a collection of the newest trends & innovations in the tech industry. You can also find the latest trends with the biggest tech providers.',
        NextPage: Routes.Home,
        PreviousPage: Routes.PromptLibrary,
    },
    {
        Title: 'Finish!',
        Subtext:
            'That was the tutorial! \n You can always find this tutorial again in the settings. \n Hope you enjoy using the app!',
        NextPage: '',
        PreviousPage: Routes.WindesheimTechRadar,
    },
];
