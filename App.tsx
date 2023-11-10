import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';

import ErrorFallback from './src/components/error/ErrorBoundary';
import AppLoader from './src/components/loadingscreen/AppLoader';
import SplashScreenOrApp from './src/components/splashscreen/SplashScreenOrApp';
import { store } from './src/redux/Store';
import { RouteLinking } from './src/routes/routeLinking';
import AppBehavior from './src/screens/AppBehavior';
import AppProviders from './src/screens/AppProviders';

export default function App() {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Provider store={store}>
                <NavigationContainer linking={RouteLinking}>
                    <AppProviders>
                        <SplashScreenOrApp />
                        <AppLoader />
                    </AppProviders>
                </NavigationContainer>
            </Provider>
        </ErrorBoundary>
    );
}
