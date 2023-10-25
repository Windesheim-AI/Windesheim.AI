import React from 'react';

import SplashScreen from './SplashScreen';
import { useAppSelector } from '../../redux/Store';
import { Router } from '../../routes/index';
import { Layout } from '../../screens/_layout';

export default function SplashScreenOrApp() {
    const isSplashVisible: boolean = useAppSelector(
        (state) => state.layout,
    ).isSplashVisible;

    return isSplashVisible ? (
        <SplashScreen />
    ) : (
        <Layout>
            <Router />
        </Layout>
    );
}
