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

import { useColorConfig } from '../../../lib/constants/Colors';
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
            top: 20,
            right: 20,
            zIndex: 3,
        },
        hamburger: {
            justifyContent: 'space-between',
            height: 24,
        },
        bar: {
            height: 3,
            width: 30,
            borderRadius: 2,
            backgroundColor: colors.black,
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
            backgroundColor: colors.white,
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
            color: '#4695D3',
        },
        menuItem: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
        },
        menuIcon: {
            width: 25,
            height: 25,
            marginRight: 10,
        },
        menuText: {
            fontSize: 15,
            color: colors.black,
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
                                    source={
                                        getIcon(
                                            link.icon,
                                        ) as ImageSourcePropType
                                    }
                                    style={styles.menuIcon}
                                />
                                <Text style={styles.menuText}>{link.icon}</Text>
                            </TouchableOpacity>
                        ))}

                        <SettingsButton toggleMenu={toggleMenu} />
                    </Animated.View>
                </>
            ) : null}
        </>
    );
};

const getIcon = (iconName: string): number | null => {
    switch (iconName) {
        case 'home':
            return require('../../../assets/images/navbarIcons/Home.png');
        case 'articles':
            return require('../../../assets/images/navbarIcons/Articles.png');
        case 'quizzes':
            return require('../../../assets/images/navbarIcons/Courses.png');
        case 'prompts':
            return require('../../../assets/images/navbarIcons/Prompts.png');
        case 'WTR':
            return require('../../../assets/images/navbarIcons/WindesheimTech.png');
        case 'scans':
            return require('../../../assets/images/navbarIcons/WindesheimTech.png');
        default:
            return null;
    }
};
