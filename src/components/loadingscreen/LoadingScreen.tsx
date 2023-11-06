/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

import { Background } from '../general/Background';

export const LoadingScreen = () => {
    const styles = StyleSheet.create({
        fullScreenContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 999,
        },
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
        <View style={styles.fullScreenContainer}>
            <Background />
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Image
                    testID="WingAI-logo"
                    source={require('../../assets/images/WingAI_logo_light.png')}
                    style={styles.centerImage}
                />
                <Image
                    testID="windesheim-logo"
                    source={require('../../assets/images/windesheim_logo.png')}
                    style={styles.originalSizeImage}
                />
            </View>
        </View>
    );
};

export default LoadingScreen;
