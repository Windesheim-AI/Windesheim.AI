import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import { WhScrollView } from './WhScrollView';
import {
    useCurrentTheme,
    useCurrentHighContrastMode,
    useColorConfig,
} from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { TextTranslated } from '../text/TextTranslated';

type PageScrollViewProps = {
    children: React.ReactNode;
    title?: string;
    description?: string;
};
type ColorMap = Record<string, Record<string, string>>;
export const PageScrollView = ({
    children,
    title,
    description,
}: PageScrollViewProps) => {
    const colors = useColorConfig();
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
            backgroundColor: colors.background,
            flex: 1,
            minHeight: '100%',
            paddingHorizontal: 10,
            paddingTop: 5,
            paddingBottom: Platform.select({
                ios: 30,
                android: 15,
            }),
        },
        header: {
            ...fonts.h1,
            color: titleColor,
            marginBottom: 10,
        },
        description: {
            ...fonts.description,
            textAlign: 'center',
        },
    });

    return (
        <WhScrollView>
            <View style={styles.container}>
                {title ? (
                    <TextTranslated
                        style={styles.header}
                        text={title}
                        testID={`${title}-description`}
                    />
                ) : null}
                {description ? (
                    <TextTranslated
                        style={styles.description}
                        text={description}
                    />
                ) : null}

                {children}
            </View>
        </WhScrollView>
    );
};
