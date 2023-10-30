import { useFonts as useFont, Inter_500Medium } from '@expo-google-fonts/inter';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, View, Pressable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { ColorGradientScheme, useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';

export type ButtonProps = {
    onPress?: () => void;
    screenName?: string;
    buttonText?: string;
    colorGradientScheme: ColorGradientScheme;
    width?: number;
    icon?: string;
};

export const Button = ({
    onPress,
    buttonText,
    colorGradientScheme,
    screenName,
    width,
    icon,
}: ButtonProps) => {
    const [fontsLoaded, fontError] = useFont({
        Inter_500Medium,
    });

    const colors = useColorConfig();
    const fonts = useFonts();
    const navigation = useNavigation();

    if (!onPress) {
        if (!screenName) {
            throw new Error(
                'CustomButton requires either onPress or screenName to be defined',
            );
        }
        onPress = () => {
            //@ts-ignore
            navigation.navigate(screenName);
        };
    }

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const minWidth = 70;
    const baseWidth = width ? width : minWidth;
    const checkedWidth: number = baseWidth > minWidth ? baseWidth : minWidth;
    const buttonWidth =
        checkedWidth > minWidth ? checkedWidth * 3 : minWidth * 3;
    const barHeight = 3 * checkedWidth;
    const height = 60;

    const styles = StyleSheet.create({
        bg1: {
            backgroundColor: colorGradientScheme[0],
            height: barHeight,
            top: -30,
            transform: 'rotate(20deg)',
            width: checkedWidth,
        },
        bg2: {
            backgroundColor: colorGradientScheme[1],
            height: barHeight,
            left: -30,
            top: -30,
            transform: 'rotate(20deg)',
            width: checkedWidth,
        },
        button: {
            alignItems: 'center',
            backgroundColor: colorGradientScheme[2],
            borderRadius: 40,
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
            fontWeight: 'bold',
            left: 50,
            position: 'absolute',
            ...fonts.button,
        },
        icon: {
            color: colors.text,
            ...fonts.icon,
            fontWeight: 'bold',
        },
    });

    return (
        <Pressable style={styles.button} onPress={onPress}>
            <View style={styles.bg1} />
            <View style={styles.bg2} />
            <Text style={styles.text}>
                {icon ? <FontAwesome5 name={icon} style={styles.icon} /> : null}
                {icon ? ' ' : ''}
                {buttonText}
            </Text>
        </Pressable>
    );
};
