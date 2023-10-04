import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { WebView } from 'react-native-webview';

import Colors from '../constants/Colors';

export const WTRScreen = () => {
    const colorScheme = useColorScheme();
    const styles = StyleSheet.create({
        container: {
            backgroundColor:
                colorScheme === 'dark'
                    ? Colors.dark.background
                    : Colors.light.background,
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
