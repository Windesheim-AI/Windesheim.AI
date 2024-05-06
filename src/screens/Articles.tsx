import React from 'react';
import { View } from 'react-native';

import { ArticleLimitedView } from '../components/articleLibrary/ArticleLimitedView';
import { TitleSimple } from '../components/general/text/TitleSimple';
import { PageScrollView } from '../components/general/views/PageScrollView';
import { PodcastEpisodeLimitedView } from '../components/podcasts/PodcastEpisodeLimitedView';

export function Articles() {
    return (
        <PageScrollView>
            <View>
                <TitleSimple
                    titleText="Podcasts"
                    explainationText="Here you can find the newest episodes of the official Windesheim.AI podcast."
                />
                <PodcastEpisodeLimitedView />
            </View>
            <View>
                <TitleSimple
                    titleText="Articles"
                    explainationText="Here you will find a collection of engaging articles highlighting the latest developments, trends and insights in the field of AI. Our experts have carefully selected these articles to give you a deeper insight into the world of AI. With each article on our webpage, we also tag the relevant ELSA categories."
                />
                <ArticleLimitedView limit={20} />
            </View>
        </PageScrollView>
    );
}
