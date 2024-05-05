import { Routes } from '../../routes/routes';

interface PromptsTutorialStep {
    Title: string;
    Subtext: string;
    NextPage: Routes | string;
    PreviousPage: Routes | string;
}

export const promptsTutorialSteps: PromptsTutorialStep[] = [
    {
        Title: 'Welcome to prompts tutorial !',
        Subtext:
            "This tutorial will explain how to use the prompts and prompts library in the app. Let's get started !",
        NextPage: Routes.PromptLibrary,
        PreviousPage: '',
    },
    {
        Title: 'Prompts Page',
        Subtext:
            'Here, you will find general information about prompts and a collection of prompts prepared for the Prompts Library. You can filter these prompts by categories.',
        NextPage: Routes.MockTutorial,
        PreviousPage: Routes.PromptLibrary,
    },
    {
        Title: 'Prompts',
        Subtext:
            'When you click on the chosen prompt, you will be leading a page that gives description. Also you can copy, paste and try them.',
        NextPage: Routes.MockTutorial,
        PreviousPage: Routes.PromptLibrary,
    },
    {
        Title: 'Finish !',
        Subtext:
            'That was the tutorial! \n You can always follow this tutorial again in the settings. \n Hope you enjoy using the prompts !',
        NextPage: '',
        PreviousPage: Routes.MockTutorial,
    },
];
