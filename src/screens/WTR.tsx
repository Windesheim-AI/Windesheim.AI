import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { ColorScheme } from '../constants/Colors';

export const WTRScreen = () => {
    const colors = ColorScheme.useColorScheme();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
        },
        site: {
            flex: 1,
        },
    });

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: 'https://windesheim.tech' }}
                style={styles.site}
            />
        </View>
    );
};
