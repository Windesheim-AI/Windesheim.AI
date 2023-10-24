import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Routes } from './routes';
import { HomeScreen } from '../screens/Home';
import { DataScreen } from '../screens/Settings/Data';
import { LanguageScreen } from '../screens/Settings/Language';
import { SettingsScreen } from '../screens/Settings/Settings';
import { TestScreen } from '../screens/Test';
import { WTRScreen } from '../screens/WTR';

const Stack = createNativeStackNavigator();

const screens = [
    { name: Routes.Home, component: HomeScreen },
    { name: Routes.Test, component: TestScreen },
    { name: Routes.WindesheimTechRadar, component: WTRScreen },
    { name: Routes.Settings, component: SettingsScreen },
    { name: Routes.DataSettings, component: DataScreen },
    { name: Routes.LanguageSettings, component: LanguageScreen },
];

export const Router = () => {
    return (
        <Stack.Navigator
            initialRouteName={Routes.Home}
            screenOptions={{
                headerShown: false,
            }}
        >
            {screens.map((screen) => (
                <Stack.Screen
                    key={screen.name}
                    name={screen.name}
                    component={screen.component}
                />
            ))}
        </Stack.Navigator>
    );
};
