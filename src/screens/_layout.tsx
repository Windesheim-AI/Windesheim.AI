/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
import { Animated, View, StyleSheet, Platform } from 'react-native';

import { Background } from '../components/Background';
import { NavBar } from '../components/Navbar';
import { store } from '../redux/Store';
import { useAppSelector } from '../redux/Hooks';
import { NavigationSlice } from '../redux/NavigationSlice';

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    const navigation = useAppSelector(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
        (state) => state.navigation,
    ) as NavigationSlice;

    const styles = StyleSheet.create({
        contentContainer: {
            borderRadius: 15,
            flex: 1,
            margin: 20,
            marginTop: 40,
            overflow: 'hidden',
        },
        innerContainer: {
            flex: 1,
        },
        wrapper: {
            flex: 1,
            overflow: 'hidden',
        },
    });

    const [marginBottomAnimation] = useState(new Animated.Value(20));
    const [marginBottomState, setMarginBottomState] = useState(70);

    useEffect(() => {
        Animated.timing(marginBottomAnimation, {
            toValue: marginBottomState,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [marginBottomState]);

    useEffect(() => {
        setMarginBottomState(navigation.showNavBar ? 70 : 20);
    }, [navigation]);

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
