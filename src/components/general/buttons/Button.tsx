import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

import {
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

    const styles = StyleSheet.create({
        button: {
            alignItems: 'center',
            backgroundColor: colors.previousButton,
            borderRadius: 18,
            flexDirection: 'row',
            height,
            margin: 10,
            maxHeight: 90,
            width: width ? buttonWidth : 'auto',
            minWidth: buttonWidth,
            ...colorStateConfig.highContrastBorder,
        },
        textContainer: {
            position: 'absolute',
            ...fonts.button,
            width: buttonWidth,
            alignItems: 'center',
            color: textColorScheme ? textColorScheme : fonts.button.color,
            textAlign: 'center',
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
            <Text style={styles.textContainer}>
                {icon ? <FontAwesome5 name={icon} style={styles.icon} /> : null}
                {icon ? ' ' : ''}
                <TextTranslated style={styles.text} text={buttonText ?? ''} />
            </Text>
        </InteractiveView>
    );
};
