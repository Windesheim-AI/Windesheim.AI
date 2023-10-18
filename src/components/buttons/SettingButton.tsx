/* eslint-disable react-native/no-color-literals */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useColorConfig } from '../../constants/Colors';

export type SettingButtonProps = {
    onPress?: () => void;
    title: string;
    description: string;
    icon: string;
    screenName?: string;
};

export const SettingButton: React.FC<SettingButtonProps> = ({
    title,
    description,
    onPress,
    icon,
    screenName,
}) => {
    const truncate = (str: string, n: number) => {
        return str.length > n ? str.substring(0, n - 1) + '...' : str;
    };
    const colors = useColorConfig();
    const navigation = useNavigation();

    if (!onPress) {
        if (!screenName) {
            throw new Error(
                'SettingButton requires either onPress or screenName to be defined',
            );
        }
        onPress = () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            navigation.navigate(screenName);
        };
    }

    const styles = StyleSheet.create({
        buttonContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.settingButtonBG,
            borderBottomColor: '#CCC',
            borderBottomWidth: 1,
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
        arrowContainer: {
            justifyContent: 'center',
        },
        arrow: {
            width: 20,
            height: 20,
            resizeMode: 'contain',
            color: colors.text,
        },
    });
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <View style={styles.iconContainer}>
                <FontAwesome5 style={styles.icon} name={icon} size={24} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>
                    {truncate(description, 25)}
                </Text>
            </View>
            <View style={styles.arrowContainer}>
                <FontAwesome5
                    style={styles.arrow}
                    name="chevron-right"
                    size={24}
                />
            </View>
        </TouchableOpacity>
    );
};

export default SettingButton;
