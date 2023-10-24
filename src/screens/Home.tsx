import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import { Button } from '../components/buttons/Button';
import NewsItem from '../components/buttons/NewsItem';
import { HorizontalScroll } from '../components/general/HorizontalScroll';
import { PageScrollView } from '../components/general/PageScrollView';
import { buttonColorSchemes } from '../constants/Colors';
import { Routes } from '../routes/routes';

const colors = {
    gray: 'gray',
    black: 'black',
};

const styles = StyleSheet.create({
    descriptionText: {
        fontSize: 15,
        fontWeight: 'normal',
        marginBottom: 10,
        color: colors.gray,
    },
    newsHeaderText: {
        fontSize: 23,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: colors.black,
    },
});

export const HomeScreen = () => {
    return (
        <PageScrollView title="Home">
            {/* description */}
            <Text style={styles.descriptionText}>
                &ldquo;Artificial intelligence is the key to innovating the
                future and transforming our lives&rdquo;
            </Text>

            {/* "News" */}
            <Text style={styles.newsHeaderText}>News</Text>

            {/* HorizontalScroll */}
            <HorizontalScroll>
                {/* Newa Item */}
                <NewsItem
                    title="News 1"
                    url="https://www.artificialintelligence-news.com/"
                />
                <NewsItem
                    title="News 2"
                    url="https://www.artificialintelligence-news.com/"
                />
                <NewsItem
                    title="News 3"
                    url="https://www.artificialintelligence-news.com/"
                />
                <NewsItem
                    title="News 4"
                    url="https://www.artificialintelligence-news.com/"
                />
            </HorizontalScroll>

            {/* Button */}
            <Button
                buttonText="Windesheim Tech Radar"
                colorGradientScheme={buttonColorSchemes.primary}
                screenName={Routes.WindesheimTechRadar}
                width={100}
            />
        </PageScrollView>
    );
};
