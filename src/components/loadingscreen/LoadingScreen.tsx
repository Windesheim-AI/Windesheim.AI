import React from 'react';
import { Platform, View, ActivityIndicator, StyleSheet } from 'react-native';

//@ts-ignore
import LogoBlack from '../../assets/images/Logo_black.svg';
//@ts-ignore
import LogoWin from '../../assets/images/Logo_windesheim.svg';
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
                {Platform.OS !== 'web' ? (
                    <LogoBlack style={styles.centerImage} />
                ) : (
                    // eslint-disable-next-line react-native/no-raw-text
                    <View testID="LogoBlack">..</View>
                )}
                {Platform.OS !== 'web' ? (
                    <LogoWin style={styles.originalSizeImage} />
                ) : (
                    // eslint-disable-next-line react-native/no-raw-text
                    <View testID="LogoWin">..</View>
                )}
            </View>
        </View>
    );
};

export default LoadingScreen;
