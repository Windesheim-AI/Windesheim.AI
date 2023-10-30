/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';

export type SettingCardProps = {
    title: string;
    description?: string;
    icon: string;
    children: React.ReactNode;
    testID?: string;
};

export const SettingCard = ({
    title,
    description,
    icon,
    children,
    testID,
}: SettingCardProps) => {
    const colors = useColorConfig();
    const fonts = useFonts();
    const styles = StyleSheet.create({
        buttonContainer: {
            flexDirection: 'row',
            alignItems: 'center',
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
            ...fonts.icon,
            color: colors.text,
        },
        titleContainer: {
            flex: 1,
            marginLeft: 10,
            marginRight: 10,
        },
        title: {
            ...fonts.h2,
            marginBottom: 5,
        },
        description: {
            ...fonts.description,
        },
    });

    return (
        <View style={styles.buttonContainer} testID={testID}>
            <View style={styles.iconContainer}>
                <FontAwesome5 style={styles.icon} name={icon} size={24} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            {children}
        </View>
    );
};
