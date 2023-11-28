/* eslint-disable react/self-closing-comp */
import React from 'react';
import { Pressable } from 'react-native';

import { useAppDispatch } from '../../lib/redux/Hooks';
import { setCompleted } from '../../lib/redux/slices/TutorialSlice';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
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
