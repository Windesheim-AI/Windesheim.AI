import React from 'react';
import { StyleSheet, View } from 'react-native';

import SplashScreen from './SplashScreen';
import { useAppSelector } from '../../lib/redux/Hooks';
import { Router } from '../../routes';
import { Layout } from '../../screens/_layout';

export default function SplashScreenOrApp() {
    const layoutState = useAppSelector((state) => state.layout);

    const styles = StyleSheet.create({
        splashScreenAppContainer: {
            display: 'none',
        },
    });

    return layoutState.isSplashVisible ? (
        <>
            <SplashScreen />

            <View style={styles.splashScreenAppContainer}>
                <Router />
            </View>
        </>
    ) : (
        <Layout>
            <Router />
        </Layout>
    );
}
