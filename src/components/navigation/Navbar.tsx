import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    Animated,
    Dimensions,
    Pressable,
    StyleSheet,
    View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { useAnimatedValue } from '../../lib/utility/animate';
import { RootState, useAppSelector } from '../../redux/Store';
import { Routes } from '../../routes/routes';

const navLinks = [
    { icon: 'home', route: Routes.Home },
    { icon: 'search', route: Routes.WindesheimTechRadar },
    { icon: 'graduation-cap', route: Routes.Study },
    { icon: 'cog', route: Routes.Settings },
];

export const NavBar = () => {
    const [showNavBar, setShowNavBar] = useState(true);
    const navigation = useNavigation();

    const navigationState = useAppSelector(
        (state: RootState) => state.navigation,
    );

    const colors = useColorConfig();
    const fonts = useFonts();
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
            height: 'auto',
            marginBottom: 10,
            position: 'absolute',
            width: screenWidth - 40,
            zIndex: 1,
            padding: 10, // Add some padding to space out the icons
        },
        icon: {
            flex: 1, // Make the icons equally distribute horizontally
            alignItems: 'center', // Center horizontally
            justifyContent: 'center', // Center vertically
        },
    });

    useEffect(() => {
        setShowNavBar(navigationState.showNavBar);
    }, [navigationState]);

    const [opacity, animateOpacity] = useAnimatedValue(1);
    const [bottom, animateBottom] = useAnimatedValue(screenWidth - 40);
    const [width, animateWidth] = useAnimatedValue(screenWidth - 40);

    useEffect(() => {
        animateOpacity(showNavBar ? 1 : 0, 200);
        animateBottom(showNavBar ? 0 : -100, 200);
        animateWidth(showNavBar ? screenWidth - 40 : 0, 200);
    }, [showNavBar, animateOpacity, animateBottom, animateWidth, screenWidth]);

    return (
        <Animated.View style={{ ...styles.container, opacity, bottom, width }}>
            {navLinks.map((link, index) => (
                <Pressable
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    onPress={() => {
                        //@ts-ignore
                        navigation.navigate(link.route);
                    }}
                    testID={link.route + '-navbar-button'}
                >
                    <View style={styles.icon}>
                        <FontAwesome5
                            color={colors.navBar.color}
                            name={link.icon}
                            size={fonts.icon.fontSize}
                        />
                    </View>
                </Pressable>
            ))}
        </Animated.View>
    );
};
