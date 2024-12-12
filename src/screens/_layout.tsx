import { SettingsButton } from '../components/general/buttons/SettingButton';
import React from 'react';
import {
    Image,
    ImageSourcePropType,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import BackgroundCollectForm from './UserBackground/BackgroundCollectForm';
import Favicon from '../assets/images/Icon/favicon.png';
import { NotificationList } from '../components/general/alerts/NotificationList';
import { Background } from '../components/general/background/Background';
import { MenuButton } from '../components/general/buttons/MenuButton';
import { Tutorial } from '../components/tutorial/Tutorial';
import { useColorConfig } from '../lib/constants/Colors';
import { useAppSelector } from '../lib/redux/Hooks';

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        wrapper: {
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            flex: 1,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            paddingBottom: Platform.OS === 'android' ? 50 : 0,
        },
        headerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingHorizontal: 10,
            paddingBottom: 10,
            backgroundColor: colors.backgroundHeader,
            borderBottomWidth: 1,
            borderBottomColor: colors.black,
            height: 70,
            zIndex: 2,
            position: 'relative',
        },
        settingsContainer: {
            position: 'absolute',
            right: 10,
        },
        logoContainer: {
            marginTop: 13,
            flexDirection: 'row',
            alignItems: 'center',
        },
        logo: {
            width: 37,
            height: 37,
            resizeMode: 'contain',
        },
        logoInnerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        logoText: {
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 10,
            color: colors.text,
        },
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
    });

    const isFirstTimeUser = useAppSelector(
        (state) => state.backgroundInformation.isFirstTimeUser,
    );

    return (
        <>
            <Background />
            <SafeAreaView style={styles.wrapper}>
                <NotificationList />
                <View style={styles.headerContainer}>
                    <MenuButton />
                    <View style={styles.logoContainer}>
                        <Image
                            source={Favicon as ImageSourcePropType}
                            style={styles.logo}
                        />
                        <View style={styles.logoInnerContainer}>
                            <Text style={styles.logoText}>WINDESHEIM.AI</Text>
                        </View>
                    </View>
                    <View style={styles.settingsContainer}>
                        <SettingsButton />
                    </View>
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
