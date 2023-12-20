import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {
    useColorConfig,
    useColorStateConfig,
} from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { TextTranslated } from '../text/TextTranslated';

export type Props = {
    onPreviousPress: () => void;
    onSkipPress: () => void;
    onNextPress: () => void;
    buttonText?: string;
    size?: number;
};

export const StepButton = ({
    onPreviousPress,
    onSkipPress,
    onNextPress,
    buttonText = 'Skip',
    size = 30,
}: Props) => {
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        continueButton: {
            flex: 1,
            alignItems: 'center',
            padding: 5,
            ...colorStateConfig.highContrastBorder,
        },
        skipButton: {
            flex: 1,
            alignItems: 'center',
            padding: 5,
            ...colorStateConfig.highContrastBorder,
        },
        buttonText: {
            color: colors.text,
            ...fonts.button,
        },
    });

    return (
        <View style={styles.container}>
            {/* Previous step <- */}
            <Pressable
                style={styles.continueButton}
                testID="tutorial-previous-button"
                onPress={onPreviousPress}
            >
                <FontAwesome5
                    name="arrow-left"
                    size={size}
                    color={colors.previousButtonColor}
                />
            </Pressable>
            {/* Skip Button */}
            <Pressable
                testID="tutorial-skip-button"
                style={styles.skipButton}
                onPress={onSkipPress}
            >
                <TextTranslated style={styles.buttonText} text={buttonText} />
            </Pressable>
            {/* Next step -> */}
            <Pressable
                testID="tutorial-next-button"
                onPress={onNextPress}
                style={styles.continueButton}
            >
                <FontAwesome5
                    name="arrow-right"
                    size={size}
                    color={colors.continueButtonColor}
                />
            </Pressable>
        </View>
    );
};
