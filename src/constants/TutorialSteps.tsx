import { Routes } from '../routes/routes';

interface TutorialStep {
    Title: string;
    Subtext: string;
    NextPage: Routes | string;
}

export const tutorialSteps: TutorialStep[] = [
    {
        Title: 'Welcome!',
        Subtext:
            "Welcome to the WingAI app! This tutorial will explain all of the features in the app and where you can find certain elements. You can also skip this tutorial if you don't find it necessary.",
        NextPage: '',
    },
    {
        Title: 'Home Screen',
        Subtext:
            'On the home screen you can find the latest news relating to AI technology, as well as a quick link to the Windesheim TechRadar.',
        NextPage: Routes.WindesheimTechRadar,
    },
    {
        Title: 'Windesheim Tech Radar',
        Subtext:
            'On this screen you can browse the Windesheim Tech Radar, which is a collection of the newest trends & innovations in the tech industry. You can also find the latest trends with the biggest tech providers.',
        NextPage: Routes.Study,
    },
    {
        Title: 'Study',
        Subtext:
            'Here is where you can practice, learn, and share your knowledge about Generative AI.',
        NextPage: Routes.Settings,
    },
    {
        Title: 'Settings',
        Subtext:
            'Here is where you can change the settings of the app. Like: Dark mode, Language, and more.',
        NextPage: Routes.Home,
    },
    {
        Title: 'Finish!',
        Subtext:
            'That was the tutorial! \n You can always find this tutorial again in the settings. \n Hope you enjoy using the app!',
        NextPage: Routes.Home,
    },
];
