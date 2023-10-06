import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

import { useColorConfig } from '../constants/Colors';

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
        <iframe
            className="windesheim-tech-radar-frame"
            height="100%"
            sandbox=""
            src="https://windesheim.tech"
            width="100%"
        />
    ) : (
        <View style={styles.container}>
            <WebView
                source={{ uri: 'https://windesheim.tech' }}
                style={styles.site}
            />
        </View>
    );
};
