import { Routes } from './routes';

export type NavigationBarLink = {
    icon: string;
    route: string;
};

export const navigationBarLinks: NavigationBarLink[] = [
    { icon: 'home', route: Routes.Home },
    { icon: 'search', route: Routes.WindesheimTechRadar },
    { icon: 'graduation-cap', route: Routes.Study },
    { icon: 'cog', route: Routes.Settings },
];
