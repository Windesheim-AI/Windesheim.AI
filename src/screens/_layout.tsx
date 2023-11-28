import React, { useEffect } from 'react';
import {
    Animated,
    View,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
} from 'react-native';

import BackgroundCollectForm from './UserBackground/BackgroundCollectForm';
import { NotificationList } from '../components/general/alerts/NotificationList';
import { Background } from '../components/general/background/Background';
import { NavBar } from '../components/navigation/Navbar';
import { Tutorial } from '../components/tutorial/Tutorial';
import { useColorConfig, shadow } from '../constants/Colors';
import { useAnimatedValue } from '../lib/utility/animate';
import { useAppSelector } from '../redux/Hooks';

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
        pos_r: {
            position: 'relative',
            marginTop: navigation.showNavBar ? 50 : 0,
        },
        wrapper: {
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            flex: 1,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        },
    });

    const isFirstTimeUser = useAppSelector(
        (state) => state.bgCollect,
    ).isFirstTimeUser;

    const [marginBottomAnimation, animateMarginBottomAnimation] =
        useAnimatedValue(20);

    useEffect(() => {
        animateMarginBottomAnimation(navigation.showNavBar ? 70 : 10, 200);
    }, [animateMarginBottomAnimation, navigation]);

    return (
        <>
            <Background />
            <SafeAreaView style={styles.wrapper}>
                <NotificationList />
                <Animated.View // Use Animated.View here
                    style={{
                        ...styles.contentContainer,
                        marginBottom: marginBottomAnimation,
                    }}
                >
                    {isFirstTimeUser ? <BackgroundCollectForm /> : null}
                    {!isFirstTimeUser ? (
                        <>
                            <View style={styles.innerContainer}>
                                {children}
                            </View>
                            <Tutorial />
                        </>
                    ) : null}
                </Animated.View>
                <View style={styles.pos_r}>
                    <NavBar />
                </View>
            </SafeAreaView>
        </>
    );
};
