import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { HomeScreen } from '../screens/Home';
import { SettingsScreen } from '../screens/Settings';
import { TestScreen } from '../screens/Test';
import { WTRScreen } from '../screens/WTR';

const Stack = createNativeStackNavigator();

export const Router = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen component={HomeScreen} name="Home" />
            <Stack.Screen component={TestScreen} name="Test" />
            <Stack.Screen component={WTRScreen} name="WTR" />
            <Stack.Screen component={SettingsScreen} name="Settings" />
        </Stack.Navigator>
    );
};
