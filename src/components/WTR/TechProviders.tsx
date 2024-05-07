import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { TechProviderCard } from './Card/TechProviderCard';
import { TechProvider, techProviderItems } from './TechProviderItems';
import { useFonts } from '../../lib/constants/Fonts';
import { getRandomLimitedItemsFromArray } from '../../lib/utility/data';
import { Routes } from '../../routes/routes';
import { TextTranslated } from '../general/text/TextTranslated';
import { TitleWithSeeAll } from '../general/text/TitleWithSeeAll';

type Props = { limit?: number };

export const TechProviders = ({ limit }: Props) => {
    const fonts = useFonts();
    const [displayItems, setDisplayItems] = useState<TechProvider[]>([]);
    const isLimited = limit && limit > 0;

    const styles = StyleSheet.create({
        heading: {
            marginBottom: 10,
            ...fonts.h1,
        },
        providerCard: {
            marginBottom: 10,
        },
    });

    useEffect(() => {
        if (!isLimited) {
            setDisplayItems(techProviderItems);
            return;
        }

        setDisplayItems(
            getRandomLimitedItemsFromArray(techProviderItems, limit),
        );
    }, [isLimited, limit]);

    const renderProviderCards = ({ item }: { item: TechProvider }) => (
        <View style={styles.providerCard}>
            <TechProviderCard
                name={item.name}
                // @ts-ignore
                techProviderImage={item.logo}
                techProviderSlug={item.slug}
            />
        </View>
    );

    return (
        <View>
            {isLimited ? (
                <TitleWithSeeAll
                    title="Tech Providers"
                    navigateToRoute={Routes.WindesheimTechRadar}
                />
            ) : (
                <TextTranslated style={styles.heading} text="Tech Providers" />
            )}

            <FlatList
                horizontal
                data={displayItems}
                renderItem={renderProviderCards}
                keyExtractor={(item) => item.slug}
            />
        </View>
    );
};
