/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

import { appConfig } from '../../../app.config';
import { Routes } from '../../routes/routes';
import { Background } from '../general/Background';

export const LoadingScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        // Simulate a delay while loading the app
        setTimeout(() => {
            // Navigate to the main app screen
            navigation.navigate(Routes.Home as never);
        }, appConfig.splashScreenTime);
    }, [navigation]); // Include dispatch and navigation in the dependencies array

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        centerImage: {
            width: 275,
            height: 200,
            resizeMode: 'contain',
        },
        originalSizeImage: {
            width: 200,
            height: 100,
            resizeMode: 'contain',
        },
    });

    return (
        <>
            <Background />
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Image
                    testID="winsight-logo"
                    source={require('../../assets/images/WINsight_logo_light.png')}
                    style={styles.centerImage}
                />
                <Image
                    testID="windesheim-logo"
                    source={require('../../assets/images/windesheim_logo.png')}
                    style={styles.originalSizeImage}
                />
            </View>
        </>
    );
};

export default LoadingScreen;
