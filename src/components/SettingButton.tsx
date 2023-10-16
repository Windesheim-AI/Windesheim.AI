/* eslint-disable react-native/no-color-literals */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

interface SettingButtonProps {
    onPress: () => void;
    title: string;
    description: string;
}

const SettingButton: React.FC<SettingButtonProps> = ({
    title,
    description,
    onPress,
}) => {
    return (
        <TouchableOpacity style={styles.settingButton} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Ionicons color="black" name="ios-arrow-forward" size={24} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    description: {
        color: '#666',
        fontSize: 14,
    },
    settingButton: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#CCC',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});
export default SettingButton;
