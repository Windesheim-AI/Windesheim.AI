import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useColorConfig } from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { TextTranslated } from '../text/TextTranslated';

type PageViewProps = {
    children: React.ReactNode;
    title?: string;
    description?: string;
};

export const PageView = ({ children, title, description }: PageViewProps) => {
    const colors = useColorConfig();
    const fonts = useFonts();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
            padding: 20,
            overflow: 'scroll',
        },
        header: {
            ...fonts.h1,
            marginBottom: 10,
        },
        description: {
            ...fonts.accent,
            textAlign: 'center',
        },
    });

    return (
        <View testID={title} style={styles.container}>
            {title ? (
                <TextTranslated
                    style={styles.header}
                    testID={`${title}-description`}
                    text={title}
                />
            ) : null}
            {description ? (
                <TextTranslated style={styles.description} text={description} />
            ) : null}

            {children}
        </View>
    );
};
