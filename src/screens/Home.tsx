import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Button } from '../components/buttons/Button';
import { buttonColorSchemes, useColorConfig } from '../constants/Colors';

export const HomeScreen = () => {
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
            padding: 20,
        },
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        description: {
            color: colors.descriptionDefault,
            fontSize: 16,
        },
    });

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Text style={styles.header}>Home</Text>
            <Text style={styles.description}>
                &quot; Artificial intelligence is the key to innovating the
                future and transforming our lives &quot;
            </Text>
            <Button
                buttonText="Windesheim Tech Radar"
                colorGradientScheme={buttonColorSchemes.primary}
                screenName="WTR"
                width={100}
            />
        </View>
    );
};
