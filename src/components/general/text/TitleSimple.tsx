import React from 'react';
import { StyleSheet, View } from 'react-native';

import { TextTranslated } from './TextTranslated';
import {
    useCurrentHighContrastMode,
    useCurrentTheme,
} from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';

type ColorMap = Record<string, Record<string, string>>;

type Props = {
    titleText: string;
    explainationText?: string;
};

export const TitleSimple = ({ titleText, explainationText }: Props) => {
    const fonts = useFonts();
    const theme = useCurrentTheme();
    const isHighContrastEnabled = useCurrentHighContrastMode();

    // Using an object to map the theme and high contrast combinations to colors
    const titleColorMap: ColorMap = {
        light: {
            true: '#000000', // High Contrast
            false: '#FFD949', // No High Contrast
        },
        dark: {
            true: '#FFFFFF', // High Contrast
            false: '#4695D3', // No High Contrast
        },
    };

    // Select the color based on current theme and contrast settings
    const titleColor = titleColorMap[theme][String(isHighContrastEnabled)];

    const styles = StyleSheet.create({
        container: {
            marginBottom: 10,
        },
        title: {
            ...fonts.h1,
            color: titleColor,
            marginBottom: 6,
            textTransform: 'uppercase',
        },
        description: {
            ...fonts.description,
            textAlign: 'left',
            marginBottom: 10,
        },
    });

    return (
        <View style={styles.container}>
            <TextTranslated style={styles.title} text={titleText} />
            <TextTranslated
                style={styles.description}
                text={explainationText}
            />
        </View>
    );
};
