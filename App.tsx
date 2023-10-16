import React from 'react';
import { Router } from './src/routes';
import { Layout } from './src/screens/_layout';

export default function App() {
    return (
        <Layout>
            <Router />
        </Layout>
    );
}
