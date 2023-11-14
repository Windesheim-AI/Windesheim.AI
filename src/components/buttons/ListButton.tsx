import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, View, Pressable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useColorConfig } from '../../constants/Colors';
import { TextTranslated } from '../text/TextTranslated';

export type ButtonProps = {
    onPress?: () => void;
    screenName?: string;
    buttonText?: string;
    width?: number;
    icon?: string;
};

export const ListButton = ({
    onPress,
    buttonText,
    screenName,
    width,
    icon,
}: ButtonProps) => {
    const [fontsLoaded, fontError] = useFonts({
        Inter_500Medium,
    });

    const colors = useColorConfig();
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
    const bgWidth = buttonWidth / 15;

    const styles = StyleSheet.create({
        bg1: {
            backgroundColor: colors.bg1,
            height: barHeight,
            top: -30,
            transform: 'rotate(20deg)',
            width: bgWidth,
        },
        bg2: {
            backgroundColor: colors.bg2,
            height: barHeight,

            top: -30,
            transform: 'rotate(20deg)',
            width: bgWidth,
        },
        bg3: {
            backgroundColor: colors.bg3,
            height: barHeight,

            top: -30,
            transform: 'rotate(20deg)',
            width: bgWidth,
        },
        button: {
            alignItems: 'center',
            backgroundColor: colors.listItemBg,
            borderRadius: 40,
            flexDirection: 'row',
            height,
            margin: 10,
            maxHeight: 90,
            width: buttonWidth,
            // center
            overflow: 'hidden',
        },
        icon: {
            color: colors.text,
            fontSize: 15,
            fontWeight: 'bold',
            position: 'absolute',
        },
        text: {
            color: colors.text,
            fontFamily: 'Inter_500Medium',
            fontSize: 18,
            fontWeight: 'bold',
            position: 'absolute',
        },
        textStyle: {
            flexDirection: 'row',
            alignItems: 'center',
            right: 15,
        },
        iconStyle: {
            flexDirection: 'row',
            alignItems: 'center',
            right: -200,
        },
    });

    return (
        <Pressable
            style={styles.button}
            onPress={onPress}
            testID="Study-button"
        >
            <View style={styles.bg1} />
            <View style={styles.bg2} />
            <View style={styles.bg3} />
            <View style={styles.textStyle}>
                <TextTranslated style={styles.text} text={buttonText ?? ''} />
            </View>
            <View style={styles.iconStyle}>
                <FontAwesome5
                    name={icon ?? 'arrow-right'}
                    style={styles.icon}
                />
            </View>
        </Pressable>
    );
};
