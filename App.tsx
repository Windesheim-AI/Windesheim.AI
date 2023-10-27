import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';

import AppLoader from './src/components/loadingscreen/AppLoader';
import { store } from './src/redux/Store';
import { RouteLinking } from './src/routes/routeLinking';

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer linking={RouteLinking}>
                <AppLoader />
            </NavigationContainer>
        </Provider>
    );
}
