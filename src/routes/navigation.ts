// In your navigation file
import { Routes } from './routes';

// Define NavigationBarLink type with the route type as Routes
export type NavigationBarLink = {
    icon: string;
    route: Routes; // Make sure this is of type Routes
};

export const navigationBarLinks: NavigationBarLink[] = [
    { icon: 'Home', route: Routes.Home },
    { icon: 'Articles', route: Routes.Articles },
    { icon: 'Quizzes', route: Routes.Quizzes },
    { icon: 'Prompts', route: Routes.PromptLibrary },
    { icon: 'WTR', route: Routes.WindesheimTechRadar },
    { icon: 'Scans', route: Routes.Scans },
];
