import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { useColorConfig } from '../constants/Colors';

export const NavBar = () => {
    const [showNavBar, setShowNavBar] = useState(true);
    const scrollY = new Animated.Value(0);

    const colors = useColorConfig();

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: colors.navBar,
            borderRadius: 50,
            height: 50,
            justifyContent: 'center',
            marginBottom: 10,
            position: 'absolute',
            bottom: 0,
            width: '90%',
            zIndex: 1,
            opacity: scrollY.interpolate({
                inputRange: [0, 50],
                outputRange: [1, 0],
                extrapolate: 'clamp',
            }),
            transform: [
                {
                    translateY: scrollY.interpolate({
                        inputRange: [0, 50],
                        outputRange: [0, -50],
                        extrapolate: 'clamp',
                    }),
                },
            ],
        },
    });


    return (
        <Animated.View style={styles.container}>
            <Text>NavBar</Text>
        </Animated.View>
    );
};