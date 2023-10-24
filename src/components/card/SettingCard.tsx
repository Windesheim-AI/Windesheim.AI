/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useColorConfig } from '../../constants/Colors';

export type SettingCardProps = {
    title: string;
    description?: string;
    icon: string;
    children: React.ReactNode;
};

export const SettingCard: React.FC<SettingCardProps> = ({
    title,
    description,
    icon,
    children,
}) => {
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        buttonContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.settingButtonBG,
            borderColor: '#CCC',
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            marginBottom: 20,
        },
        iconContainer: {
            marginRight: 10,
        },
        icon: {
            width: 24,
            height: 24,
            resizeMode: 'contain',
            color: colors.text,
        },
        titleContainer: {
            flex: 1,
            marginLeft: 10,
            marginRight: 10,
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 5,
            color: colors.text,
        },
        description: {
            color: colors.subtext,
            fontSize: 14,
        },
    });
    return (
        <View style={styles.buttonContainer}>
            <View style={styles.iconContainer}>
                <FontAwesome5 style={styles.icon} name={icon} size={24} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            <View>{children}</View>
        </View>
    );
};
