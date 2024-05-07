import React from 'react';
import { View } from 'react-native';

import { ArticleLimitedView } from '../components/articleLibrary/ArticleLimitedView';
import { TextTranslated } from '../components/general/text/TextTranslated';
import { TitleSimple } from '../components/general/text/TitleSimple';
import { PageScrollView } from '../components/general/views/PageScrollView';
import { useFonts } from '../lib/constants/Fonts';

export function Articles() {
    const fonts = useFonts();

    return (
        <PageScrollView>
            <View>
                <TitleSimple
                    titleText="Podcasts"
                    explainationText="Soon you'll find the latest episodes of the official Windesheim.AI podcast here."
                />
                <TextTranslated style={fonts.default} text="Loading..." />
            </View>
            <View>
                <TitleSimple
                    titleText="Articles"
                    explainationText="Here you'll find a collection of articles that highlight the latest developments, trends, and insights in the field of AI. Each article on the page is also tagged with relevant ELSA categories."
                />
                <ArticleLimitedView />
            </View>
        </PageScrollView>
    );
}
