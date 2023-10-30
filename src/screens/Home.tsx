import * as React from 'react';
import { Text } from 'react-native';

import NewsList from '../components/Data/NewsList';
import { Button } from '../components/buttons/Button';
import { Usecase } from '../components/buttons/UsecaseButton';
import HorizontalScroll from '../components/general/HorizontalScroll';
import { PageView } from '../components/general/PageView';
import { TextTranslated } from '../components/text/TextTranslated';
import { buttonColorSchemes } from '../constants/Colors';

import { useStyles } from '../constants/_styles';
import { useFonts } from '../constants/Fonts';
import { Routes } from '../routes/routes';

export const HomeScreen = () => {
    const styles = useStyles();
    const fonts = useFonts();
    const styles = StyleSheet.create({
        newsHeaderText: {
            ...fonts.h1,
            marginTop: 10,
            marginBottom: 10,
        },
    });
    return (
        <PageView title="Home">
            {/* "description" */}
            <Text style={styles.Info}>
                <TextTranslated
                    text="Artificial intelligence is the key to innovating the future and
                transforming our lives"
                />
            </Text>

            {/* "News" */}
            <Text style={styles.HeaderText}>
                <TextTranslated text="news" />
            </Text>

            {/* NewsList */}
            <HorizontalScroll>
                <NewsList />
            </HorizontalScroll>

            {/* "WTR" */}
            <Text style={styles.HeaderText}>
                <TextTranslated text="Windesheim Tech Radar" />
            </Text>

            {/* Button */}
            <Button
                buttonText="Windesheim Tech Radar"
                colorGradientScheme={buttonColorSchemes.primary}
                screenName={Routes.WindesheimTechRadar}
                width={100}
            />
            {/* Button */}
            <Usecase
                buttonText="Use Cases"
                screenName={Routes.Usecase}
                width={100}
            />
        </PageView>
    );
};
