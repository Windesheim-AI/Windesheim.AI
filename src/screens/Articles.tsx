import React from 'react';
import { View } from 'react-native';

import { ArticleLimitedView } from '../components/articleLibrary/ArticleLimitedView';
import { TitleSimple } from '../components/general/text/TitleSimple';
import { PageScrollView } from '../components/general/views/PageScrollView';

export function Articles() {
    return (
        <PageScrollView
            title="Read and Listen"
            description="Consume informative content, hand picked for you by our experts!"
        >
            <View>
                <TitleSimple title="Articles: " />
                <ArticleLimitedView />
            </View>
        </PageScrollView>
    );
}
