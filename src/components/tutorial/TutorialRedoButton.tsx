import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useColorConfig } from '../../constants/Colors';
import { useAppDispatch } from '../../redux/Hooks';
import { setCompleted } from '../../redux/slices/TutorialSlice';
import { Routes } from '../../routes/routes';
import { TextTranslated } from '../text/TextTranslated';

export const TutorialRedoButton = () => {
    const storeDispatcher = useAppDispatch();
    const navigation = useNavigation();
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        button: {
            backgroundColor: colors.danger,
            padding: 10,
            borderRadius: 5,
        },
        buttonText: {
            color: colors.textLight,
            fontSize: 16,
            textAlign: 'center',
        },
    });

    const handleReset = () => {
        storeDispatcher(setCompleted(false));
        navigation.navigate(Routes.Home as never);
    };

    return (
        <Pressable style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonText}>
                <TextTranslated text="Redo Tutorial" />
            </Text>
        </Pressable>
    );
};
