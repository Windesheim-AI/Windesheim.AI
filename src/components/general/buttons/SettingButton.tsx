import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import SettingsIcon from '../../../assets/images/Icon/settings_icon.png';
import { Routes } from '../../../routes/routes';

export const DisclaimerCard = () => {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate(Routes.Settings as never);
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress}>
                <Image source={SettingsIcon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        color: 'white',
    },
});
