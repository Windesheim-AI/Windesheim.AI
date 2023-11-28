import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { useColorStateConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
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

    return (
        <Pressable
            style={styles.button}
            onPress={() => navigator.navigate(Routes.MyInfo)}
            testID="edit-background-information-button"
        >
            <TextTranslated style={styles.buttonText} text="Edit" />
        </Pressable>
    );
};
