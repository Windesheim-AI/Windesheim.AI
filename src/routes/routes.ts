import { HomeScreen } from '../screens/Home';
import { DataScreen } from '../screens/Settings/Data';
import { LanguageScreen } from '../screens/Settings/Language';
import { SettingsScreen } from '../screens/Settings/Settings';
import { TestScreen } from '../screens/Test';
import { WTRScreen } from '../screens/WTR';

export enum Routes {
    Home = 'Home',
    Test = 'Test',
    WindesheimTechRadar = 'WindesheimTechRadar',
    Settings = 'Settings',
    SettingsThemeSwitcher = 'SettingsThemeSwitcher',
    DataSettings = 'DataSettings',
    LanguageSettings = 'LanguageSettings',
}

export const screens = [
    { name: Routes.Home, component: HomeScreen },
    { name: Routes.Test, component: TestScreen },
    { name: Routes.WindesheimTechRadar, component: WTRScreen },
    { name: Routes.Settings, component: SettingsScreen },
    { name: Routes.SettingsThemeSwitcher, component: ThemeSwitcherScreen },
    { name: Routes.DataSettings, component: DataScreen },
    { name: Routes.LanguageSettings, component: LanguageScreen },
];
