import React from 'react';
import { View, StyleSheet } from 'react-native';

import { WhScrollView } from './WhScrollView';
import { useColorConfig } from '../../../constants/Colors';
import { useFonts } from '../../../constants/Fonts';
import { TextTranslated } from '../text/TextTranslated';

type PageScrollViewProps = {
    children: React.ReactNode;
    title?: string;
    description?: string;
};

export const PageScrollView = ({
    children,
    title,
    description,
}: PageScrollViewProps) => {
    const colors = useColorConfig();
    const fonts = useFonts();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
            padding: 20,
        },
        header: {
            ...fonts.h1,
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
                    <TextTranslated style={styles.header} text={title} />
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
