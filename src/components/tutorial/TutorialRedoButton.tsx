import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { useAppDispatch } from '../../redux/Hooks';
import { setCompleted } from '../../redux/slices/TutorialSlice';
import { Routes } from '../../routes/routes';
import { TextTranslated } from '../general/text/TextTranslated';

export const TutorialRedoButton = () => {
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
        storeDispatcher(setCompleted(false));
        navigation.navigate(Routes.Home as never);
    };

    return (
        <Pressable style={styles.button} onPress={handleReset}>
            <TextTranslated style={styles.buttonText} text="Redo Tutorial" />
        </Pressable>
    );
};
