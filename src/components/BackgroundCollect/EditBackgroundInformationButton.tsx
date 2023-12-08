import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { useColorStateConfig } from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';
import { TextTranslated } from '../general/text/TextTranslated';

export const EditBackgroundInformationButton = () => {
    const navigator = useNavigation();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();

    const styles = StyleSheet.create({
        button: {
            backgroundColor: colorStateConfig.colors.success[0],
            padding: 10,
            borderRadius: 5,
        },
        buttonText: {
            fontSize: 16,
            textAlign: 'center',
            ...fonts.button,
            color: colorStateConfig.text?.success,
        },
    });

    const handlePress = () => {
        HapticFeedback(HapticForces.Light);
        navigator.navigate(Routes.EditBackgroundInformation);
    };

    return (
        <Pressable
            style={styles.button}
            onPress={handlePress}
            testID="edit-background-information-button"
        >
            <TextTranslated style={styles.buttonText} text="Edit" />
        </Pressable>
    );
};
