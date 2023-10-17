import React from 'react';
import { Provider } from 'react-redux';

import { store } from './src/redux/Store';
import { Router } from './src/routes';
import { Layout } from './src/screens/_layout';

export default function App() {
    return (
        <Provider store={store}>
            <Layout>
                <Router />
            </Layout>
        </Provider>
    );
}
