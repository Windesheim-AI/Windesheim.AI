import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

import BackgroundCollectForm from './UserBackground/BackgroundCollectForm';
import { NotificationList } from '../components/general/alerts/NotificationList';
import { Background } from '../components/general/background/Background';
import { NavBar } from '../components/navigation/Navbar';
import { Tutorial } from '../components/tutorial/Tutorial';
import { shadow, useColorConfig } from '../lib/constants/Colors';
import { useAppSelector } from '../lib/redux/Hooks';

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    const navigation = useAppSelector((state) => state.navigation);
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        contentContainer: {
            borderRadius: 15,
            flex: 1,
            margin: 10,
            overflow: 'hidden',
            ...shadow,
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
        navbarContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1, // Navbar'ın içeriğinin diğer bileşenlerin üzerine çıkmasını sağlar
        },
        navbarPlaceholder: {
            height: 50, // Navbar'ın yüksekliğiyle aynı olmalıdır
        },
    });

    const isFirstTimeUser = useAppSelector(
        (state) => state.backgroundInformation.isFirstTimeUser
    );

    return (
        <>
            <Background />
            <SafeAreaView style={styles.wrapper}>
                <NotificationList />
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
                {/* Navbar'ı alt kısıma yapışık hale getirme */}
                <View style={styles.navbarContainer}>
                    <NavBar />
                </View>
                {/* Navbar'ın altındaki boşluğu kaplayacak View */}
                <View style={styles.navbarPlaceholder} />
            </SafeAreaView>
        </>
    );
};
