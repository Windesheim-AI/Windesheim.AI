import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Button } from '../components/buttons/Button';
import { buttonColorSchemes, useColorConfig } from '../constants/Colors';

export const HomeScreen = () => {
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            backgroundColor: colors.background,
            flex: 1,
            justifyContent: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button
                buttonText="Windesheim Tech Radar"
                colorGradientScheme={buttonColorSchemes.primary}
                screenName="WTR"
                width={100}
            />
        </View>
    );
};
