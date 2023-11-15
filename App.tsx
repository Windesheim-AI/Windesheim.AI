import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';

import ErrorFallback from './src/components/general/error/ErrorBoundary';
import AppLoader from './src/components/loadingscreen/AppLoader';
import SplashScreenOrApp from './src/components/splashscreen/SplashScreenOrApp';
import { store } from './src/redux/Store';
import { RouteLinking } from './src/routes/routeLinking';
import AppProviders from './src/screens/AppProviders';
import AppBehavior from './src/screens/AppBehavior';

export default function App() {
    // @ts-ignore
    if (window.Cypress) {
        // @ts-ignore
        window.store = store;
    }

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Provider store={store}>
                <NavigationContainer linking={RouteLinking}>
                    <AppProviders>
                        <AppBehavior>
                            <SplashScreenOrApp />
                            <AppLoader />
                        </AppBehavior>
                    </AppProviders>
                </NavigationContainer>
            </Provider>
        </ErrorBoundary>
    );
}
