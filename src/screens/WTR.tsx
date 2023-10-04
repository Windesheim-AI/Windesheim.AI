import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import useTheme from '../utils/ThemeUtil';

export const WTRScreen = () => {
    const { useBackgroundColor } = useTheme();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: useBackgroundColor(),
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
