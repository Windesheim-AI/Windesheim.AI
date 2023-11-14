import { Routes } from '../routes/routes';

export const tutorialData = [
    {
        Title: 'WingAI Tutorial',
        Subtext:
            "Welcome to the WingAI app! This tutorial will explain all of the features in the app and where you can find certain elements. You can also skip this tutorial if you don't find it necessary.",
        NextPage: '',
    },
    {
        Title: 'WTR Themes',
        Subtext:
            'In this section you can find the different Windesheim TechRadar themes. Where you can find more information about the themes that are currently relevant in the IT world.',
        NextPage: '',
    },
    {
        Title: 'WTR Providers',
        Subtext:
            'In this section you can find the different providers from the Windesheim TechRadar.',
        NextPage: Routes.WindesheimTechRadar,
    },
    {
        Title: 'Windesheim TechRadar',
        Subtext:
            'On this page you can scroll through the Windesheim TechRadar.',
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
