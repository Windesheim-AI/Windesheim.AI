import React from 'react';
import { StyleSheet, View } from 'react-native';

import { TextTranslated } from './TextTranslated';
import { useFonts } from '../../../lib/constants/Fonts';

type Props = {
    title: string;
};

export const TitleSimple = ({ title }: Props) => {
    const fonts = useFonts();

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10,
        },
        title: {
            ...fonts.h2,
            textAlign: 'left',
        },
    });

    return (
        <View style={styles.container}>
            <TextTranslated style={styles.title} text={title} />
        </View>
    );
};
