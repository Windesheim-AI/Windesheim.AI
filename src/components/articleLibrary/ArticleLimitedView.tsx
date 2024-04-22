import React from 'react';
import { View } from 'react-native';

import { ArticleCard } from './ArticleCard';
import { useFonts } from '../../lib/constants/Fonts';
import useArticleLibrary from '../../lib/repositories/articleLibrary/useArticleLibrary';
import { getRandomLimitedItemsFromArray } from '../../lib/utility/data';
import { TextTranslated } from '../general/text/TextTranslated';

type Props = {
    limit?: number;
};

export function ArticleLimitedView({ limit }: Props) {
    const fonts = useFonts();

    const { data, isLoading, error } = useArticleLibrary();
    const isLimited = limit !== undefined && limit > 0;

    const selectedArticles = isLimited
        ? getRandomLimitedItemsFromArray(data, limit)
        : data;

    if (isLoading) {
        return <TextTranslated style={fonts.default} text="Loading..." />;
    }

    if (error) {
        return (
            <TextTranslated
                style={fonts.h1}
                text="An error occurred while loading the data"
            />
        );
    }

    return (
        <View>
            {selectedArticles?.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </View>
    );
}
