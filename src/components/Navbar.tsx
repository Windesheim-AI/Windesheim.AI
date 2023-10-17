import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Animated, Dimensions } from 'react-native';

import { useColorConfig } from '../constants/Colors';
import { useAnimatedValue } from '../lib/utility/animate';
import { useAppSelector } from '../redux/Hooks';
import { RootState } from '../redux/Store';

export const NavBar = () => {
    const [showNavBar, setShowNavBar] = useState(true);

    const navigation = useAppSelector((state: RootState) => state.navigation);

    const colors = useColorConfig();
    const screenWidth = Dimensions.get('window').width;
    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: colors.navBar,
            borderRadius: 50,
            bottom: 0,
            height: 50,
            justifyContent: 'center',
            marginBottom: 10,
            position: 'absolute',
            width: screenWidth - 40,
            zIndex: 1,
        },
    });

    useEffect(() => {
        setShowNavBar(navigation.showNavBar);
    }, [navigation]);

    const [opacity, animateOpacity] = useAnimatedValue(1);
    const [bottom, animateBottom] = useAnimatedValue(screenWidth - 40);
    const [width, animateWidth] = useAnimatedValue(screenWidth - 40);

    useEffect(() => {
        animateOpacity(showNavBar ? 1 : 0, 200);
        animateBottom(showNavBar ? 20 : -100, 200);
        animateWidth(showNavBar ? screenWidth - 40 : 0, 200);
    }, [showNavBar, animateOpacity, animateBottom, animateWidth, screenWidth]);

    return (
        <Animated.View style={{ ...styles.container, opacity, bottom, width }}>
            <Text>NavBar</Text>
        </Animated.View>
    );
};
