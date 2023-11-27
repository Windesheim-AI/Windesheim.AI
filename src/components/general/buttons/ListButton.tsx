import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useColorConfig, useColorStateConfig } from '../../../constants/Colors';
import { useFonts } from '../../../constants/Fonts';
import { useNavigation } from '../../../lib/utility/navigation/useNavigation';
import { TextTranslated } from '../text/TextTranslated';

export type ButtonProps = {
    onPress?: () => void;
    screenName?: string;
    buttonText?: string;
    width?: number;
    icon?: string;
    testId?: string;
};

export const ListButton = ({
    onPress,
    buttonText,
    screenName,
    width,
    icon,
    testId,
}: ButtonProps) => {
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();
    const navigation = useNavigation();

    if (!onPress) {
        if (!screenName) {
            throw new Error(
                'CustomButton requires either onPress or screenName to be defined',
            );
        }
        onPress = () => {
            navigation.navigate(screenName);
        };
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
            backgroundColor: colorStateConfig.colors.secondary[2],
            height: barHeight,
            top: -30,
            transform: 'rotate(20deg)',
            width: bgWidth,
        },
        bg2: {
            backgroundColor: colorStateConfig.colors.secondary[1],
            height: barHeight,

            top: -30,
            transform: 'rotate(20deg)',
            width: bgWidth,
        },
        bg3: {
            backgroundColor: colorStateConfig.colors.secondary[0],
            height: barHeight,

            top: -30,
            transform: 'rotate(20deg)',
            width: bgWidth,
        },
        button: {
            alignItems: 'center',
            backgroundColor: colorStateConfig.isHighContrastEnabled
                ? colorStateConfig.colors.secondary[0]
                : colors.listItemBg,
            borderRadius: 40,
            flexDirection: 'row',
            height,
            margin: 10,
            maxHeight: 90,
            width: buttonWidth,
            // center
            overflow: 'hidden',
            ...colorStateConfig.highContrastBorder,
        },
        icon: {
            fontSize: 15,
            fontWeight: 'bold',
            position: 'absolute',
            color: colorStateConfig.isHighContrastEnabled
                ? colorStateConfig.text?.secondary
                : colors.text,
        },
        text: {
            ...fonts.buttonLarger,
            position: 'absolute',
            color: colorStateConfig.isHighContrastEnabled
                ? colorStateConfig.text?.secondary
                : fonts.buttonLarger.color,
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
        <Pressable style={styles.button} onPress={onPress} testID={testId}>
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
