import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Animated,
    Dimensions,
    Text,
    Image,
} from 'react-native';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';
import { navigationBarLinks } from '../../../routes/navigation';
import { useAppSelector } from '../../../lib/redux/Hooks';
import { SettingsButton } from '../buttons/SettingButton'; 

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export const MenuButton = () => {
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = useState(false);
    const slideAnim = useState(new Animated.Value(-275))[0];
    const navigationState = useAppSelector((state) => state.navigation);

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: menuVisible ? 0 : -275,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [menuVisible]);

    const toggleMenu = () => {
        HapticFeedback(HapticForces.Light);
        setMenuVisible((prev) => !prev); 
    };

    function isRouteActive(route: string) {
        return navigationState.selectedNavBarRoute === route;
    }

    return (
        <>
            <TouchableOpacity style={styles.container} onPress={toggleMenu}>
                <View style={styles.hamburger}>
                    <View style={styles.bar} />
                    <View style={styles.bar} />
                    <View style={styles.bar} />
                </View>
            </TouchableOpacity>

            {menuVisible && (
                <>
                    <TouchableOpacity style={styles.overlay} onPress={toggleMenu} />

                    <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
                        <Text style={styles.menuTitle}>Menu</Text>

                        {navigationBarLinks.map((link) => (
                            <TouchableOpacity
                                key={link.route}
                                style={styles.menuItem}
                                onPress={() => {
                                    HapticFeedback(HapticForces.Light);
                                    navigation.navigate(link.route);
                                    toggleMenu();
                                }}
                            >
                                <Image source={getIcon(link.icon)} style={styles.menuIcon} />
                                <Text style={styles.menuText}>{link.icon}</Text>
                            </TouchableOpacity>
                        ))}

                        <SettingsButton toggleMenu={toggleMenu} />
                    </Animated.View>
                </>
            )}
        </>
    );
};

const getIcon = (iconName: string) => {
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
        backgroundColor: 'black',
        marginVertical: 2,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: screenWidth,
        height: screenHeight,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        zIndex: 2,
    },
    menuContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 300,
        height: screenHeight,
        backgroundColor: 'white',
        paddingTop: 0,
        zIndex: 3,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    menuTitle: {
        padding: 20,
        fontSize: 22,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
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
        color: 'black',
        marginLeft: 10,
    },
});
