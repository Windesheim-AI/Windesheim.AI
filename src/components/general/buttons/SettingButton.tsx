import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import SettingsIcon from '../../../assets/images/Icon/settings_icon.png';
import { useColorConfig, useCurrentTheme } from '../../../lib/constants/Colors';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';
import { Routes } from '../../../routes/routes';

const theme = {
    darkIconTintColor: '#FFFFFF',
};

/* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
interface SettingsButtonProps {
    toggleMenu: () => void;
}

export const SettingsButton = () => {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    const colors = useColorConfig();
    const navigation = useNavigation();
    const currentTheme = useCurrentTheme();

    const handlePress = () => {
        HapticFeedback(HapticForces.Light);
        navigation.navigate(Routes.Settings as never);
    };

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
        },
        lightIcon: {
            width: 40,
            height: 40,
        },
        darkIcon: {
            width: 40,
            height: 40,
            tintColor: theme.darkIconTintColor,
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
        </TouchableOpacity>
    );
};
