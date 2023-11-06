import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Platform, View, StyleSheet } from 'react-native';

import { appConfig } from '../../../app.config';
//@ts-ignore
import LogoBlack from '../../assets/images/Logo_black.svg';
//@ts-ignore
import LogoWin from '../../assets/images/Logo_windesheim.svg';
import { useAppDispatch } from '../../redux/Hooks';
import { hideSplashScreen } from '../../redux/slices/LayoutSlice';
import { Routes } from '../../routes/routes';
import { Background } from '../general/Background';

export const SplashScreen = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Simulate a delay while loading the app
        setTimeout(() => {
            // Dispatch the action to hide the splash screen and change the state
            dispatch(hideSplashScreen());
            // Navigate to the main app screen
            navigation.navigate(Routes.Home as never);
        }, appConfig.splashScreenTime);
    }, [dispatch, navigation]); // Include dispatch and navigation in the dependencies array

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
        </>
    );
};

export default SplashScreen;
