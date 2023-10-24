import { HomeScreen } from '../screens/Home';
import { SettingsScreen } from '../screens/Settings/Settings';
import { TestScreen } from '../screens/Test';
import { WTRScreen } from '../screens/WTR';

export enum Routes {
    Home = 'Home',
    Test = 'Test',
    WindesheimTechRadar = 'WindesheimTechRadar',
    Settings = 'Settings',
}

export const screens = [
    { name: Routes.Home, component: HomeScreen },
    { name: Routes.Test, component: TestScreen },
    { name: Routes.WindesheimTechRadar, component: WTRScreen },
    { name: Routes.Settings, component: SettingsScreen },
];
