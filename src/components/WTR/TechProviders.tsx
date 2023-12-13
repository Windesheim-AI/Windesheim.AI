import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { TechProviderCard } from './Card/TechProviderCard';
import { TechProvider, techProviderItems } from './TechProviderItems';
import { useFonts } from '../../lib/constants/Fonts';
import { Routes } from '../../routes/routes';
import { TextTranslated } from '../general/text/TextTranslated';
import { TitleWithSeeAll } from '../general/text/TitleWithSeeAll';

export const TechProviders = ({ limit }: { limit?: number }) => {
    const fonts = useFonts();
    const [displayItems, setDisplayItems] = useState<TechProvider[]>([]);
    const isLimited = limit && limit > 0;

    const styles = StyleSheet.create({
        heading: {
            margin: 10,
            ...fonts.h1,
        },
        container: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '100%',
            height: 120,
        },
    });

    useEffect(() => {
        let resultItems = [...techProviderItems];
        if (!limit || limit < 1) {
            setDisplayItems(resultItems);
            return;
        }

        //shuffles the array and then slices it to the limit
        resultItems.sort(() => Math.random() - Math.random());
        resultItems = resultItems.slice(0, limit);

        setDisplayItems(resultItems);
    }, [limit]);

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

            <ScrollView>
                <View style={styles.container}>
                    {displayItems.map((provider) => (
                        <View key={provider.slug}>
                            <TechProviderCard
                                name={provider.name}
                                techProviderImage={provider.logo}
                                techProviderSlug={provider.slug}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};
