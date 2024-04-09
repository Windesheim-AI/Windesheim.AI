import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { ThemeItemCard } from './Card/ThemeItemCard';
import { ThemeItem, themeItems } from './ThemeItems';
import { getRandomLimitedItemsFromArray } from '../../lib/utility/data';

type Props = {
    limit?: number;
};

export const Themes = ({ limit }: Props) => {
    const [displayItems, setDisplayItems] = useState<ThemeItem[]>([]);
    const isLimited = limit && limit > 0;

    useEffect(() => {
        if (!isLimited) {
            setDisplayItems(themeItems);
            return;
        }

        setDisplayItems(getRandomLimitedItemsFromArray(themeItems, limit));
    }, [isLimited, limit]);

    return (
        <View>
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
