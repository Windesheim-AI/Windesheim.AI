import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';
import './src/lib/translations/i18n'; // Required import to enable translations

import * as Sentry from '@sentry/react-native';
import ErrorFallback from './src/components/general/error/ErrorBoundary';
import AppLoader from './src/components/loadingscreen/AppLoader';
import WhNavigationContainer from './src/components/navigation/WhNavigationContainer';
import SplashScreenOrApp from './src/components/splashscreen/SplashScreenOrApp';
import { store } from './src/lib/redux/Store';
import AppProviders from './src/providers/AppProviders';

Sentry.init({
    dsn: 'https://0c858c0fb3560e47e20b685b2dded9c9@o4506535705772032.ingest.sentry.io/4506535711080448',
});

export default function App() {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Provider store={store}>
                <WhNavigationContainer>
                    <AppProviders>
                        <SplashScreenOrApp />
                        <AppLoader />
                    </AppProviders>
                </WhNavigationContainer>
            </Provider>
        </ErrorBoundary>
    );
}
