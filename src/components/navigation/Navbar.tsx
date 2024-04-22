/* eslint-disable indent */
/* eslint-disable complexity */
import React from 'react';
import { Pressable, StyleSheet, View, Image, StatusBar } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

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
    const startColor =
        theme === 'light' && isHighContrastEnabled
            ? '#FFD700'
            : theme === 'light'
              ? '#FFF377'
              : theme === 'dark' && isHighContrastEnabled
                ? '#4695d3'
                : '#86d2d9';
    const endColor =
        theme === 'light' && isHighContrastEnabled
            ? '#FFD700'
            : theme === 'light'
              ? '#FFF377'
              : theme === 'dark' && isHighContrastEnabled
                ? '#4695d3'
                : '#86d2d9';
    const borderTopColors =
        theme === 'light' && isHighContrastEnabled
            ? '#000000'
            : theme === 'light'
              ? '#C0C0C0'
              : theme === 'dark' && isHighContrastEnabled
                ? '#FFFFFF'
                : '#C0C0C0';

    const statusBarColor = () => {
        return theme === 'light'
            ? isHighContrastEnabled
                ? '#FFFFFF'
                : '#FFFFF0'
            : isHighContrastEnabled
              ? '#000000'
              : '#2A2A2A';
    };
    const darkThemeIconStyle = {
        tintColor: '#FFFFFF',
    };
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
            backgroundColor: colors.navBar.backgroundColor,
            height: 80,
            zIndex: 1,
            left: 0,
            right: 0,
            top: 0,
            padding: 0,
            paddingHorizontal: 20,
            overflow: 'hidden',
            paddingTop: 5,
            borderTopWidth: 2,
            borderTopColor: borderTopColors,
        },
        itemContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            paddingVertical: 10,
            position: 'relative',
            overflow: 'hidden',
        },
        selectedIcon: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        gradient: {
            width: '100%',
            height: '100%',
        },
        icon: {
            width: 25,
            height: 25,
            tintColor: colors.black,
        },
    });

    function isRouteActive(route: string) {
        return navigationState.selectedNavBarRoute === route;
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={statusBarColor()} translucent />
            {navigationBarLinks.map((link) => {
                const routeActive = isRouteActive(link.route);

                return (
                    <Pressable
                        key={link.route}
                        onPress={() => {
                            HapticFeedback(HapticForces.Light);
                            navigation.navigate(link.route);
                        }}
                        style={styles.itemContainer}
                        testID={link.route + '-navbar-button'}
                    >
                        {routeActive ? (
                            <View style={styles.selectedIcon}>
                                <Svg
                                    style={styles.gradient}
                                    viewBox="0 0 50 50"
                                >
                                    <Defs>
                                        <LinearGradient
                                            id="grad"
                                            x1="0"
                                            y1="0"
                                            x2="1"
                                            y2="1"
                                        >
                                            <Stop
                                                offset="25%"
                                                stopColor={startColor}
                                            />
                                            <Stop
                                                offset="100%"
                                                stopColor={endColor}
                                            />
                                        </LinearGradient>
                                    </Defs>
                                    <Rect
                                        x="0"
                                        y="0"
                                        width="50"
                                        height="50"
                                        fill="url(#grad)"
                                        rx={10}
                                        ry={10}
                                    />
                                </Svg>
                            </View>
                        ) : null}
                        <Image
                            source={
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
                                !routeActive &&
                                    theme === 'dark' &&
                                    darkThemeIconStyle,
                            ]}
                        />
                    </Pressable>
                );
            })}
        </View>
    );
};
