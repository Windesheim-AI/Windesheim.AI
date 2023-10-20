import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { routes, screens } from './routes';

const Stack = createNativeStackNavigator();

export const Router = () => {
    return (
        <Stack.Navigator
            initialRouteName={routes.HOME}
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
