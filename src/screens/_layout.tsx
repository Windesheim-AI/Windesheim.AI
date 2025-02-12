import React from 'react';
import {
    Platform,
    StatusBar,
    StyleSheet,
    View,
    Image,
    Text,
    ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackgroundCollectForm from './UserBackground/BackgroundCollectForm';
import Favicon from '../assets/images/Icon/favicon.png';
import { NotificationList } from '../components/general/alerts/NotificationList';
import { Background } from '../components/general/background/Background';
import { MenuButton } from '../components/general/buttons/MenuButton';
import { Tutorial } from '../components/tutorial/Tutorial';
import { useColorConfig, useCurrentTheme } from '../lib/constants/Colors';
import { useAppSelector } from '../lib/redux/Hooks';

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    const colors = useColorConfig();
    const currentTheme = useCurrentTheme();
    const logoTextColor = currentTheme === 'dark' ? '#FFFFFF' : 'black';

    const isFirstTimeUser = useAppSelector(
        (state) => state.backgroundInformation.isFirstTimeUser,
    );

    const styles = StyleSheet.create({
        contentContainer: {
            borderRadius: 15,
            flex: 1,
            margin: 10,
            overflow: 'hidden',
        },
        innerContainer: {
            backgroundColor: colors.background,
            height: '100%',
        },
        wrapper: {
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            flex: 1,
        },
        headerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 10,
            paddingBottom: 10,
            backgroundColor: colors.backgroundHeader,
            borderBottomWidth: 1,
            borderBottomColor: colors.black,
            height: 70,
            zIndex: 2,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Account for status bar height on Android
        },
        logo: {
            width: 37,
            height: 37,
            resizeMode: 'contain',
        },
        logoText: {
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 10,
            color: logoTextColor,
        },
        logoContainer: { flexDirection: 'row', alignItems: 'center' },
        safeAreaWrapper: {
            flex: 1,
            backgroundColor: colors.background,
        },
    });

    return (
        <>
            <Background />
            <SafeAreaView style={styles.safeAreaWrapper}>
                <NotificationList />

                <View style={styles.headerContainer}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={Favicon as ImageSourcePropType}
                            style={styles.logo}
                        />
                        <Text style={styles.logoText}>WINDESHEIM.AI</Text>
                    </View>

                    <MenuButton />
                </View>

                <View style={styles.contentContainer}>
                    {isFirstTimeUser ? <BackgroundCollectForm /> : null}
                    {!isFirstTimeUser ? (
                        <>
                            <View style={styles.innerContainer}>
                                {children}
                            </View>
                            <Tutorial />
                        </>
                    ) : null}
                </View>
            </SafeAreaView>
        </>
    );
};