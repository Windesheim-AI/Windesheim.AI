/* eslint-disable react/self-closing-comp */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable } from 'react-native';

import { useAppDispatch } from '../../redux/Hooks';
import { setCompleted } from '../../redux/slices/TutorialSlice';
import { Routes } from '../../routes/routes';

export const TutorialResetButton = () => {
    const storeDispatcher = useAppDispatch();
    const navigation = useNavigation();

    const handleReset = () => {
        storeDispatcher(setCompleted(false));
        navigation.navigate(Routes.Home as never);
    };

    return <Pressable onPress={handleReset}></Pressable>;
};
