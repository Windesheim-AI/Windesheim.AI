import React from 'react';
import { StyleSheet, View } from 'react-native';

import SplashScreen from './SplashScreen';
import { RootState, useAppSelector } from '../../redux/Store';
import { Router } from '../../routes';
import { Layout } from '../../screens/_layout';

export default function SplashScreenOrApp() {
    const layoutState = useAppSelector((state: RootState) => state.layout);

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
