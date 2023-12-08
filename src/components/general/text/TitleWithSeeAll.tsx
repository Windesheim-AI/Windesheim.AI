import React from 'react';
import { StyleSheet, View } from 'react-native';

import { TextTranslated } from './TextTranslated';
import { useFonts } from '../../../lib/constants/Fonts';
import { Routes } from '../../../routes/routes';
import { SeeAllButton } from '../buttons/SeeAllButton';

type Props = {
    title: string;
    navigateToRoute: Routes;
};

export const TitleWithSeeAll = ({ title, navigateToRoute }: Props) => {
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

            <SeeAllButton navigateToRoute={navigateToRoute} />
        </View>
    );
};
