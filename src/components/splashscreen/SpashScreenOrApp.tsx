import React from 'react';
import { useAppSelector } from '../../redux/Store';
import { Layout } from '../../screens/_layout';
import { Router } from '../../routes/index';
import SplashScreen from './SplashScreen';

export default function SplashScreenOrApp() {
    const isSplashVisible: boolean = useAppSelector((state) => state.layout).isSplashVisible;

    return (
        (isSplashVisible ? <SplashScreen />
            : (
                <Layout>
                    <Router />
                </Layout>
            )
        )
    );
}