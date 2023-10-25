import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import NewsList from '../components/Data/NewsList';
import { Button } from '../components/buttons/Button';
import HorizontalScroll from '../components/general/HorizontalScroll';
import { PageView } from '../components/general/PageView';
import { buttonColorSchemes, useColorConfig } from '../constants/Colors';
import { Routes } from '../routes/routes';

export const HomeScreen = () => {
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        newsHeaderText: {
            fontSize: 23,
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom: 10,
            color: colors.text,
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
