import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import NewsList from '../components/Data/NewsList';
import { Button } from '../components/buttons/Button';
import HorizontalScroll from '../components/general/HorizontalScroll';
import { PageView } from '../components/general/PageView';
import { buttonColorSchemes, useColorConfig } from '../constants/Colors';
import { Routes } from '../routes/routes';
import StatusAlert from '../components/StatusAlert';
import { StatusMessage } from '../components/StatusMessage';

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

            <StatusAlert message='Dit is een test alert' type='error'/>

            <StatusMessage type='success' message='lorum ipsum bla hblah blah blah langere tekst how this ogengere tekst how this ogesngere tekst how this ogesngere tekst how this ogesngere tekst how this ogesngere tekst how this ogesngere tekst how this ogess' colorGradientScheme={buttonColorSchemes.success} icon='exclamation-circle'/>
            <StatusMessage type='error' message='Er ging iets fout...' colorGradientScheme={buttonColorSchemes.danger} icon='exclamation-circle'/>
            <Button buttonText='add message' colorGradientScheme={buttonColorSchemes.success} screenName='WTR' width={100}/>
        </PageView>
    );
};
