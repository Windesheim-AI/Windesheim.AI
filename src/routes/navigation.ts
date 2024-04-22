import { Routes } from './routes';

export type NavigationBarLink = {
    icon: string;
    route: string;
};

export const navigationBarLinks: NavigationBarLink[] = [
    { icon: 'home', route: Routes.Home },
    { icon: 'articles', route: Routes.Articles },
    { icon: 'quizzes', route: Routes.Quizzes },
    { icon: 'prompts', route: Routes.Study },
    { icon: 'WTR', route: Routes.WindesheimTechRadar },
];
