import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';

import { Routes } from '../../../routes/routes';

export const DisclaimerCard = () => {
    const navigation = useNavigation();

    return (
        <Button
            title="Settings"
            onPress={() => {
                navigation.navigate(Routes.Settings as never);
            }}
        />
    );
};
