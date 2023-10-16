import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import { CustomButton } from '../components/buttons/Button';
import { colorSchemes, useColorConfig } from '../constants/Colors';

export const WTRScreen = () => {
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
        },
        site: {
            flex: 1,
        },
    });

    return Platform.OS === 'web' ? (
        <CustomButton buttonText="hi" colorGradientScheme={colorSchemes.blue} />
    ) : (
        <View style={styles.container}>
            <CustomButton
                buttonText="Go!"
                colorGradientScheme={colorSchemes.blue}
                screenName="Home"
                icon="link"
            />
        </View>
    );
};
