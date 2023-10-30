import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import NewsList from '../components/Data/NewsList';
import { Button } from '../components/buttons/Button';
import HorizontalScroll from '../components/general/HorizontalScroll';
import { PageView } from '../components/general/PageView';
import { buttonColorSchemes } from '../constants/Colors';
import { Routes } from '../routes/routes';
import { useFonts } from '../constants/Fonts';

export const HomeScreen = () => {
    const fonts = useFonts();

    const styles = StyleSheet.create({
        newsHeaderText: {
            ...fonts.h1,
            marginTop: 10,
            marginBottom: 10,
        },
    });

    return (
        <PageView
            title="Home"
            description="Artificial intelligence is the key to innovating the
                future and transforming our lives"
        >
            {/* "News" */}
            <Text style={styles.newsHeaderText}>News</Text>

            {/* HorizontalScroll */}
            <HorizontalScroll>
                <NewsList />
            </HorizontalScroll>

            {/* Button */}
            <Button
                buttonText="Windesheim Tech Radar"
                colorGradientScheme={buttonColorSchemes.primary}
                screenName={Routes.WindesheimTechRadar}
                width={100}
            />
        </PageView>
    );
};
