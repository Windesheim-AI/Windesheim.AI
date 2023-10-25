import React from 'react';
import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { ColorGradientScheme, useColorConfig } from '../constants/Colors';

export type StatusMessageProps = {
    type: string;
    screenName?: string;
    message: string;
    colorGradientScheme: ColorGradientScheme;
    width?: number;
    icon?: string;
};

export const StatusMessage = ({
    type,
    message,
    colorGradientScheme,
    screenName,
    width,
    icon,
}: StatusMessageProps) => {
    const [fontsLoaded, fontError] = useFonts({
        Inter_500Medium,
    });

    //const alertStyles = type === 'success' ? successAlert : errorAlert;
    const colors = useColorConfig();

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const defaultWidth = 90;
    const minWidth = 90;
    const baseWidth = width ? width : minWidth;
    const checkedWidth: number = baseWidth > minWidth ? baseWidth : minWidth;
    const buttonWidth =
        checkedWidth > minWidth ? checkedWidth * 3 : minWidth * 3;
    const barHeight = 3 * checkedWidth;
    const height = 60;

    const styles = StyleSheet.create({
        bg1: {
            backgroundColor: colorGradientScheme[1],
            height: barHeight,
            left: 5,
            top: -30,
            transform: [{ rotate: '15deg' }],
            width: 24,
        },
        bg2: {
            backgroundColor: colorGradientScheme[0],
            height: barHeight,
            left: 5,
            top: -30,
            transform: [{ rotate: '15deg' }],
            width: 24,
        },
        bg3: {
            backgroundColor: colorGradientScheme[0],
            height: barHeight,
            right: -185,
            top: -30,
            transform: [{ rotate: '15deg' }],
            width: 24,
        },
        bg4: {
            backgroundColor: colorGradientScheme[1],
            height: barHeight,
            right: -185,
            top: -30,
            transform: [{ rotate: '15deg' }],
            width: 24,
        },
        button: {
            alignItems: 'center',
            backgroundColor: '#f2f2f2',
            borderRadius: 15,
            flexDirection: 'row',
            height,
            margin: 10,
            // from left to rigth items
            // shadow
            maxHeight: 90,
            width: buttonWidth,
            // center
            overflow: 'hidden',
        },
        text: {
            color: colors.text,
            fontFamily: 'Inter_500Medium',
            fontSize: 16,
            fontWeight: 'bold',
            left: 60,

            position: 'absolute',
        },
        icon: {
            color: colors.text,
            fontSize: 15,
            fontWeight: 'bold',
        },
        successAlert: {

        },
        errorAlert: {

        },
    });

    return (
        <TouchableOpacity style={styles.button}>
            <View style={styles.bg1} />
            <View style={styles.bg2} />
            <View style={styles.bg3} />
            <View style={styles.bg4} />
            <Text style={styles.text}>
                {icon ? <FontAwesome5 name={icon} style={styles.icon} /> : null}
                {icon ? ' ' : ''}
                {message}
            </Text>
        </TouchableOpacity>
    );
};
