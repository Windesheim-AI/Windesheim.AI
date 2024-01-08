import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';
import './src/lib/translations/i18n'; // Required import to enable translations

// @ts-ignore
import * as Sentry from '@sentry/react-native';

import ErrorFallback from './src/components/general/error/ErrorBoundary';
import AppLoader from './src/components/loadingscreen/AppLoader';
import WhNavigationContainer from './src/components/navigation/WhNavigationContainer';
import SplashScreenOrApp from './src/components/splashscreen/SplashScreenOrApp';
import { store } from './src/lib/redux/Store';
import { getEnvValue } from './src/lib/utility/env/env';
import { EnvOptions } from './src/lib/utility/env/env.values';
import AppProviders from './src/providers/AppProviders';

Sentry.init({
    dsn: getEnvValue(EnvOptions.SentryDsn),
});

export default function App() {
    Sentry.captureMessage('Mobile app started!');

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
