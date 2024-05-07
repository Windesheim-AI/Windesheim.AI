import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { useColorConfig } from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { useAppDispatch } from '../../lib/redux/Hooks';
import { setCompleted } from '../../lib/redux/slices/PromptsTutorialSlice';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';
import { TextTranslated } from '../general/text/TextTranslated';

export const PromptsTutorialRedoButton = () => {
    const storeDispatcher = useAppDispatch();
    const navigation = useNavigation();
    const colors = useColorConfig();
    const fonts = useFonts();

    const styles = StyleSheet.create({
        button: {
            backgroundColor: colors.danger,
            padding: 10,
            borderRadius: 5,
        },
        buttonText: {
            fontSize: 16,
            textAlign: 'center',
            ...fonts.button,
            color: colors.textLight,
        },
    });

    const handleReset = () => {
        HapticFeedback(HapticForces.Light);
        storeDispatcher(setCompleted(false));
        navigation.navigate(Routes.PromptLibrary as never);
    };

    return (
        <Pressable
            style={styles.button}
            onPress={handleReset}
            testID="redo-prompts-tutorial-button"
        >
            <TextTranslated style={styles.buttonText} text="Redo" />
        </Pressable>
    );
};
