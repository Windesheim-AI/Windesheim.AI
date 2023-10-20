import { HomeScreen } from '../screens/Home';
import { SettingsScreen } from '../screens/Settings/Settings';
import { ThemeSwitcherScreen } from '../screens/Settings/ThemeSwitcher';
import { TestScreen } from '../screens/Test';
import { WTRScreen } from '../screens/WTR';

export enum Routes {
    Home = 'Home',
    Test = 'Test',
    WindesheimTechRadar = 'WindesheimTechRadar',
    Settings = 'Settings',
    SettingsThemeSwitcher = 'SettingsThemeSwitcher',
}

export const screens = [
    { name: Routes.Home, component: HomeScreen },
    { name: Routes.Test, component: TestScreen },
    { name: Routes.WindesheimTechRadar, component: WTRScreen },
    { name: Routes.Settings, component: SettingsScreen },
    { name: Routes.SettingsThemeSwitcher, component: ThemeSwitcherScreen },
];
