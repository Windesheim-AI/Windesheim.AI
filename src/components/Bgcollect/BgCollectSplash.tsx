import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppSelector } from '../../redux/Hooks';
import { Router } from '../../routes';
import FirstCollect from '../../screens/UserBg/FirstCollect';
import { Layout } from '../../screens/_layout';

export default function BgcollectSplash() {
    const layoutState = useAppSelector((state) => state.layout);

    const styles = StyleSheet.create({
        splashScreenAppContainer: {
            display: 'none',
        },
    });

    return layoutState.isSplashVisible ? (
        <>
            <FirstCollect />

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
