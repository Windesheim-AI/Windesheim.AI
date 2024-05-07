import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

import { IconLine } from './IconLine';
import { shadow, useColorStateConfig } from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';
import { TextTranslated } from '../text/TextTranslated';
import { InteractiveView } from '../views/InteractiveView';

type PlainButtonProps = {
    text: string;
    onPress: () => void;
    icon?: string;
    style?: ViewStyle;
    backgroundColor: string;
};

export function PlainButton({
    text,
    onPress,
    icon,
    style,
    backgroundColor,
}: PlainButtonProps) {
    const fonts = useFonts();
    const colorStateConfig = useColorStateConfig();

    const buttonSize = 120;
    const textColor = colorStateConfig.theme === 'dark' ? 'white' : 'black';

    const styles = StyleSheet.create({
        button: {
            width: buttonSize / 1.3,
            height: buttonSize / 2.5,
            backgroundColor,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
            ...shadow,
            ...colorStateConfig.highContrastBorder,
        },
        buttonText: {
            ...fonts.button,
            color: textColor,
        },
    });

    function press() {
        HapticFeedback(HapticForces.Light);
        onPress();
    }

    return (
        <InteractiveView style={[style, styles.button]} onPress={press}>
            {icon ? (
                <IconLine iconName={icon} text={text} size={15} />
            ) : (
                <TextTranslated text={text} style={styles.buttonText} />
            )}
        </InteractiveView>
    );
}
