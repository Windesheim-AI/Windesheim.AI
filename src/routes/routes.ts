import { HomeScreen } from '../screens/Home';
import { SettingsScreen } from '../screens/Settings/Settings';
import { TestScreen } from '../screens/Test';
import { WTRScreen } from '../screens/WTR';

export const routes = {
    HOME: 'Home',
    TEST: 'Test',
    WTR: 'WTR',
    SETTINGS: 'Settings',
};

export const screens = [
    { name: routes.HOME, component: HomeScreen },
    { name: routes.TEST, component: TestScreen },
    { name: routes.WTR, component: WTRScreen },
    { name: routes.SETTINGS, component: SettingsScreen },
];
