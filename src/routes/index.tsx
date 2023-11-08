import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Routes } from './routes';
import { HomeScreen } from '../screens/Home';
import { SettingsScreen } from '../screens/Settings/Settings';
import { StudyScreen } from '../screens/Study';
import { TestScreen } from '../screens/Test';
import { CaseStudyInfo } from '../screens/Usecase/CaseStudyInfo';
import { UsecaseScreen } from '../screens/Usecase/Usecase';
import { WTRScreen } from '../screens/WTR/WTR';
import { WTRContentScreen } from '../screens/WTR/WTRContent';
import CoursePage from '../screens/Course/Course';
import CourseFinished from '../screens/Course/CourseFinished';
import CourseOverview from '../screens/Course/CourseOverview';

const Stack = createNativeStackNavigator();

const screens = [
    { name: Routes.Home, component: HomeScreen },
    { name: Routes.Study, component: StudyScreen },
    { name: Routes.Test, component: TestScreen },
    { name: Routes.WindesheimTechRadar, component: WTRScreen },
    { name: Routes.WindesheimTechRadarContent, component: WTRContentScreen },
    { name: Routes.Settings, component: SettingsScreen },
    { name: Routes.Usecase, component: UsecaseScreen },
    { name: Routes.CaseStudyInfo, component: CaseStudyInfo },
    { name: Routes.Course, component: CoursePage },
    { name: Routes.CourseFinished, component: CourseFinished },
    { name: Routes.CourseOverview, component: CourseOverview },
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
