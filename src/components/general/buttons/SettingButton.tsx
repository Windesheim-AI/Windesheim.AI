import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageSourcePropType,
} from 'react-native';

import SettingsIcon from '../../../assets/images/Icon/settings_icon.png';
import { useColorConfig, useCurrentTheme } from '../../../lib/constants/Colors';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';
import { Routes } from '../../../routes/routes';
import { TextTranslated } from '../text/TextTranslated';

const theme = {
    darkIconTintColor: '#FFFFFF',
};

interface SettingsButtonProps {
    toggleMenu: () => void;
}

export const SettingsButton = ({ toggleMenu }: SettingsButtonProps) => {
    const colors = useColorConfig();
    const navigation = useNavigation();
    const currentTheme = useCurrentTheme();

    const handlePress = () => {
        HapticFeedback(HapticForces.Light);
        navigation.navigate(Routes.Settings as never);
        toggleMenu(); // Close the menu after navigation
    };

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
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
        menuText: {
            fontSize: 20,
            color: colors.text,
            marginLeft: 10,
        },
    });

    const iconStyle =
        currentTheme === 'dark' ? styles.darkIcon : styles.lightIcon;

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Image
                source={SettingsIcon as ImageSourcePropType}
                style={iconStyle}
            />
            <TextTranslated style={styles.menuText} text="Settings" />
        </TouchableOpacity>
    );
};
