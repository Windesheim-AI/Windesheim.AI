import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Routes } from './routes';
import { LoadingScreen } from '../components/loadingscreen/LoadingScreen';
import { HomeScreen } from '../screens/Home';
import { SettingsScreen } from '../screens/Settings/Settings';
import { StudyScreen } from '../screens/Study';
import { WTRScreen } from '../screens/WTR/WTR';
import { WTRContentScreen } from '../screens/WTR/WTRContent';

const Stack = createNativeStackNavigator();

const screens = [
    { name: Routes.Home, component: HomeScreen },
    { name: Routes.Study, component: StudyScreen },
    { name: Routes.WindesheimTechRadar, component: WTRScreen },
    { name: Routes.WindesheimTechRadarContent, component: WTRContentScreen },
    { name: Routes.Settings, component: SettingsScreen },
    { name: Routes.LoadingScreen, component: LoadingScreen },
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
