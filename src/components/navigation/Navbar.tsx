/* eslint-disable indent */
/* eslint-disable complexity */
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Animated, Pressable, StyleSheet, View, Image } from 'react-native';

import {
    useColorConfig,
    useCurrentHighContrastMode,
    useCurrentTheme,
} from '../../lib/constants/Colors';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { useAppSelector } from '../../lib/redux/Hooks';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { navigationBarLinks } from '../../routes/navigation';

export const NavBar = () => {
    const navigation = useNavigation();
    const colors = useColorConfig();
    const isHighContrastEnabled = useCurrentHighContrastMode();

    const navigationState = useAppSelector((state) => state.navigation);
    const theme = useCurrentTheme();

    const statusBarColor = () => {
        return theme === 'light' ? 'dark' : 'light';
    };

    const darkThemeIconStyle = {
        tintColor: '#FFFFFF',
    };

    // For the tap animation
    const [scaleValue] = useState(new Animated.Value(1));

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.9,  // Scale the icon slightly down when pressed
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,  // Reset the scale back to normal
            useNativeDriver: true,
        }).start();
    };

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: colors.navBar.backgroundColor,
            height: 80,  // Navbar height stays the same
            zIndex: 1,
            left: 0,
            right: 0,
            top: 0,
            paddingHorizontal: 20,
            overflow: 'hidden',
            paddingTop: 0,  // Increased the padding to raise the navbar
            paddingBottom: 10,
            borderTopWidth: 0,  // Removed the grey line
            borderBottomWidth: 0,  // No border at the bottom
            borderRadius: 20,  // Rounded corners to match Instagram's navbar
            shadowColor: '#000',  // Subtle shadow for the navbar
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,  // Elevation for Android shadow
        },
        itemContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            paddingVertical: 10,
            position: 'relative',
            overflow: 'hidden',
            width: 60,  // Fixed width for consistency
        },
        icon: {
            width: 28,  // Icon size adjusted to prevent stretching
            height: 28,  // Icon size adjusted to prevent stretching
            tintColor: colors.black,
        },
    });

    function isRouteActive(route: string) {
        return navigationState.selectedNavBarRoute === route;
    }

    return (
        <View style={styles.container}>
            <StatusBar style={statusBarColor()} />
            {navigationBarLinks.map((link) => {
                const routeActive = isRouteActive(link.route);

                return (
                    <Pressable
                        key={link.route}
                        onPressIn={handlePressIn}  // Trigger animation on press in
                        onPressOut={handlePressOut}  // Reset animation on press out
                        onPress={() => {
                            HapticFeedback(HapticForces.Light);
                            navigation.navigate(link.route);
                        }}
                        style={styles.itemContainer}
                        testID={link.route + '-navbar-button'}
                    >
                        <Animated.View
                            style={{
                                transform: [{ scale: scaleValue }],  // Apply animation effect here
                            }}
                        >
                            <Image
                                source={
                                    link.icon === 'home'
                                        ? require('../../assets/images/navbarIcons/Home.png')
                                        : link.icon === 'articles'
                                            ? require('../../assets/images/navbarIcons/Articles.png')
                                            : link.icon === 'quizzes'
                                                ? require('../../assets/images/navbarIcons/Courses.png')
                                                : link.icon === 'prompts'
                                                    ? require('../../assets/images/navbarIcons/Prompts.png')
                                                    : require('../../assets/images/navbarIcons/WindesheimTech.png')
                                }
                                style={[
                                    styles.icon,
                                    !routeActive && theme === 'dark' && darkThemeIconStyle,
                                ]}
                            />
                        </Animated.View>
                    </Pressable>
                );
            })}
        </View>
    );
};
