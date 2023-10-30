import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Routes } from './routes';
import { HomeScreen } from '../screens/Home';
import { SettingsScreen } from '../screens/Settings/Settings';
import { TestSettingScreen } from '../screens/Settings/TestSetting';
import { StudyScreen } from '../screens/Study';
import { CaseStudyInfo } from '../screens/Usecase/CaseStudyInfo';
import { UsecaseScreen } from '../screens/Usecase/Usecase';
import { WTRScreen } from '../screens/WTR';

const Stack = createNativeStackNavigator();

const screens = [
    { name: Routes.Home, component: HomeScreen },
    { name: Routes.Study, component: StudyScreen },
    { name: Routes.WindesheimTechRadar, component: WTRScreen },
    { name: Routes.Settings, component: SettingsScreen },
    { name: Routes.TestSettings, component: TestSettingScreen },
    { name: Routes.Usecase, component: UsecaseScreen },
    { name: Routes.CaseStudyInfo, component: CaseStudyInfo },
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
