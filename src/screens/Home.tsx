import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { SlidingArticle } from '../components/SlidingBar/slidingArticle';
import { SlidingProviders } from '../components/SlidingBar/slidingProviders';
import { PageScrollView } from '../components/general/views/PageScrollView';
import { getArticleArray } from '../lib/fetcher/ArticleFetcher';
export const HomeScreen = () => {
    const articleCards = getArticleArray();

    return (
        <SafeAreaView style={styles.container}>
            <PageScrollView>
                <View>
                    <SlidingArticle cards={articleCards} />
                    <SlidingProviders cards={articleCards} />
                </View>
            </PageScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
