import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/lib/redux/Store';
import AppProviders from './src/providers/AppProviders';
import WhNavigationContainer from './src/components/navigation/WhNavigationContainer';
import ErrorBoundary from 'react-native-error-boundary';
import ErrorFallback from './src/components/general/error/ErrorBoundary';
import AppLoader from './src/components/loadingscreen/AppLoader';

export default function App() {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Provider store={store}>
                {/* ✅ Wrap everything with NavigationContainer */}
                <NavigationContainer>
                    <AppProviders>
                        <WhNavigationContainer>
                            <AppLoader />
                        </WhNavigationContainer>
                    </AppProviders>
                </NavigationContainer>
            </Provider>
        </ErrorBoundary>
    );
}
