import { Routes } from './routes';

export type NavigationBarLink = {
    icon: string;
    route: string;
};

export const navigationBarLinks: NavigationBarLink[] = [
    { icon: 'home', route: Routes.Home },
    { icon: 'articles', route: Routes.Articles },
    { icon: 'quizzes', route: Routes.Quizhome },
    { icon: 'prompts', route: Routes.PromptLibrary },
    // { icon: 'WTR', route: Routes.WindesheimTechRadar },
    { icon: 'chatbot', route: Routes.ChatbotScreen },
];
