import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemeItemCard } from './Card/ThemeItemCard';
import { ThemeItem, themeItems } from './ThemeItems';
import { useFonts } from '../../lib/constants/Fonts';
import { getRandomLimitedItemsFromArray } from '../../lib/utility/data';
import { Routes } from '../../routes/routes';
import { TextTranslated } from '../general/text/TextTranslated';
import { TitleWithSeeAll } from '../general/text/TitleWithSeeAll';

type Props = {
    limit?: number;
};

export const Themes = ({ limit }: Props) => {
    const fonts = useFonts();
    const [displayItems, setDisplayItems] = useState<ThemeItem[]>([]);
    const isLimited = limit && limit > 0;

    const styles = StyleSheet.create({
        heading: {
            margin: 10,
            ...fonts.h1,
        },
    });

    useEffect(() => {
        if (!isLimited) {
            setDisplayItems(themeItems);
            return;
        }

        setDisplayItems(getRandomLimitedItemsFromArray(themeItems, limit));
    }, [isLimited, limit]);

    return (
        <View>
            {isLimited ? (
                <TitleWithSeeAll
                    title="Themes"
                    navigateToRoute={Routes.WindesheimTechRadar}
                />
            ) : (
                <TextTranslated style={styles.heading} text="Themes" />
            )}

            {displayItems.map((theme) => (
                <View key={theme.slug}>
                    <ThemeItemCard
                        title={theme.name}
                        description={theme.description}
                        themeImage={theme.image}
                        themeSlug={theme.slug}
                    />
                </View>
            ))}
        </View>
    );
};
