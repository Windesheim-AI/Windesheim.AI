import React from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useColorConfig } from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { TextTranslated } from '../text/TextTranslated';

export type StepButtonProps = {
    onPreviousPress?: () => void;
    onSkipPress?: () => void;
    onNextPress?: () => void;
    buttonText?: string;
    size?: number;
    margin?: number;
};

export const StepButton = ({
    onPreviousPress,
    onSkipPress,
    onNextPress,
    buttonText = 'Skip',
    size = 30,
    margin = 0.3,
}: StepButtonProps) => {
    const colors = useColorConfig();
    const windowDimensions = useWindowDimensions();
    const marginwidth = windowDimensions.width * margin;
    const fonts = useFonts();

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        skipButton: {
            marginLeft: marginwidth,
            marginRight: marginwidth,
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
                testID="tutorial-previous-button"
                onPress={onPreviousPress}
            >
                <FontAwesome5
                    name="arrow-left"
                    size={size}
                    color={colors.text}
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
            <Pressable testID="tutorial-next-button" onPress={onNextPress}>
                <FontAwesome5
                    name="arrow-right"
                    size={size}
                    color={colors.bg3}
                />
            </Pressable>
        </View>
    );
};
