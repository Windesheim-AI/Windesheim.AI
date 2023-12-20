import React from 'react';
import './src/lib/translations/i18n'; // Required import to enable translations
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';

import ErrorFallback from './src/components/general/error/ErrorBoundary';
import AppLoader from './src/components/loadingscreen/AppLoader';
import WhNavigationContainer from './src/components/navigation/WhNavigationContainer';
import SplashScreenOrApp from './src/components/splashscreen/SplashScreenOrApp';
import { store } from './src/lib/redux/Store';
import AppProviders from './src/providers/AppProviders';

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
