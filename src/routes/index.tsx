import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { DefaultRoute, Routes } from './routes';
import { LoadingScreen } from '../components/loadingscreen/LoadingScreen';
import { useAppSelector } from '../lib/redux/Hooks';
import CourseFinished from '../screens/Course/CourseFinished';
import { Courses } from '../screens/Course/Courses';
import Stage from '../screens/Course/Stage';
import StageOverview from '../screens/Course/StageOverview';
import { HomeScreen } from '../screens/Home';
import { PromptLibrary } from '../screens/PromptLibrary/PromptLibrary';
import { PromptView } from '../screens/PromptLibrary/PromptView';
import { SettingsScreen } from '../screens/Settings';
import { StudyScreen } from '../screens/Study';
import { CaseStudyInfo } from '../screens/Usecase/CaseStudyInfo';
import { UsecaseScreen } from '../screens/Usecase/Usecase';
import BackgroundCollectForm from '../screens/UserBackground/BackgroundCollectForm';
import { BackgroundInfo } from '../screens/UserBackground/BackgroundInfo';
import { WTRScreen } from '../screens/WTR';
import { Articles } from '../screens/WTR/Articles';
import { Quizzes } from '../screens/WTR/Quizzes';
import { WTRContentScreen } from '../screens/WTR/WTRContent';

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
    { name: Routes.CourseStage, component: Stage },
    { name: Routes.CourseFinished, component: CourseFinished },
    { name: Routes.StageOverview, component: StageOverview },
    { name: Routes.Courses, component: Courses },
    { name: Routes.EditBackgroundInformation, component: BackgroundInfo },
    { name: Routes.FirstTimeUser, component: BackgroundCollectForm },
    { name: Routes.PromptLibrary, component: PromptLibrary },
    { name: Routes.PromptView, component: PromptView },
    { name: Routes.Articles, component: Articles },
    { name: Routes.Quizzes, component: Quizzes },
];

export const Router = () => {
    const animationState = useAppSelector((state) => state.animation); // You need to add animation state to your redux store
    return (
        <Stack.Navigator
            initialRouteName={DefaultRoute}
            screenOptions={{
                headerShown: false,
                animation: animationState.isEnabled ? 'default' : 'none',
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
