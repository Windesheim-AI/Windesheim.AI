import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import NewsList from '../components/Data/NewsList';
import { Button } from '../components/buttons/Button';
import HorizontalScroll from '../components/general/HorizontalScroll';
import { PageView } from '../components/general/PageView';
import { buttonColorSchemes, useColorConfig } from '../constants/Colors';
import { Routes } from '../routes/routes';
import { StatusAlert } from '../components/alerts/StatusAlert';
import { useState } from 'react';

export const HomeScreen = () => {
    const colors = useColorConfig();
    const [showAlert, setShowAlert] = useState(false);

    const styles = StyleSheet.create({
        newsHeaderText: {
            fontSize: 23,
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom: 10,
            color: colors.text,
        },
    });

    const showStatusAlert = () => {
        setShowAlert(true); // Set showAlert to true to show the StatusAlert
        // Simulate hiding the StatusAlert after a delay
        setTimeout(() => {
            setShowAlert(false); // Hide the StatusAlert after a delay
        }, 3000);
    };

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

            <Button buttonText='add message' onPress={showStatusAlert} colorGradientScheme={buttonColorSchemes.success} screenName='WTR' width={100} />

            {showAlert && (
                <StatusAlert
                    type="success"
                    message="Message Added!"
                    colorGradientScheme={buttonColorSchemes.success}
                    icon="exclamation-circle"
                    isVisible={showAlert}
                />
            )}

            {showAlert && (
                <StatusAlert
                    type="success"
                    message="Er ging iets fout..."
                    colorGradientScheme={buttonColorSchemes.danger}
                    width={700}
                    height={100}
                    icon="exclamation-circle"
                    isVisible={showAlert}
                />
            )}

        </PageView>
    );
};
