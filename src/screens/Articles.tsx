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
                    explainationText="Here you'll find a collection of articles that highlight the latest developments, trends, and insights in the field of AI. Each article on the page is also tagged with relevant ELSA categories."
                />
                <ArticleLimitedView limit={20} />
            </View>
        </PageScrollView>
    );
}
