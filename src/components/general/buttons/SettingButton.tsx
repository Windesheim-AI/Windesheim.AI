import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageSourcePropType,
} from 'react-native';

import SettingsIcon from '../../../assets/images/Icon/settings_icon.png';
import { useCurrentTheme } from '../../../lib/constants/Colors';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';
import { Routes } from '../../../routes/routes';
const theme = {
    darkIconTintColor: '#FFFFFF',
};

export const SettingsButton = () => {
    const navigation = useNavigation();
    const currentTheme = useCurrentTheme();

    const handlePress = () => {
        HapticFeedback(HapticForces.Light);
        navigation.navigate(Routes.Settings as never);
    };

    const iconStyle =
        currentTheme === 'dark' ? styles.darkIcon : styles.lightIcon;

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Image
                source={SettingsIcon as ImageSourcePropType}
                style={iconStyle}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        paddingRight: 10,
    },
    lightIcon: {
        width: 37,
        height: 37,
    },
    darkIcon: {
        width: 37,
        height: 37,
        tintColor: theme.darkIconTintColor,
    },
});
