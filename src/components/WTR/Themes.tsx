import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemeItemCard } from './Card/ThemeItemCard';
import { themeItems } from './ThemeItems';
import { useFonts } from '../../lib/constants/Fonts';
import { Routes } from '../../routes/routes';
import { TextTranslated } from '../general/text/TextTranslated';

export const Themes = () => {
    const fonts = useFonts();

    const styles = StyleSheet.create({
        heading: {
            margin: 10,
            ...fonts.h1,
        },
    });

    return (
        <View>
            <TextTranslated style={styles.heading} text="Themes" />

            {themeItems.map((theme) => (
                <View key={theme.slug}>
                    <ThemeItemCard
                        title={theme.name}
                        description={theme.description}
                        themeImage={theme.image}
                        navigateToRoute={Routes.WindesheimTechRadar}
                        navigationParams={{ page: theme.slug }}
                    />
                </View>
            ))}
        </View>
    );
};
