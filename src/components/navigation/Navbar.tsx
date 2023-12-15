import React, { useEffect, useState } from 'react';
import {
    Animated,
    Pressable,
    StyleSheet,
    useWindowDimensions,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useColorConfig } from '../../lib/constants/Colors';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { useAppSelector } from '../../lib/redux/Hooks';
import { useAnimatedValueNav } from '../../lib/utility/animate';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { navigationBarLinks } from '../../routes/navigation';

export const NavBar = () => {
    const navigation = useNavigation();
    const colors = useColorConfig();
    const windowDimensions = useWindowDimensions();

    const navigationState = useAppSelector((state) => state.navigation);
    const [showNavBar, setShowNavBar] = useState(true);

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'space-around',
            backgroundColor: colors.navBar.backgroundColor,
            borderRadius: 50,
            bottom: 0,
            height: 50,
            marginBottom: 10,
            position: 'absolute',
            width: windowDimensions.width - 40,
            zIndex: 1,
            padding: 0,
        },
        itemContainer: {
            width: 55,
            height: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
            padding: 0,
            borderRadius: 50,
        },
        itemSelectedContainer: {
            margin: 0,
            padding: 0,
            width: 55,
            height: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            backgroundColor: colors.navBar.activeItemBackgroundColor,
        },
    });

    useEffect(() => {
        setShowNavBar(navigationState.showNavBar);
    }, [navigationState]);

    const [opacity, animateOpacity] = useAnimatedValueNav(1);
    const [bottom, animateBottom] = useAnimatedValueNav(
        windowDimensions.width - 40,
    );
    const [width, animateWidth] = useAnimatedValueNav(
        windowDimensions.width - 40,
    );

    useEffect(() => {
        animateOpacity(showNavBar ? 1 : 0, 200);
        animateBottom(showNavBar ? 0 : -100, 200);
        animateWidth(showNavBar ? windowDimensions.width - 40 : 0, 200);
    }, [
        showNavBar,
        animateOpacity,
        animateBottom,
        animateWidth,
        windowDimensions.width,
    ]);

    function isRouteActive(route: string) {
        return navigationState.selectedNavBarRoute === route;
    }

    return (
        <Animated.View style={{ ...styles.container, opacity, bottom, width }}>
            {navigationBarLinks.map((link, index) => {
                const routeActive = isRouteActive(link.route);

                return (
                    <Pressable
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        onPress={() => {
                            HapticFeedback(HapticForces.Light);
                            navigation.navigate(link.route);
                        }}
                        style={
                            routeActive
                                ? styles.itemSelectedContainer
                                : styles.itemContainer
                        }
                        testID={link.route + '-navbar-button'}
                    >
                        <FontAwesome5
                            color={
                                routeActive
                                    ? colors.navBar.activeColor
                                    : colors.navBar.color
                            }
                            name={link.icon}
                            size={20}
                        />
                    </Pressable>
                );
            })}
        </Animated.View>
    );
};
