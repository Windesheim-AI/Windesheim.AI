// In your navigation file
import { Routes } from './routes';

// Define NavigationBarLink type with the route type as Routes
export type NavigationBarLink = {
    icon: string;
    route: Routes; // Make sure this is of type Routes
};

export const navigationBarLinks: NavigationBarLink[] = [
    { icon: 'home', route: Routes.Home },
    { icon: 'articles', route: Routes.Articles },
    { icon: 'quizzes', route: Routes.Quizzes },
    { icon: 'prompts', route: Routes.PromptLibrary },
    { icon: 'WTR', route: Routes.WindesheimTechRadar },
    { icon: 'scans', route: Routes.Scans },
];