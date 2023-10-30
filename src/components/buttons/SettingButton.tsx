/* eslint-disable react-native/no-color-literals */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useColorConfig } from '../../constants/Colors';
import { truncate } from '../../lib/utility/stringutils';
import { useFonts } from '../../constants/Fonts';

export type SettingButtonProps = {
    onPress?: () => void;
    title: string;
    description: string;
    icon: string;
    screenName?: string;
};

export const SettingButton = ({
    title,
    description,
    onPress,
    icon,
    screenName,
}: SettingButtonProps) => {
    const colors = useColorConfig();
    const navigation = useNavigation();
    const fonts = useFonts();

    if (!onPress) {
        if (!screenName) {
            throw new Error(
                'SettingButton requires either onPress or screenName to be defined',
            );
        }
        onPress = () => {
            //@ts-ignore
            navigation.navigate(screenName);
        };
    }

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
            width: 24,
            height: 24,
            color: colors.text,
        },
        titleContainer: {
            flex: 1,
            marginLeft: 10,
            marginRight: 10,
        },
        title: {
            ...fonts.button,
            marginBottom: 5,
            color: colors.text,
        },
        description: {
            ...fonts.description,
        },
        arrowContainer: {
            justifyContent: 'center',
        },
        arrow: {
            width: 20,
            height: 20,
            color: colors.text,
        },
    });
    return (
        <Pressable
            testID={title}
            style={styles.buttonContainer}
            onPress={onPress}
        >
            <View style={styles.iconContainer}>
                <FontAwesome5 style={styles.icon} name={icon} size={24} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>
                    {truncate(description, 30)}
                </Text>
            </View>
            <View style={styles.arrowContainer}>
                <FontAwesome5
                    style={styles.arrow}
                    name="chevron-right"
                    size={24}
                />
            </View>
        </Pressable>
    );
};
