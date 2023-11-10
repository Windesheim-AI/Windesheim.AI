import React, { useEffect } from 'react';
import {
    Animated,
    View,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
} from 'react-native';

import { Background } from '../components/general/Background';
import { NavBar } from '../components/navigation/Navbar';
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

    const [marginBottomAnimation, animateMarginBottomAnimation] =
        useAnimatedValue(20);

    useEffect(() => {
        animateMarginBottomAnimation(navigation.showNavBar ? 70 : 10, 200);
    }, [animateMarginBottomAnimation, navigation]);

    return (
        <React.StrictMode>
            <Background />
            <SafeAreaView style={styles.wrapper}>
                <Animated.View // Use Animated.View here
                    style={{
                        ...styles.contentContainer,
                        marginBottom: marginBottomAnimation,
                    }}
                >
                    <View style={styles.innerContainer}>{children}</View>
                </Animated.View>
                <View style={styles.pos_r}>
                    <NavBar />
                </View>
            </SafeAreaView>
        </React.StrictMode>
    );
};
