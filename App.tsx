import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';

import AppLoader from './src/components/loadingscreen/AppLoader';
import SplashScreenOrApp from './src/components/splashscreen/SplashScreenOrApp';
import { store } from './src/redux/Store';
import { RouteLinking } from './src/routes/routeLinking';
import AppProviders from './src/screens/AppProviders';

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer linking={RouteLinking}>
                <AppProviders>
                    <SplashScreenOrApp />
                    <AppLoader />
                </AppProviders>
            </NavigationContainer>
        </Provider>
    );
}
