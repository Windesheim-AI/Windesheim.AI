import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';

import { store } from './src/redux/Store';
import { Router } from './src/routes';
import { RouteLinking } from './src/routes/routeLinking';
import { Layout } from './src/screens/_layout';

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer linking={RouteLinking}>
                <Layout>
                    <Router />
                </Layout>
            </NavigationContainer>
        </Provider>
    );
}
