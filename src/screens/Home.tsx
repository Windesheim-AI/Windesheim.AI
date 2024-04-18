import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { Sliding } from '../components/SlidingBar/slidingBar';
import { PageScrollView } from '../components/general/views/PageScrollView';
import { getArticleArray } from '../lib/fetcher/ArticleFetcher';
export const HomeScreen = () => {
    const articleCards = getArticleArray();

    return (
        <SafeAreaView style={styles.container}>
            <PageScrollView>
                <Sliding cards={articleCards} />
            </PageScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
