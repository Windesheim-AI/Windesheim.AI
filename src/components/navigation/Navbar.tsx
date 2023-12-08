import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import {
    Animated,
    Dimensions,
    Pressable,
    StyleSheet,
    View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useColorConfig } from '../../lib/constants/Colors';
import { useAppSelector } from '../../lib/redux/Hooks';
import { useAnimatedValueNav } from '../../lib/utility/animate';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { navigationBarLinks } from '../../routes/navigation';

export const NavBar = () => {
    const [showNavBar, setShowNavBar] = useState(true);
    const navigation = useNavigation();

    const navigationState = useAppSelector((state) => state.navigation);

    const colors = useColorConfig();
    const screenWidth = Dimensions.get('window').width;
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row', // Horizontal arrangement
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'space-around', // Spread icons horizontally
            backgroundColor: colors.navBar.backgroundColor,
            borderRadius: 50,
            bottom: 0,
            height: 50,
            marginBottom: 10,
            position: 'absolute',
            width: screenWidth - 40,
            zIndex: 1,
            padding: 10, // Add some padding to space out the icons
        },
        item: {
            width: 55,
            height: 35,
            flex: 1, // Make the icons equally distribute horizontally
            alignItems: 'center', // Center horizontally
            justifyContent: 'center', // Center vertically
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
    }, [showNavBar, animateOpacity, animateBottom, animateWidth, screenWidth]);

    return (
        <Animated.View style={{ ...styles.container, opacity, bottom, width }}>
            {navigationBarLinks.map((link, index) => (
                <Pressable
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    onPress={() => {
                        // eslint-disable-next-line no-void
                        void Haptics.impactAsync(
                            Haptics.ImpactFeedbackStyle.Light,
                        );
                        navigation.navigate(link.route);
                    }}
                    style={styles.item}
                    testID={link.route + '-navbar-button'}
                >
                    <View>
                        <FontAwesome5
                            color={colors.navBar.color}
                            name={link.icon}
                            size={20}
                        />
                    </View>
                </Pressable>
            ))}
        </Animated.View>
    );
};
