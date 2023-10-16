/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { Router } from './src/routes';
import { Layout } from './src/screens/_layout';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';

export default function App() {
    return (
        <Provider store={store}>
            <Layout>
                <Router />
            </Layout>
        </Provider>
    );
}
