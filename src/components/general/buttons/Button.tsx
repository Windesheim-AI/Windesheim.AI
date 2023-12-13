import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {
    ColorGradientScheme,
    useColorConfig,
    useColorStateConfig,
} from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';
import { useNavigation } from '../../../lib/utility/navigation/useNavigation';
import { TextTranslated } from '../text/TextTranslated';
import { InteractiveView } from '../views/InteractiveView';

export type ButtonProps = {
    onPress?: () => void;
    screenName?: string;
    buttonText?: string;
    colorGradientScheme: ColorGradientScheme;
    textColorScheme: string | undefined;
    width?: number;
    height?: number;
    icon?: string;
    testId?: string;
};

// eslint-disable-next-line complexity
export const Button = ({
    onPress,
    buttonText,
    colorGradientScheme,
    textColorScheme,
    screenName,
    width,
    height = 60,
    icon,
    testId,
}: ButtonProps) => {
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();
    const navigation = useNavigation();

    if (!onPress) {
        /* istanbul ignore next */
        if (!screenName) {
            throw new Error(
                'CustomButton requires either onPress or screenName to be defined',
            );
        }

        /* istanbul ignore next */
        onPress = () => {
            HapticFeedback(HapticForces.Light);
            navigation.navigate(screenName);
        };
    }

    const minWidth = 80;
    const baseWidth = width ? width : minWidth;
    const checkedWidth: number = baseWidth > minWidth ? baseWidth : minWidth;
    const buttonWidth =
        checkedWidth > minWidth ? checkedWidth * 3 : minWidth * 3;
    const barHeight = 3 * checkedWidth;

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
            borderRadius: 18,
            flexDirection: 'row',
            height,
            margin: 10,
            // from left to rigth items
            // shadow
            maxHeight: 90,
            width: width ? buttonWidth : 'auto',
            minWidth: buttonWidth,
            // center
            overflow: 'hidden',
            ...colorStateConfig.highContrastBorder,
        },
        textContainer: {
            left: 50,
            position: 'absolute',
            ...fonts.button,
            width: buttonWidth - 30,
            color: textColorScheme ? textColorScheme : fonts.button.color,
        },
        text: {
            ...fonts.button,
            color: textColorScheme ? textColorScheme : fonts.button.color,
        },
        icon: {
            ...fonts.icon,
            color: textColorScheme ? textColorScheme : colors.buttonText,
            fontWeight: 'bold',
        },
    });

    return (
        <InteractiveView
            style={styles.button}
            onPress={onPress}
            testID={testId}
        >
            <View style={styles.bg1} />
            <View style={styles.bg2} />
            <Text style={styles.textContainer}>
                {icon ? <FontAwesome5 name={icon} style={styles.icon} /> : null}
                {icon ? ' ' : ''}
                <TextTranslated style={styles.text} text={buttonText ?? ''} />
            </Text>
        </InteractiveView>
    );
};
