import React, { useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

import { Background } from '../components/Background';
import { NavBar } from '../components/Navbar';
import { useColorConfig } from '../constants/Colors';
import { useAnimatedValue } from '../lib/utility/animate';
import { useAppSelector } from '../redux/Hooks';

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    const colors = useColorConfig();
    const navigation = useAppSelector((state) => state.navigation);

    const styles = StyleSheet.create({
        contentContainer: {
            borderRadius: 15,
            flex: 1,
            margin: 20,
            marginTop: 60,
            overflow: 'hidden',
        },
        innerContainer: {
            backgroundColor: colors.background,
            flex: 1,
        },
        wrapper: {
            flex: 1,
            overflow: 'hidden',
        },
    });

    const [marginBottomAnimation, animateMarginBottomAnimation] =
        useAnimatedValue(20);

    useEffect(() => {
        animateMarginBottomAnimation(navigation.showNavBar ? 90 : 20, 200);
    }, [animateMarginBottomAnimation, navigation]);

    return (
        <>
            <Background />
            <View style={styles.wrapper}>
                <Animated.View // Use Animated.View here
                    style={{
                        ...styles.contentContainer,
                        marginBottom: marginBottomAnimation,
                    }}
                >
                    <View style={styles.innerContainer}>{children}</View>
                </Animated.View>
                <NavBar />
            </View>
        </>
    );
};
