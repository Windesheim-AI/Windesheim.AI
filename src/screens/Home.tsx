import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import NewsList from '../components/Data/NewsList';
import { Button } from '../components/buttons/Button';
import HorizontalScroll from '../components/general/HorizontalScroll';
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
                <NewsList />
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
