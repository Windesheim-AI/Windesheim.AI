import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../screens/Home';
import { TestScreen } from '../screens/Test';
import { WTRScreen } from '../screens/WTR';

const Stack = createNativeStackNavigator();

export const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen component={HomeScreen} name="Home" />
                <Stack.Screen component={TestScreen} name="Test" />
                <Stack.Screen component={WTRScreen} name="WTR" />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
