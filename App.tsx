import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';

import { store } from './src/redux/Store';
import { Router } from './src/routes';
import { Layout } from './src/screens/_layout';

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Layout>
                    <Router />
                </Layout>
            </NavigationContainer>
        </Provider>
    );
}
