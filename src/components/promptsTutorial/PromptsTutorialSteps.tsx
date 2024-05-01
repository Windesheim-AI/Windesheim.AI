import { Routes } from '../../routes/routes';

interface PromptsTutorialStep {
    Title: string;
    Subtext: string;
    NextPage: Routes | string;
    PreviousPage: Routes | string;
}

export const promptsTutorialSteps: PromptsTutorialStep[] = [
    {
        Title: 'Welcome!',
        Subtext:
            "Welcome to the prompts tutorial. This tutorial will explain all of the features in the app and where you can find certain elements. You can also skip this tutorial if you don't find it necessary.",
        NextPage: Routes.PromptLibrary,
        PreviousPage: '',
    },
    {
        Title: 'Prompts Tutorial',
        Subtext:
            'On the home screen you can find general information, pinned activities and settings button on the right top of the screen.', //changed
        NextPage: Routes.PromptLibrary,
        PreviousPage: Routes.PromptLibrary,
    },
    {
        Title: 'Prompts Tutorial',
        Subtext:
            'On the home screen you can find general information, pinned activities and settings button on the right top of the screen.', //changed
        NextPage: Routes.PromptLibrary,
        PreviousPage: Routes.PromptLibrary,
    },
    {
        Title: 'Prompts Tutorial',
        Subtext:
            'On the home screen you can find general information, pinned activities and settings button on the right top of the screen.', //changed
        NextPage: Routes.PromptLibrary,
        PreviousPage: Routes.PromptLibrary,
    },
];
