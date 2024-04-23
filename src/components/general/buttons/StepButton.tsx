import React from 'react';
import { Pressable, StyleSheet, View, Image } from 'react-native';

import arrowLeft from '../../../assets/images/Icon/go_back_arrow.png';
import arrowRight from '../../../assets/images/Icon/go_further_arrow.png';
import {
    useColorConfig,
    useColorStateConfig,
    useCurrentTheme,
} from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { TextTranslated } from '../text/TextTranslated';
export type Props = {
    onPreviousPress: () => void;
    onSkipPress: () => void;
    onNextPress: () => void;
    buttonText?: string;
};

export const StepButton = ({
    onPreviousPress,
    onSkipPress,
    onNextPress,
    buttonText = 'Skip',
}: Props) => {
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();
    const currentTheme = useCurrentTheme();
    const arrowTintColor = currentTheme === 'dark' ? '#FFFFFF' : 'black';
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
            fontSize: 18,
        },
        arrowImage: {
            width: 35,
            height: 35,
            tintColor: arrowTintColor,
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
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    source={arrowLeft}
                    style={styles.arrowImage}
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
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    source={arrowRight}
                    style={styles.arrowImage}
                />
            </Pressable>
        </View>
    );
};
