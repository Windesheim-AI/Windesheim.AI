import React from 'react';
import { View } from 'react-native';

import { ArticleLimitedView } from '../components/articleLibrary/ArticleLimitedView';
import { TextTranslated } from '../components/general/text/TextTranslated';
import { TitleSimple } from '../components/general/text/TitleSimple';
import { PageScrollView } from '../components/general/views/PageScrollView';

export function Articles() {
    return (
        <PageScrollView>
            <View>
                <TitleSimple
                    titleText="Podcasts"
                    explainationText="Here you will soon find the newest episodes of the official Windesheim.AI podcast."
                />
                <TextTranslated text="loading..." />
            </View>
            <View>
                <TitleSimple
                    titleText="Articles"
                    explainationText="Here you will find a collection of engaging articles highlighting the latest developments, trends and insights in the field of AI. Our experts have carefully selected these articles to give you a deeper insight into the world of AI. With each article on our webpage, we also tag the relevant ELSA categories."
                />
                <ArticleLimitedView />
            </View>
        </PageScrollView>
    );
}
