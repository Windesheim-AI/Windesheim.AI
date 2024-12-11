/* eslint-disable react-native/no-color-literals */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Animated,
    Text,
    Image,
    useWindowDimensions,
    ImageSourcePropType,
} from 'react-native';

import { useColorConfig, useCurrentTheme } from '../../../lib/constants/Colors';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';
import { navigationBarLinks } from '../../../routes/navigation';
import { SettingsButton } from '../buttons/SettingButton';

export const MenuButton = () => {
    const colors = useColorConfig();
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = useState(false);
    // eslint-disable-next-line react/hook-use-state
    const slideAnim = useState(new Animated.Value(-275))[0];

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',

            left: 15,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        hamburger: {
            justifyContent: 'space-between',
            height: 24,
        },
        bar: {
            height: 3,
            width: 30,
            borderRadius: 2,
            backgroundColor: colors.text,
            marginVertical: 2,
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: screenWidth,
            height: screenHeight,
            backgroundColor: colors.black,
            opacity: 0.5,
            zIndex: 2,
        },
        menuContainer: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 300,
            height: screenHeight,
            backgroundColor: colors.background,
            paddingTop: 0,
            zIndex: 3,
            elevation: 3,
            shadowColor: colors.black,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
        },
        menuTitle: {
            padding: 20,
            fontSize: 22,
            fontWeight: 'bold',
            borderBottomWidth: 1,
            borderBottomColor: colors.black,
            color: colors.text,
        },
        menuItem: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 25,
            borderBottomWidth: 0.5,
        },
        menuIcon: {
            width: 25,
            height: 25,
            marginRight: 10,
        },
        menuText: {
            fontSize: 20,
            color: colors.text,
            marginLeft: 10,
        },
    });

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: menuVisible ? 0 : -275,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [menuVisible, slideAnim]);

    const toggleMenu = () => {
        HapticFeedback(HapticForces.Light);
        setMenuVisible((prev) => !prev);
    };

    const currentTheme = useCurrentTheme();
    const iconStyle = {
        ...styles.menuIcon,
        tintColor: currentTheme === 'dark' ? colors.white : colors.black,
    };

    return (
        <>
            <TouchableOpacity style={styles.container} onPress={toggleMenu}>
                <View style={styles.hamburger}>
                    <View style={styles.bar} />
                    <View style={styles.bar} />
                    <View style={styles.bar} />
                </View>
            </TouchableOpacity>

            {menuVisible ? (
                <>
                    <TouchableOpacity
                        style={styles.overlay}
                        onPress={toggleMenu}
                    />

                    <Animated.View
                        style={[
                            styles.menuContainer,
                            { transform: [{ translateX: slideAnim }] },
                        ]}
                    >
                        <Text style={styles.menuTitle}>Menu</Text>

                        {navigationBarLinks.map((link) => (
                            <TouchableOpacity
                                key={link.route}
                                style={styles.menuItem}
                                onPress={() => {
                                    HapticFeedback(HapticForces.Light);
                                    navigation.navigate(link.route as never);
                                    toggleMenu();
                                }}
                            >
                                <Image
                                    source={getIcon(link.icon)}
                                    style={iconStyle}
                                />
                                <Text style={styles.menuText}>{link.icon}</Text>
                            </TouchableOpacity>
                        ))}
                        <View
                            style={{
                                marginTop: 'auto',
                                marginBottom: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 25,
                            }}
                        >
                            <Image
                                source={require('../../../assets/images/Icon/icon.png')}
                                style={{
                                    width: 30,
                                    height: 30,
                                    marginRight: 10,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    marginLeft: 10,
                                    color: colors.logoTextColor,
                                }}
                            >
                                WINDESHEIM.AI
                            </Text>
                        </View>
                    </Animated.View>
                </>
            ) : null}
        </>
    );
};

const getIcon = (iconName: string): ImageSourcePropType => {
    switch (iconName) {
        case 'Home':
            return require('../../../assets/images/navbarIcons/Home.png');
        case 'Articles':
            return require('../../../assets/images/navbarIcons/Articles.png');
        case 'Quizzes':
            return require('../../../assets/images/navbarIcons/Courses.png');
        case 'Prompts':
            return require('../../../assets/images/navbarIcons/Prompts.png');
        case 'WTR':
        case 'Scans':
            return require('../../../assets/images/navbarIcons/WindesheimTech.png');
        default:
            return require('../../../assets/images/navbarIcons/Home.png');
    }
};
