import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Routes } from './routes';
import { LoadingScreen } from '../components/loadingscreen/LoadingScreen';
import CourseFinished from '../screens/Course/CourseFinished';
import { Courses } from '../screens/Course/Courses';
import StageOverview from '../screens/Course/StageOverview';
import { HomeScreen } from '../screens/Home';
import { SettingsScreen } from '../screens/Settings/Settings';
import { StudyScreen } from '../screens/Study';
import { CaseStudyInfo } from '../screens/Usecase/CaseStudyInfo';
import { UsecaseScreen } from '../screens/Usecase/Usecase';
import { WTRScreen } from '../screens/WTR/WTR';
import { WTRContentScreen } from '../screens/WTR/WTRContent';
import Stage from '../screens/Course/Stage';

const Stack = createNativeStackNavigator();

const screens = [
    { name: Routes.Home, component: HomeScreen },
    { name: Routes.Study, component: StudyScreen },
    { name: Routes.WindesheimTechRadar, component: WTRScreen },
    { name: Routes.WindesheimTechRadarContent, component: WTRContentScreen },
    { name: Routes.Settings, component: SettingsScreen },
    { name: Routes.LoadingScreen, component: LoadingScreen },
    { name: Routes.Usecase, component: UsecaseScreen },
    { name: Routes.CaseStudyInfo, component: CaseStudyInfo },
    { name: Routes.Stage, component: Stage },
    { name: Routes.CourseFinished, component: CourseFinished },
    { name: Routes.StageOverview, component: StageOverview },
    { name: Routes.Courses, component: Courses },
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
