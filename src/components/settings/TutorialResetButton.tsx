import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useAppDispatch } from '../../redux/Hooks';
import { setCompleted } from '../../redux/slices/TutorialSlice';
import { Routes } from '../../routes/routes';

export const TutorialResetButton = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const handleReset = () => {
        dispatch(setCompleted(false));
        navigation.navigate(Routes.Home as never);
    };

    return (
        <Pressable style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset Tutorial</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    // eslint-disable-next-line react-native/no-color-literals
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
    },
    // eslint-disable-next-line react-native/no-color-literals
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
    },
});
