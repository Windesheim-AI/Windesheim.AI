import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useColorConfig } from '../../lib/constants/Colors';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { useAppSelector } from '../../lib/redux/Hooks';
import { useAnimatedValueNav } from '../../lib/utility/animate';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { navigationBarLinks } from '../../routes/navigation';

const screenWidth = Dimensions.get('window').width;

export const NavBar = () => {
    const navigation = useNavigation();
    const colors = useColorConfig();

    const navigationState = useAppSelector((state) => state.navigation);
    const [showNavBar, setShowNavBar] = useState(true);

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row', // Horizontal arrangement
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'space-around',
            backgroundColor: colors.navBar.backgroundColor,
            borderRadius: 50,
            bottom: 0,
            height: 50,
            marginBottom: 10,
            position: 'absolute',
            width: screenWidth - 40,
            zIndex: 1,
            padding: 10,
        },
        itemContainer: {
            width: 55,
            height: 35,
            flex: 1, // Make the icons equally distribute horizontally
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    useEffect(() => {
        setShowNavBar(navigationState.showNavBar);
    }, [navigationState]);

    const [opacity, animateOpacity] = useAnimatedValueNav(1);
    const [bottom, animateBottom] = useAnimatedValueNav(screenWidth - 40);
    const [width, animateWidth] = useAnimatedValueNav(screenWidth - 40);

    useEffect(() => {
        animateOpacity(showNavBar ? 1 : 0, 200);
        animateBottom(showNavBar ? 0 : -100, 200);
        animateWidth(showNavBar ? screenWidth - 40 : 0, 200);
    }, [showNavBar, animateOpacity, animateBottom, animateWidth]);

    function isRouteActive(route: string) {
        return navigationState.selectedNavBarRoute === route;
    }

    return (
        <Animated.View style={{ ...styles.container, opacity, bottom, width }}>
            {navigationBarLinks.map((link, index) => (
                <Pressable
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    onPress={() => {
                        HapticFeedback(HapticForces.Light);
                        navigation.navigate(link.route);
                    }}
                    style={styles.itemContainer}
                    testID={link.route + '-navbar-button'}
                >
                    <FontAwesome5
                        color={
                            isRouteActive(link.route)
                                ? colors.navBar.activeColor
                                : colors.navBar.color
                        }
                        name={link.icon}
                        size={20}
                    />
                </Pressable>
            ))}
        </Animated.View>
    );
};
