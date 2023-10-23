import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Routes, screens } from './routes';

const Stack = createNativeStackNavigator();

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
